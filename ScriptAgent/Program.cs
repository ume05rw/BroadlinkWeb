using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ScriptAgent.Extensions;
using NLog;
using NLog.Web;

namespace BrWebHost
{
    /// <summary>
    /// 起動プログラム
    /// </summary>
    /// <remarks>
    /// **publish(発行)時の注意**
    /// VSでは、一度発行操作を行うと、宣言重複エラーなどで以降のビルドが出来なくなる。
    /// bin, obj下のファイルを削除するとビルドが通るようになる。
    /// </remarks>
    public class Program
    {
        public static int Port { get; private set; } = 5004;
        public static string CurrentPath { get; private set; } = string.Empty;
        public static string DbPath { get; private set; } = string.Empty;
        public static bool IsWindowsService { get; private set; } = false;
        public static bool IsDemoMode { get; private set; } = false;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <remarks>
        /// Asp.NetCoreをWindowsサービスとして起動する。
        /// https://takachan.hatenablog.com/entry/2017/12/31/044400
        /// </remarks>
        public static void Main(string[] args)
        {
            // ロガーインスタンスを、Asp.NetCoreと無関係に取得する。
            var logger = NLog.LogManager.LoadConfiguration("nlog.config").GetCurrentClassLogger();

            // サービスとして起動するか否かのフラグ
            // 引数に"--winservice"を付与して起動すると、Windowsサービスとして起動する。
            Program.IsWindowsService = args.Contains("--winservice");

            // デモモードとして起動するか否かのフラグ
            Program.IsDemoMode = args.Contains("--demo");

            // VSから起動時、もしくはデモモードのとき、ポートを変更。
            Program.Port = 5004;
            if (Program.IsDemoMode || Debugger.IsAttached)
                Program.Port = 5005;

            // カレントパスを取得する。
            var pathToExe = Process.GetCurrentProcess().MainModule.FileName;
            if (pathToExe.EndsWith("dotnet") || pathToExe.EndsWith("dotnet.exe"))
            {
                // dotnetコマンドから起動している。
                // VisualStudio、コマンドライン等から実行している。
                Program.CurrentPath = Directory.GetCurrentDirectory();
            }
            else
            {
                // dotnetコマンド以外から起動している。
                // 実行ファイルのパスを取得してルートとする。
                Program.CurrentPath = Path.GetDirectoryName(pathToExe);
            }

            // DBパスを取得。
            Program.DbPath = Path.Combine(Program.CurrentPath, "scriptagent.db");

            // デモモード起動時は既存DBを削除する。
            if (Program.IsDemoMode)
            {
                if (File.Exists(Program.DbPath))
                    File.Delete(Program.DbPath);

                if (File.Exists(Program.DbPath))
                    throw new Exception("DB Deleting Failure on DEMO-Mode.");
            }

            // ※注意！！※
            // マイグレーション時はこのif文をコメントアウトする。
            // なにかいい方法は無いものか...
            if (!File.Exists(Program.DbPath))
            {
                var templateDbPath
                    = Path.Combine(Program.CurrentPath, "scriptagent.template.db");

                if (!File.Exists(templateDbPath))
                    throw new Exception("DB-Template NOT Found. If migrating, See Program.cs");

                File.Copy(templateDbPath, Program.DbPath);

                if (!File.Exists(Program.DbPath))
                    throw new Exception("DB Creation Failed. If migrating, See Program.cs");
            }

            // 1.サービスとして起動する場合
            //   1) WebRoot = 実行ファイルパス
            //   2) DBパス  = 実行ファイルパス/scriptagent.db
            //   3) Replyer = 実行ファイルパス/lib/UdpReplyer/UdpReplyer.dll

            // 2.publishしたexeを起動する場合
            //   1) WebRoot = 実行ファイルパス
            //   2) DBパス  = 実行ファイルパス/scriptagent.db
            //   3) Replyer = 実行ファイルパス/lib/UdpReplyer/UdpReplyer.dll


            // 3.コマンドラインから、dotnetコマンドで起動する場合
            //   1) WebRoot = カレントパス/
            //   2) DBパス  = カレントパス/scriptagent.db
            //   3) Replyer = カレントパス/lib/UdpReplyer/UdpReplyer.dll

            // 4.Visual Studioで起動する場合
            //   1) WebRoot = カレントパス/
            //   2) DBパス  = カレントパス/scriptagent.db
            //   3) Replyer = カレントパス/lib/UdpReplyer/UdpReplyer.dll

            // コマンドライン引数のパースでエラーになるので、引数を渡さず握りつぶす。
            // 1) .NetCoreコマンドライン引数は、常に キーと値のペアである必要がある。
            // 2) "dotnet run" で起動する場合と、実行ファイル型(exe)で起動する場合とで、
            //    コマンドライン引数の認識が変わってしまう。
            //    2-1) dotnet run ./XXX.dll --console true
            //         --> args = [ "./XXX.dll", "--console", "true" ]
            //    2-2) XXX.exe --console true
            //         --> args = [ "--console", "true" ]

            try
            {
                logger.Debug("Start");

                // サービスかどうかで起動方法を分ける
                if (Program.IsWindowsService)
                {
                    // Windowsサービスとして起動する。
                    Program.BuildWebHost(new string[] { }).RunAsCustomService();
                }
                else
                {
                    // 通常はこちら。
                    Program.BuildWebHost(new string[] { }).Run();
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex, "Exception!!!");
                throw;
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        /// <remarks>
        /// このメソッドはマイグレーション時に必要。
        /// </remarks>
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureLogging(logging =>
                {
                    // NLog 以外で設定された Provider の無効化.
                    logging.ClearProviders();
                    // 最小ログレベルの設定.   //これがないと正常動作しない模様
                    logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
                })
                .UseNLog()
                .UseKestrel()
                .UseContentRoot(Program.CurrentPath)
                .UseStartup<Startup>()
                .UseUrls($"http://*:{Program.Port}")
                //.UseUrls("http://0.0.0.0:5004")
                //.UseUrls("http://localhost:5004") //<-ホスト名をlocalhostに限定するとき
                .Build();
    }
}
