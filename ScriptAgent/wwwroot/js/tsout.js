var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var Obj = /** @class */ (function () {
            function Obj() {
            }
            Obj.FormatSilializable = function (value) {
                switch (typeof value) {
                    case 'boolean':
                    case 'number':
                    case 'string':
                        return value;
                    case 'undefined':
                    case 'function':
                    case 'symbol':
                        // 値がundefined, function のときは、undefined を返す。
                        // symbol型はサポート外、undefined を返す。
                        return undefined;
                    case 'object':
                        if (value instanceof jQuery
                            || value instanceof HTMLElement) {
                            // 値がundefined, JQueryオブジェクト, HTML要素のときは undefined を返す。
                            return undefined;
                        }
                        else if (value === null) {
                            // 値がnull のとき、そのまま nullを返す。
                            // ※意図的にnullがセットされたものと看做す。
                            return null;
                        }
                        else if (value instanceof Array) {
                            // 値が単純配列のとき
                            var ary_1 = [];
                            _.each(value, function (v, k) {
                                // 項目名が'_'で始まるものは除外
                                if (typeof k === 'string' && k.substr(0, 1) === '_')
                                    return;
                                // 整形後の値を取得
                                var tmpValue = Obj.FormatSilializable(v);
                                // 値がundefinedのとき、除外
                                if (tmpValue === undefined)
                                    return;
                                ary_1.push(tmpValue);
                            });
                            return ary_1;
                        }
                        else {
                            // 値がobjectのとき
                            var obj_1 = {};
                            var exists_1 = false;
                            _.each(value, function (v, k) {
                                // 項目名が'_'で始まるものは除外
                                if (typeof k === 'string' && k.substr(0, 1) === '_')
                                    return;
                                // 整形後の値を取得
                                var tmpValue = Obj.FormatSilializable(v);
                                // 値がundefinedのとき、除外
                                if (tmpValue === undefined)
                                    return;
                                obj_1[k] = tmpValue;
                                exists_1 = true;
                            });
                            // 値が1つでもある場合は整形済みオブジェクトを、
                            // 1件も無い場合は undefined を返す。
                            return (exists_1)
                                ? obj_1
                                : undefined;
                        }
                    default:
                        Fw.Util.Dump.Log('想定外の渡し値');
                        Fw.Util.Dump.Log(value);
                        throw new Error('想定外の渡し値');
                }
            };
            Obj.Mirror = function (value) {
                switch (typeof value) {
                    case 'boolean':
                    case 'number':
                    case 'string':
                    case 'undefined':
                    case 'function':
                    case 'symbol':
                        // 配列orオブジェクト以外のとき、例外
                        throw new Error('for Array/Object only');
                    case 'object':
                        if (value === null) {
                            // 値がnull のとき、例外
                            throw new Error('for Array/Object only');
                        }
                        else if (value instanceof Array) {
                            // 値が単純配列のとき
                            var result_1 = [];
                            _.each(value, function (v) { result_1.push(v); });
                            return result_1;
                        }
                        else {
                            // 値がobjectのとき
                            var result_2 = {};
                            _.each(value, function (v, k) { result_2[k] = v; });
                            return result_2;
                        }
                    default:
                        Fw.Util.Dump.Log('想定外の渡し値');
                        Fw.Util.Dump.Log(value);
                        throw new Error('想定外の渡し値');
                }
            };
            Obj.Clean = function (obj) {
                _.delay(function () {
                    var header = obj.ClassName + "[" + obj.InstanceId + "]:: ";
                    Util.Dump.Log(header + 'Obj.Clean');
                    _.each(obj, function (v, k) {
                        if (k === '_className' || k === '_instanceId')
                            return;
                        obj[k] = undefined;
                    });
                }, 500);
            };
            return Obj;
        }());
        Util.Obj = Obj;
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="Obj.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var Obj = Fw.Util.Obj;
        var LogMode;
        (function (LogMode) {
            LogMode[LogMode["Console"] = 1] = "Console";
            LogMode[LogMode["Window"] = 2] = "Window";
        })(LogMode = Util.LogMode || (Util.LogMode = {}));
        var Dump = /** @class */ (function () {
            function Dump() {
            }
            Object.defineProperty(Dump, "LogMode", {
                get: function () {
                    return Dump._logMode;
                },
                set: function (value) {
                    var changed = (Dump._logMode !== value);
                    Dump._logMode = value;
                    if (changed) {
                        if (Dump._logMode === LogMode.Window) {
                            if (!Dump._logParams.isLogWindowReady)
                                Dump.InitLogWindow();
                            Dump.ShowLogWindow();
                        }
                        else {
                            Dump.HideLogWindow();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Dump.Log = function (value) {
                if (Dump._logMode === LogMode.Console) {
                    try {
                        console.log(Dump.GetTimestamp() + " :: " + Dump.GetDumpedString(value));
                    }
                    catch (e) {
                        // 引数の循環参照など
                        console.log(Dump.GetTimestamp() + " ::");
                        console.log(value);
                    }
                }
                else {
                    Dump.WriteObjectToLogWindow(value);
                }
            };
            Dump.ErrorLog = function (value, message) {
                if (Dump._logMode === LogMode.Console) {
                    console.log('');
                    console.log('########################################');
                    console.log('########################################');
                    console.log(Dump.GetTimestamp() + " :: ERROR!! " + (message ? '[ ' + message + ' ]' : ''));
                    console.log(value);
                }
                else {
                    Dump.WriteObjectToLogWindow("ERROR!! " + (message ? '[ ' + message + ' ]' : ''));
                    Dump.WriteObjectToLogWindow(value);
                }
                // なぜか、Firefoxで例外オブジェクトがシリアライズ出来ず、例外も出ない。
                //try {
                //    console.log(Dump.GetDumpedString(value));
                //} catch (e) {
                //    console.log(value);
                //}
            };
            Dump.GetTimestamp = function () {
                var now = new Date();
                return ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2) + ":" + ('0' + now.getSeconds()).slice(-2) + "." + ('000' + now.getMilliseconds()).substr(-3);
            };
            Dump.GetDumpedString = function (value) {
                return _.isObject(value)
                    ? '\n' + JSON.stringify(Obj.FormatSilializable(value), null, "\t")
                    : String(value);
            };
            Dump.InitLogWindow = function () {
                var me = this, elmLogWindow = document.getElementById("DOBES_LOG"), body, parent, title;
                if (!elmLogWindow) {
                    //Bodyが取得できないことはあり得ない想定。
                    body = document.getElementsByTagName("body");
                    try {
                        elmLogWindow = document.createElement("div");
                        elmLogWindow.id = "DOBES_LOG";
                        parent = document.createElement("div");
                        title = document.createElement("div");
                        parent.style.zIndex = 99999999;
                        parent.id = "DOBES_LOG_WINDOW";
                        title.innerHTML =
                            "<div>"
                                + "<div style='float:left; width: 100px; text-align: left;'>"
                                + "<strong>LOG</strong>"
                                + "</div>"
                                + "<div style='float:left;'>"
                                + "</div>"
                                + "<div style='clear:both;'></div>"
                                + "</div>";
                        title.style.border = "2px solid #000000";
                        title.style.textAlign = "center";
                        title.style.padding = "4px";
                        title.style.backgroundColor = "#eeeeee";
                        var getMousePosition_1 = function (e) {
                            return (e ?
                                {
                                    x: e.pageX,
                                    y: e.pageY
                                }
                                : {
                                    x: 0,
                                    y: 0
                                });
                        };
                        title.onmousedown = function (e) {
                            var objPos = getMousePosition_1(e);
                            me._logParams.windowX = parseInt(parent.style.left.replace("px"), 10);
                            me._logParams.windowY = parseInt(parent.style.top.replace("px"), 10);
                            me._logParams.pointerX = objPos.x;
                            me._logParams.pointerY = objPos.y;
                            me._logParams.isLogWindowDraging = true;
                        };
                        title.ondblclick = function () {
                            me.HideLogWindow();
                        };
                        title.onmouseup = function () {
                            me._logParams.isLogWindowDraging = false;
                        };
                        body[0].onmousemove = function (e) {
                            if (!me._logParams.isLogWindowDraging) {
                                return;
                            }
                            var objPos = getMousePosition_1(e);
                            var addX = (objPos.x - me._logParams.pointerX);
                            var addY = (objPos.y - me._logParams.pointerY);
                            parent.style.left = (me._logParams.windowX + addX) + "px";
                            parent.style.top = (me._logParams.windowY + addY) + "px";
                        };
                        parent.appendChild(title);
                        parent.appendChild(elmLogWindow);
                        parent.style.position = "absolute";
                        parent.style.top = "5px";
                        parent.style.left = "5px";
                        body[0].insertBefore(parent, body[0].firstChild);
                    }
                    catch (e) {
                        alert("Log Window Create Fail. e:" + e.message);
                        return;
                    }
                }
                //旧IE対応めんどいのでTry-Catch
                try {
                    //表示位置・サイズセット
                    elmLogWindow.style.zIndex = "100";
                    elmLogWindow.style.border = "1px solid #000000";
                    elmLogWindow.style.width = "300px";
                    elmLogWindow.style.height = "700px";
                    elmLogWindow.style.fontSize = "9pt";
                    elmLogWindow.style.overflow = "scroll";
                    elmLogWindow.style.backgroundColor = "#ffffff";
                }
                catch (ex) {
                    console.log(ex);
                }
                Dump._logParams.isLogWindowReady = true;
            };
            Dump.ShowLogWindow = function () {
                var elmLogWindow = document.getElementById("DOBES_LOG");
                if (!elmLogWindow)
                    throw new Error('Log-Window not initialized.');
                try {
                    elmLogWindow = document.getElementById("DOBES_LOG_WINDOW");
                    elmLogWindow.style.visibility = "visible";
                    elmLogWindow.style.display = "block";
                }
                catch (ex) {
                    console.log(ex);
                }
            };
            Dump.HideLogWindow = function () {
                var elmLogWindow = document.getElementById("DOBES_LOG");
                if (!elmLogWindow)
                    return;
                try {
                    elmLogWindow = document.getElementById("DOBES_LOG_WINDOW");
                    elmLogWindow.style.visibility = "hidden";
                    elmLogWindow.style.display = "none";
                }
                catch (ex) {
                    console.log(ex);
                }
            };
            Dump.WriteToLogWindow = function (message) {
                var me = this;
                if (!Dump._logParams.isEnableLog)
                    return;
                if (!Dump._logParams.isLogWindowReady)
                    Dump.InitLogWindow();
                var date = new Date();
                try {
                    var objLog = document.getElementById("DOBES_LOG");
                    message = String(message);
                    var txtNode = document.createTextNode((Dump._logParams.isEnableTimeStamp ?
                        date.getHours()
                            + ":" + date.getMinutes()
                            + ":" + date.getSeconds()
                            + "." + date.getMilliseconds()
                            + " :: "
                        : "")
                        + message);
                    var br = document.createElement("br");
                    if (objLog.childNodes.length != 0) {
                        objLog.insertBefore(br, objLog.childNodes[0]);
                    }
                    else {
                        objLog.appendChild(br);
                    }
                    objLog.insertBefore(txtNode, objLog.childNodes[0]);
                }
                catch (e) {
                    console.log(e);
                }
            };
            Dump.WriteObjectToLogWindow = function (value) {
                Dump.WriteToLogWindow(JSON.stringify(Obj.FormatSilializable(value), null, "\t"));
            };
            Dump._logMode = LogMode.Console;
            Dump._logParams = {
                isLogWindowDraging: false,
                pointerX: null,
                pointerY: null,
                windowX: null,
                windowY: null,
                isEnableLog: true,
                isEnableTimeStamp: true,
                isLogWindowReady: false
            };
            return Dump;
        }());
        Util.Dump = Dump;
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../lib/jquery/index.d.ts" />
/// <reference path="../../lib/underscore/index.d.ts" />
/// <reference path="Util/Dump.ts" />
/* /// <reference path="Views/Root.ts" /> */
var Fw;
(function (Fw) {
    var Config = /** @class */ (function () {
        function Config() {
        }
        /**
         * @description Xhrクエリ時の基礎URL
         */
        Config.XhrBaseUrl = location.protocol
            + '//' + location.hostname
            + ':' + location.port
            + '/';
        /**
         * @description ページ用div.attr識別子
         */
        Config.PageIdAttribute = 'data-pageid';
        /**
         * @description 起動ページdiv.attr識別子
         * @see <div data-default="true"></div>
         */
        Config.DefaultPageAttribute = 'data-default';
        return Config;
    }());
    Fw.Config = Config;
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Config.ts" />
/// <reference path="../Util/Dump.ts" />
var Fw;
(function (Fw) {
    var Controllers;
    (function (Controllers) {
        var Manager = /** @class */ (function () {
            function Manager() {
                this._controllers = {};
            }
            Object.defineProperty(Manager, "Instance", {
                get: function () {
                    if (!Manager._instance) {
                        Manager._instance = new Manager();
                    }
                    return Manager._instance;
                },
                enumerable: true,
                configurable: true
            });
            Manager.prototype.Add = function (controller) {
                if (this._controllers[controller.Id])
                    throw new Error("Id[" + controller.Id + "] already exists");
                this._controllers[controller.Id] = controller;
            };
            Manager.prototype.Get = function (id) {
                if (!this._controllers[id]) {
                    alert("Controller Id[" + id + "] not found");
                    throw new Error("Controller Id[" + id + "] not found");
                }
                return this._controllers[id];
            };
            Manager.prototype.Remove = function (id) {
                if (!this._controllers[id])
                    throw new Error("Id[" + id + "] not found");
                delete this._controllers[id];
            };
            Manager.prototype.Reset = function (excludeController) {
                _.each(this._controllers, function (c) {
                    if (c !== excludeController) {
                        var page = c.View;
                        if (page.IsVisible) {
                            if (page.IsModal)
                                page.HideModal();
                            else
                                page.Hide();
                        }
                        if (page.IsMasked)
                            page.UnMask();
                    }
                });
            };
            Manager.prototype.Set = function (id) {
                var controller = this._controllers[id];
                if (!controller)
                    throw new Error("id not found: " + id);
                this.SetController(controller);
            };
            Manager.prototype.SetController = function (controller) {
                this.Reset(controller);
                controller.View.Show();
            };
            Manager.prototype.SetModal = function (id) {
                var controller = this._controllers[id];
                if (!controller)
                    throw new Error("id not found: " + id);
                _.each(this._controllers, function (c) {
                    if (c === controller || !c.View.IsVisible)
                        return;
                    if (!c.View.IsModal) {
                        c.View.Mask();
                    }
                    else {
                        c.View.HideModal();
                    }
                });
                controller.View.ShowModal();
            };
            Manager.prototype.HideModal = function (id) {
                var controller = this._controllers[id];
                if (!controller)
                    throw new Error("id not found: " + id);
                // 指定ID以外で、モーダルのPageが在るか否か
                var modalController = null;
                _.each(this._controllers, function (c) {
                    if (c === controller || !c.View.IsVisible)
                        return;
                    if (c.View.IsModal) {
                        modalController = c;
                    }
                    else {
                        c.View.UnMask();
                    }
                });
                controller.View.HideModal();
                // モーダルViewが残っている場合、マスク付き表示をやりなおす。
                if (modalController) {
                    modalController.ShowModal();
                }
            };
            Manager.prototype.SetUnmodal = function (id) {
                var controller = this._controllers[id];
                if (!controller)
                    throw new Error("id not found: " + id);
                this.Reset(controller);
                controller.View.SetUnmodal();
            };
            Manager._instance = null;
            return Manager;
        }());
        Controllers.Manager = Manager;
    })(Controllers = Fw.Controllers || (Fw.Controllers = {}));
})(Fw || (Fw = {}));
/// <reference path="../../lib/jquery/index.d.ts" />
/// <reference path="../../lib/underscore/index.d.ts" />
/// <reference path="../Fw/Util/Dump.ts" />
/// <reference path="../Fw/Controllers/Manager.ts" />
var App;
(function (App) {
    var Dump = Fw.Util.Dump;
    var Manager = Fw.Controllers.Manager;
    var Main = /** @class */ (function () {
        function Main() {
        }
        Main.StartUp = function () {
            // フレームワーク初期化
            Fw.Startup.Init();
            // ログ出力をウインドウ表示するとき。
            //Fw.Util.Dump.LogMode = Fw.Util.LogMode.Window;
            // API仕様に応じて、クエリ先URLの土台を作っておく。
            var proto = location.protocol;
            var host = location.hostname;
            var port = location.port;
            Fw.Config.XhrBaseUrl = proto + '//' + host + ':' + port + '/api/';
            App.Items.Lang.InitLang();
            var main = new App.Controllers.MainController();
            Manager.Instance.SetController(main);
            Dump.Log('Show');
        };
        return Main;
    }());
    App.Main = Main;
})(App || (App = {}));
// アプリケーションを起動する。
// 以下にはこれ以上書かないこと。
$(function () {
    Fw.Util.Dump.Log('Start');
    App.Main.StartUp();
});
/// <reference path="../../lib/jquery/index.d.ts" />
/// <reference path="../../lib/underscore/index.d.ts" />
/// <reference path="../../lib/jquery/index.d.ts" />
/// <reference path="../../lib/underscore/index.d.ts" />
/// <reference path="IObject.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var EventReference = /** @class */ (function () {
            function EventReference() {
            }
            return EventReference;
        }());
        Events.EventReference = EventReference;
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="./Dump.ts" />
/// <reference path="../ObjectBase.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var App = /** @class */ (function () {
            function App() {
            }
            App.CreateId = function () {
                var id;
                for (;;) {
                    id = new Date().getTime().toString(16)
                        + Math.floor(Math.random() * 1000).toString(16);
                    if (App._ids.indexOf(id) === -1)
                        break;
                }
                App._ids.push(id);
                return id;
            };
            App.Wait = function (msec) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve) {
                                setTimeout(function () {
                                    resolve(true);
                                }, msec);
                            })];
                    });
                });
            };
            App._ids = new Array();
            return App;
        }());
        Util.App = App;
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../lib/jquery/index.d.ts" />
/// <reference path="../../lib/underscore/index.d.ts" />
/// <reference path="IObject.ts" />
/// <reference path="Events/EventReference.ts" />
/// <reference path="Util/Dump.ts" />
/// <reference path="Util/App.ts" />
var Fw;
(function (Fw) {
    var Dump = Fw.Util.Dump;
    var ObjectBase = /** @class */ (function () {
        function ObjectBase() {
            this._isDisposed = false;
            this._instanceId = Fw.Util.App.CreateId();
            this.EnableLog = false;
        }
        Object.defineProperty(ObjectBase.prototype, "InstanceId", {
            get: function () {
                return this._instanceId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectBase.prototype, "IsDisposed", {
            get: function () {
                return this._isDisposed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectBase.prototype, "ClassName", {
            get: function () {
                return this._className;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectBase.prototype, "ObjectIdentifier", {
            get: function () {
                return "[" + this._className + "[" + this._instanceId + "]";
            },
            enumerable: true,
            configurable: true
        });
        ObjectBase.prototype.SetClassName = function (name) {
            this._className = name;
        };
        ObjectBase.prototype.Log = function (value) {
            if (!this.EnableLog)
                return;
            var header = this.ClassName + "[" + this.InstanceId + "]:: ";
            if (typeof value === 'object') {
                Dump.Log(header);
                Dump.Log(value);
            }
            else {
                Dump.Log(header + value);
            }
        };
        ObjectBase.prototype.Dispose = function () {
            this.Log("Dispose");
            // TODO: あとで戻す。デバッグ用。
            //this._className = null;
            //this._instanceId = null;
            this._isDisposed = true;
            Fw.Util.Obj.Clean(this);
        };
        return ObjectBase;
    }());
    Fw.ObjectBase = ObjectBase;
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var EventableEventsClass = /** @class */ (function () {
            function EventableEventsClass() {
            }
            return EventableEventsClass;
        }());
        Events.EventableEventsClass = EventableEventsClass;
        Events.EventableEvents = new EventableEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../lib/jquery/index.d.ts" />
/// <reference path="../../lib/underscore/index.d.ts" />
/// <reference path="IEventable.ts" />
/// <reference path="ObjectBase.ts" />
/// <reference path="Events/EventReference.ts" />
/// <reference path="Util/Dump.ts" />
/// <reference path="Events/EventableEvents.ts" />
var Fw;
(function (Fw) {
    var Dump = Fw.Util.Dump;
    var EventReference = Fw.Events.EventReference;
    var EventableBase = /** @class */ (function (_super) {
        __extends(EventableBase, _super);
        function EventableBase() {
            var _this = _super.call(this) || this;
            _this._suppressedEvents = new Array();
            _this._eventHandlers = new Array();
            return _this;
        }
        EventableBase.prototype.AddEventListener = function (name, handler, bindObject) {
            if (bindObject === void 0) { bindObject = null; }
            if (!bindObject)
                bindObject = this;
            var eRef = new EventReference();
            eRef.Name = name;
            eRef.Handler = handler;
            eRef.BindedHandler = handler.bind(bindObject);
            eRef.BindObject = bindObject;
            this.Log("AddEventListener: " + eRef.BindObject.ClassName + "_" + eRef.BindObject.InstanceId + "." + name);
            this._eventHandlers.push(eRef);
            //this.Elem.on(eRef.Name, eRef.BindedHandler);
        };
        EventableBase.prototype.RemoveEventListener = function (name, handler, bindObject) {
            var _this = this;
            if (bindObject === void 0) { bindObject = null; }
            if (!bindObject)
                bindObject = this;
            if (handler) {
                // handlerが指定されているとき
                // 特定のイベントハンドラのみを削除する。
                var key_1;
                var eRef = _.find(this._eventHandlers, function (er, idx) {
                    key_1 = idx;
                    // 関数は継承関係のプロトタイプ参照都合で同一オブジェクトになりやすいため、
                    // 判定基準にならない。
                    //return (er.Name === name && er.Handler === handler);
                    _this.Log("RemoveEventListener: " + er.BindObject.ClassName + "_" + er.BindObject.InstanceId + "." + name + " :: " + bindObject.ClassName + "." + bindObject.InstanceId);
                    return (er.Name === name
                        && er.Handler === handler
                        && er.BindObject === bindObject);
                });
                if (!eRef) {
                    //throw new Error(`${this.ClassName}.${name} event not found.`);
                    Dump.Log(this.ClassName + "." + name + " event not found.");
                }
                //this.Elem.off(eRef.Name, eRef.BindedHandler);
                this._eventHandlers.splice(key_1, 1);
            }
            else {
                // handlerが指定されないとき
                // bindObjectの全てのイベントハンドラを削除する。
                var eRefs_1 = new Array();
                _.each(this._eventHandlers, function (er) {
                    if (er.Name === name
                        && er.BindObject === bindObject) {
                        eRefs_1.push(er);
                    }
                });
                _.each(eRefs_1, function (eRef) {
                    //this.Elem.off(eRef.Name, eRef.BindedHandler);
                    var idx = _this._eventHandlers.indexOf(eRef);
                    _this._eventHandlers.splice(idx, 1);
                });
            }
        };
        EventableBase.prototype.DispatchEvent = function (name, params) {
            if (params === void 0) { params = null; }
            if (this.IsSuppressedEvent(name))
                return;
            this.Log("DispatchEvent: " + name);
            var eo = new Fw.Events.EventObject(this, name, params);
            _.each(this._eventHandlers, function (er) {
                if (er.Name === name) {
                    try {
                        er.BindedHandler(eo);
                    }
                    catch (e) {
                        Dump.ErrorLog(e);
                    }
                }
            });
        };
        EventableBase.prototype.SuppressEvent = function (name) {
            if (this.IsSuppressedEvent(name))
                return;
            this._suppressedEvents.push(name);
        };
        EventableBase.prototype.IsSuppressedEvent = function (name) {
            return (this._suppressedEvents.indexOf(name) !== -1);
        };
        EventableBase.prototype.ResumeEvent = function (name) {
            if (!this.IsSuppressedEvent(name))
                return;
            var idx = this._suppressedEvents.indexOf(name);
            this._suppressedEvents.splice(idx, 1);
        };
        EventableBase.prototype.Dispose = function () {
            _super.prototype.Dispose.call(this);
            this._eventHandlers = null;
            this._suppressedEvents = null;
        };
        return EventableBase;
    }(Fw.ObjectBase));
    Fw.EventableBase = EventableBase;
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="EventableEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var RootEventsClass = /** @class */ (function (_super) {
            __extends(RootEventsClass, _super);
            function RootEventsClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.PageInitializeStarted = 'PageInitializeStarted';
                _this.PageInitializeCompleted = 'PageInitializeCompleted';
                _this.Resized = 'Resized';
                _this.MaskClicked = 'MaskClicked';
                return _this;
            }
            return RootEventsClass;
        }(Events.EventableEventsClass));
        Events.RootEventsClass = RootEventsClass;
        Events.RootEvents = new RootEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="EventableEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var ViewEventsClass = /** @class */ (function (_super) {
            __extends(ViewEventsClass, _super);
            function ViewEventsClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Shown = 'Shown';
                _this.Hidden = 'Hidden';
                _this.Attached = 'Attached';
                _this.Detached = 'Detached';
                _this.SizeChanged = 'SizeChanged';
                _this.PositionChanged = 'PositionChanged';
                _this.PositionPolicyChanged = 'PositionPolicyChanged';
                _this.AnchorChanged = 'AnchorChanged';
                _this.Initialized = 'Initialized';
                return _this;
            }
            return ViewEventsClass;
        }(Events.EventableEventsClass));
        Events.ViewEventsClass = ViewEventsClass;
        Events.ViewEvents = new ViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="./Dump.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var Num = /** @class */ (function () {
            function Num() {
            }
            /**
             * @see ビルトインisNaNでは、isNaN(null) === true になってしまう。
             * @param value
             */
            Num.IsNaN = function (value) {
                return (value !== value);
            };
            return Num;
        }());
        Util.Num = Num;
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Events/ViewEvents.ts" />
/// <reference path="../../Util/Dump.ts" />
/// <reference path="../../Util/Num.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            var Events = Fw.Events.ViewEvents;
            var Num = Fw.Util.Num;
            var Size = /** @class */ (function () {
                function Size(view) {
                    if (view === void 0) { view = null; }
                    this._view = null;
                    this._width = 0;
                    this._height = 0;
                    this._view = view;
                }
                Object.defineProperty(Size.prototype, "Width", {
                    get: function () {
                        return this._width;
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = (this._width !== value);
                        this._width = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.SizeChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Size.prototype, "Height", {
                    get: function () {
                        return this._height;
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = (this._height !== value);
                        this._height = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.SizeChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Size.prototype.Dispose = function () {
                    this._view = null;
                    this._width = null;
                    this._height = null;
                };
                return Size;
            }());
            Property.Size = Size;
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../lib/jquery/index.d.ts" />
/// <reference path="../../lib/underscore/index.d.ts" />
/// <reference path="EventableBase.ts" />
/// <reference path="Events/RootEvents.ts" />
/// <reference path="Util/Dump.ts" />
/// <reference path="Views/Property/Size.ts" />
var Fw;
(function (Fw) {
    var Events = Fw.Events.RootEvents;
    var Property = Fw.Views.Property;
    var Root = /** @class */ (function (_super) {
        __extends(Root, _super);
        function Root(jqueryElem) {
            var _this = _super.call(this) || this;
            _this._viewRefreshInterval = 3000;
            _this._releaseInitialized = false;
            _this.SetClassName('Root');
            _this._elem = jqueryElem;
            _this._dom = jqueryElem.get(0);
            _this._size = new Property.Size();
            _this._size.Width = _this.Elem.width();
            _this._size.Height = _this.Elem.height();
            _this._masked = false;
            var $window = $(window);
            $window.on('resize', function () {
                _.defer(function () {
                    _this.Refresh();
                    _this.DispatchEvent(Events.Resized);
                });
            });
            _this._renderInitializer = new Fw.Util.DelayedOnceExecuter(_this, function () {
                _this._viewRefreshInterval = 30;
                _this._releaseInitialized = true;
                _this.DispatchEvent(Events.PageInitializeCompleted);
                //Dump.Log('Root.ReleasePageInitialize - Released');
            }, 300, -1, true);
            _this._renderInitializer.Name = 'RenderInitializer';
            _this._refresher = new Fw.Util.DelayedOnceExecuter(_this, _this.InnerRefresh.bind(_this), 100, 300, true);
            _this._refresher.Name = 'Refresher';
            // Root.Init()の終了後にViewBaseからFw.Root.Instanceを呼び出す。
            _.defer(function () {
                _this._mask = new Fw.Views.BoxView();
                _this._mask.Elem.removeClass('TransAnimation');
                _this._mask.Elem.addClass('RootMask');
                _this._mask.HasBorder = false;
                _this._mask.BackgroundColor = '#000000';
                _this._mask.ZIndex = -1;
                // RootはIViewでないので、this.Addは出来ない。
                _this.Elem.append(_this._mask.Elem);
                _this._mask.Elem.on('click touchend', function () {
                    _this.DispatchEvent(Events.MaskClicked);
                });
                _this.Refresh();
            });
            return _this;
        }
        Object.defineProperty(Root, "Instance", {
            get: function () {
                if (!Root._instance) {
                    throw new Error('Root.Init() has not been executed.');
                }
                return Root._instance;
            },
            enumerable: true,
            configurable: true
        });
        Root.Init = function (selectorString) {
            Root._instance = new Root($(selectorString));
        };
        Object.defineProperty(Root.prototype, "Elem", {
            get: function () {
                return this._elem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Root.prototype, "Dom", {
            get: function () {
                return this._dom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Root.prototype, "Size", {
            get: function () {
                return this._size;
            },
            enumerable: true,
            configurable: true
        });
        Root.prototype.Mask = function () {
            //this.Log(`${this.ClassName}.Mask`);
            this._masked = true;
            this.Refresh();
        };
        Root.prototype.UnMask = function () {
            //this.Log(`${this.ClassName}.UnMask`);
            this._masked = false;
            this.Refresh();
        };
        Root.prototype.SetTextSelection = function (enable) {
            if (enable && this.Elem.hasClass('TextUnselect'))
                this.Elem.removeClass('TextUnselect');
            else if (!enable && !this.Elem.hasClass('TextUnselect'))
                this.Elem.addClass('TextUnselect');
        };
        Object.defineProperty(Root.prototype, "ViewRefreshInterval", {
            get: function () {
                return this._viewRefreshInterval;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @description ページ生成開始から一定時間、ViewのDom更新頻度を大幅に下げる。
         */
        Root.prototype.StartPageInitialize = function () {
            // ViewのDom更新を抑止する。
            this._releaseInitialized = false;
            this._viewRefreshInterval = 3000;
            this.DispatchEvent(Events.PageInitializeStarted);
            //Dump.Log('Root.StartPageInitialize');
        };
        Root.prototype.ReleasePageInitialize = function (view) {
            if (this._releaseInitialized)
                return;
            //this.Log('Root.ReleasePageInitialize: ' + view.ObjectIdentifier);
            this._renderInitializer.Exec();
        };
        Root.prototype.Refresh = function () {
            // this.Sizeのセッターが無いので、フィールドに直接書き込む。
            this._size.Width = this.Elem.width();
            this._size.Height = this.Elem.height();
            this._refresher.Exec();
        };
        Root.prototype.InnerRefresh = function () {
            // this.Sizeのセッターが無いので、フィールドに直接書き込む。
            this._size.Width = this.Elem.width();
            this._size.Height = this.Elem.height();
            if (this._mask) {
                this._mask.SetSize(this._size.Width, this._size.Height);
                if (this._masked) {
                    this._mask.ZIndex = 0;
                    this._mask.Opacity = 0.4;
                }
                else {
                    this._mask.ZIndex = -1;
                    this._mask.Opacity = 0.0;
                }
            }
        };
        Root.prototype.Dispose = function () {
            _super.prototype.Dispose.call(this);
            this._dom = null;
            this._size.Dispose();
            this._size = null;
        };
        Root._instance = null;
        return Root;
    }(Fw.EventableBase));
    Fw.Root = Root;
})(Fw || (Fw = {}));
/// <reference path="../../lib/jquery/index.d.ts" />
/// <reference path="../../lib/underscore/index.d.ts" />
/// <reference path="Util/Dump.ts" />
/* /// <reference path="Views/Root.ts" /> */
var Fw;
(function (Fw) {
    var Startup = /** @class */ (function () {
        function Startup() {
        }
        Startup.Init = function () {
            // ↓API仕様に応じて、App.Mainで書き換える。
            Fw.Config.XhrBaseUrl
                = location.protocol
                    + '//' + location.hostname
                    + ':' + location.port
                    + '/';
            // iOSの全体スクロール対策
            $(window).on('touchmove', function (e) {
                e.preventDefault();
            });
            $(document.body).on('touchmove', function (e) {
                e.preventDefault();
            });
            $('div.body-content').on('touchmove', function (e) {
                e.preventDefault();
            });
            // 画面全体のコンテナを初期化
            Fw.Root.Init('div.body-content');
        };
        return Startup;
    }());
    Fw.Startup = Startup;
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Events/ViewEvents.ts" />
/// <reference path="../../Util/Dump.ts" />
/// <reference path="../../Util/Num.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            var Events = Fw.Events.ViewEvents;
            var Num = Fw.Util.Num;
            var Anchor = /** @class */ (function () {
                function Anchor(view) {
                    if (view === void 0) { view = null; }
                    this._view = null;
                    this._isAnchoredTop = false;
                    this._marginTop = 0;
                    this._isAnchoredLeft = false;
                    this._marginLeft = 0;
                    this._isAnchoredRight = false;
                    this._marginRight = 0;
                    this._isAnchoredBottom = false;
                    this._marginBottom = 0;
                    this._hasAnchorX = false;
                    this._hasAnchorY = false;
                    this._view = view;
                }
                Object.defineProperty(Anchor.prototype, "IsAnchoredTop", {
                    get: function () {
                        return this._isAnchoredTop;
                    },
                    set: function (value) {
                        // null, undefinedは例外
                        if (value === undefined || value === null)
                            throw new Error("value type not allowed");
                        var changed = (this._isAnchoredTop !== value);
                        this._isAnchoredTop = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.AnchorChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Anchor.prototype, "MarginTop", {
                    get: function () {
                        return this._marginTop;
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = (this._marginTop !== value);
                        this._marginTop = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.AnchorChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Anchor.prototype, "IsAnchoredLeft", {
                    get: function () {
                        return this._isAnchoredLeft;
                    },
                    set: function (value) {
                        // null, undefinedは例外
                        if (value === undefined || value === null)
                            throw new Error("value type not allowed");
                        var changed = (this._isAnchoredLeft !== value);
                        this._isAnchoredLeft = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.AnchorChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Anchor.prototype, "MarginLeft", {
                    get: function () {
                        return this._marginLeft;
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = (this._marginLeft !== value);
                        this._marginLeft = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.AnchorChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Anchor.prototype, "IsAnchoredRight", {
                    get: function () {
                        return this._isAnchoredRight;
                    },
                    set: function (value) {
                        // null, undefinedは例外
                        if (value === undefined || value === null)
                            throw new Error("value type not allowed");
                        var changed = (this._isAnchoredRight !== value);
                        this._isAnchoredRight = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.AnchorChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Anchor.prototype, "MarginRight", {
                    get: function () {
                        return this._marginRight;
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = (this._marginRight !== value);
                        this._marginRight = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.AnchorChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Anchor.prototype, "IsAnchoredBottom", {
                    get: function () {
                        return this._isAnchoredBottom;
                    },
                    set: function (value) {
                        // null, undefinedは例外
                        if (value === undefined || value === null)
                            throw new Error("value type not allowed");
                        var changed = (this._isAnchoredBottom !== value);
                        this._isAnchoredBottom = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.AnchorChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Anchor.prototype, "MarginBottom", {
                    get: function () {
                        return this._marginBottom;
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = (this._marginBottom !== value);
                        this._marginBottom = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.AnchorChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Anchor.prototype, "HasAnchorX", {
                    get: function () {
                        return this._hasAnchorX;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Anchor.prototype, "HasAnchorY", {
                    get: function () {
                        return this._hasAnchorY;
                    },
                    enumerable: true,
                    configurable: true
                });
                Anchor.prototype.SetHasAnchor = function (hasAnchorX, hasAnchorY) {
                    this._hasAnchorX = hasAnchorX;
                    this._hasAnchorY = hasAnchorY;
                };
                Anchor.prototype.Dispose = function () {
                    this._view = null;
                    this._isAnchoredTop = null;
                    this._isAnchoredLeft = null;
                    this._isAnchoredRight = null;
                    this._isAnchoredBottom = null;
                    this._marginTop = null;
                    this._marginLeft = null;
                    this._marginRight = null;
                    this._marginBottom = null;
                };
                return Anchor;
            }());
            Property.Anchor = Anchor;
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../IEventable.ts" />
/// <reference path="Property/Anchor.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../IObject.ts" />
/// <reference path="../Views/IView.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="IController.ts" />
/// <reference path="../ObjectBase.ts" />
/// <reference path="../Config.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="Manager.ts" />
var Fw;
(function (Fw) {
    var Controllers;
    (function (Controllers) {
        var ControllerBase = /** @class */ (function (_super) {
            __extends(ControllerBase, _super);
            function ControllerBase(id) {
                var _this = _super.call(this) || this;
                _this.SetClassName('ControllerBase');
                if (!id)
                    id = Fw.Util.App.CreateId();
                _this._id = id;
                _this.IsDefaultView = false;
                _this._view = null;
                _this._manager = Fw.Controllers.Manager.Instance;
                _this._manager.Add(_this);
                return _this;
                //this.EnableLog = true;
            }
            Object.defineProperty(ControllerBase.prototype, "Id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ControllerBase.prototype, "View", {
                get: function () {
                    return this._view;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ControllerBase.prototype, "Manager", {
                get: function () {
                    return this._manager;
                },
                enumerable: true,
                configurable: true
            });
            ControllerBase.prototype.SetPageView = function (view) {
                this._view = view;
            };
            ControllerBase.prototype.Show = function () {
                this.Manager.SetController(this);
            };
            ControllerBase.prototype.Hide = function () {
                this.View.Hide();
            };
            ControllerBase.prototype.ShowModal = function () {
                this.Manager.SetModal(this.Id);
            };
            ControllerBase.prototype.HideModal = function () {
                this.Manager.HideModal(this.Id);
            };
            ControllerBase.prototype.ToUnmodal = function () {
                this.Manager.SetUnmodal(this.Id);
            };
            // ↓Showメソッドに移行。
            // ↓呼び出されたコントローラ側で、呼び出しタイミングが分かりにくいので。
            //public SwitchTo(id: string): void {
            //    this.Manager.Set(id);
            //}
            //public SwitchController(controller: IController): void {
            //    this.Manager.SetController(controller);
            //}
            ControllerBase.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
                this._manager.Remove(this.Id);
                this._view.Dispose();
                this._view = null;
                this._id = null;
                this.IsDefaultView = null;
                this._manager = null;
            };
            return ControllerBase;
        }(Fw.ObjectBase));
        Controllers.ControllerBase = ControllerBase;
    })(Controllers = Fw.Controllers || (Fw.Controllers = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var BoxViewEventsClass = /** @class */ (function (_super) {
            __extends(BoxViewEventsClass, _super);
            function BoxViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BoxViewEventsClass;
        }(Events.ViewEventsClass));
        Events.BoxViewEventsClass = BoxViewEventsClass;
        Events.BoxViewEvents = new BoxViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="BoxViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var ControlViewEventsClass = /** @class */ (function (_super) {
            __extends(ControlViewEventsClass, _super);
            function ControlViewEventsClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.SingleClick = 'SingleClick';
                _this.LongClick = 'LongClick';
                return _this;
            }
            return ControlViewEventsClass;
        }(Events.BoxViewEventsClass));
        Events.ControlViewEventsClass = ControlViewEventsClass;
        Events.ControlViewEvents = new ControlViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="EventableEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var EntityEventsClass = /** @class */ (function (_super) {
            __extends(EntityEventsClass, _super);
            function EntityEventsClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Changed = 'Changed';
                return _this;
            }
            return EntityEventsClass;
        }(Events.EventableEventsClass));
        Events.EntityEventsClass = EntityEventsClass;
        Events.EntityEvents = new EntityEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ControlViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var ButtonViewEventsClass = /** @class */ (function (_super) {
            __extends(ButtonViewEventsClass, _super);
            function ButtonViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ButtonViewEventsClass;
        }(Events.ControlViewEventsClass));
        Events.ButtonViewEventsClass = ButtonViewEventsClass;
        Events.ButtonViewEvents = new ButtonViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            /**
             * @description background-size
             */
            var FitPolicy;
            (function (FitPolicy) {
                /**
                 * 自動(と、containの違いがいまいちわからん)
                 */
                FitPolicy["Auto"] = "auto";
                /**
                 * コンテンツを全て表示しきる、最大サイズ
                 */
                FitPolicy["Contain"] = "contain";
                /**
                 * 枠に合わせてコンテンツの上下をカットした最大サイズ
                 */
                FitPolicy["Cover"] = "cover";
            })(FitPolicy = Property.FitPolicy || (Property.FitPolicy = {}));
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var PageViewEventsClass = /** @class */ (function (_super) {
            __extends(PageViewEventsClass, _super);
            function PageViewEventsClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Dragging = 'Dragging';
                return _this;
            }
            return PageViewEventsClass;
        }(Events.ViewEventsClass));
        Events.PageViewEventsClass = PageViewEventsClass;
        Events.PageViewEvents = new PageViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Util/Dump.ts" />
/*/// <reference path="../IView.ts" />*/
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Animation;
        (function (Animation) {
            var Params = /** @class */ (function () {
                function Params() {
                    this.X = 0;
                    this.Y = 0;
                    this.Width = 0;
                    this.Height = 0;
                    this.Opacity = 1;
                }
                Params.GetCurrent = function (view) {
                    var result = new Params();
                    result.X = 0; // このX,Yは増分を指定するもののため、現時点の座標は X=0, Y= 0
                    result.Y = 0;
                    result.Width = view.Size.Width;
                    result.Height = view.Size.Height;
                    result.Opacity = Number(view.Opacity || 1);
                    return result;
                };
                Params.GetResized = function (view, resizeRate) {
                    var result = new Params();
                    result.X = 0;
                    result.Y = 0;
                    result.Width = (view.Size.Width * resizeRate);
                    result.Height = (view.Size.Height * resizeRate);
                    result.Opacity = 0.0;
                    return result;
                };
                Params.GetSlided = function (view, xRate, yRate) {
                    if (xRate === void 0) { xRate = 0; }
                    if (yRate === void 0) { yRate = 0; }
                    var result = new Params();
                    var width = view.Size.Width;
                    var height = view.Size.Height;
                    result.X = (width * xRate);
                    result.Y = (height * yRate);
                    result.Width = width;
                    result.Height = height;
                    result.Opacity = 0.8;
                    return result;
                };
                return Params;
            }());
            Animation.Params = Params;
        })(Animation = Views.Animation || (Views.Animation = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Util/Dump.ts" />
/// <reference path="Params.ts" />
/*/// <reference path="../IView.ts" /> */
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Animation;
        (function (Animation) {
            var Animator = /** @class */ (function () {
                function Animator(view, toParams) {
                    this.FromParams = null;
                    this.ToParams = null;
                    this.OnComplete = null;
                    this._view = view;
                    this.FromParams = Animation.Params.GetCurrent(view);
                    this.ToParams = (toParams)
                        ? toParams
                        : Animation.Params.GetCurrent(view);
                }
                Animator.prototype.Invoke = function (duration) {
                    var _this = this;
                    if (duration === void 0) { duration = 200; }
                    if (!duration)
                        duration = 200;
                    if (!this.FromParams)
                        this.FromParams = Animation.Params.GetCurrent(this._view);
                    var parent = $(this._view.Elem.parent());
                    var parentWidth = (this._view.Parent)
                        ? this._view.Parent.Size.Width
                        : parent.width();
                    var parentHeight = (this._view.Parent)
                        ? this._view.Parent.Size.Height
                        : parent.height();
                    var pHalfWidth = (parentWidth / 2);
                    var pHalfHeight = (parentHeight / 2);
                    var dom = this._view.Elem.get(0);
                    var fromX = this._view.Position.X + this.FromParams.X;
                    var fromY = this._view.Position.Y + this.FromParams.Y;
                    var fromLeft = pHalfWidth + fromX - (this.FromParams.Width / 2);
                    var fromTop = pHalfHeight + fromY - (this.FromParams.Height / 2);
                    var toX = this._view.Position.X + this.ToParams.X;
                    var toY = this._view.Position.Y + this.ToParams.Y;
                    var toLeft = pHalfWidth + toX - (this.ToParams.Width / 2);
                    var toTop = pHalfHeight + toY - (this.ToParams.Height / 2);
                    var hasTransAnimation = this._view.HasTransAnimation();
                    //Dump.Log({
                    //    name: 'center',
                    //    pHalfWidth: pHalfWidth,
                    //    pHalfHeight: pHalfHeight,
                    //    currentX: this._view.Position.X,
                    //    currentY: this._view.Position.Y,
                    //});
                    //Dump.Log({
                    //    name: 'from',
                    //    addX: this.FromParams.X,
                    //    addY: this.FromParams.Y,
                    //    x: fromX,
                    //    y: fromY,
                    //    left: fromLeft,
                    //    top: fromTop,
                    //    width: this.FromParams.Width,
                    //    height: this.FromParams.Height
                    //});
                    //Dump.Log({
                    //    name: 'to',
                    //    addX: this.ToParams.X,
                    //    addY: this.ToParams.Y,
                    //    x: toX,
                    //    y: toY,
                    //    left: toLeft,
                    //    top: toTop,
                    //    width: this.ToParams.Width,
                    //    height: this.ToParams.Height
                    //});
                    // アニメーション開始時点の値をセット
                    dom.style.display = "block";
                    dom.style.position = "absolute";
                    dom.style.left = fromLeft + "px";
                    dom.style.top = fromTop + "px";
                    dom.style.width = this.FromParams.Width + "px";
                    dom.style.height = this.FromParams.Height + "px";
                    dom.style.opacity = "" + this.FromParams.Opacity;
                    if (hasTransAnimation)
                        this._view.SetTransAnimation(false);
                    // アニメーション終了時点の値をセット
                    this._view.Elem.animate({
                        'left': toLeft + "px",
                        'top': toTop + "px",
                        'width': this.ToParams.Width + "px",
                        'height': this.ToParams.Height + "px",
                        'opacity': this.ToParams.Opacity
                    }, {
                        'duration': duration,
                        'complete': function () {
                            if (hasTransAnimation)
                                _this._view.SetTransAnimation(true);
                            if (_.isFunction(_this.OnComplete))
                                _this.OnComplete();
                        }
                    });
                };
                Animator.prototype.Dispose = function () {
                    this._view = null;
                    this.FromParams = null;
                    this.ToParams = null;
                    this.OnComplete = null;
                };
                return Animator;
            }());
            Animation.Animator = Animator;
        })(Animation = Views.Animation || (Views.Animation = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="IView.ts" />
/// <reference path="../EventableBase.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="../Events/ViewEvents.ts" />
/// <reference path="../Events/RootEvents.ts" />
/// <reference path="Animation/Animator.ts" />
/// <reference path="Animation/Params.ts" />
/// <reference path="Property/Size.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Property = Fw.Views.Property;
        var Anim = Fw.Views.Animation;
        var Events = Fw.Events.ViewEvents;
        var RootEvents = Fw.Events.RootEvents;
        var ViewBase = /** @class */ (function (_super) {
            __extends(ViewBase, _super);
            function ViewBase(jqueryElem) {
                var _this = _super.call(this) || this;
                _this._dom = null;
                _this._zIndex = 0;
                _this._color = '#000000';
                _this._backgroundColor = '#FFFFFF';
                _this._opacity = 1.0;
                _this._isVisible = true;
                _this._isInitialized = false;
                _this._isSuppressLayout = false;
                _this._removeAnimatedClass = null;
                /**
                 * デバッグ用 - 所属元文字列を再帰的に取得する
                 * @param current
                 * @param obj
                 */
                _this._parentString = null;
                _this._innerApplyCount = 0;
                _this._latestStyles = {};
                _this._newStyles = {};
                //this.Log('ViewBase.Constructor');
                _this.SetElem(jqueryElem);
                _this.SetClassName('ViewBase');
                _this.Elem.addClass('IView TransAnimation');
                _this._children = new Array();
                _this._size = new Property.Size(_this);
                _this._position = new Property.Position(_this);
                _this._anchor = new Property.Anchor(_this);
                _this._page = null;
                _this._parent = null;
                _this._color = '#000000';
                _this._size.Width = _this.Elem.width();
                _this._size.Height = _this.Elem.height();
                _this._refresher = new Fw.Util.DelayedOnceExecuter(_this, _this.InnerRefresh.bind(_this), 10, 3000 //Fw.Root.Instance.ViewRefreshInterval
                , true);
                _this._refresher.Name = 'Refresher';
                _this._applyStyler = new Fw.Util.DelayedOnceExecuter(_this, _this.InnerApplyStyles.bind(_this), 10, 3000 //Fw.Root.Instance.ViewRefreshInterval
                , true);
                _this._applyStyler.Name = 'ApplyStyler';
                _this.AddEventListener(Events.SizeChanged, function (e) {
                    _this.Refresh();
                });
                _this.AddEventListener(Events.PositionChanged, function (e) {
                    _this.Refresh();
                });
                _this.AddEventListener(Events.AnchorChanged, function (e) {
                    _this.Refresh();
                });
                _this.AddEventListener(Events.Attached, function (e) {
                    _this.InitPage();
                    _this.InitHasAnchor();
                });
                _this.AddEventListener(Events.Detached, function (e) {
                    _this._page = null;
                    _this.InitHasAnchor();
                });
                _this.AddEventListener(Events.Initialized, function (e) {
                    _this.InitPage();
                    _this.InitHasAnchor();
                });
                Fw.Root.Instance.AddEventListener(RootEvents.PageInitializeStarted, function () {
                    _this._refresher.Timeout = Fw.Root.Instance.ViewRefreshInterval;
                    _this._applyStyler.Timeout = Fw.Root.Instance.ViewRefreshInterval;
                }, _this);
                Fw.Root.Instance.AddEventListener(RootEvents.PageInitializeCompleted, function () {
                    _this._refresher.Timeout = Fw.Root.Instance.ViewRefreshInterval;
                    _this._applyStyler.Timeout = Fw.Root.Instance.ViewRefreshInterval;
                }, _this);
                _.delay(function () {
                    if (_this.IsDisposed !== false)
                        return;
                    _this._refresher.Timeout = Fw.Root.Instance.ViewRefreshInterval;
                    _this._applyStyler.Timeout = Fw.Root.Instance.ViewRefreshInterval;
                }, 3000);
                // 初期化終了イベント
                if (!_this._isInitialized) {
                    _this._isInitialized = true;
                    _this.DispatchEvent(Events.Initialized);
                    _this.Refresh();
                }
                return _this;
            }
            Object.defineProperty(ViewBase.prototype, "Elem", {
                get: function () {
                    return this._elem;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "Dom", {
                get: function () {
                    return this._dom;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "Page", {
                get: function () {
                    return this._page;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "Parent", {
                get: function () {
                    return this._parent;
                },
                set: function (value) {
                    this._parent = value;
                },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(ViewBase.prototype, "Children", {
                get: function () {
                    return this._children;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "Size", {
                get: function () {
                    return this._size;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "Position", {
                get: function () {
                    return this._position;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "Anchor", {
                get: function () {
                    return this._anchor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "ZIndex", {
                get: function () {
                    return this._zIndex;
                },
                set: function (value) {
                    this._zIndex = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "Color", {
                get: function () {
                    return this._color;
                },
                set: function (value) {
                    this._color = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "BackgroundColor", {
                get: function () {
                    return this._backgroundColor;
                },
                set: function (value) {
                    this._backgroundColor = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "Opacity", {
                get: function () {
                    return this._opacity;
                },
                set: function (value) {
                    this._opacity = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "IsVisible", {
                get: function () {
                    return this._isVisible;
                },
                set: function (value) {
                    this._isVisible = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "IsInitialized", {
                get: function () {
                    return this._isInitialized;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ViewBase.prototype, "IsSuppressLayout", {
                get: function () {
                    return this._isSuppressLayout;
                },
                enumerable: true,
                configurable: true
            });
            ViewBase.prototype.SetElem = function (jqueryElem) {
                if (!jqueryElem)
                    return;
                if (this._elem)
                    this._elem.remove();
                this._elem = jqueryElem;
                this._dom = jqueryElem.get(0);
            };
            ViewBase.prototype.InitPage = function () {
                //this.Log('ViewBase.InitPage');
                var get = function (view) {
                    if (!view)
                        return null;
                    else if (view instanceof Views.PageView)
                        return view;
                    else
                        return get(view.Parent);
                };
                this._page = get(this);
            };
            ViewBase.prototype.SetParent = function (parent) {
                //this.Log('ViewBase.SetParent');
                this._parent = parent;
            };
            ViewBase.prototype.SetSize = function (width, height) {
                //this.Log('ViewBase.SetSize');
                this.Size.Width = width;
                this.Size.Height = height;
            };
            ViewBase.prototype.SetXY = function (x, y, updatePolicy) {
                //this.Log('ViewBase.SetXY');
                if (updatePolicy === void 0) { updatePolicy = true; }
                if (updatePolicy)
                    this.Position.Policy = Property.PositionPolicy.Centering;
                this.Position.X = x;
                this.Position.Y = y;
            };
            ViewBase.prototype.SetLeftTop = function (left, top, updatePolicy) {
                //this.Log('ViewBase.SetLeftTop');
                if (updatePolicy === void 0) { updatePolicy = true; }
                if (updatePolicy)
                    this.Position.Policy = Property.PositionPolicy.LeftTop;
                this.Position.Left = left;
                this.Position.Top = top;
            };
            ViewBase.prototype.SetAnchor = function (top, left, right, bottom) {
                //this.Log('ViewBase.SetAnchor');
                if (_.isNumber(top)) {
                    this.Anchor.IsAnchoredTop = true;
                    this.Anchor.MarginTop = top;
                }
                else {
                    this.Anchor.IsAnchoredTop = false;
                    this.Anchor.MarginTop = null;
                }
                if (_.isNumber(left)) {
                    this.Anchor.IsAnchoredLeft = true;
                    this.Anchor.MarginLeft = left;
                }
                else {
                    this.Anchor.IsAnchoredLeft = false;
                    this.Anchor.MarginLeft = null;
                }
                if (_.isNumber(right)) {
                    this.Anchor.IsAnchoredRight = true;
                    this.Anchor.MarginRight = right;
                }
                else {
                    this.Anchor.IsAnchoredRight = false;
                    this.Anchor.MarginRight = null;
                }
                if (_.isNumber(bottom)) {
                    this.Anchor.IsAnchoredBottom = true;
                    this.Anchor.MarginBottom = bottom;
                }
                else {
                    this.Anchor.IsAnchoredBottom = false;
                    this.Anchor.MarginBottom = null;
                }
            };
            ViewBase.prototype.SetDisplayParams = function (width, height, x, y, color, backgroundColor) {
                //this.Log('ViewBase.SetDisplayParams');
                if (x === void 0) { x = undefined; }
                if (y === void 0) { y = undefined; }
                if (color === void 0) { color = undefined; }
                if (backgroundColor === void 0) { backgroundColor = undefined; }
                if (width !== undefined)
                    this.Size.Width = width;
                if (height !== undefined)
                    this.Size.Height = height;
                if (x !== undefined)
                    this.Position.X = x;
                if (y !== undefined)
                    this.Position.Y = y;
                if (color !== undefined)
                    this.Color = color;
                if (backgroundColor !== undefined)
                    this.BackgroundColor = backgroundColor;
            };
            ViewBase.prototype.SetTransAnimation = function (enable) {
                //this.Log('ViewBase.SetTransAnimation');
                if (enable) {
                    // アニメーション有効化
                    if (!this.Elem.hasClass('TransAnimation'))
                        this.Elem.addClass('TransAnimation');
                    if (this.Elem.hasClass('NoTransAnimation'))
                        this.Elem.removeClass('NoTransAnimation');
                }
                else {
                    // アニメーション無効化
                    if (this.Elem.hasClass('TransAnimation'))
                        this.Elem.removeClass('TransAnimation');
                    if (!this.Elem.hasClass('NoTransAnimation'))
                        this.Elem.addClass('NoTransAnimation');
                }
            };
            ViewBase.prototype.HasTransAnimation = function () {
                //this.Log('ViewBase.HasTransAnimation');
                return this.Elem.hasClass('TransAnimation');
            };
            ViewBase.prototype.InitHasAnchor = function () {
                //this.Log('ViewBase.InitHasAnchor');
                var hasAnchorX = (this.Anchor.IsAnchoredLeft || this.Anchor.IsAnchoredRight);
                var hasAnchorY = (this.Anchor.IsAnchoredTop || this.Anchor.IsAnchoredBottom);
                var recAnchor = function (view) {
                    if (!view)
                        return;
                    if (!hasAnchorX) {
                        hasAnchorX = (view.Anchor.IsAnchoredLeft || view.Anchor.IsAnchoredRight);
                    }
                    if (!hasAnchorY) {
                        hasAnchorY = (view.Anchor.IsAnchoredTop || view.Anchor.IsAnchoredBottom);
                    }
                    recAnchor(view.Parent);
                };
                recAnchor(this.Parent);
                this.Anchor.SetHasAnchor(hasAnchorX, hasAnchorY);
            };
            ViewBase.prototype.SetAnimatedClass = function (name) {
                var _this = this;
                if (this._removeAnimatedClass)
                    return;
                var classes = "animated " + name;
                var animationEndEvents = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
                this._removeAnimatedClass = function () {
                    _this.Elem.removeClass(classes);
                    _this.Elem.off(animationEndEvents, _this._removeAnimatedClass);
                    _this._removeAnimatedClass = null;
                };
                this._removeAnimatedClass.bind(this);
                this.Elem.on(animationEndEvents, this._removeAnimatedClass);
                this.Elem.addClass(classes);
            };
            ViewBase.prototype.ClearAnimatedClass = function () {
                if (this._removeAnimatedClass) {
                    this._removeAnimatedClass();
                    this._removeAnimatedClass = null;
                }
            };
            ViewBase.prototype.Add = function (view) {
                //this.Log('ViewBase.Add');
                if (this.Children.indexOf(view) == -1) {
                    view.SetParent(this);
                    this.Children.push(view);
                    this.Elem.append(view.Elem);
                    view.Refresh();
                    view.DispatchEvent(Events.Attached);
                }
            };
            ViewBase.prototype.Remove = function (view) {
                //this.Log('ViewBase.Remove');
                var index = this.Children.indexOf(view);
                if (index !== -1) {
                    view.SetParent(null);
                    this.Children.splice(index, 1);
                    view.Elem.detach();
                    view.DispatchEvent(Events.Detached);
                }
                else {
                    this.Log('削除できなかった。');
                    this.Log(view);
                }
            };
            ViewBase.prototype.GetParentsString = function (current) {
                if (current === void 0) { current = null; }
                if (!this.Page) {
                    return this.ObjectIdentifier + " ** Has No Page **";
                }
                else {
                    if (!this._parentString)
                        this._parentString = this.InnerGetParentsString();
                    return this._parentString;
                }
            };
            ViewBase.prototype.InnerGetParentsString = function (current) {
                if (current === void 0) { current = null; }
                var result = (current === null)
                    ? "" + this.ObjectIdentifier
                    : current + "-" + this.ObjectIdentifier;
                return (!this.Parent)
                    ? result
                    : this.Parent.InnerGetParentsString(result);
            };
            ViewBase.prototype.Refresh = function () {
                //this.Log('ViewBase.Refresh');
                if (this._isSuppressLayout || !this._isInitialized)
                    return;
                this._refresher.Exec();
            };
            ViewBase.prototype.InnerRefresh = function () {
                var _this = this;
                //this.Log(`ViewBase.InnerRefresh - ${this.GetParentsString()}`);
                var parent = $(this.Elem.parent());
                if (parent.length <= 0)
                    return;
                if (!this._page && !(this instanceof Views.PageView))
                    this.InitPage();
                this.CalcLayout();
                var parentWidth = (this.Parent)
                    ? this.Parent.Size.Width
                    : parent.width();
                var parentHeight = (this.Parent)
                    ? this.Parent.Size.Height
                    : parent.height();
                var pHalfWidth = (parentWidth / 2);
                var pHalfHeight = (parentHeight / 2);
                var myHalfWidth = this.Size.Width / 2;
                var myHalfHeight = this.Size.Height / 2;
                var elemLeft = pHalfWidth - myHalfWidth + this.Position.X;
                var elemTop = pHalfHeight - myHalfHeight + this.Position.Y;
                //this.Log({
                //    left: this.Position.Left,
                //    pHalfWidth: pHalfWidth,
                //    myHalfWidth: myHalfWidth,
                //    positionX: this.Position.X,
                //    elemLeft: elemLeft
                //});
                this.SetStyles({
                    left: elemLeft + "px",
                    top: elemTop + "px",
                    width: this.Size.Width + "px",
                    height: this.Size.Height + "px",
                    zIndex: "" + this.ZIndex,
                    color: "" + this._color,
                    backgroundColor: "" + this._backgroundColor,
                    opacity: "" + this.Opacity,
                    display: (this._isVisible)
                        ? 'block'
                        : 'none'
                });
                _.defer(function () {
                    _this.ApplyStyles();
                    // 子ViewをRefreshさせる。
                    _.each(_this.Children, function (view) {
                        view.Refresh();
                    });
                });
            };
            ViewBase.prototype.CalcLayout = function () {
                //this.Log('ViewBase.CalcLayout');
                var parent = $(this.Elem.parent());
                if (parent.length <= 0)
                    return;
                var isSuppressLayout = this.IsSuppressedLayout();
                var isSuppressSizeChanged = this.IsSuppressedEvent(Events.SizeChanged);
                var isSuppressPositionChanged = this.IsSuppressedEvent(Events.PositionChanged);
                try {
                    if (!isSuppressLayout)
                        this.SuppressLayout();
                    if (!isSuppressSizeChanged)
                        this.SuppressEvent(Events.SizeChanged);
                    if (!isSuppressPositionChanged)
                        this.SuppressEvent(Events.PositionChanged);
                    this.SuppressLayout();
                    var parentWidth = (this.Parent)
                        ? this.Parent.Size.Width
                        : parent.width();
                    var parentHeight = (this.Parent)
                        ? this.Parent.Size.Height
                        : parent.height();
                    var pHalfWidth = (parentWidth / 2);
                    var pHalfHeight = (parentHeight / 2);
                    if (this.Anchor.IsAnchoredLeft && this.Anchor.IsAnchoredRight) {
                        this.Size.Width = parentWidth - this.Anchor.MarginLeft - this.Anchor.MarginRight;
                        this.Position.X = this.Anchor.MarginLeft - pHalfWidth + (this.Size.Width / 2);
                    }
                    else {
                        this.Size.Width = _.isNumber(this.Size.Width)
                            ? this.Size.Width
                            : 30;
                        if (this.Anchor.IsAnchoredLeft) {
                            this.Position.X = this.Anchor.MarginLeft - pHalfWidth + (this.Size.Width / 2);
                        }
                        else if (this.Anchor.IsAnchoredRight) {
                            var left = parentWidth - this.Anchor.MarginRight - this.Size.Width;
                            this.Position.X = left - pHalfWidth + (this.Size.Width / 2);
                        }
                    }
                    if (this.Anchor.IsAnchoredTop && this.Anchor.IsAnchoredBottom) {
                        this.Size.Height = parentHeight - this.Anchor.MarginTop - this.Anchor.MarginBottom;
                        this.Position.Y = this.Anchor.MarginTop - pHalfHeight + (this.Size.Height / 2);
                    }
                    else {
                        this.Size.Height = _.isNumber(this.Size.Height)
                            ? this.Size.Height
                            : 30;
                        if (this.Anchor.IsAnchoredTop) {
                            this.Position.Y = this.Anchor.MarginTop - pHalfHeight + (this.Size.Height / 2);
                        }
                        else if (this.Anchor.IsAnchoredBottom) {
                            var top_1 = parentHeight - this.Anchor.MarginBottom - this.Size.Height;
                            this.Position.Y = top_1 - pHalfHeight + (this.Size.Height / 2);
                        }
                    }
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    if (!isSuppressLayout)
                        this.ResumeLayout();
                    if (!isSuppressSizeChanged)
                        this.ResumeEvent(Events.SizeChanged);
                    if (!isSuppressPositionChanged)
                        this.ResumeEvent(Events.PositionChanged);
                    this.ResumeLayout();
                }
            };
            ViewBase.prototype.SetStyle = function (name, value) {
                //this.Log('ViewBase.SetStyle');
                this._newStyles[name] = value;
            };
            ViewBase.prototype.SetStyles = function (styles) {
                //this.Log('ViewBase.SetStyles');
                _.extend(this._newStyles, styles);
            };
            ViewBase.prototype.ApplyStyles = function () {
                //this.Log('ViewBase.ApplyStyles');
                this._applyStyler.Exec();
            };
            ViewBase.prototype.InnerApplyStyles = function () {
                var _this = this;
                this._innerApplyCount++;
                //this.Log(`ViewBase.InnerApplyStyles: ${this._innerApplyCount}`);
                _.each(this._newStyles, function (v, k) {
                    if (_this._latestStyles[k] !== v) {
                        _this.Dom.style[k] = v;
                        _this._latestStyles[k] = v;
                    }
                });
                this._newStyles = {};
                Fw.Root.Instance.ReleasePageInitialize(this);
            };
            ViewBase.prototype.SuppressLayout = function () {
                //this.Log('ViewBase.SuppressLayout');
                this._isSuppressLayout = true;
            };
            ViewBase.prototype.IsSuppressedLayout = function () {
                //this.Log('ViewBase.IsSuppressedLayout');
                return this._isSuppressLayout;
            };
            ViewBase.prototype.ResumeLayout = function () {
                //this.Log('ViewBase.ResumeLayout');
                this._isSuppressLayout = false;
            };
            ViewBase.prototype.Show = function (duration) {
                //this.Log('ViewBase.Show');
                var _this = this;
                if (duration === void 0) { duration = 200; }
                if (this.IsVisible) {
                    this.Refresh();
                    return;
                }
                if (duration <= 0) {
                    this.IsVisible = true;
                    this.DispatchEvent(Events.Shown);
                }
                else {
                    var animator = new Anim.Animator(this);
                    animator.FromParams = Anim.Params.GetResized(this, 0.8);
                    animator.FromParams.Opacity = 0;
                    animator.ToParams.Opacity = 1.0;
                    animator.OnComplete = function () {
                        _this.IsVisible = true;
                        _this.DispatchEvent(Events.Shown);
                    };
                    animator.Invoke(duration);
                }
            };
            ViewBase.prototype.Hide = function (duration) {
                //this.Log('ViewBase.Hide');
                var _this = this;
                if (duration === void 0) { duration = 200; }
                if (!this.IsVisible) {
                    this.Refresh();
                    return;
                }
                if (duration <= 0) {
                    this.IsVisible = false;
                    this.DispatchEvent(Events.Hidden);
                }
                else {
                    var animator = new Anim.Animator(this);
                    animator.FromParams.Opacity = 1.0;
                    animator.ToParams = Anim.Params.GetResized(this, 0.8);
                    animator.ToParams.Opacity = 0.0;
                    animator.OnComplete = function () {
                        _this.IsVisible = false;
                        _this.DispatchEvent(Events.Hidden);
                    };
                    animator.Invoke(duration);
                }
            };
            ViewBase.prototype.Dispose = function () {
                var _this = this;
                _super.prototype.Dispose.call(this);
                // イベントバインドを全削除
                this._elem.off();
                try {
                    this._elem.remove();
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                this._elem = null;
                var ary = Fw.Util.Obj.Mirror(this.Children);
                _.each(ary, function (view) {
                    _this.Remove(view);
                    view.Dispose();
                });
                this._children = null;
                this._parent = null;
                this._dom = null;
                this._size.Dispose();
                this._size = null;
                this._position.Dispose();
                this._position = null;
                this._anchor.Dispose();
                this._anchor = null;
                this._color = null;
                this._backgroundColor = null;
            };
            return ViewBase;
        }(Fw.EventableBase));
        Views.ViewBase = ViewBase;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Config.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="../Util/App.ts" />
/// <reference path="../Events/PageViewEvents.ts" />
/// <reference path="Animation/Animator.ts" />
/// <reference path="Animation/Params.ts" />
/// <reference path="Property/Size.ts" />
/// <reference path="ViewBase.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Anim = Fw.Views.Animation;
        var Events = Fw.Events.PageViewEvents;
        var PageView = /** @class */ (function (_super) {
            __extends(PageView, _super);
            function PageView() {
                var _this = _super.call(this, $("<div class=\"IController IView TransAnimation\"></div>")) || this;
                _this._isMasked = false;
                _this._isModal = false;
                Fw.Root.Instance.Elem.append(_this.Elem);
                Fw.Root.Instance.StartPageInitialize();
                _this._isMasked = false;
                _this.SetClassName('PageView');
                _this.Elem.addClass(_this.ClassName);
                _this.Size.Width = Fw.Root.Instance.Size.Width;
                _this.Size.Height = Fw.Root.Instance.Size.Height;
                _this.IsVisible = false;
                ////デバッグ用
                //this.EnableLog = true;
                // ブラウザのリサイズ時、ページ全体を再描画
                Fw.Root.Instance.AddEventListener(Fw.Events.RootEvents.Resized, function () {
                    _this.Log("Root.Resized");
                    _this.SetSize(Fw.Root.Instance.Size.Width, Fw.Root.Instance.Size.Height);
                });
                // マスクをクリックしたとき、戻る。
                Fw.Root.Instance.AddEventListener(Fw.Events.RootEvents.MaskClicked, function () {
                    //TODO: 自分がモーダル表示されているとき、引っ込む。
                    if (_this.IsVisible && _this._isModal)
                        _this.HideModal();
                    if (_this._isMasked)
                        _this.UnMask();
                });
                return _this;
            }
            Object.defineProperty(PageView.prototype, "IsMasked", {
                get: function () {
                    return this._isMasked;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PageView.prototype, "IsModal", {
                get: function () {
                    return this._isModal;
                },
                enumerable: true,
                configurable: true
            });
            // #region "Animations"
            PageView.prototype.Show = function (duration) {
                var _this = this;
                if (duration === void 0) { duration = 200; }
                this.Log('PageView.Show');
                if (this.IsVisible && !this.IsModal) {
                    this.ZIndex = 0;
                    this.SetStyle('zIndex', '0');
                    this.Dom.style.zIndex = '0';
                    this.Refresh();
                    return;
                }
                this.ZIndex = 0;
                this.SetStyle('zIndex', '0');
                this.Dom.style.zIndex = '0';
                if (duration <= 0) {
                    this.IsVisible = true;
                    this.DispatchEvent(Events.Shown);
                }
                else {
                    var animator = new Anim.Animator(this);
                    animator.FromParams = Anim.Params.GetSlided(this, -1, 0);
                    animator.FromParams.Opacity = 0.5;
                    animator.ToParams = Anim.Params.GetCurrent(this);
                    animator.ToParams.Opacity = 1.0;
                    animator.OnComplete = function () {
                        _this.IsVisible = true;
                        _this._isModal = false;
                        _.delay(function () {
                            _this.Refresh();
                        }, 50);
                        _this.DispatchEvent(Events.Shown);
                    };
                    animator.Invoke(duration);
                }
            };
            PageView.prototype.Hide = function (duration) {
                var _this = this;
                if (duration === void 0) { duration = 200; }
                this.Log('PageView.Hide');
                if (!this.IsVisible && !this.IsModal) {
                    this.ZIndex = 0;
                    this.SetStyle('zIndex', '0');
                    this.Dom.style.zIndex = '0';
                    this.Refresh();
                    return;
                }
                this.ZIndex = 0;
                this.SetStyle('zIndex', '0');
                this.Dom.style.zIndex = '0';
                if (duration <= 0) {
                    this.IsVisible = false;
                    this.DispatchEvent(Events.Hidden);
                }
                else {
                    var animator = new Anim.Animator(this);
                    animator.FromParams = Anim.Params.GetCurrent(this);
                    animator.FromParams.Opacity = 1.0;
                    animator.ToParams = Anim.Params.GetSlided(this, -1, 0);
                    animator.ToParams.Opacity = 0.5;
                    animator.OnComplete = function () {
                        _this.IsVisible = false;
                        _this._isModal = false;
                        _this.Refresh();
                        _this.DispatchEvent(Events.Hidden);
                    };
                    animator.Invoke(duration);
                }
            };
            PageView.prototype.ShowModal = function (duration) {
                var _this = this;
                if (duration === void 0) { duration = 200; }
                this.Log('PageView.ShowModal');
                if (this.IsVisible && this._isModal) {
                    this.ZIndex = 1;
                    this.SetStyle('zIndex', '1');
                    this.Dom.style.zIndex = '1';
                    this.Refresh();
                    return;
                }
                this.ZIndex = 1;
                this.SetStyle('zIndex', '1');
                this.Dom.style.zIndex = '1';
                if (duration <= 0) {
                    this.IsVisible = true;
                    this.DispatchEvent(Events.Shown);
                }
                else {
                    var animator_1 = new Anim.Animator(this);
                    animator_1.FromParams = Anim.Params.GetSlided(this, 1, 0);
                    animator_1.FromParams.Opacity = 0.5;
                    animator_1.ToParams = Anim.Params.GetCurrent(this);
                    animator_1.ToParams.Opacity = 1.0;
                    animator_1.ToParams.X = animator_1.ToParams.Width - PageView.ModalWidth;
                    animator_1.OnComplete = function () {
                        _this.IsVisible = true;
                        _this._isModal = true;
                        _this.Position.X = animator_1.ToParams.X;
                        _.delay(function () {
                            _this.Refresh();
                        }, 50);
                        _this.DispatchEvent(Events.Shown);
                    };
                    animator_1.Invoke(duration);
                }
            };
            PageView.prototype.HideModal = function (duration) {
                var _this = this;
                if (duration === void 0) { duration = 200; }
                this.Log('PageView.HideModal');
                if (!this.IsVisible) {
                    this.ZIndex = 0;
                    this.SetStyle('zIndex', '0');
                    this.Dom.style.zIndex = '0';
                    this.Refresh();
                    return;
                }
                if (duration <= 0) {
                    this.IsVisible = false;
                    this.DispatchEvent(Events.Hidden);
                }
                else {
                    var animator = new Anim.Animator(this);
                    animator.FromParams = Anim.Params.GetCurrent(this);
                    animator.FromParams.Opacity = 1.0;
                    animator.ToParams = Anim.Params.GetSlided(this, 1, 0);
                    animator.ToParams.X = this.Size.Width - this.Position.X;
                    animator.ToParams.Opacity = 0.5;
                    animator.OnComplete = function () {
                        _this.ZIndex = 0;
                        _this.SetStyle('zIndex', '0');
                        _this.Dom.style.zIndex = '0';
                        _this.IsVisible = false;
                        _this._isModal = false;
                        _this.SetLeftTop(0, 0);
                        //this.Position.X = 0;
                        //this.Position.Y = 0;
                        _this.Refresh();
                        _this.DispatchEvent(Events.Hidden);
                    };
                    animator.Invoke(duration);
                }
            };
            PageView.prototype.SetUnmodal = function (duration) {
                var _this = this;
                if (duration === void 0) { duration = 200; }
                //this.Log(`PageView.SetUnmodal: ${this.Elem.data('controller')}`);
                if (this.IsVisible && !this._isModal) {
                    this.ZIndex = 0;
                    this.SetStyle('zIndex', '0');
                    this.Dom.style.zIndex = '0';
                    this.Refresh();
                    return;
                }
                if (duration <= 0) {
                    this.IsVisible = false;
                    this.DispatchEvent(Events.Hidden);
                }
                else {
                    var animator = new Anim.Animator(this);
                    animator.FromParams = Anim.Params.GetCurrent(this);
                    animator.FromParams.Opacity = 1.0;
                    animator.ToParams = Anim.Params.GetSlided(this, 0, 0);
                    animator.ToParams.X = -this.Position.X;
                    animator.ToParams.Opacity = 1.0;
                    animator.OnComplete = function () {
                        _this.ZIndex = 0;
                        _this.SetStyle('zIndex', '0');
                        _this.Dom.style.zIndex = '0';
                        _this.IsVisible = true;
                        _this._isModal = false;
                        _this.SetLeftTop(0, 0);
                        //this.Position.X = 0;
                        //this.Position.Y = 0;
                        _this.Refresh();
                        _this.DispatchEvent(Events.Hidden);
                    };
                    animator.Invoke(duration);
                }
            };
            // #endregion
            PageView.prototype.Mask = function () {
                //this.Log(`${this.ClassName}.Mask`);
                this._isMasked = true;
                Fw.Root.Instance.Mask();
                this.ZIndex = -1;
                this.Dom.style.zIndex = '-1';
                this.SetStyle('zIndex', '-1');
                this.Refresh();
            };
            PageView.prototype.UnMask = function () {
                //this.Log(`${this.ClassName}.UnMask`);
                this._isMasked = false;
                Fw.Root.Instance.UnMask();
                this.ZIndex = 0;
                this.Dom.style.zIndex = '0';
                this.SetStyle('zIndex', '0');
                this.Refresh();
            };
            PageView.prototype.Refresh = function () {
                //this.Log('PageView.Refresh');
                _super.prototype.Refresh.call(this);
                if (this.IsSuppressLayout || !this.IsInitialized)
                    return;
                // jQueryのイベントバブリングに注意。
                // Domツリーが構成された後では、Fw上で追加したコントロールの全て、
                // ツリーの上位に向かってイベントが伝播していく。
                // ページリフレッシュ時は、子Viewをリフレッシュ指示する。
                _.each(this.Children, function (v) {
                    v.Refresh();
                });
            };
            PageView.prototype.InnerRefresh = function () {
                //this.Log('PageView.InnerRefresh');
                var _this = this;
                try {
                    this.SuppressLayout();
                    //const pHalfWidth = Root.Instance.Size.Width / 2;
                    //const pHalfHeight = Root.Instance.Size.Height / 2;
                    //const myHalfWidth = Root.Instance.Size.Width / 2;
                    //const myHalfHeight = Root.Instance.Size.Height / 2;
                    //let elemLeft = pHalfWidth - myHalfWidth + this.Position.X;
                    //let elemTop = pHalfHeight - myHalfHeight + this.Position.Y;
                    if (this.IsVisible && this.IsModal) {
                        var left = Fw.Root.Instance.Size.Width - PageView.ModalWidth;
                        if (this.Position.X !== left)
                            this.Position.X = left;
                    }
                    this.SetStyles({
                        left: this.Position.X + "px",
                        top: this.Position.Y + "px",
                        width: "100%",
                        height: "100%",
                        zIndex: "" + this.ZIndex,
                        color: "" + this.Color,
                        backgroundColor: "" + this.BackgroundColor,
                        display: (this.IsVisible) ? 'block' : 'none'
                    });
                    _.defer(function () {
                        _this.ApplyStyles();
                    });
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                }
            };
            PageView.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
            };
            PageView.ModalWidth = 300;
            return PageView;
        }(Views.ViewBase));
        Views.PageView = PageView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ControlViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="../Util/Num.ts" />
/// <reference path="./ViewBase.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Num = Fw.Util.Num;
        var BoxView = /** @class */ (function (_super) {
            __extends(BoxView, _super);
            function BoxView() {
                var _this = _super.call(this, $('<div></div>')) || this;
                _this.SetClassName('BoxView');
                _this.Elem.addClass(_this.ClassName);
                _this.HasBorder = true;
                _this.BorderRadius = 0;
                return _this;
            }
            Object.defineProperty(BoxView.prototype, "HasBorder", {
                get: function () {
                    return this._hasBorder;
                },
                set: function (value) {
                    this._hasBorder = value;
                    //this.Dom.style.borderWidth = (value) ? '1px' : '0';
                    this.SetStyle('borderWidth', (value)
                        ? '1px'
                        : '0');
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BoxView.prototype, "BorderRadius", {
                get: function () {
                    return this._borderRadius;
                },
                set: function (value) {
                    if (Num.IsNaN(value) || value === null || value === undefined)
                        value = 0;
                    if (value < 0)
                        value = 0;
                    if (value > 50)
                        value = 50;
                    this._borderRadius = value;
                    this.SetStyle('borderRadius', this._borderRadius + "%");
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            BoxView.prototype.InnerRefresh = function () {
                try {
                    this.SuppressLayout();
                    _super.prototype.InnerRefresh.call(this);
                    this.SetStyle('borderColor', "" + this.Color);
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                }
            };
            BoxView.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
                this._hasBorder = null;
                this._borderRadius = null;
            };
            return BoxView;
        }(Views.ViewBase));
        Views.BoxView = BoxView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
var App;
(function (App) {
    var Items;
    (function (Items) {
        var RgbInts = /** @class */ (function () {
            function RgbInts() {
            }
            return RgbInts;
        }());
        Items.RgbInts = RgbInts;
        var Color = /** @class */ (function () {
            function Color() {
            }
            Color.GetButtonHoverColor = function (color) {
                var idx = Color.ButtonColors.indexOf(color);
                return (idx === -1)
                    ? Color.MainHover
                    : Color.ButtonHoverColors[idx];
            };
            Color.GetRgbInts = function (color) {
                var widhSharp = (color.substr(0, 1) === '#');
                var rHex = (widhSharp)
                    ? color.substr(1, 2)
                    : color.substr(0, 2);
                var gHex = (widhSharp)
                    ? color.substr(3, 2)
                    : color.substr(2, 2);
                var bHex = (widhSharp)
                    ? color.substr(5, 2)
                    : color.substr(4, 2);
                var result = new RgbInts();
                result.Red = parseInt(rHex, 16);
                result.Green = parseInt(gHex, 16);
                result.Blue = parseInt(bHex, 16);
                return result;
            };
            Color.GetRgba = function (color, alpha) {
                var rgbInts = Color.GetRgbInts(color);
                return "rgba(" + rgbInts.Red + ", " + rgbInts.Green + ", " + rgbInts.Blue + ", " + alpha + ")";
            };
            Color.GetForeColor = function (color) {
                var rgbInts = Color.GetRgbInts(color);
                var colorValue = (rgbInts.Red * 0.3) + (rgbInts.Green * 0.6) + (rgbInts.Blue * 0.1);
                return (colorValue > 127)
                    ? "#000000" //黒
                    : "#FFFFFF"; //白
            };
            // ライトブラウン - 女っぽいからターゲット外
            //public static Main: string = '#FFFFFF';
            //public static MainBackground: string = '#D4B16A';
            //public static MainHover: string = '#D9BA7C';
            //public static HeaderButtonBackground = '#C79B41';
            //public static HeaderButtonHover = '#CDA555';
            Color.Transparent = 'transparent';
            /**
             * メイン文字／枠線色
             */
            Color.Main = '#000000';
            /**
             * メイン背景色
             */
            Color.MainBackground = '#f5f5f5';
            /**
             * メインホバー色
             */
            Color.MainHover = '#e0e0e0';
            /**
             * ヘッダ配置ボタンの背景色
             */
            Color.HeaderButtonBackground = '#ececec';
            /**
             * ヘッダ配置ボタンのホバー色
             */
            Color.HeaderButtonHover = '#e0e0e0';
            /**
             * 反転した文字／枠線色
             */
            Color.ReverseMain = '#FFFFFF';
            /**
             * ボタン色配列
             */
            Color.ButtonColors = [
                // 0.gray
                '#9d9e9e',
                // 1.light blue (BrDevs)
                '#84bde8',
                // 2.green (WoL, Script)
                '#81c03b',
                // 3.light green (Light)
                '#ccdc4b',
                // 4.orange (TV)
                '#fcc91f',
                // 5.red (AV)
                '#F92068',
                // 6.purple (Air Compressor)
                '#6545C6',
                // 7.brown (Free)
                '#B5743B',
                // 8. deep blue (Scene)
                '#2068F9',
                // 9. deep orange (Schedule)
                '#F93220'
            ];
            /**
             * ボタン色名配列
             */
            Color.ButtonColorNames = [
                'gray',
                'light blue',
                'green',
                'light green',
                'orange',
                'red',
                'purple',
                'brown',
                'deep blue',
                'deep orange'
            ];
            /**
             * ボタンのホバー色配列
             */
            Color.ButtonHoverColors = [
                '#b4b4b4',
                '#8fcfff',
                '#9bde50',
                '#dcec5e',
                '#ffd856',
                '#ff538c',
                '#8463e6',
                '#d88e4e',
                '#427ff9',
                '#f75a4c'
            ];
            return Color;
        }());
        Items.Color = Color;
    })(Items = App.Items || (App.Items = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/BoxView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../Items/Color.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_1) {
        var Controls;
        (function (Controls) {
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var Color = App.Items.Color;
            var HeaderBarView = /** @class */ (function (_super) {
                __extends(HeaderBarView, _super);
                function HeaderBarView() {
                    var _this = _super.call(this) || this;
                    _this._label = new Views.LabelView();
                    _this._btnLeft = new App.Views.Controls.ButtonView();
                    _this._btnRight = new App.Views.Controls.ButtonView();
                    _this.Size.Height = 50;
                    _this.SetAnchor(0, 0, 0, null);
                    _this.BackgroundColor = Color.MainBackground;
                    _this.HasBorder = false;
                    _this._label.FontSize = Property.FontSize.Large;
                    _this._label.Color = Color.Main;
                    _this.Add(_this._label);
                    _this._btnLeft.SetSize(40, 40);
                    _this._btnLeft.BackgroundColor = Color.HeaderButtonBackground;
                    _this._btnLeft.HoverColor = Color.HeaderButtonHover;
                    _this._btnLeft.Color = Color.Main;
                    _this._btnLeft.Text = '<<';
                    _this._btnLeft.SetAnchor(null, 5, null, null);
                    _this.Add(_this._btnLeft);
                    _this._btnRight.SetSize(40, 40);
                    _this._btnRight.BackgroundColor = Color.HeaderButtonBackground;
                    _this._btnRight.HoverColor = Color.HeaderButtonHover;
                    _this._btnRight.Color = Color.Main;
                    _this._btnRight.Text = '+';
                    _this._btnRight.SetAnchor(null, null, 5, null);
                    _this.Add(_this._btnRight);
                    _this.AddEventListener(Fw.Events.BoxViewEvents.Attached, _this.Refresh, _this);
                    return _this;
                }
                Object.defineProperty(HeaderBarView.prototype, "Text", {
                    get: function () {
                        return this._label.Text;
                    },
                    set: function (value) {
                        this._label.Text = value;
                        this.Refresh();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HeaderBarView.prototype, "Label", {
                    get: function () {
                        return this._label;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HeaderBarView.prototype, "LeftButton", {
                    get: function () {
                        return this._btnLeft;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HeaderBarView.prototype, "RightButton", {
                    get: function () {
                        return this._btnRight;
                    },
                    enumerable: true,
                    configurable: true
                });
                HeaderBarView.prototype.Dispose = function () {
                    this.RemoveEventListener(Fw.Events.BoxViewEvents.Attached, this.Refresh, this);
                    _super.prototype.Dispose.call(this);
                };
                return HeaderBarView;
            }(Fw.Views.BoxView));
            Controls.HeaderBarView = HeaderBarView;
        })(Controls = Views_1.Controls || (Views_1.Controls = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Items;
    (function (Items) {
        var Lang;
        (function (Lang) {
            Lang.Ja = {
                Title: 'BrWebHost',
                TitleScriptAgent: 'BWH Script Agent',
                Property: 'プロパティ',
                RemoteControl: 'リモコン',
                Name: '名前',
                Color: 'カラー',
                Controller: 'コントローラ',
                Delete: '※削除※',
                Icon: 'アイコン',
                Code: 'コード',
                IconColor: 'アイコン / カラー',
                Learn: '学習',
                Test: 'テスト',
                Scene: '組み合わせ',
                Operation: '操作',
                TimerEnable: 'タイマー実行',
                Enable: '有効',
                StartTime: '開始時間',
                WeekdayAction: '曜日',
                Sunday: '日曜',
                Monday: '月曜',
                Tuesday: '火曜',
                Wednesday: '水曜',
                Thursday: '木曜',
                Friday: '金曜',
                Saturday: '土曜',
                SelectRemote: 'リモコン<br/>選択',
                SelectButton: 'ボタン<br/>選択',
                Wait: 'Wait:',
                Sec: '秒',
                Excellent: '最高度',
                Good: '良好',
                Normal: '通常',
                Bad: '悪',
                Unknown: '不明',
                Dark: '暗',
                Dim: '淡',
                Bright: '明',
                Quiet: '静',
                Noisy: '騒',
                NewRemoteControl: '新規リモコン',
                NewScene: '新規組み合わせ',
                NewTimer: '新規タイマー',
                ToggleAssigns: 'トグル割り当て',
                MainPanelToggleOn: 'トグル ON',
                MainPanelToggleOff: 'トグル OFF',
                SelectColor: 'カラー選択',
                ToDaily: '日付ごとに変更',
                ToHourly: '時間ごとに変更',
                Temp: '室温',
                Hudimity: '湿度',
                Voc: 'VOC',
                Brightness: '明るさ',
                Noise: 'ノイズ',
                MacAddress: 'MACアドレス',
                Script: 'スクリプト',
                RemoteScript: 'リモートスクリプト',
                SelectIcon: 'アイコン選択',
                SelectRemoteControl: 'リモコン選択',
                SelectNewOperation: '機能選択',
                Tv: 'TV',
                Av: 'AV',
                Light: '照明',
                Free: '自由編集',
                Wol: 'WoL',
                Remote: 'リモート',
                Timer: 'タイマー',
                ThisRemoteControlWillBeRemoved: 'リモコンを削除します。<br/>よろしいですか？',
                ThisButtonWillBeRemoved: 'ボタンを削除します。<br/>よろしいですか？',
                ThisSceneWillBeRemoved: '組み合わせを削除します。<br/>よろしいですか？',
                ThisTimerWillBeRemoved: 'タイマーを削除します。<br/>よろしいですか？',
                NoButtonsSaveOk: 'ボタンがありません。<br/>保存しますか？',
                NoOperationsSaveOk: '機能がありません。<br/>保存しますか？',
                SaveFailureServerOnline: '保存に失敗しました。<br/>ネットワーク接続を確認してください。',
                SelectYourRmDevice: 'RMコントローラを選択してください。<br />タイトルクリックで編集画面を開きます。',
                SetRemoteControlHead: 'リモコンをRMコントローラに向け、<br/>ボタンを押してください。',
                ClickHeader: 'タイトルクリックで編集画面を開きます。',
                GoEdit: '編集画面を開いてください。',
                SelectYourRmDevicePart: 'RMコントローラを選択してください。<br/>',
                ClickLearnButton: '学習ボタンをクリックしてください。',
                LearnYourRemoteControlButtonPart: 'リモコンのボタン操作を学習させてください。<br/>',
                UnexpectedOperation: '不明な操作です...?',
                SetMacAddressGoEdit: 'MACアドレスを入力してください。<br/>編集画面を開いてください。',
                WriteScriptGoEdit: 'スクリプトを編集してください。<br/>編集画面を開いてください。',
                SelectRemoteScriptGoEdit: 'リモートスクリプトを選択してください。<br/>編集画面を開いてください。',
                UnexpectedControlNotFound: '不明な操作です...コントロールが見つかりません。',
            };
        })(Lang = Items.Lang || (Items.Lang = {}));
    })(Items = App.Items || (App.Items = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="Ja.ts" />
var App;
(function (App) {
    var Items;
    (function (Items) {
        var Lang;
        (function (Lang) {
            Lang.En = {
                Title: 'BrWebHost',
                TitleScriptAgent: 'BWH Script Agent',
                Property: 'Property',
                RemoteControl: 'Remote Control',
                Name: 'Name',
                Color: 'Color',
                Controller: 'Controller',
                Delete: '*Delete*',
                Icon: 'Icon',
                Code: 'Code',
                IconColor: 'Icon / Color',
                Learn: 'Learn',
                Test: 'Test',
                Scene: 'Combination',
                Operation: 'Operation',
                TimerEnable: 'Timer Enable',
                Enable: 'Enable',
                StartTime: 'Start Time',
                WeekdayAction: 'Weekday Action',
                Sunday: 'Sunday',
                Monday: 'Monday',
                Tuesday: 'Tuesday',
                Wednesday: 'Wednesday',
                Thursday: 'Thursday',
                Friday: 'Friday',
                Saturday: 'Saturday',
                SelectRemote: 'Select<br/>Remote',
                SelectButton: 'Select<br/>Button',
                Wait: 'Wait:',
                Sec: 'Sec',
                Excellent: 'Excellent',
                Good: 'Good',
                Normal: 'Normal',
                Bad: 'Bad',
                Unknown: 'Unknown',
                Dark: 'Dark',
                Dim: 'Dim',
                Bright: 'Bright',
                Quiet: 'Quiet',
                Noisy: 'Noisy',
                NewRemoteControl: 'New Remote Control',
                NewScene: 'New Combination',
                NewTimer: 'New Timer',
                ToggleAssigns: 'Toggle Assigns',
                MainPanelToggleOn: 'Main-Panel Toggle ON',
                MainPanelToggleOff: 'Main-Panel Toggle OFF',
                SelectColor: 'Select Color',
                ToDaily: 'To Daily',
                ToHourly: 'To Hourly',
                Temp: 'Temp.',
                Hudimity: 'Hudimity',
                Voc: 'Voc',
                Light: 'Light',
                Brightness: 'Brightness',
                Noise: 'Noise',
                MacAddress: 'MAC Address',
                Script: 'Script',
                RemoteScript: 'Remote Script',
                SelectIcon: 'Select Icon',
                SelectRemoteControl: 'Select Remote Control',
                SelectNewOperation: 'Select New Operation',
                Tv: 'TV',
                Av: 'AV',
                Free: 'Free',
                Wol: 'WoL',
                Remote: 'Remote',
                Timer: 'Timer',
                ThisRemoteControlWillBeRemoved: 'This Remote Control will be REMOVED.<br/>Are you ok?',
                ThisButtonWillBeRemoved: 'This Button will be removed.<br/>Are you ok?',
                ThisSceneWillBeRemoved: 'This Combination will be REMOVED.<br/>Are you ok?',
                ThisTimerWillBeRemoved: 'This Timer will be REMOVED.<br/>Are you ok?',
                NoButtonsSaveOk: 'No buttons.<br/>Save OK?',
                NoOperationsSaveOk: 'No operations.<br/>Save OK?',
                SaveFailureServerOnline: 'Ouch! Save Failure.<br/>Server online?',
                SelectYourRmDevice: 'Select your Rm-Device.<br />Click Header.',
                SetRemoteControlHead: 'Set Remote Control head to Rm,<br/> and Push target Button.',
                ClickHeader: 'Click Header.',
                GoEdit: 'Go Edit.',
                SelectYourRmDevicePart: 'Select your Rm-Device,<br/>',
                ClickLearnButton: 'Click Learn-Button.',
                LearnYourRemoteControlButtonPart: 'Learn your Remote Control Button.<br/>',
                UnexpectedOperation: 'Unexpected Operation...?',
                SetMacAddressGoEdit: 'Set MAC-Address,<br/>Go Edit.',
                WriteScriptGoEdit: 'Write Script,<br/>Go Edit.',
                SelectRemoteScriptGoEdit: 'Select Remote Script,<br/>Go Edit.',
                UnexpectedControlNotFound: 'Unexpected...Control not Found.',
            };
        })(Lang = Items.Lang || (Items.Lang = {}));
    })(Items = App.Items || (App.Items = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Items;
    (function (Items) {
        var Lang;
        (function (Lang) {
            Lang.ZhCn = {
                Title: 'BrWebHost',
                TitleScriptAgent: 'BWH Script Agent',
                Property: '属性',
                RemoteControl: '遥控器',
                Name: '名',
                Color: '颜色',
                Controller: '调节器',
                Delete: '※删除※',
                Icon: '图标',
                Code: '代码',
                IconColor: '图标 / 颜色',
                Learn: '研究',
                Test: '测试',
                Scene: '组合',
                Operation: '手术',
                TimerEnable: '定时器执行',
                Enable: '效用',
                StartTime: '开始时间',
                WeekdayAction: '一周中的天',
                Sunday: '星期天',
                Monday: '星期一',
                Tuesday: '星期二',
                Wednesday: '星期三',
                Thursday: '星期四',
                Friday: '星期五',
                Saturday: '星期六',
                SelectRemote: '遥控器<br/>选择',
                SelectButton: '按键<br/>选择',
                Wait: 'Wait:',
                Sec: 'Sec.',
                Excellent: '优秀',
                Good: '好',
                Normal: '正常',
                Bad: '坏',
                Unknown: '不明',
                Dark: '黑暗',
                Dim: '苍白',
                Bright: '光明',
                Quiet: '安静',
                Noisy: '嘈杂',
                NewRemoteControl: '新的遥控器',
                NewScene: '新组合',
                NewTimer: '新计时器',
                ToggleAssigns: '切换开关分配',
                MainPanelToggleOn: '打开拨动开关',
                MainPanelToggleOff: '关闭拨动开关',
                SelectColor: '颜色选择',
                ToDaily: '按日期更改',
                ToHourly: '每小时换一次',
                Temp: '室温',
                Hudimity: '湿度',
                Voc: 'VOC',
                Brightness: '亮度',
                Noise: '噪音',
                MacAddress: 'MAC地址',
                Script: '脚本',
                RemoteScript: '远程脚本',
                SelectIcon: '图标选择',
                SelectRemoteControl: '遥控器选择',
                SelectNewOperation: '功能选择',
                Tv: '电视',
                Av: '音频',
                Light: '照明',
                Free: '自由编辑',
                Wol: 'WoL',
                Remote: '远程',
                Timer: '计时器',
                ThisRemoteControlWillBeRemoved: '删除遥控器。<br/>你确定吗？',
                ThisButtonWillBeRemoved: '删除按钮。<br/>你确定吗？',
                ThisSceneWillBeRemoved: '删除组合。<br/>你确定吗？',
                ThisTimerWillBeRemoved: '删除计时器。<br/>你确定吗？',
                NoButtonsSaveOk: '没有按钮。<br/>你想保存吗？',
                NoOperationsSaveOk: '没有功能。<br/>你想保存吗？',
                SaveFailureServerOnline: '保存失败。<br/>检查网络连接。',
                SelectYourRmDevice: '请选择RM控制器。<br />通过标题单击打开编辑屏幕。',
                SetRemoteControlHead: '将遥控器指向RM控制器，<br/>然后按按钮。',
                ClickHeader: '通过标题单击打开编辑屏幕。',
                GoEdit: '请打开编辑屏幕。',
                SelectYourRmDevicePart: '请选择RM控制器。<br/>',
                ClickLearnButton: '请单击学习按钮。',
                LearnYourRemoteControlButtonPart: '让我学习遥控器的按钮操作。<br/>',
                UnexpectedOperation: '未知的操作...?',
                SetMacAddressGoEdit: '请输入MAC地址。<br/>请打开编辑屏幕。',
                WriteScriptGoEdit: '请编辑脚本。<br/>请打开编辑屏幕。',
                SelectRemoteScriptGoEdit: '请选择远程脚本。<br/>请打开编辑屏幕。',
                UnexpectedControlNotFound: '未知的操作...找不到控制权。',
            };
        })(Lang = Items.Lang || (Items.Lang = {}));
    })(Items = App.Items || (App.Items = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="Ja.ts" />
/// <reference path="En.ts" />
/// <reference path="ZhCn.ts" />
var App;
(function (App) {
    var Items;
    (function (Items) {
        var Lang;
        (function (Lang_1) {
            /**
             * 言語リソース
             * 注) ここの値は編集しても適用されない。En.ts他で上書きされる。
             */
            Lang_1.Lang = {
                Title: 'BrWebHost',
                TitleScriptAgent: 'BWH Script Agent',
                Property: 'Property',
                RemoteControl: 'Remote Control',
                Name: 'Name',
                Color: 'Color',
                Controller: 'Controller',
                Delete: '*Delete*',
                Icon: 'Icon',
                Code: 'Code',
                IconColor: 'Icon / Color',
                Learn: 'Learn',
                Test: 'Test',
                Scene: 'Combination',
                Operation: 'Operation',
                TimerEnable: 'Timer Enable',
                Enable: 'Enable',
                StartTime: 'Start Time',
                WeekdayAction: 'Weekday Action',
                Sunday: 'Sunday',
                Monday: 'Monday',
                Tuesday: 'Tuesday',
                Wednesday: 'Wednesday',
                Thursday: 'Thursday',
                Friday: 'Friday',
                Saturday: 'Saturday',
                SelectRemote: 'Select<br/>Remote',
                SelectButton: 'Select<br/>Button',
                Wait: 'Wait:',
                Sec: 'Sec',
                Excellent: 'Excellent',
                Good: 'Good',
                Normal: 'Normal',
                Bad: 'Bad',
                Unknown: 'Unknown',
                Dark: 'Dark',
                Dim: 'Dim',
                Bright: 'Bright',
                Quiet: 'Quiet',
                Noisy: 'Noisy',
                NewRemoteControl: 'New Remote Control',
                NewScene: 'New Combination',
                NewTimer: 'New Timer',
                ToggleAssigns: 'Toggle Assigns',
                MainPanelToggleOn: 'Main-Panel Toggle ON',
                MainPanelToggleOff: 'Main-Panel Toggle OFF',
                SelectColor: 'Select Color',
                ToDaily: 'To Daily',
                ToHourly: 'To Hourly',
                Temp: 'Temp.',
                Hudimity: 'Hudimity',
                Voc: 'Voc',
                Light: 'Light',
                Brightness: 'Brightness',
                Noise: 'Noise',
                MacAddress: 'MAC Address',
                Script: 'Script',
                RemoteScript: 'Remote Script',
                SelectIcon: 'Select Icon',
                SelectRemoteControl: 'Select Remote Control',
                SelectNewOperation: 'Select New Operation',
                Tv: 'TV',
                Av: 'AV',
                Free: 'Free',
                Wol: 'WoL',
                Remote: 'Remote',
                Timer: 'Timer',
                ThisRemoteControlWillBeRemoved: 'This Remote Control will be REMOVED.<br/>Are you ok?',
                ThisButtonWillBeRemoved: 'This Button will be removed.<br/>Are you ok?',
                ThisSceneWillBeRemoved: 'This Combination will be REMOVED.<br/>Are you ok?',
                ThisTimerWillBeRemoved: 'This Timer will be REMOVED.<br/>Are you ok?',
                NoButtonsSaveOk: 'No buttons.<br/>Save OK?',
                NoOperationsSaveOk: 'No operations.<br/>Save OK?',
                SaveFailureServerOnline: 'Ouch! Save Failure.<br/>Server online?',
                SelectYourRmDevice: 'Select your Rm-Device.<br />Click Header.',
                SetRemoteControlHead: 'Set Remote Control head to Rm,<br/> and Push target Button.',
                ClickHeader: 'Click Header.',
                GoEdit: 'Go Edit.',
                SelectYourRmDevicePart: 'Select your Rm-Device,<br/>',
                ClickLearnButton: 'Click Learn-Button.',
                LearnYourRemoteControlButtonPart: 'Learn your Remote Control Button.<br/>',
                UnexpectedOperation: 'Unexpected Operation...?',
                SetMacAddressGoEdit: 'Set MAC-Address,<br/>Go Edit.',
                WriteScriptGoEdit: 'Write Script,<br/>Go Edit.',
                SelectRemoteScriptGoEdit: 'Select Remote Script,<br/>Go Edit.',
                UnexpectedControlNotFound: 'Unexpected...Control not Found.',
                RmControllerNotSelected: 'Rm-Controller not selected.',
                InvalidProntoCode: 'Code is Invalid, Retry to Learn.',
                MacAddressNotSetted: 'MAC Address not setted.',
                InvalidMacChar: 'MAC Address Charactor is Invalid.',
                InvalidMacFormat: 'MAC Address Format is Invalid.',
                ScriptNull: 'Script has not been entered.',
                RemoteScriptNull: 'Remote Script not selected.',
                CheckYourInput: 'Check your input.',
                ErrorsAndWarnings: 'Errors and Warnings',
                Errors: 'Errors',
                Warnings: 'Warnings',
                SaveAnyway: 'Save anyway?',
                NoOperations: 'No Operations.',
                OperationNotSelected: 'Operation not selected.',
                OperationDetailNotSelected: 'Operation-Detail not selected.',
                EnableButWeekdayNotSelected: 'Timer Enable, but Weekday not selected.',
            };
            function InitLang() {
                var lang = (window.navigator.languages && window.navigator.languages[0])
                    || window.navigator.language
                    || window.navigator.userLanguage
                    || window.navigator.browserLanguage;
                // 言語取得できないとき、デフォルト
                if (!lang)
                    return;
                var langFull = lang.toLowerCase();
                var langCode = langFull.substr(0, 2);
                // 標準は英語
                _.extend(Lang_1.Lang, Lang_1.En);
                switch (langCode) {
                    case 'ja':
                        // 日本語
                        _.extend(Lang_1.Lang, Lang_1.Ja);
                        break;
                    case 'zh':
                        // 中国語
                        if (langFull === 'zh-cn') {
                            // 大陸
                            _.extend(Lang_1.Lang, Lang_1.ZhCn);
                        }
                        break;
                    default:
                        break;
                }
            }
            Lang_1.InitLang = InitLang;
        })(Lang = Items.Lang || (Items.Lang = {}));
    })(Items = App.Items || (App.Items = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/PageView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Events/PageViewEvents.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../Controls/HeaderBarView.ts" />
/// <reference path="../../Items/Color.ts" />
/// <reference path="../../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_2) {
        var Pages;
        (function (Pages) {
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var Controls = App.Views.Controls;
            var Color = App.Items.Color;
            var Lang = App.Items.Lang.Lang;
            var MainPageView = /** @class */ (function (_super) {
                __extends(MainPageView, _super);
                function MainPageView() {
                    var _this = _super.call(this) || this;
                    _this.HeaderBar = new Controls.HeaderBarView();
                    _this.SetClassName('MainPageView');
                    var background = new Views.ImageView();
                    background.SetAnchor(0, 0, 0, 0);
                    background.FitPolicy = Property.FitPolicy.Cover;
                    background.Src = 'images/Pages/Main/background.jpg';
                    _this.Add(background);
                    _this.HeaderBar.Text = Lang.TitleScriptAgent;
                    _this.HeaderBar.LeftButton.Hide(0);
                    _this.Add(_this.HeaderBar);
                    _this.ControlSetPanel = new Views.StuckerBoxView();
                    _this.ControlSetPanel.HasBorder = true;
                    _this.ControlSetPanel.BorderRadius = 0;
                    _this.ControlSetPanel.BackgroundColor = Color.Transparent;
                    _this.ControlSetPanel.Color = Color.MainBackground;
                    _this.ControlSetPanel.SetAnchor(70, 10, 10, 16);
                    _this.ControlSetPanel.ReferencePoint = Property.ReferencePoint.LeftTop;
                    _this.Add(_this.ControlSetPanel);
                    var iconRights = new Views.HtmlView('a');
                    iconRights.SetSize(235, 16);
                    iconRights.SetAnchor(null, null, 5, 2);
                    iconRights.Color = '#9d9e9e';
                    iconRights.InnerHtml = 'Icon designed by Lucy G from Flaticon';
                    iconRights.Dom.style.fontSize = '12px';
                    iconRights.Elem.attr('href', 'https://www.flaticon.com/packs/free-basic-ui-elements');
                    iconRights.Elem.attr('target', '_blank');
                    _this.Add(iconRights);
                    return _this;
                }
                return MainPageView;
            }(Fw.Views.PageView));
            Pages.MainPageView = MainPageView;
        })(Pages = Views_2.Pages || (Views_2.Pages = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Events/ButtonViewEvents.ts" />
var App;
(function (App) {
    var Events;
    (function (Events) {
        var Controls;
        (function (Controls) {
            var ControlButtonViewEventsClass = /** @class */ (function (_super) {
                __extends(ControlButtonViewEventsClass, _super);
                function ControlButtonViewEventsClass() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.EditOrdered = 'EditOrdered';
                    _this.ExecOrdered = 'ExecOrdered';
                    return _this;
                }
                return ControlButtonViewEventsClass;
            }(Fw.Events.ButtonViewEventsClass));
            Controls.ControlButtonViewEventsClass = ControlButtonViewEventsClass;
            Controls.ControlButtonViewEvents = new ControlButtonViewEventsClass();
        })(Controls = Events.Controls || (Events.Controls = {}));
    })(Events = App.Events || (App.Events = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Controllers/ControllerBase.ts" />
/// <reference path="../../Fw/Controllers/Manager.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/Events/ControlViewEvents.ts" />
/// <reference path="../../Fw/Events/EntityEvents.ts" />
/// <reference path="../../Fw/Events/ButtonViewEvents.ts" />
/// <reference path="../../Fw/Views/Property/FitPolicy.ts" />
/// <reference path="../Views/Pages/MainPageView.ts" />
/// <reference path="../Events/Controls/ControlButtonViewEvents.ts" />
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var Dump = Fw.Util.Dump;
        var Pages = App.Views.Pages;
        var ItemSelectControllerBase = /** @class */ (function (_super) {
            __extends(ItemSelectControllerBase, _super);
            function ItemSelectControllerBase(controllerId) {
                var _this = _super.call(this, controllerId) || this;
                _this.SetPageView(new Pages.ItemSelectPageView());
                _this.SetClassName('ItemSelectController');
                _this._isParentModal = false;
                return _this;
            }
            ItemSelectControllerBase.prototype.Select = function (parentController) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.Log('ShowSelector');
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.Log('ShowSelector.Promise');
                                _this._parentController = parentController;
                                _this._isParentModal = _this._parentController.View.IsModal;
                                _this._resolve = resolve;
                                _this.ShowModal();
                            })];
                    });
                });
            };
            ItemSelectControllerBase.prototype.Commit = function (selectedItem) {
                this.Log('Commit: ' + selectedItem);
                //console.log(this._resolve);
                if (!this._parentController || !this._resolve)
                    throw new Error('Exec Select');
                try {
                    this._resolve(selectedItem);
                }
                catch (e) {
                    this.Log('ERROR!');
                    Dump.ErrorLog(e);
                }
                this._resolve = null;
                this.Reset();
            };
            ItemSelectControllerBase.prototype.Cancel = function () {
                this.Log('Cancel');
                if (!this._parentController || !this._resolve)
                    throw new Error('Exec Select');
                try {
                    this._resolve(null);
                }
                catch (e) {
                    this.Log('ERROR!');
                    Dump.ErrorLog(e);
                }
                this._resolve = null;
                this.Reset();
            };
            ItemSelectControllerBase.prototype.HideModal = function () {
                this.Log('HideModal');
                _super.prototype.HideModal.call(this);
                if (this._resolve) {
                    this._resolve(null);
                    this._resolve = null;
                }
            };
            ItemSelectControllerBase.prototype.Reset = function () {
                this.Log('Reset');
                this._resolve = null;
                this.HideModal();
                if (this._isParentModal)
                    this._parentController.ShowModal();
                this._parentController = null;
            };
            return ItemSelectControllerBase;
        }(Fw.Controllers.ControllerBase));
        Controllers.ItemSelectControllerBase = ItemSelectControllerBase;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            /**
             * @description 配置基準
             */
            var PositionPolicy;
            (function (PositionPolicy) {
                /**
                 * 中央ポリシー：親Viewの中心位置からの差分を X, Y で表現する。
                 */
                PositionPolicy[PositionPolicy["Centering"] = 1] = "Centering";
                /**
                 * 左上ポリシー：親Viewの左上からの差分を、Left, Top で表現する。
                 */
                PositionPolicy[PositionPolicy["LeftTop"] = 2] = "LeftTop";
            })(PositionPolicy = Property.PositionPolicy || (Property.PositionPolicy = {}));
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Events/ViewEvents.ts" />
/// <reference path="../../Util/Dump.ts" />
/// <reference path="../../Util/Num.ts" />
/// <reference path="PositionPolicy.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            var Events = Fw.Events.ViewEvents;
            var Num = Fw.Util.Num;
            var Position = /** @class */ (function () {
                function Position(view) {
                    if (view === void 0) { view = null; }
                    this._view = null;
                    this._policy = Property.PositionPolicy.Centering;
                    this._x = 0;
                    this._y = 0;
                    this._left = 0;
                    this._top = 0;
                    this._view = view;
                }
                Position.Distance = function (pos1, pos2) {
                    var addX = Math.abs(pos1.X - pos2.X);
                    var addY = Math.abs(pos1.Y - pos2.Y);
                    return addX + addY;
                };
                Position.DistanceX = function (pos1, pos2) {
                    var addX = Math.abs(pos1.X - pos2.X);
                    return addX;
                };
                Position.DistanceY = function (pos1, pos2) {
                    var addY = Math.abs(pos1.Y - pos2.Y);
                    return addY;
                };
                Object.defineProperty(Position.prototype, "Policy", {
                    get: function () {
                        return this._policy;
                    },
                    set: function (value) {
                        if (!value)
                            throw new Error("value type not allowed");
                        var changed = (this._policy !== value);
                        if (changed && this._view && this._view.Parent) {
                            if (this._policy === Property.PositionPolicy.Centering) {
                                // 更新前が中央ポリシーのとき
                                // 現在の値を左上ポリシー値に計算して保持させる。
                                this._left = this.Left || 0;
                                this._top = this.Top || 0;
                            }
                            else {
                                // 更新前が左上ポリシーのとき
                                // 現在の値を中央ポリシー値に計算して保持させる。
                                this._x = this.X || 0;
                                this._y = this.Y || 0;
                            }
                        }
                        this._policy = value;
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.PositionPolicyChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Position.prototype, "X", {
                    get: function () {
                        if (this._policy === Property.PositionPolicy.Centering) {
                            // 中央ポリシー
                            return this._x;
                        }
                        else {
                            // 左上ポリシー
                            if (!this._view)
                                return null;
                            var sset = this.GetSizeSet();
                            return sset.MyHalfWidth + this._left - sset.ParentHalfWidth;
                        }
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = false;
                        if (this._policy === Property.PositionPolicy.Centering) {
                            // 中央ポリシー
                            changed = (this._x !== value);
                            this._x = value;
                        }
                        else {
                            // 左上ポリシー
                            var sset = this.GetSizeSet();
                            // 更新後のLeftを取得
                            var newValue = sset.ParentHalfWidth - sset.MyHalfWidth + value;
                            changed = (this._left !== newValue);
                            this._left = newValue;
                        }
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.PositionChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Position.prototype, "Y", {
                    get: function () {
                        if (this._policy === Property.PositionPolicy.Centering) {
                            // 中央ポリシー
                            return this._y;
                        }
                        else {
                            // 左上ポリシー
                            if (!this._view)
                                return null;
                            var sset = this.GetSizeSet();
                            return sset.MyHalfHeight + this._top - sset.ParentHalfHeight;
                        }
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = false;
                        if (this._policy === Property.PositionPolicy.Centering) {
                            // 中央ポリシー
                            changed = (this._y !== value);
                            this._y = value;
                        }
                        else {
                            // 左上ポリシー
                            var sset = this.GetSizeSet();
                            // 更新後のTopを取得
                            var newValue = sset.ParentHalfHeight - sset.MyHalfHeight + value;
                            changed = (this._top !== newValue);
                            this._top = newValue;
                        }
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.PositionChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Position.prototype, "Left", {
                    get: function () {
                        if (this._policy === Property.PositionPolicy.Centering) {
                            // 中央ポリシー
                            if (!this._view)
                                return null;
                            var sset = this.GetSizeSet();
                            return sset.ParentHalfWidth - sset.MyHalfWidth + this._x;
                        }
                        else {
                            // 左上ポリシー
                            return this._left;
                        }
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = false;
                        if (this._policy === Property.PositionPolicy.Centering) {
                            // 中央ポリシー
                            var sset = this.GetSizeSet();
                            // 更新後のXを取得
                            var newValue = sset.MyHalfWidth + value - sset.ParentHalfWidth;
                            changed = (this._x !== newValue);
                            this._x = newValue;
                        }
                        else {
                            // 左上ポリシー
                            changed = (this._left !== value);
                            this._left = value;
                        }
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.PositionChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Position.prototype, "Top", {
                    get: function () {
                        if (this._policy === Property.PositionPolicy.Centering) {
                            // 中央ポリシー
                            if (!this._view)
                                return null;
                            var sset = this.GetSizeSet();
                            return sset.ParentHalfHeight - sset.MyHalfHeight + this._y;
                        }
                        else {
                            // 左上ポリシー
                            return this._top;
                        }
                    },
                    set: function (value) {
                        // nullは許可、その他は例外
                        if (Num.IsNaN(value) || value === undefined)
                            throw new Error("value type not allowed");
                        var changed = false;
                        if (this._policy === Property.PositionPolicy.Centering) {
                            // 中央ポリシー
                            var sset = this.GetSizeSet();
                            // 更新後のYを取得
                            var newValue = sset.MyHalfHeight + value - sset.ParentHalfHeight;
                            changed = (this._y !== newValue);
                            this._y = newValue;
                        }
                        else {
                            // 左上ポリシー
                            changed = (this._top !== value);
                            this._top = value;
                        }
                        if (changed && this._view)
                            this._view.DispatchEvent(Events.PositionChanged);
                    },
                    enumerable: true,
                    configurable: true
                });
                Position.prototype.GetSizeSet = function () {
                    return new SizeSet(this._view);
                };
                Position.prototype.Dispose = function () {
                    this._view = null;
                    this._x = null;
                    this._y = null;
                };
                return Position;
            }());
            Property.Position = Position;
            var SizeSet = /** @class */ (function () {
                function SizeSet(view) {
                    if (!view) {
                        this.ParentHalfWidth = 0;
                        this.ParentHalfHeight = 0;
                        this.MyHalfWidth = 0;
                        this.MyHalfHeight = 0;
                    }
                    else {
                        var parentWidth = void 0;
                        var parentHeight = void 0;
                        if (view.Parent) {
                            // 親Viewが存在する
                            parentWidth = view.Parent.Size.Width;
                            parentHeight = view.Parent.Size.Height;
                        }
                        else {
                            // 親Viewが存在しない
                            var parent_1 = $(view.Elem.parent());
                            parentWidth = parent_1.width();
                            parentHeight = parent_1.height();
                        }
                        this.ParentHalfWidth = parentWidth / 2;
                        this.ParentHalfHeight = parentHeight / 2;
                        this.MyHalfWidth = view.Size.Width / 2;
                        this.MyHalfHeight = view.Size.Height / 2;
                    }
                }
                return SizeSet;
            }());
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Events/ViewEvents.ts" />
/// <reference path="../../Util/Dump.ts" />
/// <reference path="Position.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            var Position = Fw.Views.Property.Position;
            var MouseLocation = /** @class */ (function () {
                function MouseLocation(e) {
                    if (e.pageX === undefined) {
                        // イベントパラメータから取得できないとき
                        // タッチイベントの座標取得を試みる。
                        try {
                            var ct = event.changedTouches[0];
                            this.PageX = ct.pageX;
                            this.PageY = ct.pageY;
                            this.ClientX = ct.clientX;
                            this.ClientY = ct.clientY;
                            this.OffsetX = ct.offsetX;
                            this.OffsetY = ct.offsetY;
                            this.ScreenX = ct.screenX;
                            this.ScreenY = ct.screenY;
                        }
                        catch (e) {
                            // イベント引数もタッチイベントもダメなとき、例外 //全てnull
                            throw new Error('Cannot find location');
                            //this.PageX = null;
                            //this.PageY = null;
                            //this.ClientX = null;
                            //this.ClientY = null;
                            //this.OffsetX = null;
                            //this.OffsetY = null;
                            //this.ScreenX = null;
                            //this.ScreenY = null;
                        }
                    }
                    else {
                        // イベントパラメータから取得できたとき
                        this.PageX = e.pageX;
                        this.PageY = e.pageY;
                        this.ClientX = e.clientX;
                        this.ClientY = e.clientY;
                        this.OffsetX = e.offsetX;
                        this.OffsetY = e.offsetY;
                        this.ScreenX = e.screenX;
                        this.ScreenY = e.screenY;
                    }
                }
                MouseLocation.Create = function (e) {
                    return new MouseLocation(e);
                };
                MouseLocation.GetPosition = function (e) {
                    var loc = new MouseLocation(e);
                    var result = new Position();
                    result.X = loc.ClientX;
                    result.Y = loc.ClientY;
                    return result;
                };
                return MouseLocation;
            }());
            Property.MouseLocation = MouseLocation;
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ControlViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="../Util/Num.ts" />
/// <reference path="./BoxView.ts" />
/// <reference path="Property/MouseLocation.ts" />
/// <reference path="Property/Position.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Events = Fw.Events.ControlViewEvents;
        var MouseLocation = Fw.Views.Property.MouseLocation;
        var Position = Fw.Views.Property.Position;
        var ControlView = /** @class */ (function (_super) {
            __extends(ControlView, _super);
            function ControlView() {
                var _this = _super.call(this) || this;
                _this._clickEventTimer = null;
                _this._cvMouseStartPosition = new Views.Property.Position();
                _this._cvMouseLatestPosition = new Views.Property.Position();
                _this._label = $('<span class="ControlViewProperty"></span>');
                _this.SetClassName('ControlView');
                _this.Elem.addClass(_this.ClassName);
                // プロパティsetterを一度通しておく。
                _this.HasBorder = true;
                _this.BorderRadius = 5;
                _this.Elem.append(_this._label);
                // touch系イベントはmouse系と重複して発生するため、リッスンしない。
                _this.Elem.on('mousedown', function (e) {
                    //this.Log(`mousedown`);
                    if (_this._clickEventTimer != null)
                        clearTimeout(_this._clickEventTimer);
                    _this._cvMouseStartPosition = MouseLocation.GetPosition(e);
                    _this._cvMouseLatestPosition = MouseLocation.GetPosition(e);
                    _this._clickEventTimer = setTimeout(function () {
                        _this._clickEventTimer = null;
                        // マウス位置が動いてないなら、ロングタップとする。
                        if (Position.Distance(_this._cvMouseStartPosition, _this._cvMouseLatestPosition) < 15) {
                            // ロングタップイベント
                            Dump.Log('longtapped');
                            _this.DispatchEvent(Events.LongClick);
                        }
                    }, 1000);
                });
                _this.Elem.on('mousemove', function (e) {
                    //this.Log(`mousemove`);
                    _this._cvMouseLatestPosition = MouseLocation.GetPosition(e);
                });
                _this.Elem.on('mouseup', function (e) {
                    //this.Log(`mouseup`);
                    _this._cvMouseLatestPosition = MouseLocation.GetPosition(e);
                    if (_this._clickEventTimer != null) {
                        // ロングタップ検出中のとき
                        clearTimeout(_this._clickEventTimer);
                        _this._clickEventTimer = null;
                        // マウス位置が動いてないなら、シングルタップとする。
                        if (Position.Distance(_this._cvMouseStartPosition, _this._cvMouseLatestPosition) < 15) {
                            // シングルタップイベント処理
                            _this.Log('singletapped');
                            _this.DispatchEvent(Events.SingleClick);
                        }
                    }
                });
                _this.Elem.on('mouseout', function (e) {
                    if (_this._clickEventTimer != null) {
                        // ロングタップ検出中のとき
                        clearTimeout(_this._clickEventTimer);
                        _this._clickEventTimer = null;
                        //this.Log('tap canceled');
                    }
                });
                return _this;
            }
            Object.defineProperty(ControlView.prototype, "Text", {
                get: function () {
                    return this._label.html();
                },
                set: function (value) {
                    this._label.html(value);
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            ControlView.prototype.SetAnimatedJello = function () {
                this.SetAnimatedClass('jello');
            };
            ControlView.prototype.SetAnimatedPulse = function () {
                this.SetAnimatedClass('pulse faster');
            };
            ControlView.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
                this._label = null;
                this._clickEventTimer = null;
            };
            return ControlView;
        }(Views.BoxView));
        Views.ControlView = ControlView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ControlViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="ControlView.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Events = Fw.Events.ControlViewEvents;
        var ButtonView = /** @class */ (function (_super) {
            __extends(ButtonView, _super);
            function ButtonView() {
                var _this = _super.call(this) || this;
                _this._imageView = new Views.ImageView();
                _this.SetClassName('ButtonView');
                _this.Elem.addClass(_this.ClassName);
                _this.BackgroundColor = '#add8e6';
                _this.HoverColor = '#6495ed';
                _this._imageView.Src = '';
                _this._imageView.FitPolicy = Views.Property.FitPolicy.Contain;
                _this.Add(_this._imageView);
                _this.Elem.on('mouseenter', function () {
                    _this.Dom.style.backgroundColor = _this.HoverColor;
                });
                _this.Elem.on('mouseleave', function () {
                    _this.Dom.style.backgroundColor = _this.BackgroundColor;
                });
                _this.AddEventListener(Events.SingleClick, function () {
                    _this.SetAnimatedPulse();
                });
                _this.AddEventListener(Events.LongClick, function () {
                    _this.SetAnimatedPulse();
                });
                return _this;
            }
            Object.defineProperty(ButtonView.prototype, "ImageSrc", {
                get: function () {
                    return this._imageView.Src;
                },
                set: function (value) {
                    this._imageView.Src = value;
                    if (!value || value === '') {
                        this._imageView.Hide(0);
                    }
                    else {
                        this._imageView.Show(0);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ButtonView.prototype, "ImageFitPolicy", {
                get: function () {
                    return this._imageView.FitPolicy;
                },
                set: function (value) {
                    this._imageView.FitPolicy = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            ButtonView.prototype.CalcLayout = function () {
                try {
                    this.SuppressLayout();
                    this._imageView.SuppressLayout();
                    this._imageView.Size.Width = this.Size.Width;
                    this._imageView.Size.Height = this.Size.Height;
                    _super.prototype.CalcLayout.call(this);
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                    this._imageView.ResumeLayout();
                }
            };
            ButtonView.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
                this._imageView = null;
                this.HoverColor = null;
            };
            return ButtonView;
        }(Views.ControlView));
        Views.ButtonView = ButtonView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="../Events/ControlViewEvents.ts" />
/// <reference path="ButtonView.ts" />
/// <reference path="Property/MouseLocation.ts" />
/// <reference path="Property/Position.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Events = Fw.Events.ControlViewEvents;
        var MouseLocation = Fw.Views.Property.MouseLocation;
        var Position = Fw.Views.Property.Position;
        var RelocatableButtonView = /** @class */ (function (_super) {
            __extends(RelocatableButtonView, _super);
            function RelocatableButtonView() {
                var _this = _super.call(this) || this;
                _this._isRelocatable = false;
                _this._clickEventLocalTimer = null;
                _this._isMouseMoveEventListened = false;
                _this._isDragging = false;
                _this._mouseDownTime = null;
                _this._gridSize = 60;
                /**
                 * @description 配置時の左／上マージン。LeftTop配置時のみ有効。
                 */
                _this._margin = 0;
                _this._delayedResumeTimer = null;
                _this._shadow = $('<div class="IView BoxView Shadow"></div>');
                _this._rbvMouseStartPosition = new Views.Property.Position();
                _this._rbvMouseLatestPosition = new Views.Property.Position();
                _this._rbvViewStartPosition = new Views.Property.Position();
                _this.SetClassName('RelocatableControlView');
                _this.Elem.addClass(_this.ClassName);
                _this.AddEventListener(Events.LongClick, function (e) {
                    if (!_this._isRelocatable)
                        _this.SetRelocatable(true);
                });
                // ControlViewのマウスイベントを破棄、クリック等は独自実装する。
                _this.Elem.off('mousedown mouseup mouseout');
                _this.Elem.on('mousedown', function (e) {
                    _this._isDragging = (_this._isRelocatable)
                        ? true
                        : false;
                    // 再配置処理中のとき、親Viewにマウスイベントを伝播させない。
                    if (_this._isRelocatable && _this._isDragging) {
                        e.stopPropagation();
                    }
                    _this._rbvMouseStartPosition = MouseLocation.GetPosition(e);
                    _this._rbvMouseLatestPosition = MouseLocation.GetPosition(e);
                    if (_this.Position.Policy === Views.Property.PositionPolicy.Centering) {
                        _this._rbvViewStartPosition.X = _this.Position.X;
                        _this._rbvViewStartPosition.Y = _this.Position.Y;
                    }
                    else {
                        _this._rbvViewStartPosition.X = _this.Position.Left;
                        _this._rbvViewStartPosition.Y = _this.Position.Top;
                    }
                    if (_this._clickEventLocalTimer != null)
                        clearTimeout(_this._clickEventLocalTimer);
                    _this._clickEventLocalTimer = setTimeout(function () {
                        // ロングタップイベント
                        _this._clickEventLocalTimer = null;
                        if (!_this._isRelocatable
                            && Position.Distance(_this._rbvMouseStartPosition, _this._rbvMouseLatestPosition) < 15) {
                            _this.DispatchEvent(Events.LongClick);
                        }
                    }, 1000);
                });
                // ↓mouseoutイベントは捕捉しない。途切れまくるので。
                _this.Elem.on('mouseup', function (e) {
                    _this._rbvMouseLatestPosition = MouseLocation.GetPosition(e);
                    // 再配置処理中のとき、親Viewにマウスイベントを伝播させない。
                    if (_this._isRelocatable && _this._isDragging) {
                        e.stopPropagation();
                    }
                    if (!_this._isRelocatable) {
                        _this._isDragging = false;
                    }
                    else {
                        _this._isDragging = false;
                        if (_this.Position.Policy === Views.Property.PositionPolicy.Centering) {
                            _this.Position.X = Math.round(_this.Position.X / _this.GridSize) * _this.GridSize;
                            _this.Position.Y = Math.round(_this.Position.Y / _this.GridSize) * _this.GridSize;
                        }
                        else {
                            _this.Position.Left = (Math.round(_this.Position.Left / _this.GridSize) * _this.GridSize) + _this._margin;
                            _this.Position.Top = (Math.round(_this.Position.Top / _this.GridSize) * _this.GridSize) + _this._margin;
                        }
                        _this.Refresh();
                    }
                    if (_this._clickEventLocalTimer != null) {
                        // ロングタップ検出中のとき
                        clearTimeout(_this._clickEventLocalTimer);
                        _this._clickEventLocalTimer = null;
                        if (Position.Distance(_this._rbvMouseStartPosition, _this._rbvMouseLatestPosition) < 15) {
                            _this.DispatchEvent(Events.SingleClick);
                        }
                    }
                });
                _this.Elem.on('mouseout', function (e) {
                    if (_this._clickEventLocalTimer != null) {
                        // ロングタップ検出中のとき
                        clearTimeout(_this._clickEventLocalTimer);
                        _this._clickEventLocalTimer = null;
                    }
                });
                var onMouseMove = _this.OnMouseMove.bind(_this);
                _this.AddEventListener(Events.Attached, function () {
                    var parent = $(_this.Elem.parent());
                    if (parent.length <= 0 || _this._isMouseMoveEventListened)
                        return;
                    parent.on('touchmove mousemove', onMouseMove);
                    _this._isMouseMoveEventListened = true;
                });
                _this.AddEventListener(Events.Detached, function () {
                    var parent = $(_this.Elem.parent());
                    if (parent.length <= 0 || !_this._isMouseMoveEventListened)
                        return;
                    parent.off('touchmove mousemove', onMouseMove);
                    _this._isMouseMoveEventListened = false;
                });
                return _this;
            }
            Object.defineProperty(RelocatableButtonView.prototype, "IsRelocatable", {
                get: function () {
                    return this._isRelocatable;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RelocatableButtonView.prototype, "GridSize", {
                get: function () {
                    return this._gridSize;
                },
                set: function (value) {
                    this._gridSize = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RelocatableButtonView.prototype, "Margin", {
                get: function () {
                    return this._margin;
                },
                set: function (value) {
                    this._margin = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            RelocatableButtonView.prototype.OnMouseMove = function (e) {
                //this.Log('RelocatableButtonView.OnMouseMove');
                this._rbvMouseLatestPosition = MouseLocation.GetPosition(e);
                if (this._isRelocatable && this._isDragging) {
                    // 再配置処理中のとき、親Viewにマウスイベントを伝播させない。
                    e.stopPropagation();
                    var ml = MouseLocation.Create(e);
                    var addX = ml.ClientX - this._rbvMouseStartPosition.X;
                    var addY = ml.ClientY - this._rbvMouseStartPosition.Y;
                    if (this.Position.Policy === Views.Property.PositionPolicy.Centering) {
                        this.Position.X = this._rbvViewStartPosition.X + addX;
                        this.Position.Y = this._rbvViewStartPosition.Y + addY;
                    }
                    else {
                        this.Position.Left = this._rbvViewStartPosition.X + addX;
                        this.Position.Top = this._rbvViewStartPosition.Y + addY;
                    }
                    // マウスボタン押下中のクリックイベント発火を抑止する。
                    if (!this.IsSuppressedEvent(Events.LongClick))
                        this.SuppressEvent(Events.LongClick);
                    if (!this.IsSuppressedEvent(Events.SingleClick))
                        this.SuppressEvent(Events.SingleClick);
                    Fw.Root.Instance.SetTextSelection(false);
                    this.DelayedResume();
                }
            };
            RelocatableButtonView.prototype.DelayedResume = function () {
                var _this = this;
                if (this._delayedResumeTimer !== null) {
                    clearTimeout(this._delayedResumeTimer);
                    this._delayedResumeTimer = null;
                }
                this._delayedResumeTimer = setTimeout(function () {
                    //this.Log('ResumeMouseEvents');
                    if (_this.IsSuppressedEvent(Events.LongClick))
                        _this.ResumeEvent(Events.LongClick);
                    if (_this.IsSuppressedEvent(Events.SingleClick))
                        _this.ResumeEvent(Events.SingleClick);
                    Fw.Root.Instance.SetTextSelection(true);
                }, 100);
            };
            RelocatableButtonView.prototype.SetRelocatable = function (relocatable) {
                if (relocatable === true) {
                    // 移動可能にする。
                    this._isRelocatable = true;
                    this.Elem.parent().append(this._shadow);
                }
                else {
                    // 固定する。
                    this._isRelocatable = false;
                    this._shadow.detach();
                }
                this.Refresh();
            };
            RelocatableButtonView.prototype.InnerRefresh = function () {
                try {
                    this.SuppressLayout();
                    var parent_2 = $(this.Elem.parent());
                    if (parent_2.length <= 0)
                        return;
                    var shadowDom = this._shadow.get(0);
                    if (!this._isRelocatable) {
                        shadowDom.style.display = 'none';
                        this.Opacity = 1.0;
                        _super.prototype.InnerRefresh.call(this);
                        return;
                    }
                    this.Opacity = 0.7;
                    _super.prototype.InnerRefresh.call(this);
                    if (this._isDragging) {
                        var parentWidth = (this.Parent)
                            ? this.Parent.Size.Width
                            : parent_2.width();
                        var parentHeight = (this.Parent)
                            ? this.Parent.Size.Height
                            : parent_2.height();
                        var centerLeft = (parentWidth / 2);
                        var centerTop = (parentHeight / 2);
                        var sX = void 0, sY = void 0, sLeft = void 0, sTop = void 0;
                        if (this.Position.Policy === Views.Property.PositionPolicy.Centering) {
                            sX = Math.round(this.Position.X / this.GridSize) * this.GridSize;
                            sY = Math.round(this.Position.Y / this.GridSize) * this.GridSize;
                            sLeft = centerLeft + sX - (this.Size.Width / 2);
                            sTop = centerTop + sY - (this.Size.Height / 2);
                        }
                        else {
                            sX = (Math.round(this.Position.Left / this.GridSize) * this.GridSize) + this._margin;
                            sY = (Math.round(this.Position.Top / this.GridSize) * this.GridSize) + this._margin;
                            sLeft = sX;
                            sTop = sY;
                        }
                        shadowDom.style.display = 'block';
                        shadowDom.style.left = sLeft + "px";
                        shadowDom.style.top = sTop + "px";
                        shadowDom.style.width = this.Size.Width + "px";
                        shadowDom.style.height = this.Size.Height + "px";
                        shadowDom.style.color = "" + this.Color;
                        shadowDom.style.borderColor = "" + this.Color;
                        shadowDom.style.backgroundColor = "" + this.BackgroundColor;
                    }
                    else {
                        shadowDom.style.display = 'none';
                    }
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                }
            };
            RelocatableButtonView.prototype.CalcLayout = function () {
                try {
                    this.SuppressLayout();
                    if (!this._isRelocatable) {
                        if (this.Position.Policy === Views.Property.PositionPolicy.Centering) {
                            this.Position.X = Math.round(this.Position.X / this.GridSize) * this.GridSize;
                            this.Position.Y = Math.round(this.Position.Y / this.GridSize) * this.GridSize;
                        }
                        else {
                            this.Position.Left = (Math.round(this.Position.Left / this.GridSize) * this.GridSize) + this._margin;
                            this.Position.Top = (Math.round(this.Position.Top / this.GridSize) * this.GridSize) + this._margin;
                        }
                    }
                    _super.prototype.CalcLayout.call(this);
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                }
            };
            RelocatableButtonView.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
                this._isRelocatable = null;
                this._shadow.remove();
                this._shadow = null;
                this._isMouseMoveEventListened = null;
                this._isDragging = null;
                this._gridSize = null;
            };
            return RelocatableButtonView;
        }(Views.ButtonView));
        Views.RelocatableButtonView = RelocatableButtonView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/RelocatableButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Events/EntityEvents.ts" />
/// <reference path="../../Items/Color.ts" />
/// <reference path="../../Events/Controls/ControlButtonViewEvents.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_3) {
        var Controls;
        (function (Controls) {
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var Color = App.Items.Color;
            var ItemSelectButtonView = /** @class */ (function (_super) {
                __extends(ItemSelectButtonView, _super);
                function ItemSelectButtonView() {
                    var _this = _super.call(this) || this;
                    _this.Value = null;
                    _this.SetSize(75, 75);
                    _this.Position.Policy = Property.PositionPolicy.LeftTop;
                    _this.HasBorder = true;
                    _this.BorderRadius = 10;
                    _this.BackgroundColor = Color.MainBackground;
                    _this.HoverColor = Color.ButtonHoverColors[0];
                    _this.Color = Color.ButtonColors[0];
                    _this.ImageFitPolicy = Property.FitPolicy.Auto;
                    return _this;
                }
                return ItemSelectButtonView;
            }(Views.ButtonView));
            Controls.ItemSelectButtonView = ItemSelectButtonView;
        })(Controls = Views_3.Controls || (Views_3.Controls = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ItemSelectControllerBase.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/Controllers/Manager.ts" />
/// <reference path="../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../Views/Pages/MainPageView.ts" />
/// <reference path="../Views/Controls/ItemSelectButtonView.ts" />
/// <reference path="../../Fw/Events/ButtonViewEvents.ts" />
/// <reference path="../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ButtonEvents = Fw.Events.ButtonViewEvents;
        var ItemSelectButtonView = App.Views.Controls.ItemSelectButtonView;
        var Lang = App.Items.Lang.Lang;
        var ColorSelectController = /** @class */ (function (_super) {
            __extends(ColorSelectController, _super);
            function ColorSelectController() {
                var _this = _super.call(this, 'ColorSelect') || this;
                _this.SetClassName('ColorSelectController');
                _this._page = _this.View;
                _this._page.Label.Text = Lang.SelectColor;
                _.each(App.Items.Color.ButtonColors, function (color, idx) {
                    var btn = new ItemSelectButtonView();
                    btn.Value = color;
                    btn.Color = color;
                    btn.BackgroundColor = color;
                    btn.HoverColor = App.Items.Color.ButtonHoverColors[idx];
                    btn.AddEventListener(ButtonEvents.SingleClick, function (e) {
                        var button = e.Sender;
                        _this.Commit(button.Value);
                    });
                    _this._page.SelectorPanel.Add(btn);
                });
                return _this;
            }
            return ColorSelectController;
        }(Controllers.ItemSelectControllerBase));
        Controllers.ColorSelectController = ColorSelectController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../../lib/MagnificPopup/index.d.ts" />
/// <reference path="../../../Fw/Views/ButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_4) {
        var Popup;
        (function (Popup) {
            var PopupBase = /** @class */ (function () {
                /**
                 * @description コンストラクタ
                 * @see ポップアップは重複しないため、Singleton実装を強制する。
                 * @param src
                 */
                function PopupBase(jqueryElem) {
                    this.Elem = null;
                    this.MsgElem = null;
                    this._isOpen = false;
                    this.CloseOnContentClick = false;
                    this.CloseOnBgClick = true;
                    this.ShowCloseBtn = true;
                    this.EnableEscapeKey = true;
                    this.SetElem(jqueryElem);
                }
                Object.defineProperty(PopupBase.prototype, "IsOpen", {
                    get: function () {
                        return this._isOpen;
                    },
                    enumerable: true,
                    configurable: true
                });
                PopupBase.prototype.SetElem = function (jqueryElem) {
                    if (!jqueryElem)
                        return;
                    this.Elem = jqueryElem;
                    this.MsgElem = this.Elem.find('.Message');
                };
                PopupBase.prototype.Open = function (params) {
                    var _this = this;
                    // クラスに組み込み済みのプロパティは引数から拾っておく。
                    if (params) {
                        _.each(params, function (val, key) {
                            if (key === 'closeOnContentClick')
                                _this.CloseOnContentClick = (val !== false);
                            if (key === 'showCloseBtn')
                                _this.ShowCloseBtn = (val !== false);
                            if (key === 'closeOnBgClick')
                                _this.CloseOnBgClick = (val !== false);
                            if (key === 'enableEscapeKey')
                                _this.EnableEscapeKey = (val !== false);
                            if (key === 'items' && val && val.src) {
                                if (val.src instanceof jQuery)
                                    _this.Elem = val.src;
                                else
                                    _this.Elem = $(val.src);
                            }
                            if (key === 'Message')
                                _this.MsgElem.html(val);
                        });
                    }
                    var _params = {
                        items: {
                            src: this.Elem,
                        },
                        type: 'inline',
                        closeOnContentClick: this.CloseOnContentClick,
                        showCloseBtn: this.ShowCloseBtn,
                        closeOnBgClick: this.CloseOnBgClick,
                        enableEscapeKey: this.EnableEscapeKey,
                    };
                    if (params)
                        _.extend(_params, params);
                    $.magnificPopup.open(_params);
                    this._isOpen = true;
                };
                PopupBase.prototype.Close = function () {
                    $.magnificPopup.close();
                    this._isOpen = false;
                };
                return PopupBase;
            }());
            Popup.PopupBase = PopupBase;
        })(Popup = Views_4.Popup || (Views_4.Popup = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../../lib/MagnificPopup/index.d.ts" />
/// <reference path="../../../Fw/Views/ButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="PopupBase.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_5) {
        var Popup;
        (function (Popup) {
            var AlertPopup = /** @class */ (function (_super) {
                __extends(AlertPopup, _super);
                function AlertPopup() {
                    var _this = _super.call(this, $('#PtplAlert')) || this;
                    _this.CloseOnContentClick = true;
                    _this.CloseOnBgClick = true;
                    _this.ShowCloseBtn = false;
                    _this.EnableEscapeKey = true;
                    return _this;
                }
                Object.defineProperty(AlertPopup, "Instance", {
                    get: function () {
                        if (!AlertPopup._instance)
                            AlertPopup._instance = new AlertPopup();
                        return AlertPopup._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                AlertPopup._instance = null;
                return AlertPopup;
            }(Popup.PopupBase));
            Popup.AlertPopup = AlertPopup;
            Popup.Alert = AlertPopup.Instance;
        })(Popup = Views_5.Popup || (Views_5.Popup = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Controllers/ControllerBase.ts" />
/// <reference path="../../Fw/Controllers/Manager.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/Events/ControlViewEvents.ts" />
/// <reference path="../../Fw/Events/EntityEvents.ts" />
/// <reference path="../../Fw/Views/Property/FitPolicy.ts" />
/// <reference path="../Views/Pages/MainPageView.ts" />
/// <reference path="../Views/Popup/AlertPopup.ts" />
/// <reference path="../Items/OperationType.ts" />
/// <reference path="../Items/DeviceType.ts" />
/// <reference path="../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var Events = Fw.Events;
        var Pages = App.Views.Pages;
        var Popup = App.Views.Popup;
        var Lang = App.Items.Lang.Lang;
        var ControlHeaderPropertyController = /** @class */ (function (_super) {
            __extends(ControlHeaderPropertyController, _super);
            function ControlHeaderPropertyController() {
                var _this = _super.call(this, 'ControlHeaderProperty') || this;
                _this.SetClassName('ControlHeaderPropertyController');
                _this.SetPageView(new Pages.ControlHeaderPropertyPageView());
                _this._page = _this.View;
                _this._controlSet = null;
                _this._page.TxtName.AddEventListener(Events.InputViewEvents.Changed, function (e) {
                    if (!_this._controlSet)
                        return;
                    _this._controlSet.Name = _this._page.TxtName.Value;
                    _this._controlSet.DispatchChanged();
                });
                _this._page.BtnColor.AddEventListener(Events.ButtonViewEvents.SingleClick, function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var ctr, color;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this._controlSet)
                                    return [2 /*return*/];
                                this.Log('ControlPropertyController.BtnColor.SingleClick');
                                ctr = this.Manager.Get('ColorSelect');
                                return [4 /*yield*/, ctr.Select(this)];
                            case 1:
                                color = _a.sent();
                                this._controlSet.Color = color;
                                this._page.BtnColor.Color = color;
                                this._page.BtnColor.BackgroundColor = color;
                                this._page.BtnColor.HoverColor = App.Items.Color.GetButtonHoverColor(color);
                                this._controlSet.DispatchChanged();
                                return [2 /*return*/];
                        }
                    });
                }); });
                _this._page.SboRm.AddEventListener(Events.InputViewEvents.Changed, function (e) {
                    if (!_this._controlSet)
                        return;
                    if ($.isNumeric(_this._page.SboRm.Value)) {
                        _this._controlSet.BrDeviceId = parseInt(_this._page.SboRm.Value, 10);
                        _this._controlSet.DispatchChanged();
                    }
                });
                _this._page.DeleteButton.AddEventListener(Events.ButtonViewEvents.SingleClick, function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var res, ctr;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this._controlSet)
                                    return [2 /*return*/];
                                return [4 /*yield*/, Popup.Confirm.OpenAsync({
                                        Message: Lang.ThisRemoteControlWillBeRemoved
                                    })];
                            case 1:
                                res = _a.sent();
                                if (res !== true)
                                    return [2 /*return*/];
                                ctr = App.Controllers.CSControllerFactory.Get(this._controlSet);
                                ctr.RemoveControlSet();
                                this._controlSet = null;
                                this.HideModal();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return _this;
            }
            ControlHeaderPropertyController.prototype.SetEntity = function (controlSet) {
                if (!controlSet)
                    return;
                this._controlSet = null;
                this._page.TxtName.Value = controlSet.Name;
                this._page.LabelColor.Show(0);
                this._page.BtnColor.Show(0);
                this._page.LabelRm.Hide(0);
                this._page.SboRm.Hide(0);
                this._page.DeleteButton.Show(0);
                this._page.BtnColor.Color = controlSet.Color;
                this._page.BtnColor.BackgroundColor = controlSet.Color;
                this._page.BtnColor.HoverColor = App.Items.Color.GetButtonHoverColor(controlSet.Color);
                this._controlSet = controlSet;
            };
            return ControlHeaderPropertyController;
        }(Fw.Controllers.ControllerBase));
        Controllers.ControlHeaderPropertyController = ControlHeaderPropertyController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../IEventable.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../EventableBase.ts" />
/// <reference path="../ObjectBase.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="../Events/EntityEvents.ts" />
/// <reference path="IEntity.ts" />
var Fw;
(function (Fw) {
    var Models;
    (function (Models) {
        var Events = Fw.Events.EntityEvents;
        var EntityBase = /** @class */ (function (_super) {
            __extends(EntityBase, _super);
            function EntityBase() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EntityBase.prototype.DispatchChanged = function () {
                this.DispatchEvent(Events.Changed);
            };
            return EntityBase;
        }(Fw.EventableBase));
        Models.EntityBase = EntityBase;
    })(Models = Fw.Models || (Fw.Models = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
var App;
(function (App) {
    var Items;
    (function (Items) {
        /**
         * リモコン機能とボタン配置のテンプレート
         * 注) controlsetテーブルのIDと連動している。
         */
        var ControlSetTemplate;
        (function (ControlSetTemplate) {
            ControlSetTemplate[ControlSetTemplate["Tv"] = 1] = "Tv";
            ControlSetTemplate[ControlSetTemplate["Av"] = 2] = "Av";
            ControlSetTemplate[ControlSetTemplate["Light"] = 3] = "Light";
            ControlSetTemplate[ControlSetTemplate["AirComplessor"] = 4] = "AirComplessor";
            ControlSetTemplate[ControlSetTemplate["SingleControl"] = 8] = "SingleControl";
            ControlSetTemplate[ControlSetTemplate["NoControl"] = 9] = "NoControl";
            /**
             * 以下、UI側では使用しない。
             */
            ControlSetTemplate[ControlSetTemplate["A1Sensor"] = 5] = "A1Sensor";
            ControlSetTemplate[ControlSetTemplate["Sp2Switch"] = 6] = "Sp2Switch";
            ControlSetTemplate[ControlSetTemplate["Sp1Switch"] = 7] = "Sp1Switch";
        })(ControlSetTemplate = Items.ControlSetTemplate || (Items.ControlSetTemplate = {}));
    })(Items = App.Items || (App.Items = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/EntityBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../Items/Color.ts" />
/// <reference path="../../Items/ControlSetTemplate.ts" />
/// <reference path="../../Items/OperationType.ts" />
/// <reference path="../../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Entities;
        (function (Entities) {
            var Color = App.Items.Color;
            var Lang = App.Items.Lang.Lang;
            var ControlSet = /** @class */ (function (_super) {
                __extends(ControlSet, _super);
                function ControlSet() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**
                     * リモコン名
                     */
                    _this.Name = Lang.NewRemoteControl;
                    /**
                     * メインパネルボタン用アイコンURL
                     */
                    _this.IconUrl = 'images/icons/main_av.png';
                    /**
                     * 背景色
                     */
                    _this.Color = Color.ButtonColors[0];
                    /**
                     * メインパネル表示順
                     */
                    _this.Order = 99999;
                    /**
                     * トグルボタン状態
                     */
                    _this.ToggleState = false;
                    /**
                     * メインパネルにボタンを表示するか否か
                     */
                    _this.IsMainPanelReady = false;
                    /**
                     * メインパネルボタンにトグルを表示するか否か
                     */
                    _this.IsTogglable = false;
                    /**
                     * Broadlinkデバイスか否か(≒ ボタン編集可否)
                     */
                    _this.OperationType = 1 /* RemoteControl */;
                    /**
                     * リモコン配置テンプレートか否か
                     */
                    _this.IsTemplate = false;
                    /**
                     * コントロールボタン配列
                     */
                    _this.Controls = [];
                    return _this;
                }
                Object.defineProperty(ControlSet.prototype, "HoverColor", {
                    /**
                     * ホバー色
                     */
                    get: function () {
                        return Color.GetButtonHoverColor(this.Color);
                    },
                    enumerable: true,
                    configurable: true
                });
                ControlSet.prototype.GetControlByCode = function (code) {
                    var result = _.find(this.Controls, function (c) {
                        return (c.Code === code);
                    });
                    if (!result) {
                        //throw new Error('Not Found');
                    }
                    return result;
                };
                return ControlSet;
            }(Fw.Models.EntityBase));
            Entities.ControlSet = ControlSet;
        })(Entities = Models.Entities || (Models.Entities = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/EntityBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../Items/Color.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Entities;
        (function (Entities) {
            var Color = App.Items.Color;
            var Control = /** @class */ (function (_super) {
                __extends(Control, _super);
                function Control() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.Name = '';
                    _this.PositionLeft = 0;
                    _this.PositionTop = 0;
                    _this.IconUrl = '';
                    _this.Color = Color.ButtonColors[0];
                    _this.Code = '';
                    _this.Value = '';
                    _this.IsAssignToggleOn = false;
                    _this.IsAssignToggleOff = false;
                    return _this;
                }
                Object.defineProperty(Control.prototype, "HoverColor", {
                    get: function () {
                        return Color.GetButtonHoverColor(this.Color);
                    },
                    enumerable: true,
                    configurable: true
                });
                return Control;
            }(Fw.Models.EntityBase));
            Entities.Control = Control;
        })(Entities = Models.Entities || (Models.Entities = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/EntityBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Entities;
        (function (Entities) {
            var Script = /** @class */ (function (_super) {
                __extends(Script, _super);
                function Script() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.ControlId = 0;
                    _this.Name = '';
                    return _this;
                }
                return Script;
            }(Fw.Models.EntityBase));
            Entities.Script = Script;
        })(Entities = Models.Entities || (Models.Entities = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Controllers/ControllerBase.ts" />
/// <reference path="../../Fw/Controllers/Manager.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/Events/ControlViewEvents.ts" />
/// <reference path="../../Fw/Events/ButtonViewEvents.ts" />
/// <reference path="../../Fw/Views/Property/FitPolicy.ts" />
/// <reference path="../Models/Entities/ControlSet.ts" />
/// <reference path="../Models/Entities/Control.ts" />
/// <reference path="../Models/Entities/Script.ts" />
/// <reference path="../Items/Color.ts" />
/// <reference path="../Items/OperationType.ts" />
/// <reference path="../Views/Pages/MainPageView.ts" />
/// <reference path="../Views/Popup/AlertPopup.ts" />
/// <reference path="../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var Events = Fw.Events;
        var Pages = App.Views.Pages;
        var Popup = App.Views.Popup;
        var Color = App.Items.Color;
        var ButtonEvents = Fw.Events.ButtonViewEvents;
        var Stores = App.Models.Stores;
        var Lang = App.Items.Lang.Lang;
        var ControlPropertyController = /** @class */ (function (_super) {
            __extends(ControlPropertyController, _super);
            function ControlPropertyController() {
                var _this = _super.call(this, 'ControlProperty') || this;
                _this.SetClassName('ControlPropertyController');
                _this.SetPageView(new Pages.ControlPropertyPageView());
                _this._page = _this.View;
                _this._control = null;
                _this._controlSet = null;
                _this._page.TxtName.AddEventListener(Events.InputViewEvents.Changed, function (e) {
                    _this.ApplyToEntity();
                });
                _this._page.BtnIcon.AddEventListener(ButtonEvents.SingleClick, function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var ctr, icon, url;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this._control)
                                    return [2 /*return*/];
                                ctr = this.Manager.Get('IconSelect');
                                return [4 /*yield*/, ctr.Select(this)];
                            case 1:
                                icon = _a.sent();
                                url = (icon)
                                    ? 'images/icons/' + icon
                                    : null;
                                this._page.BtnIcon.ImageSrc = url;
                                this._page.BtnIcon.Refresh();
                                this.ApplyToEntity();
                                return [2 /*return*/];
                        }
                    });
                }); });
                _this._page.BtnColor.AddEventListener(ButtonEvents.SingleClick, function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var ctr, color;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this._control)
                                    return [2 /*return*/];
                                ctr = this.Manager.Get('ColorSelect');
                                return [4 /*yield*/, ctr.Select(this)];
                            case 1:
                                color = _a.sent();
                                this._page.BtnColor.Color = color;
                                this._page.BtnColor.BackgroundColor = color;
                                this._page.BtnColor.HoverColor = Color.GetButtonHoverColor(color);
                                this.ApplyToEntity();
                                return [2 /*return*/];
                        }
                    });
                }); });
                _this._page.TarCode.AddEventListener(Events.InputViewEvents.Changed, function (e) {
                    _this.ApplyToEntity();
                });
                _this._page.TxtMac.AddEventListener(Events.InputViewEvents.Changed, function (e) {
                    _this.ApplyToEntity();
                });
                _this._page.SboRemote.AddEventListener(Events.InputViewEvents.Changed, function (e) {
                    _this.ApplyToEntity();
                });
                _this._page.BtnSend.AddEventListener(ButtonEvents.SingleClick, function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var ctr;
                    return __generator(this, function (_a) {
                        if (!this._control)
                            return [2 /*return*/];
                        ctr = App.Controllers.CSControllerFactory.Get(this._controlSet);
                        ctr.ExecCode(this._control);
                        return [2 /*return*/];
                    });
                }); });
                _this._page.ChkToggleOn.AddEventListener(Events.InputViewEvents.Changed, function (e) {
                    _this.ApplyToEntity();
                });
                _this._page.ChkToggleOff.AddEventListener(Events.InputViewEvents.Changed, function (e) {
                    _this.ApplyToEntity();
                });
                _this._page.DeleteButton.AddEventListener(ButtonEvents.SingleClick, function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var res, ctr;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this._control)
                                    return [2 /*return*/];
                                return [4 /*yield*/, Popup.Confirm.OpenAsync({
                                        Message: Lang.ThisButtonWillBeRemoved
                                    })];
                            case 1:
                                res = _a.sent();
                                if (res !== true)
                                    return [2 /*return*/];
                                ctr = App.Controllers.CSControllerFactory.Get(this._controlSet);
                                ctr.RemoveControl(this._control);
                                this._control = null;
                                this._controlSet = null;
                                this.HideModal();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return _this;
            }
            ControlPropertyController.prototype.SetEntity = function (control, controlSet) {
                var _this = this;
                // ApplyToEntityを回避するため、一旦nullセット。
                this._control = null;
                this._controlSet = null;
                this._page.TxtName.Value = control.Name;
                this._page.BtnIcon.ImageSrc = control.IconUrl;
                this._page.BtnColor.Color = control.Color;
                this._page.BtnColor.BackgroundColor = control.Color;
                this._page.BtnColor.HoverColor = Color.GetButtonHoverColor(control.Color);
                this._page.ChkToggleOn.BoolValue = control.IsAssignToggleOn;
                this._page.ChkToggleOff.BoolValue = control.IsAssignToggleOff;
                switch (controlSet.OperationType) {
                    case 1 /* RemoteControl */:
                        this._page.LblCode.Text = Lang.Code;
                        this._page.TarCode.Show(0);
                        this._page.TxtMac.Hide(0);
                        this._page.SboRemote.Hide(0);
                        this._page.BtnLearn.Show(0);
                        this._page.TarCode.Value = control.Code;
                        break;
                    case 2 /* BroadlinkDevice */:
                        this._page.LblCode.Text = Lang.Code;
                        this._page.TarCode.Show(0);
                        this._page.TxtMac.Hide(0);
                        this._page.SboRemote.Hide(0);
                        this._page.BtnLearn.Show(0);
                        break;
                    case 3 /* WakeOnLan */:
                        this._page.LblCode.Text = Lang.MacAddress;
                        this._page.TarCode.Hide(0);
                        this._page.TxtMac.Show(0);
                        this._page.SboRemote.Hide(0);
                        this._page.BtnLearn.Hide(0);
                        this._page.TxtMac.Value = control.Code;
                        break;
                    case 4 /* Script */:
                        this._page.LblCode.Text = Lang.Script;
                        this._page.TarCode.Show(0);
                        this._page.TxtMac.Hide(0);
                        this._page.SboRemote.Hide(0);
                        this._page.BtnLearn.Hide(0);
                        this._page.TarCode.Value = control.Code;
                        break;
                    case 5 /* RemoteHostScript */:
                        this._page.LblCode.Text = Lang.RemoteScript;
                        this._page.TarCode.Hide(0);
                        this._page.TxtMac.Hide(0);
                        this._page.SboRemote.Show(0);
                        this._page.BtnLearn.Hide(0);
                        this._page.SboRemote.ClearItems();
                        _.each(Stores.Remotes.List, function (e) {
                            _this._page.SboRemote.AddItem(e.Name, String(e.Id));
                        });
                        if (!control.Code || control.Code === '') {
                            this._page.SboRemote.Value = '';
                        }
                        else {
                            var currentId = Stores.Remotes.GetIdByJson(control.Code);
                            this._page.SboRemote.Value = (currentId)
                                ? String(currentId)
                                : '';
                        }
                        break;
                    case 99 /* Scene */:
                    default:
                        alert('ここにはこないはず');
                        throw new Error('なんでやねん！');
                }
                this._control = control;
                this._controlSet = controlSet;
            };
            ControlPropertyController.prototype.ApplyToEntity = function () {
                if (!this._control || !this._controlSet)
                    return;
                var changed = false;
                if (this._control.Name !== this._page.TxtName.Value) {
                    this._control.Name = this._page.TxtName.Value;
                    changed = true;
                }
                if (this._control.IconUrl !== this._page.BtnIcon.ImageSrc) {
                    this._control.IconUrl = this._page.BtnIcon.ImageSrc;
                    changed = true;
                }
                if (this._control.Color !== this._page.BtnColor.Color) {
                    this._control.Color = this._page.BtnColor.Color;
                    changed = true;
                }
                if (this._control.IsAssignToggleOn !== this._page.ChkToggleOn.BoolValue) {
                    this._control.IsAssignToggleOn = this._page.ChkToggleOn.BoolValue;
                    var ctr = App.Controllers.CSControllerFactory.Get(this._controlSet);
                    ctr.ResetToggleAssign(this._control, true);
                    changed = true;
                }
                if (this._control.IsAssignToggleOff !== this._page.ChkToggleOff.BoolValue) {
                    this._control.IsAssignToggleOff = this._page.ChkToggleOff.BoolValue;
                    var ctr = App.Controllers.CSControllerFactory.Get(this._controlSet);
                    ctr.ResetToggleAssign(this._control, false);
                    changed = true;
                }
                switch (this._controlSet.OperationType) {
                    case 1 /* RemoteControl */:
                        if (this._control.Code !== this._page.TarCode.Value) {
                            this._control.Code = this._page.TarCode.Value;
                            changed = true;
                        }
                        break;
                    case 2 /* BroadlinkDevice */:
                        break;
                    case 3 /* WakeOnLan */:
                        if (this._control.Code !== this._page.TxtMac.Value) {
                            this._control.Code = this._page.TxtMac.Value;
                            changed = true;
                        }
                        break;
                    case 4 /* Script */:
                        if (this._control.Code !== this._page.TarCode.Value) {
                            this._control.Code = this._page.TarCode.Value;
                            changed = true;
                        }
                        break;
                    case 5 /* RemoteHostScript */:
                        var newId = (!this._page.SboRemote.Value || this._page.SboRemote.Value === '')
                            ? null
                            : Stores.Remotes.List[parseInt(this._page.SboRemote.Value, 10)].Id;
                        var currentId = Stores.Remotes.GetIdByJson(this._control.Code);
                        if (newId !== currentId) {
                            if (!newId) {
                                this._control.Code = '';
                            }
                            else {
                                var entity = Stores.Remotes.List[newId];
                                var objCode = {
                                    ControlId: entity.ControlId,
                                    Name: entity.Name,
                                    RemoteHostId: entity.RemoteHostId
                                };
                                this._control.Code = JSON.stringify(objCode);
                            }
                            changed = true;
                        }
                        break;
                    case 99 /* Scene */:
                    default:
                        alert('ここにはこないはず');
                        throw new Error('なんでやねん！');
                }
                if (changed)
                    this._control.DispatchChanged();
            };
            return ControlPropertyController;
        }(Fw.Controllers.ControllerBase));
        Controllers.ControlPropertyController = ControlPropertyController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../IObject.ts" />
/// <reference path="IEntity.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../ObjectBase.ts" />
/// <reference path="IStore.ts" />
/// <reference path="IEntity.ts" />
var Fw;
(function (Fw) {
    var Models;
    (function (Models) {
        var StoreBase = /** @class */ (function (_super) {
            __extends(StoreBase, _super);
            /**
             * Storeは基本的にSingletonであるべき、の方向で。
             */
            function StoreBase() {
                var _this = _super.call(this) || this;
                _this._list = {};
                return _this;
                //this.EnableLog = true;
            }
            Object.defineProperty(StoreBase.prototype, "List", {
                get: function () {
                    return this._list;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StoreBase.prototype, "Length", {
                get: function () {
                    return Object.keys(this._list).length;
                },
                enumerable: true,
                configurable: true
            });
            StoreBase.prototype.Clear = function () {
                this._list = {};
            };
            /**
             * API応答などのオブジェクトをStoreに入れる。
             * @param entity
             */
            StoreBase.prototype.Merge = function (entity) {
                if (entity.Id === null || entity.Id === undefined)
                    throw new Error('Entity on Store requires DB-Registed Id.');
                if (this._list[entity.Id]) {
                    // 既存Entityのとき
                    // API応答はJSONから生成されたオブジェクトで、IEntityコンストラクタを通っていない。
                    // 既存要素はIEntity機能の保持が保障されているため、既存要素の値を更新して保持し続ける。
                    var obj = this._list[entity.Id];
                    var changed = this.ExtendEntity(obj, entity);
                    if (changed)
                        obj.DispatchChanged();
                    return obj;
                }
                else {
                    // 新規Entityのとき
                    // API応答はJSONから生成されたオブジェクトで、IEntityコンストラクタを通っていない。
                    // IEntity機能を持たせた状態でStoreに保持するため、新規生成したインスタンスに値をコピーする。
                    var obj = this.GetNewEntity();
                    this.ExtendEntity(obj, entity);
                    this._list[obj.Id] = obj;
                    return obj;
                }
            };
            StoreBase.prototype.ExtendEntity = function (target, base) {
                var changed = false;
                _.each(base, function (val, key) {
                    var itemName = String(key);
                    var itemType = typeof target[itemName];
                    // IObject, IEventable, IEntity のメンバーは上書きしない。
                    if (itemType === 'function'
                        || itemName.substr(0, 1) === '_'
                        || itemName === 'ClassName'
                        || itemName === 'InstanceId'
                        || itemName === 'ObjectIdentifier'
                        || itemName === 'IsDisposed'
                        || itemName === 'EnableLog'
                        || itemName === 'Elem') {
                        return;
                    }
                    if (target[itemName] !== val) {
                        changed = true;
                        target[itemName] = val;
                    }
                });
                return changed;
            };
            StoreBase.prototype.MergeRange = function (entities) {
                for (var i = 0; i < entities.length; i++)
                    this.Merge(entities[i]);
            };
            return StoreBase;
        }(Fw.ObjectBase));
        Models.StoreBase = StoreBase;
    })(Models = Fw.Models || (Fw.Models = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Util/Dump.ts" />
/// <reference path="../../Util/Obj.ts" />
/// <reference path="../../Config.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var Xhr;
        (function (Xhr) {
            var Dump = Fw.Util.Dump;
            var Config = Fw.Config;
            var Obj = Fw.Util.Obj;
            var Query = /** @class */ (function () {
                function Query() {
                }
                /**
                 * async/await方式
                 * @param params
                 */
                Query.Invoke = function (params) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    // 数値になってしまう。
                                    //let methodToString: string = params.Method.toString().toUpperCase();
                                    var method;
                                    switch (params.Method) {
                                        case Xhr.MethodType.Get:
                                            method = 'GET';
                                            break;
                                        case Xhr.MethodType.Post:
                                            method = 'POST';
                                            break;
                                        case Xhr.MethodType.Put:
                                            method = 'PUT';
                                            break;
                                        case Xhr.MethodType.Delete:
                                            method = 'DELETE';
                                            break;
                                        default: method = 'POST';
                                    }
                                    var data = (params.Values)
                                        ? Obj.FormatSilializable(params.Values)
                                        : null;
                                    $.ajax({
                                        url: Config.XhrBaseUrl + params.Url,
                                        method: method,
                                        data: JSON.stringify(data),
                                        cache: false,
                                        // リクエストのbodyフォーマットをJSONにする。
                                        contentType: 'application/json',
                                        // 応答をJSONとしてパースする。
                                        dataType: 'json',
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
                                        }.bind(_this),
                                    })
                                        .done(function (data, textStatus, jqXHR) {
                                        try {
                                            var casted = data;
                                            resolve(casted);
                                        }
                                        catch (e) {
                                            var res = Xhr.Result.CreateSucceeded(data);
                                            resolve(res);
                                        }
                                    }.bind(_this))
                                        .fail(function (data, textStatus, errorThrown) {
                                        var err = Xhr.Result.CreateError([new Xhr.Error('通信エラーが発生しました。')]);
                                        resolve(err);
                                        Dump.Log('fail');
                                        Dump.Log(data);
                                    });
                                })];
                        });
                    });
                };
                return Query;
            }());
            Xhr.Query = Query;
        })(Xhr = Util.Xhr || (Util.Xhr = {}));
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/EntityBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Entities;
        (function (Entities) {
            var Header = /** @class */ (function (_super) {
                __extends(Header, _super);
                function Header() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.Order = 99999;
                    _this.ToggleState = false;
                    return _this;
                }
                return Header;
            }(Fw.Models.EntityBase));
            Entities.Header = Header;
        })(Entities = Models.Entities || (Models.Entities = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/StoreBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Util/Xhr/Query.ts" />
/// <reference path="../Entities/Control.ts" />
/// <reference path="../../Items/OperationType.ts" />
/// <reference path="../../Items/Lang/Lang.ts" />
/// <reference path="../../Items/ValidationFailType.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Stores;
        (function (Stores) {
            var Control = App.Models.Entities.Control;
            var Lang = App.Items.Lang.Lang;
            var ControlStore = /** @class */ (function (_super) {
                __extends(ControlStore, _super);
                function ControlStore() {
                    var _this = _super.call(this) || this;
                    _this.SetClassName('ControlStore');
                    return _this;
                    //this.EnableLog = true;
                }
                Object.defineProperty(ControlStore, "Instance", {
                    get: function () {
                        if (ControlStore._instance === null)
                            ControlStore._instance = new ControlStore();
                        return ControlStore._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                ControlStore.prototype.GetNewEntity = function () {
                    return new Control();
                };
                ControlStore.prototype.Write = function (entity) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            throw new Error('Not Supported');
                        });
                    });
                };
                ControlStore.prototype.SetRange = function (entities) {
                    var _this = this;
                    _.each(entities, function (c) {
                        _this.Merge(c);
                    });
                };
                ControlStore.prototype.GetListByControlSetId = function (id) {
                    var result = new Array();
                    _.each(this.List, function (entity) {
                        if (entity.ControlSetId === id)
                            result.push(entity);
                    });
                    return result;
                };
                ControlStore.prototype.Validate = function (operationType, control) {
                    var errors = new Array();
                    var err3 = this.ValidateScript(control);
                    if (err3 !== true)
                        errors.push(err3);
                    return errors;
                };
                ControlStore.prototype.ValidateScript = function (control) {
                    return (control.Code && control.Code !== '')
                        ? true
                        : new Models.Entities.ValidationResult(control, 'Code', Lang.ScriptNull + (" [" + control.Name + "]"));
                };
                ControlStore._instance = null;
                return ControlStore;
            }(Fw.Models.StoreBase));
            Stores.ControlStore = ControlStore;
            Stores.Controls = ControlStore.Instance;
        })(Stores = Models.Stores || (Models.Stores = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/StoreBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Util/Xhr/Query.ts" />
/// <reference path="../../Items/ControlSetTemplate.ts" />
/// <reference path="../Entities/ControlSet.ts" />
/// <reference path="../Entities/Control.ts" />
/// <reference path="../Entities/Header.ts" />
/// <reference path="ControlStore.ts" />
/// <reference path="../../Items/OperationType.ts" />
/// <reference path="../../Items/Lang/Lang.ts" />
/// <reference path="../../Items/ValidationFailType.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Stores;
        (function (Stores) {
            var ControlSet = App.Models.Entities.ControlSet;
            var Controls = App.Models.Stores.Controls;
            var Xhr = Fw.Util.Xhr;
            var Header = App.Models.Entities.Header;
            var ControlSetStore = /** @class */ (function (_super) {
                __extends(ControlSetStore, _super);
                function ControlSetStore() {
                    var _this = _super.call(this) || this;
                    _this.SetClassName('ControlSetStore');
                    return _this;
                    //this.EnableLog = true;
                }
                Object.defineProperty(ControlSetStore, "Instance", {
                    get: function () {
                        if (ControlSetStore._instance === null)
                            ControlSetStore._instance = new ControlSetStore();
                        return ControlSetStore._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                ControlSetStore.prototype.GetNewEntity = function () {
                    return new ControlSet();
                };
                ControlSetStore.prototype.GetTemplateClone = function (id) {
                    return __awaiter(this, void 0, void 0, function () {
                        var tpl, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(Object.keys(this.List).length < 6)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.GetList()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    tpl = this.List[id];
                                    result = new ControlSet();
                                    result.Name = tpl.Name;
                                    result.IconUrl = tpl.IconUrl;
                                    result.ToggleState = tpl.ToggleState;
                                    result.Color = tpl.Color;
                                    result.Order = tpl.Order;
                                    result.ToggleState = tpl.ToggleState;
                                    result.IsMainPanelReady = tpl.IsMainPanelReady;
                                    result.IsTogglable = tpl.IsTogglable;
                                    result.OperationType = tpl.OperationType;
                                    result.IsTemplate = false;
                                    _.each(tpl.Controls, function (ctpl) {
                                        var control = new App.Models.Entities.Control();
                                        control.Name = ctpl.Name;
                                        control.PositionLeft = ctpl.PositionLeft;
                                        control.PositionTop = ctpl.PositionTop;
                                        control.IconUrl = ctpl.IconUrl;
                                        control.Code = ctpl.Code;
                                        control.IsAssignToggleOn = ctpl.IsAssignToggleOn;
                                        control.IsAssignToggleOff = ctpl.IsAssignToggleOff;
                                        control.Color = ctpl.Color;
                                        result.Controls.push(control);
                                    });
                                    return [2 /*return*/, result];
                            }
                        });
                    });
                };
                ControlSetStore.prototype.GetList = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var params, res, list;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    params = new Xhr.Params('ControlSets', Xhr.MethodType.Get);
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        list = res.Values;
                                        _.each(list, function (entity) {
                                            var obj = _this.Merge(entity);
                                            // API応答値を、TS側Entityに整形して保持しておく。
                                            if (entity.Controls && entity.Controls.length > 0) {
                                                Controls.SetRange(entity.Controls);
                                                obj.Controls = Controls.GetListByControlSetId(entity.Id);
                                            }
                                            else {
                                                obj.Controls = [];
                                            }
                                        });
                                        return [2 /*return*/, _.values(this.List)];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, []];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                ControlSetStore.prototype.GetListWithoutTemplates = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.GetList()];
                                case 1:
                                    _a.sent();
                                    result = new Array();
                                    _.each(this.List, function (cs) {
                                        if (!cs.IsTemplate)
                                            result.push(cs);
                                    });
                                    result = _.sortBy(result, function (cs) {
                                        return cs.Order;
                                    });
                                    return [2 /*return*/, result];
                            }
                        });
                    });
                };
                ControlSetStore.prototype.GetListForMainPanel = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.GetList()];
                                case 1:
                                    _a.sent();
                                    result = new Array();
                                    _.each(this.List, function (cs) {
                                        if (!cs.IsTemplate && cs.IsMainPanelReady)
                                            result.push(cs);
                                    });
                                    result = _.sortBy(result, function (cs) {
                                        return cs.Order;
                                    });
                                    return [2 /*return*/, result];
                            }
                        });
                    });
                };
                ControlSetStore.prototype.UpdateHeader = function (entity) {
                    return __awaiter(this, void 0, void 0, function () {
                        var header, params, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    header = new Header();
                                    header.Id = entity.Id;
                                    header.Order = entity.Order;
                                    header.ToggleState = entity.ToggleState;
                                    params = new Xhr.Params("ControlSets/UpdateHeader/" + header.Id, Xhr.MethodType.Post, header);
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        return [2 /*return*/, true];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, false];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                ControlSetStore.prototype.UpdateHeaders = function (entities) {
                    return __awaiter(this, void 0, void 0, function () {
                        var headers, params, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    headers = new Array();
                                    _.each(entities, function (entity) {
                                        var header = new Header();
                                        header.Id = entity.Id;
                                        header.Order = entity.Order;
                                        header.ToggleState = entity.ToggleState;
                                        headers.push(header);
                                    });
                                    params = new Xhr.Params("ControlSets/UpdateHeader", Xhr.MethodType.Post, headers);
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        return [2 /*return*/, true];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, false];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                ControlSetStore.prototype.Write = function (entity) {
                    return __awaiter(this, void 0, void 0, function () {
                        var params, res, id, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    params = new Xhr.Params('ControlSets', Xhr.MethodType.Post, entity);
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        id = res.Values.Id;
                                        this.Merge(res.Values);
                                        result = this.List[id];
                                        // API応答値を、TS側Entityに整形して保持しておく。
                                        if (res.Values.Controls && res.Values.Controls.length > 0) {
                                            Controls.SetRange(res.Values.Controls);
                                            result.Controls = Controls.GetListByControlSetId(id);
                                        }
                                        else {
                                            result.Controls = [];
                                        }
                                        return [2 /*return*/, result];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, null];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                ControlSetStore.prototype.Remove = function (entity) {
                    return __awaiter(this, void 0, void 0, function () {
                        var params, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    params = new Xhr.Params("ControlSets/" + entity.Id, Xhr.MethodType.Delete, entity);
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        _.each(entity.Controls, function (c) {
                                            delete Controls.List[c.Id];
                                        });
                                        delete this.List[entity.Id];
                                        return [2 /*return*/, true];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, false];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                ControlSetStore.prototype.Exec = function (controlSet, control) {
                    return __awaiter(this, void 0, void 0, function () {
                        var params, res, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Log('Exec');
                                    // 渡し値がヘン
                                    if (!controlSet
                                        || !controlSet.BrDeviceId
                                        || !control
                                        || !control.Code
                                        || control.Code === ''
                                        || controlSet.OperationType !== 1 /* RemoteControl */) {
                                        return [2 /*return*/, false];
                                    }
                                    params = new Xhr.Params("ControlSets/Exec/" + controlSet.Id, Xhr.MethodType.Post, {
                                        ControlId: control.Id
                                    });
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        result = res.Values;
                                        return [2 /*return*/, result];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, null];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                ControlSetStore.prototype.Validate = function (controlSet) {
                    var errors = new Array();
                    return errors;
                };
                ControlSetStore._instance = null;
                return ControlSetStore;
            }(Fw.Models.StoreBase));
            Stores.ControlSetStore = ControlSetStore;
            Stores.ControlSets = ControlSetStore.Instance;
        })(Stores = Models.Stores || (Models.Stores = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Controllers/ControllerBase.ts" />
/// <reference path="../../Fw/Controllers/Manager.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/Events/ControlViewEvents.ts" />
/// <reference path="../../Fw/Events/EntityEvents.ts" />
/// <reference path="../../Fw/Events/ButtonViewEvents.ts" />
/// <reference path="../../Fw/Views/Property/FitPolicy.ts" />
/// <reference path="../Views/Pages/MainPageView.ts" />
/// <reference path="../Views/Popup/AlertPopup.ts" />
/// <reference path="../Events/Controls/ControlButtonViewEvents.ts" />
/// <reference path="../Models/Entities/ControlSet.ts" />
/// <reference path="../Models/Stores/ControlSetStore.ts" />
/// <reference path="../Items/OperationType.ts" />
/// <reference path="../Items/DeviceType.ts" />
/// <reference path="../Items/ModalOperationType.ts" />
/// <reference path="ItemSelectControllerBase.ts" />
/// <reference path="../Views/Controls/ItemSelectButtonView.ts" />
/// <reference path="../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var Pages = App.Views.Pages;
        var Controls = App.Views.Controls;
        var Entities = App.Models.Entities;
        var Util = Fw.Util;
        var EntityEvents = Fw.Events.EntityEvents;
        var ButtonEvents = Fw.Events.ButtonViewEvents;
        var Stores = App.Models.Stores;
        var Popup = App.Views.Popup;
        var ItemSelectControllerBase = App.Controllers.ItemSelectControllerBase;
        var Lang = App.Items.Lang.Lang;
        var ControlSetController = /** @class */ (function (_super) {
            __extends(ControlSetController, _super);
            function ControlSetController(controllerId) {
                if (controllerId === void 0) { controllerId = null; }
                var _this = _super.call(this, controllerId || 'ControlSet') || this;
                _this.SetClassName('ControlSetController');
                _this.SetPageView(new Pages.ControlSetPageView());
                _this._page = _this.View;
                _this._controlSet = null;
                _this._operationType = 1 /* Exec */;
                _this._page.HeaderBar.LeftButton.Hide(0);
                _this._page.HeaderBar.LeftButton.AddEventListener(ButtonEvents.SingleClick, function () { return __awaiter(_this, void 0, void 0, function () {
                    var controlSet, ctr, views, isSave, res;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                controlSet = this._controlSet;
                                ctr = this.Manager.Get('Main');
                                ctr.Show();
                                this._controlSet = null;
                                views = Util.Obj.Mirror(this._page.ButtonPanel.Children);
                                _.each(views, function (view) {
                                    if (view instanceof Controls.ControlButtonView) {
                                        _this._page.ButtonPanel.Remove(view);
                                        view.Dispose();
                                    }
                                });
                                isSave = true;
                                if (!(controlSet.Controls.length <= 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, App.Views.Popup.Confirm.OpenAsync({
                                        Message: Lang.NoButtonsSaveOk
                                    })];
                            case 1:
                                isSave = _a.sent();
                                _a.label = 2;
                            case 2:
                                if (!isSave)
                                    return [2 /*return*/];
                                return [4 /*yield*/, Stores.ControlSets.Write(controlSet)];
                            case 3:
                                res = _a.sent();
                                if (!res) {
                                    // 保存失敗
                                    this.SetEntity(controlSet);
                                    this.SetEditMode();
                                    this.Show();
                                    Popup.Alert.Open({
                                        Message: Lang.SaveFailureServerOnline
                                    });
                                }
                                else {
                                    // 保存成功
                                    ctr.RefreshControlSets();
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                _this._page.EditButton.AddEventListener(ButtonEvents.SingleClick, function () {
                    _this.SetEditMode();
                    _this.ToUnmodal();
                });
                _this._page.HeaderBar.RightButton.AddEventListener(ButtonEvents.SingleClick, function (e) {
                    _this.OnOrderedNewControl(e);
                });
                _this._page.HeaderBar.Elem.on('click', function (e) {
                    _this.OnOrderedHeader(e);
                });
                _this._page.HeaderBar.Label.Elem.on('click', function (e) {
                    _this.OnOrderedHeader(e);
                });
                return _this;
            }
            /**
             * リモコンボタン選択 ** このメソッド呼び出し前に、SetEntity()しておくこと。**
             * @param parentController
             */
            ControlSetController.prototype.Select = function (parentController) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this._operationType = 3 /* Select */;
                        return [2 /*return*/, _super.prototype.Select.call(this, parentController)];
                    });
                });
            };
            ControlSetController.prototype.SetEditMode = function () {
                this._operationType = 2 /* Edit */;
                var left = (this._page.Size.Width / 2) - (this._page.ButtonPanel.Size.Width / 2);
                this._page.ButtonPanel.Position.Left = left;
                this._page.HeaderBar.Label.Show(0);
                this._page.HeaderBar.LeftButton.Show(0);
                this._page.HeaderLeftLabel.Hide(0);
                this._page.EditButton.Hide(0);
                // 追加ボタン - 表示制御対象
                if (!this._controlSet) {
                    // ControlSetエンティティが見当たらない
                    this._page.HeaderBar.RightButton.Hide(0);
                }
                else if (this._controlSet.OperationType === 2 /* BroadlinkDevice */) {
                    // ControlSetは、Broadlinkデバイス = 編集不能
                    this._page.HeaderBar.RightButton.Hide(0);
                }
                else {
                    // その他 - ユーザー追加デバイス = 編集可
                    this._page.HeaderBar.RightButton.Show(0);
                }
                _.each(this._page.ButtonPanel.Children, function (v) {
                    if (v instanceof Controls.ControlButtonView)
                        v.SetRelocatable(true);
                });
            };
            ControlSetController.prototype.SetExecMode = function () {
                this._operationType = 1 /* Exec */;
                var left = 10;
                this._page.ButtonPanel.Position.Left = left;
                this._page.HeaderBar.Label.Hide(0);
                this._page.HeaderBar.LeftButton.Hide(0);
                this._page.HeaderBar.RightButton.Hide(0);
                this._page.HeaderLeftLabel.Show(0);
                // ↓と、思ったけど、やめ。
                //// 編集ボタンは使用しないことにする。
                //// ボタン長押しで編集画面に行ってもらう。
                //this._page.EditButton.Hide(0); 
                this._page.EditButton.Show(0);
                _.each(this._page.ButtonPanel.Children, function (v) {
                    if (v instanceof Controls.ControlButtonView)
                        v.SetRelocatable(false);
                });
            };
            ControlSetController.prototype.SetSelectMode = function () {
                this._operationType = 3 /* Select */;
                var left = 10;
                this._page.ButtonPanel.Position.Left = left;
                this._page.HeaderBar.Label.Hide(0);
                this._page.HeaderBar.LeftButton.Hide(0);
                this._page.HeaderBar.RightButton.Hide(0);
                this._page.HeaderLeftLabel.Show(0);
                this._page.EditButton.Hide(0);
            };
            /**
             * 操作対象リモコンEnttiyをセットする。
             * @param entity
             */
            ControlSetController.prototype.SetEntity = function (entity) {
                var _this = this;
                // View側削除処理、ButtonPanel.Childrenを削除操作するため、要素退避しておく。
                var views = Util.Obj.Mirror(this._page.ButtonPanel.Children);
                _.each(views, function (view) {
                    if (view instanceof Controls.ControlButtonView) {
                        _this._page.ButtonPanel.Remove(view);
                        view.Dispose();
                    }
                });
                this._page.ButtonPanel.InnerLength = this._page.ButtonPanel.Size.Height;
                if (this._controlSet) {
                    this._controlSet.RemoveEventListener(EntityEvents.Changed, this.ApplyFromEntity, this);
                }
                this._controlSet = entity;
                if (!this._controlSet)
                    return;
                this._controlSet.AddEventListener(EntityEvents.Changed, this.ApplyFromEntity, this);
                _.each(this._controlSet.Controls, function (control) {
                    var btn = new Controls.ControlButtonView();
                    btn.Control = control;
                    btn.SetLeftTop(control.PositionLeft, control.PositionTop);
                    btn.SetColor(control.Color);
                    btn.SetImage(control.IconUrl);
                    btn.AddEventListener(ButtonEvents.SingleClick, _this.OnButtonClicked, _this);
                    _this._page.ButtonPanel.Add(btn);
                });
                this.ApplyFromEntity();
            };
            ControlSetController.prototype.OnButtonClicked = function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var button1, ctr, button2, button3;
                    return __generator(this, function (_a) {
                        switch (this._operationType) {
                            case 1 /* Exec */:
                                this.Log('ControlButtonViewEvents.ExecOrdered');
                                button1 = e.Sender;
                                this.ExecCode(button1.Control);
                                break;
                            case 2 /* Edit */:
                                // Broadlinkデバイスはボタン編集禁止
                                if (this._controlSet.OperationType === 2 /* BroadlinkDevice */)
                                    return [2 /*return*/];
                                ctr = this.Manager.Get('ControlProperty');
                                button2 = e.Sender;
                                ctr.SetEntity(button2.Control, this._controlSet);
                                ctr.ShowModal();
                                break;
                            case 3 /* Select */:
                                button3 = e.Sender;
                                this.Commit(button3.Control);
                                break;
                            default:
                                alert('ここにはこないはず。');
                                throw new Error('なんでー？');
                        }
                        return [2 /*return*/];
                    });
                });
            };
            ControlSetController.prototype.ApplyFromEntity = function () {
                if (!this._controlSet)
                    return;
                this._page.HeaderBar.Text = this._controlSet.Name;
                this._page.HeaderLeftLabel.Text = this._controlSet.Name;
                this._page.Refresh();
                _.each(this._page.ButtonPanel.Children, function (btn) {
                    var control = btn.Control;
                    if (btn.Color !== control.Color)
                        btn.SetColor(control.Color);
                    if (btn.ImageSrc !== control.IconUrl)
                        btn.SetImage(control.IconUrl);
                });
            };
            /**
             * リモコンボタン追加指示
             * @param e
             */
            ControlSetController.prototype.OnOrderedNewControl = function (e) {
                //if (!this.IsOnEditMode)
                //    return;
                if (this._operationType !== 2 /* Edit */)
                    return;
                if (!this._controlSet)
                    throw new Error('ControlSet Not Found');
                var control = new Entities.Control();
                control.ControlSetId = this._controlSet.Id;
                this._controlSet.Controls.push(control);
                var btn = new Controls.ControlButtonView();
                btn.Control = control;
                btn.SetLeftTop(185, this._page.Size.Height - 90 - 75);
                btn.AddEventListener(ButtonEvents.SingleClick, this.OnButtonClicked, this);
                this._page.ButtonPanel.Add(btn);
                // 再配置可能指示はパネルにaddした後で。
                btn.SetRelocatable(true);
            };
            /**
             * リモコンヘッダ情報の編集指示
             * @param e
             */
            ControlSetController.prototype.OnOrderedHeader = function (e) {
                if (e.eventPhase !== 2)
                    return;
                //if (!this.IsOnEditMode)
                //    return;
                if (this._operationType !== 2 /* Edit */)
                    return;
                if (!this._controlSet)
                    throw new Error('ControlSet Not Found');
                var ctr = this.Manager.Get('ControlHeaderProperty');
                ctr.SetEntity(this._controlSet);
                ctr.ShowModal();
            };
            /**
             * 学習指示／コード取得
             */
            ControlSetController.prototype.GetLearnedCode = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        throw new Error("Method not implemented.");
                    });
                });
            };
            /**
             * コード実行
             * @param code
             */
            ControlSetController.prototype.ExecCode = function (control) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, guide, message, guide, newCs, newCtl, ctr1, ctr2, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.Log('ExecCode');
                                id = this._controlSet.BrDeviceId;
                                if ((this._controlSet.OperationType === 1 /* RemoteControl */
                                    || this._controlSet.OperationType === 2 /* BroadlinkDevice */)
                                    && !this._controlSet.BrDeviceId) {
                                    guide = (this._operationType === 2 /* Edit */)
                                        ? Lang.ClickHeader
                                        : Lang.GoEdit;
                                    Popup.Alert.Open({
                                        Message: Lang.SelectYourRmDevicePart + guide,
                                    });
                                    return [2 /*return*/, false];
                                }
                                if (!control.Code || control.Code === '') {
                                    message = '';
                                    switch (this._controlSet.OperationType) {
                                        case 1 /* RemoteControl */:
                                            guide = (this._operationType === 2 /* Edit */)
                                                ? Lang.ClickLearnButton
                                                : Lang.GoEdit;
                                            message = Lang.LearnYourRemoteControlButtonPart + guide;
                                            break;
                                        case 2 /* BroadlinkDevice */:
                                            alert('ここにはこないはずやで！！');
                                            message = Lang.UnexpectedOperation;
                                            break;
                                        case 3 /* WakeOnLan */:
                                            message = Lang.SetMacAddressGoEdit;
                                            break;
                                        case 4 /* Script */:
                                            message = Lang.WriteScriptGoEdit;
                                            break;
                                        case 5 /* RemoteHostScript */:
                                            message = Lang.SelectRemoteScriptGoEdit;
                                            break;
                                        case 99 /* Scene */:
                                        default:
                                            alert('ここにはこないはずやで！！');
                                            message = Lang.UnexpectedOperation;
                                            break;
                                    }
                                    Popup.Alert.Open({
                                        Message: message,
                                    });
                                    return [2 /*return*/, false];
                                }
                                if (!(this._operationType === 2 /* Edit */)) return [3 /*break*/, 2];
                                return [4 /*yield*/, Stores.ControlSets.Write(this._controlSet)];
                            case 1:
                                newCs = _a.sent();
                                if (newCs !== null) {
                                    this._controlSet = newCs;
                                    this.SetEntity(this._controlSet);
                                    newCtl = _.find(newCs.Controls, function (c) {
                                        return (c.PositionLeft === control.PositionLeft
                                            && c.PositionTop === control.PositionTop
                                            && c.Name === control.Name
                                            && c.Code === control.Code);
                                    });
                                    if (!newCtl) {
                                        Popup.Alert.Open({
                                            Message: Lang.UnexpectedControlNotFound
                                        });
                                        return [2 /*return*/, false];
                                    }
                                    control = newCtl;
                                    ctr1 = this.Manager.Get('ControlProperty');
                                    if (ctr1.View.IsVisible)
                                        ctr1.SetEntity(control, this._controlSet);
                                    ctr2 = this.Manager.Get('ControlHeaderProperty');
                                    if (ctr2.View.IsVisible)
                                        ctr2.SetEntity(this._controlSet);
                                }
                                else {
                                    Popup.Alert.Open({
                                        Message: Lang.SaveFailureServerOnline
                                    });
                                    return [2 /*return*/, false];
                                }
                                _a.label = 2;
                            case 2: return [4 /*yield*/, Stores.Operations.Exec(this._controlSet, control)];
                            case 3:
                                result = _a.sent();
                                if (result) {
                                    if (control.IsAssignToggleOn === true
                                        && control.IsAssignToggleOff === true) {
                                        // ボタンにトグルOn/Off両方アサインされているとき、
                                        // 表示制御しない。
                                    }
                                    else if (control.IsAssignToggleOn) {
                                        // ボタンにトグルOnがアサインされているとき
                                        this._controlSet.ToggleState = true;
                                        this._controlSet.DispatchChanged();
                                    }
                                    else if (control.IsAssignToggleOff) {
                                        // ボタンにトグルOffがアサインされているとき
                                        this._controlSet.ToggleState = false;
                                        this._controlSet.DispatchChanged();
                                    }
                                }
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            /**
             * Controlのトグルアサイン状態を唯一選択に保つ
             * @param control アサイン指定されたControl
             * @param targetState On/Offアサインのどちらかを示す
             */
            ControlSetController.prototype.ResetToggleAssign = function (control, targetState) {
                //if (!this.IsOnEditMode)
                //    return;
                if (this._operationType !== 2 /* Edit */)
                    return;
                var propName = (targetState)
                    ? 'IsAssignToggleOn'
                    : 'IsAssignToggleOff';
                _.each(this._controlSet.Controls, function (c) {
                    if (c === control)
                        return;
                    if (c[propName] === true)
                        c[propName] = false;
                });
            };
            /**
             * リモコンボタンを一つ削除する。
             * @param control
             */
            ControlSetController.prototype.RemoveControl = function (control) {
                var _this = this;
                //if (!this.IsOnEditMode)
                //    return;
                if (this._operationType !== 2 /* Edit */)
                    return;
                // View側削除処理
                var views = Util.Obj.Mirror(this._page.ButtonPanel.Children);
                _.each(views, function (view) {
                    if (view instanceof Controls.ControlButtonView
                        && view.Control === control) {
                        _this._page.ButtonPanel.Remove(view);
                        view.Dispose();
                    }
                });
                // Model側削除処理
                var idx = this._controlSet.Controls.indexOf(control);
                if (idx !== -1) {
                    this._controlSet.Controls.splice(idx, 1);
                    control.Dispose();
                }
                this._page.UnMask();
            };
            /**
             * リモコン全体を削除する。
             */
            ControlSetController.prototype.RemoveControlSet = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var views, controlSet, ctr;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (this._operationType !== 2 /* Edit */)
                                    return [2 /*return*/];
                                views = Util.Obj.Mirror(this._page.ButtonPanel.Children);
                                _.each(views, function (view) {
                                    if (view instanceof Controls.ControlButtonView) {
                                        _this._page.ButtonPanel.Remove(view);
                                        view.Dispose();
                                    }
                                });
                                controlSet = this._controlSet;
                                ctr = this.Manager.Get('Main');
                                ctr.Show();
                                this._controlSet = null;
                                this._page.UnMask();
                                // 削除メソッド、投げっぱなしの終了確認無しで終わる。
                                return [4 /*yield*/, Stores.ControlSets.Remove(controlSet)];
                            case 1:
                                // 削除メソッド、投げっぱなしの終了確認無しで終わる。
                                _a.sent();
                                ctr.RefreshControlSets();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return ControlSetController;
        }(ItemSelectControllerBase));
        Controllers.ControlSetController = ControlSetController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/ObjectBase.ts" />
/// <reference path="../Models/Entities/ControlSet.ts" />
/// <reference path="../Items/OperationType.ts" />
/// <reference path="../Items/DeviceType.ts" />
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ControlSetControllerFactory = /** @class */ (function () {
            function ControlSetControllerFactory() {
                this._manager = Fw.Controllers.Manager.Instance;
            }
            Object.defineProperty(ControlSetControllerFactory, "Instance", {
                get: function () {
                    if (ControlSetControllerFactory._instance === null)
                        ControlSetControllerFactory._instance = new ControlSetControllerFactory();
                    return ControlSetControllerFactory._instance;
                },
                enumerable: true,
                configurable: true
            });
            ControlSetControllerFactory.prototype.Get = function (controlSet) {
                if (!controlSet)
                    throw new Error("ControlSet Cot Found");
                switch (controlSet.OperationType) {
                    case 1 /* RemoteControl */:
                        return this._manager.Get('ControlSet');
                        break;
                    case 2 /* BroadlinkDevice */:
                        //const brDev = Stores.BrDevices.Get(controlSet.BrDeviceId);
                        //switch (brDev.DeviceType) {
                        //    case DeviceType.A1:
                        //        return this._manager.Get('A1Set') as A1SetController;
                        //    case DeviceType.Sp2:
                        //        //return this._manager.Get('Sp2Set') as Sp2SetController;
                        //        return this._manager.Get('ControlSet') as ControlSetController;
                        //    case DeviceType.Rm2Pro:
                        //        //return this._manager.Get('Rm2Pro') as Rm2ProSetController;
                        //        return this._manager.Get('ControlSet') as ControlSetController;
                        //    case DeviceType.Sp1:
                        //    case DeviceType.Rm:
                        //    case DeviceType.Mp1:
                        //    case DeviceType.Hysen:
                        //    case DeviceType.S1c:
                        //    case DeviceType.Dooya:
                        //        break;
                        //}
                        break;
                    // 以下、実装検討中。
                    case 3 /* WakeOnLan */:
                        //return this._manager.Get('Wol') as WolSetController;
                        return this._manager.Get('ControlSet');
                    case 4 /* Script */:
                        //return this._manager.Get('Script') as ScriptSetController;
                        return this._manager.Get('ControlSet');
                    case 5 /* RemoteHostScript */:
                        //return this._manager.Get('RemoteHostScript') as RemoteHostScriptSetController;
                        return this._manager.Get('ControlSet');
                    case 99 /* Scene */:
                        detault: break;
                }
                throw new Error("Controller Cot Found");
            };
            ControlSetControllerFactory._instance = null;
            return ControlSetControllerFactory;
        }());
        Controllers.ControlSetControllerFactory = ControlSetControllerFactory;
        Controllers.CSControllerFactory = ControlSetControllerFactory.Instance;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ItemSelectControllerBase.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/Controllers/Manager.ts" />
/// <reference path="../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../Views/Pages/MainPageView.ts" />
/// <reference path="../Views/Controls/ItemSelectButtonView.ts" />
/// <reference path="../../Fw/Events/ButtonViewEvents.ts" />
/// <reference path="../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ButtonEvents = Fw.Events.ButtonViewEvents;
        var ItemSelectButtonView = App.Views.Controls.ItemSelectButtonView;
        var Lang = App.Items.Lang.Lang;
        var IconSelectController = /** @class */ (function (_super) {
            __extends(IconSelectController, _super);
            function IconSelectController() {
                var _this = _super.call(this, 'IconSelect') || this;
                _this.SetClassName('IconSelectController');
                _this._page = _this.View;
                _this._page.Label.Text = Lang.SelectIcon;
                var btn = new ItemSelectButtonView();
                btn.Value = null;
                btn.ImageSrc = null;
                btn.Text = 'none';
                btn.AddEventListener(ButtonEvents.SingleClick, function (e) {
                    var button = e.Sender;
                    _this.Commit(button.Value);
                });
                _this._page.SelectorPanel.Add(btn);
                _.each(App.Items.Icon.Names, function (name, idx) {
                    var btn = new ItemSelectButtonView();
                    btn.Value = name;
                    btn.ImageSrc = 'images/icons/' + name;
                    btn.AddEventListener(ButtonEvents.SingleClick, function (e) {
                        var button = e.Sender;
                        _this.Commit(button.Value);
                    });
                    _this._page.SelectorPanel.Add(btn);
                });
                return _this;
            }
            return IconSelectController;
        }(Controllers.ItemSelectControllerBase));
        Controllers.IconSelectController = IconSelectController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
/// <reference path="../Models/Entities/ControlSet.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ControlViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var ToggleButtonInputViewEventsClass = /** @class */ (function (_super) {
            __extends(ToggleButtonInputViewEventsClass, _super);
            function ToggleButtonInputViewEventsClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Switched = 'Switched';
                _this.ToOn = 'ToOn';
                _this.ToOff = 'ToOff';
                _this.Changed = 'Changed';
                _this.Focused = 'Focused';
                _this.Blurred = 'Blurred';
                return _this;
            }
            return ToggleButtonInputViewEventsClass;
        }(Events.ControlViewEventsClass));
        Events.ToggleButtonInputViewEventsClass = ToggleButtonInputViewEventsClass;
        Events.ToggleButtonInputViewEvents = new ToggleButtonInputViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="BoxViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var StuckerBoxViewEventsClass = /** @class */ (function (_super) {
            __extends(StuckerBoxViewEventsClass, _super);
            function StuckerBoxViewEventsClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.RelocationStarted = 'RelocationStarted';
                _this.RelocationEnded = 'RelocationEnded';
                _this.OrderChanged = 'OrderChanged';
                _this.OrderUncommitChanged = 'OrderUncommitChanged';
                return _this;
            }
            return StuckerBoxViewEventsClass;
        }(Events.BoxViewEventsClass));
        Events.StuckerBoxViewEventsClass = StuckerBoxViewEventsClass;
        Events.StuckerBoxViewEvents = new StuckerBoxViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/ControlView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../Items/Color.ts" />
/// <reference path="../../Events/Controls/ControlButtonViewEvents.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_6) {
        var Controls;
        (function (Controls) {
            var Dump = Fw.Util.Dump;
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var LabelAndButtonView = /** @class */ (function (_super) {
                __extends(LabelAndButtonView, _super);
                function LabelAndButtonView() {
                    var _this = _super.call(this) || this;
                    _this._buttonView = new Views.ButtonView();
                    _this._labelView = new Views.LabelView();
                    _this.SetClassName('LabeledButtonView');
                    _this.Elem.addClass(_this.ClassName);
                    _this._buttonView.SetAnchor(0, 0, 0, 20);
                    _this.Add(_this._buttonView);
                    _this._labelView.SetAnchor(null, null, null, 0);
                    _this._labelView.Size.Height = 15;
                    _this._labelView.FontSize = Property.FontSize.Small;
                    _this.Add(_this._labelView);
                    return _this;
                }
                Object.defineProperty(LabelAndButtonView.prototype, "Button", {
                    get: function () {
                        return this._buttonView;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LabelAndButtonView.prototype, "Label", {
                    get: function () {
                        return this._labelView;
                    },
                    enumerable: true,
                    configurable: true
                });
                LabelAndButtonView.prototype.InnerRefresh = function () {
                    try {
                        this.SuppressLayout();
                        _super.prototype.InnerRefresh.call(this);
                        this.SetStyles({
                            color: 'transparent',
                            backgroundColor: 'transparent',
                            borderWidth: '0',
                            borderColor: 'transparent',
                            opacity: "" + this.Opacity
                        });
                    }
                    catch (e) {
                        Dump.ErrorLog(e, this.ClassName);
                    }
                    finally {
                        this.ResumeLayout();
                    }
                };
                LabelAndButtonView.prototype.Dispose = function () {
                    _super.prototype.Dispose.call(this);
                    this._labelView = null;
                    this._buttonView = null;
                    this.HoverColor = null;
                };
                return LabelAndButtonView;
            }(Fw.Views.BoxView));
            Controls.LabelAndButtonView = LabelAndButtonView;
        })(Controls = Views_6.Controls || (Views_6.Controls = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/ButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Models/IEntity.ts" />
/// <reference path="../../Items/Color.ts" />
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/ButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Models/IEntity.ts" />
/// <reference path="../../Items/Color.ts" />
/// <reference path="../../Items/OperationType.ts" />
/// <reference path="../../Items/DeviceType.ts" />
/// <reference path="LabelAndButtonView.ts" />
/// <reference path="IMainButtonView.ts" />
/// <reference path="../../Models/Entities/ControlSet.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_7) {
        var Controls;
        (function (Controls) {
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var Color = App.Items.Color;
            var ControlSet = App.Models.Entities.ControlSet;
            var ControlSetButtonView = /** @class */ (function (_super) {
                __extends(ControlSetButtonView, _super);
                //public readonly ControlSet: ControlSet;
                function ControlSetButtonView(entity) {
                    var _this = _super.call(this) || this;
                    if (!(entity instanceof ControlSet))
                        throw new Error('Invalid Entity');
                    _this.Entity = entity;
                    _this._toggle = new Views.ToggleButtonInputView();
                    _this.SetSize(150, 170);
                    _this.Button.HasBorder = false;
                    _this.Button.BorderRadius = 5;
                    _this.Button.ImageFitPolicy = Property.FitPolicy.Auto;
                    _this.Label.Color = Color.Main;
                    _this._toggle.SetAnchor(null, 40, 40, 30);
                    _this._toggle.BackgroundColor = 'transparent';
                    _this._toggle.SetBoolValue(entity.ToggleState);
                    _this.Add(_this._toggle);
                    _this.ApplyByEntity();
                    return _this;
                }
                Object.defineProperty(ControlSetButtonView.prototype, "Toggle", {
                    get: function () {
                        return this._toggle;
                    },
                    enumerable: true,
                    configurable: true
                });
                ControlSetButtonView.prototype.ApplyByEntity = function () {
                    if (this.Entity) {
                        var controlSet = this.Entity;
                        this.Button.BackgroundColor = controlSet.Color;
                        this.Button.Color = controlSet.Color;
                        this.Button.HoverColor = controlSet.HoverColor;
                        this.Button.ImageSrc = controlSet.IconUrl;
                        this.Label.Text = controlSet.Name;
                        if (controlSet.IsTogglable)
                            this.Toggle.Show(0);
                        else
                            this.Toggle.Hide(0);
                        this.Toggle.SetBoolValue(controlSet.ToggleState, false);
                    }
                    else {
                        this.Button.BackgroundColor = Color.MainBackground;
                        this.Button.Color = Color.Main;
                        this.Button.HoverColor = Color.MainHover;
                        this.Button.ImageSrc = '';
                        this.Label.Text = '';
                        this.Toggle.Show(0);
                        this.Toggle.SetBoolValue(false, false);
                    }
                };
                return ControlSetButtonView;
            }(Controls.LabelAndButtonView));
            Controls.ControlSetButtonView = ControlSetButtonView;
        })(Controls = Views_7.Controls || (Views_7.Controls = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="OperationTemplate.ts" />
var App;
(function (App) {
    var Items;
    (function (Items) {
        var Icon = /** @class */ (function () {
            function Icon() {
            }
            Icon.GetByOperationTemplate = function (template, isLarge) {
                if (isLarge === void 0) { isLarge = false; }
                var idx = template;
                var name = Icon.Operations[idx];
                if (!name)
                    return null;
                return (isLarge)
                    ? 'images/icons/operation/large/' + name
                    : 'images/icons/operation/small/' + name;
            };
            Icon.GetPairdOperationIcon = function (path) {
                var name = path.substr(path.lastIndexOf('/') + 1);
                var isLarge = (path.indexOf('large') !== -1);
                return (!isLarge)
                    ? 'images/icons/operation/large/' + name
                    : 'images/icons/operation/small/' + name;
            };
            Icon.Operations = [
                /**
                 * 空
                 */
                '',
                /**
                 * 1.シーン
                 */
                'scene.png',
                /**
                 * 2.TV
                 */
                'tv.png',
                /**
                 * 3.AV
                 */
                'av.png',
                /**
                 * 4.Light
                 */
                'light.png',
                /**
                 * 5.Light
                 */
                'av.png',
                /**
                 * 6.Free
                 */
                'free.png',
                /**
                 * 7.WoL
                 */
                'wol.png',
                /**
                 * 8.Script
                 */
                'script.png',
                /**
                 * 9.RemoteHostScript
                 */
                'remote.png',
                /**
                 * 10.Schedule
                 */
                'schedule.png'
            ];
            Icon.Names = [
                'arrow1_down.png',
                'arrow1_left.png',
                'arrow1_right.png',
                'arrow1_up.png',
                'arrow2_down.png',
                'arrow2_left.png',
                'arrow2_right.png',
                'arrow2_up.png',
                'bluetooth.png',
                'circle_check.png',
                'circle_cross.png',
                'circle_info.png',
                'circle_minus.png',
                'circle_pause.png',
                'circle_play.png',
                'circle_plus.png',
                'circle_prohibition.png',
                'clock.png',
                'darrow_down.png',
                'darrow_left.png',
                'darrow_right.png',
                'darrow_up.png',
                'dustbox.png',
                'edit.png',
                'favorite.png',
                'headphones.png',
                'heart.png',
                'home.png',
                'layer.png',
                'layout.png',
                'lightning.png',
                'menu.png',
                'mic.png',
                'monitor.png',
                'moon.png',
                'photo_camera.png',
                'pin.png',
                'power.png',
                'profile.png',
                'refresh.png',
                'rocket.png',
                'settings1.png',
                'settings2.png',
                'sound.png',
                'speech.png',
                'sun.png',
                'target.png',
                'video_camera.png',
                'video_film.png',
                'num_0.png',
                'num_1.png',
                'num_2.png',
                'num_3.png',
                'num_4.png',
                'num_5.png',
                'num_6.png',
                'num_7.png',
                'num_8.png',
                'num_9.png',
                'num_10.png',
                'num_11.png',
                'num_12.png',
                'num_aster.png',
                'num_sharp.png',
                'bag.png',
                'battery.png',
                'bell.png',
                'bookmark.png',
                'briefcase.png',
                'calendar.png',
                'cancel.png',
                'clip.png',
                'clock2.png',
                'cloud.png',
                'creditcard.png',
                'cursor.png',
                'cursor2.png',
                'cut.png',
                'cutlery.png',
                'download.png',
                'envelope.png',
                'export.png',
                'file.png',
                'folder.png',
                'gallery.png',
                'gamepad.png',
                'help.png',
                'hourglass.png',
                'link.png',
                'logout.png',
                'magnet.png',
                'padnote.png',
                'paint.png',
                'photocamera.png',
                'placeholder.png',
                'presentation.png',
                'printer.png',
                'puzzle.png',
                'screen.png',
                'search.png',
                'setting3.png',
                'share.png',
                'shield.png',
                'shoppingcart.png',
                'shutter.png',
                'smartphone.png',
                'speedometer.png',
                'stats.png',
                'store.png',
                'switch.png',
                'tag.png',
                'timer.png',
                'unlock.png',
                'upload.png',
                'visible.png',
                'waiting.png',
                'wifi.png',
                'zoomin.png',
                'zoomout.png',
            ];
            return Icon;
        }());
        Items.Icon = Icon;
    })(Items = App.Items || (App.Items = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Controllers/ControllerBase.ts" />
/// <reference path="../../Fw/Controllers/Manager.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/Events/ControlViewEvents.ts" />
/// <reference path="../../Fw/Events/ButtonViewEvents.ts" />
/// <reference path="../../Fw/Events/ToggleButtonInputViewEvents.ts" />
/// <reference path="../../Fw/Events/StuckerBoxViewEvents.ts" />
/// <reference path="../../Fw/Views/Property/FitPolicy.ts" />
/// <reference path="../Views/Pages/MainPageView.ts" />
/// <reference path="../Views/Controls/ControlSetButtonView.ts" />
/// <reference path="../Models/Entities/ControlSet.ts" />
/// <reference path="../Models/Stores/ControlSetStore.ts" />
/// <reference path="../Items/OperationTemplate.ts" />
/// <reference path="../Items/ControlSetTemplate.ts" />
/// <reference path="../Items/OperationType.ts" />
/// <reference path="../Items/Color.ts" />
/// <reference path="../Items/Icon.ts" />
/// <reference path="../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var Dump = Fw.Util.Dump;
        var Events = Fw.Events;
        var Pages = App.Views.Pages;
        var ButtonEvents = Fw.Events.ButtonViewEvents;
        var ToggleEvents = Fw.Events.ToggleButtonInputViewEvents;
        var StuckerBoxEvents = Fw.Events.StuckerBoxViewEvents;
        var Stores = App.Models.Stores;
        var ControlSetTemplate = App.Items.ControlSetTemplate;
        var ControlSetButtonView = App.Views.Controls.ControlSetButtonView;
        var Color = App.Items.Color;
        var Icon = App.Items.Icon;
        var Lang = App.Items.Lang.Lang;
        var MainController = /** @class */ (function (_super) {
            __extends(MainController, _super);
            function MainController() {
                var _this = _super.call(this, 'Main') || this;
                Dump.Log('Start MainController');
                _this.SetClassName('MainController');
                _this.SetPageView(new Pages.MainPageView());
                _this._page = _this.View;
                _this.InitStores()
                    .then(function () { return __awaiter(_this, void 0, void 0, function () {
                    var hostname, controlSetCtr, controlHeaderPropertyCtr, controlPropertyCtr, iconSelectCtr, colorSelectCtr;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Stores.Remotes.GetHostname()];
                            case 1:
                                hostname = _a.sent();
                                if (hostname != null) {
                                    this._page.HeaderBar.Text = Lang.TitleScriptAgent + ' - ' + hostname;
                                    this._page.HeaderBar.Refresh();
                                }
                                Dump.Log('SubController Load Start');
                                controlSetCtr = new Controllers.ControlSetController();
                                controlHeaderPropertyCtr = new Controllers.ControlHeaderPropertyController();
                                controlPropertyCtr = new Controllers.ControlPropertyController();
                                iconSelectCtr = new Controllers.IconSelectController();
                                colorSelectCtr = new Controllers.ColorSelectController();
                                Dump.Log('SubController Load End');
                                return [2 /*return*/];
                        }
                    });
                }); });
                _this._page.HeaderBar.RightButton.AddEventListener(ButtonEvents.SingleClick, function () { return __awaiter(_this, void 0, void 0, function () {
                    var ctrSet, ctr2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Stores.ControlSets.GetTemplateClone(ControlSetTemplate.SingleControl)];
                            case 1:
                                ctrSet = _a.sent();
                                ctrSet.OperationType = 4 /* Script */;
                                ctrSet.Name = 'Script';
                                ctrSet.Color = Color.ButtonColors[2];
                                ctrSet.IconUrl = Icon.GetByOperationTemplate(8 /* Script */, true);
                                ctrSet.Controls[0].Name = 'Script1';
                                ctrSet.Controls[0].Code = '';
                                ctrSet.Controls[0].IsAssignToggleOn = true;
                                ctrSet.Controls[0].IsAssignToggleOff = true;
                                ctr2 = App.Controllers.CSControllerFactory.Get(ctrSet);
                                ctr2.SetEntity(ctrSet);
                                ctr2.SetEditMode();
                                ctr2.Show();
                                return [2 /*return*/];
                        }
                    });
                }); });
                _this._page.ControlSetPanel.AddEventListener(StuckerBoxEvents.OrderChanged, function () { return __awaiter(_this, void 0, void 0, function () {
                    var csets, idx;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                csets = new Array();
                                idx = 1;
                                _.each(this._page.ControlSetPanel.Children, function (btn) {
                                    if (!btn.Entity)
                                        return;
                                    btn.Entity.Order = idx;
                                    idx++;
                                    csets.push(btn.Entity);
                                });
                                return [4 /*yield*/, Stores.ControlSets.UpdateHeaders(csets)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return _this;
            }
            MainController.prototype.InitStores = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                Dump.Log('Store Initialize Start');
                                return [4 /*yield*/, this.RefreshControlSets()];
                            case 1:
                                _a.sent();
                                Dump.Log('Store Initialize - ControlSets OK.');
                                Dump.Log('Store Initialize End');
                                return [2 /*return*/, true];
                        }
                    });
                });
            };
            MainController.prototype.RefreshControlSets = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var sets, children;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Stores.ControlSets.GetListForMainPanel()];
                            case 1:
                                sets = _a.sent();
                                children = Fw.Util.Obj.Mirror(this._page.ControlSetPanel.Children);
                                _.each(children, function (btn) {
                                    var existsSet = _.find(sets, function (cs) {
                                        return (cs === btn.Entity);
                                    });
                                    if (!existsSet) {
                                        _this._page.ControlSetPanel.Remove(btn);
                                        btn.Dispose();
                                    }
                                });
                                // 追加されたEntity分のボタンをパネルに追加。
                                _.each(sets, function (cs) {
                                    var existsBtn = _.find(children, function (b) {
                                        return (b.Entity === cs);
                                    });
                                    if (existsBtn)
                                        return;
                                    var btn = new ControlSetButtonView(cs);
                                    btn.Button.AddEventListener(ButtonEvents.SingleClick, function (e) {
                                        // 子View再配置中のとき、何もしない。
                                        if (_this._page.ControlSetPanel.IsChildRelocation)
                                            return;
                                        // メインボタンクリック - リモコンをスライドイン表示する。
                                        var button = e.Sender.Parent;
                                        var ctr = App.Controllers.CSControllerFactory.Get(button.Entity);
                                        ctr.SetEntity(button.Entity);
                                        ctr.SetExecMode();
                                        ctr.ShowModal();
                                    });
                                    btn.Button.AddEventListener(ButtonEvents.LongClick, function (e) {
                                        // 子View再配置中のとき、何もしない。
                                        if (_this._page.ControlSetPanel.IsChildRelocation)
                                            return;
                                        // メインボタンの長押し - リモコンを編集表示する。
                                        var button = e.Sender.Parent;
                                        var ctr = App.Controllers.CSControllerFactory.Get(button.Entity);
                                        ctr.SetEntity(button.Entity);
                                        ctr.SetEditMode();
                                        ctr.Show();
                                    });
                                    btn.Toggle.AddEventListener(ToggleEvents.Changed, function (e) {
                                        // 子View再配置中のとき、何もしない。
                                        if (_this._page.ControlSetPanel.IsChildRelocation)
                                            return;
                                        // トグルクリック
                                        var button = e.Sender.Parent;
                                        var cset = button.Entity;
                                        var toggleValue = button.Toggle.BoolValue;
                                        var controlOn = _.find(cset.Controls, function (c) {
                                            var ct = c;
                                            return ct.IsAssignToggleOn;
                                        });
                                        var controlOff = _.find(cset.Controls, function (c) {
                                            var ct = c;
                                            return ct.IsAssignToggleOff;
                                        });
                                        var targetControl = (toggleValue)
                                            ? controlOn
                                            : controlOff;
                                        Stores.Operations.Exec(cset, targetControl);
                                    });
                                    cs.AddEventListener(Events.EntityEvents.Changed, function (e) {
                                        // ボタンに乗せたControlSetEntityの値変更イベント
                                        var cset = e.Sender;
                                        var btn = _.find(_this._page.ControlSetPanel.Children, function (b) {
                                            var csetBtn = b;
                                            return (csetBtn.Entity === cset);
                                        });
                                        if (!btn)
                                            return;
                                        btn.ApplyByEntity();
                                    });
                                    _this._page.ControlSetPanel.Add(btn);
                                });
                                this._page.ControlSetPanel.Refresh();
                                return [2 /*return*/, true];
                        }
                    });
                });
            };
            return MainController;
        }(Fw.Controllers.ControllerBase));
        Controllers.MainController = MainController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Controllers/ControllerBase.ts" />
/// <reference path="../../Fw/Controllers/Manager.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/Events/ControlViewEvents.ts" />
/// <reference path="../../Fw/Views/Property/FitPolicy.ts" />
/// <reference path="../Views/Pages/MainPageView.ts" />
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var Events = Fw.Events;
        var Controls = App.Views.Controls;
        var MouseEventsController = /** @class */ (function (_super) {
            __extends(MouseEventsController, _super);
            function MouseEventsController() {
                var _this = _super.call(this, 'MouseEvents') || this;
                _this.HeaderBar = new Controls.HeaderBarView();
                _this.SetClassName('ControlSetController');
                _this.SetPageView(new Fw.Views.PageView());
                _this.HeaderBar.Text = 'Remote Control';
                _this.HeaderBar.RightButton.Hide(0);
                _this.View.Add(_this.HeaderBar);
                _this.HeaderBar.LeftButton.Hide(0);
                _this.HeaderBar.LeftButton.AddEventListener(Events.ButtonViewEvents.SingleClick, function () {
                    _this.Manager.Get("Main").Show();
                });
                _this.View.Elem.on('click', function (e) {
                    _this.Log('click');
                });
                _this.View.Elem.on('mousedown', function (e) {
                    _this.Log('mousedown');
                });
                _this.View.Elem.on('mousemove', function (e) {
                    _this.Log('mousemove');
                });
                _this.View.Elem.on('mouseup', function (e) {
                    _this.Log('mouseup');
                });
                _this.View.Elem.on('mouseout', function (e) {
                    _this.Log('mouseout');
                });
                _this.View.Elem.on('touchstart', function (e) {
                    _this.Log('touchstart');
                });
                _this.View.Elem.on('touchmove', function (e) {
                    _this.Log('touchmove');
                });
                _this.View.Elem.on('touchend', function (e) {
                    _this.Log('touchend');
                });
                return _this;
            }
            return MouseEventsController;
        }(Fw.Controllers.ControllerBase));
        Controllers.MouseEventsController = MouseEventsController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var InputViewEventsClass = /** @class */ (function (_super) {
            __extends(InputViewEventsClass, _super);
            function InputViewEventsClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Changed = 'Changed';
                _this.Focused = 'Focused';
                _this.Blurred = 'Blurred';
                return _this;
            }
            return InputViewEventsClass;
        }(Events.ViewEventsClass));
        Events.InputViewEventsClass = InputViewEventsClass;
        Events.InputViewEvents = new InputViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="InputViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var CheckBoxInputViewEventsClass = /** @class */ (function (_super) {
            __extends(CheckBoxInputViewEventsClass, _super);
            function CheckBoxInputViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CheckBoxInputViewEventsClass;
        }(Events.InputViewEventsClass));
        Events.CheckBoxInputViewEventsClass = CheckBoxInputViewEventsClass;
        Events.CheckBoxInputViewEvents = new CheckBoxInputViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var EventObject = /** @class */ (function () {
            function EventObject(sender, eventName, params) {
                this.Sender = sender;
                this.EventName = eventName;
                this.Params = params;
            }
            return EventObject;
        }());
        Events.EventObject = EventObject;
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var ImageViewEventsClass = /** @class */ (function (_super) {
            __extends(ImageViewEventsClass, _super);
            function ImageViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ImageViewEventsClass;
        }(Events.ViewEventsClass));
        Events.ImageViewEventsClass = ImageViewEventsClass;
        Events.ImageViewEvents = new ImageViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var LabelViewEventsClass = /** @class */ (function (_super) {
            __extends(LabelViewEventsClass, _super);
            function LabelViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LabelViewEventsClass;
        }(Events.ViewEventsClass));
        Events.LabelViewEventsClass = LabelViewEventsClass;
        Events.LabelViewEvents = new LabelViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var LineViewEventsClass = /** @class */ (function (_super) {
            __extends(LineViewEventsClass, _super);
            function LineViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LineViewEventsClass;
        }(Events.ViewEventsClass));
        Events.LineViewEventsClass = LineViewEventsClass;
        Events.LineViewEvents = new LineViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="ButtonViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var RelocatableViewEventsClass = /** @class */ (function (_super) {
            __extends(RelocatableViewEventsClass, _super);
            function RelocatableViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return RelocatableViewEventsClass;
        }(Events.ButtonViewEventsClass));
        Events.RelocatableViewEventsClass = RelocatableViewEventsClass;
        Events.RelocatableViewEvents = new RelocatableViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="InputViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var SelectBoxInputViewEventsClass = /** @class */ (function (_super) {
            __extends(SelectBoxInputViewEventsClass, _super);
            function SelectBoxInputViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SelectBoxInputViewEventsClass;
        }(Events.InputViewEventsClass));
        Events.SelectBoxInputViewEventsClass = SelectBoxInputViewEventsClass;
        Events.SelectBoxInputViewEvents = new SelectBoxInputViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="BoxViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var SlidableBoxViewEventsClass = /** @class */ (function (_super) {
            __extends(SlidableBoxViewEventsClass, _super);
            function SlidableBoxViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SlidableBoxViewEventsClass;
        }(Events.BoxViewEventsClass));
        Events.SlidableBoxViewEventsClass = SlidableBoxViewEventsClass;
        Events.SlidableBoxViewEvents = new SlidableBoxViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="EventableEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var StoreEventsClass = /** @class */ (function (_super) {
            __extends(StoreEventsClass, _super);
            function StoreEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return StoreEventsClass;
        }(Events.EventableEventsClass));
        Events.StoreEventsClass = StoreEventsClass;
        Events.StoreEvents = new StoreEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="InputViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var TextAreaInputViewEventsClass = /** @class */ (function (_super) {
            __extends(TextAreaInputViewEventsClass, _super);
            function TextAreaInputViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TextAreaInputViewEventsClass;
        }(Events.InputViewEventsClass));
        Events.TextAreaInputViewEventsClass = TextAreaInputViewEventsClass;
        Events.TextAreaInputViewEvents = new TextAreaInputViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="InputViewEvents.ts" />
var Fw;
(function (Fw) {
    var Events;
    (function (Events) {
        var TextBoxInputViewEventsClass = /** @class */ (function (_super) {
            __extends(TextBoxInputViewEventsClass, _super);
            function TextBoxInputViewEventsClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TextBoxInputViewEventsClass;
        }(Events.InputViewEventsClass));
        Events.TextBoxInputViewEventsClass = TextBoxInputViewEventsClass;
        Events.TextBoxInputViewEvents = new TextBoxInputViewEventsClass();
    })(Events = Fw.Events || (Fw.Events = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="./Dump.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var DateTime = /** @class */ (function () {
            function DateTime() {
            }
            DateTime.GetDate = function (dateString) {
                if (!dateString || dateString === '')
                    return null;
                try {
                    return new Date(Date.parse(dateString));
                }
                catch (e) {
                    return null;
                }
            };
            /**
             * 時差情報付きISO8601文字列を取得する。
             * @param date
             */
            DateTime.GetIso8601 = function (date) {
                var offset = date.getTimezoneOffset() * -1; // 時差符号は逆転させる。
                var offsetHour = Math.ceil(Math.abs(offset) / 60);
                var offsetMinute = Math.abs(offset) % 60;
                var offsetString = (offset === 0)
                    ? 'Z'
                    : (((offset > 0) ? '+' : '-')
                        + ('0' + offsetHour).slice(-2)
                        + ':' + ('0' + offsetMinute).slice(-2));
                var result = date.getFullYear()
                    + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
                    + '-' + ('0' + date.getDate()).slice(-2)
                    + 'T' + ('0' + date.getHours()).slice(-2)
                    + ':' + ('0' + date.getMinutes()).slice(-2)
                    + ':' + ('0' + date.getSeconds()).slice(-2)
                    + '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5)
                    + offsetString;
                return result;
            };
            return DateTime;
        }());
        Util.DateTime = DateTime;
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="./Dump.ts" />
/// <reference path="../ObjectBase.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var Dump = Fw.Util.Dump;
        var DelayedOnceExecuter = /** @class */ (function (_super) {
            __extends(DelayedOnceExecuter, _super);
            function DelayedOnceExecuter(iobject, callback, delay, timeout, isMonitor) {
                if (delay === void 0) { delay = 100; }
                if (timeout === void 0) { timeout = -1; }
                if (isMonitor === void 0) { isMonitor = false; }
                var _this = _super.call(this) || this;
                _this.Name = '';
                _this.SetClassName('DelayedOnceExecuter');
                _this._object = iobject;
                _this._callback = callback;
                _this._delay = delay;
                _this._timeout = timeout;
                _this._startTime = null;
                _this._timer = null;
                _this._isActive = false;
                _this._suppressCount = 0;
                _this._timeoutExecStartTime = null;
                //this.EnableLog = true;
                if (isMonitor) {
                    //this.EnableLog = true;
                    setInterval(function () {
                        if (!_this._isActive)
                            return;
                        if (_this._startTime || _this._timeoutExecStartTime) {
                            var now = new Date();
                            var elapsed = (_this._timeoutExecStartTime)
                                ? now.getTime() - _this._timeoutExecStartTime.getTime()
                                : now.getTime() - _this._startTime.getTime();
                            if (DelayedOnceExecuter.DelayThreshold < elapsed) {
                                // Delay閾値より長い時間の間、一度も実行されていない。
                                // 無限ループの可能性がある。
                                _this.EnableLog = true;
                                _this._object.EnableLog = true;
                                _this.Log('＊＊＊無限ループの可能性があります＊＊＊');
                                _this.Log(_this.Name + ": \u7D4C\u904E\u6642\u9593(msec) = " + elapsed);
                                _this.Log("" + _this._object.ObjectIdentifier);
                            }
                        }
                        if (DelayedOnceExecuter.SuppressThreshold < _this._suppressCount) {
                            // Suppress閾値より多くの回数分、実行が抑制されている。
                            // 呼び出し回数が多すぎる可能性がある。
                            _this.EnableLog = true;
                            _this._object.EnableLog = true;
                            _this.Log('＊＊＊呼び出し回数が多すぎます＊＊＊');
                            _this.Log(_this.Name + ": \u6291\u5236\u56DE\u6570 = " + _this._suppressCount);
                            _this.Log("" + _this._object.ObjectIdentifier);
                        }
                    }, DelayedOnceExecuter.MonitorInterval);
                }
                return _this;
            }
            Object.defineProperty(DelayedOnceExecuter.prototype, "Delay", {
                get: function () {
                    return this._delay;
                },
                set: function (value) {
                    this._delay = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DelayedOnceExecuter.prototype, "Timeout", {
                get: function () {
                    return this._timeout;
                },
                set: function (value) {
                    this._timeout;
                },
                enumerable: true,
                configurable: true
            });
            DelayedOnceExecuter.prototype.Exec = function (passingValues) {
                var _this = this;
                this._isActive = true;
                if (this._timer === null) {
                    // これから開始するとき
                    this._startTime = new Date();
                    this._suppressCount = 0;
                }
                else {
                    // 既に開始中のとき
                    clearInterval(this._timer);
                    this._timer = null;
                    this._suppressCount++;
                }
                var now = new Date();
                var elapsed = (now.getTime() - this._startTime.getTime());
                if (0 < this._timeout && elapsed > this._timeout) {
                    // タイムアウト実行が連続するときの、最初の開始時間を保持しておく。
                    if (this._timeoutExecStartTime === null)
                        this._timeoutExecStartTime = this._startTime;
                    this.Log("Timeout Exec: " + this._object.ObjectIdentifier);
                    this.InnerExec(passingValues);
                }
                else {
                    this._timer = setTimeout(function () {
                        _this._timeoutExecStartTime = null;
                        _this.InnerExec(passingValues);
                    }, this._delay);
                }
            };
            DelayedOnceExecuter.prototype.InnerExec = function (passingValues) {
                //this.Log(`InnerExec: ${this._object.ObjectIdentifier}: suppressed[${this._suppressCount}]`);
                try {
                    this._callback(passingValues);
                }
                catch (e) {
                    this.Log("Callback FAILED!!: " + this._object.ObjectIdentifier);
                    Dump.ErrorLog(e);
                }
                if (this._timer) {
                    clearInterval(this._timer);
                    this._timer = null;
                }
                this._startTime = null;
                this._suppressCount = 0;
                this._isActive = false;
            };
            DelayedOnceExecuter.MonitorInterval = 10000;
            DelayedOnceExecuter.DelayThreshold = 3000;
            DelayedOnceExecuter.SuppressThreshold = 100;
            return DelayedOnceExecuter;
        }(Fw.ObjectBase));
        Util.DelayedOnceExecuter = DelayedOnceExecuter;
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="IView.ts" />
/// <reference path="Property/Anchor.ts" />
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/InputViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="ViewBase.ts" />
/// <reference path="IInputView.ts" />
/// <reference path="Property/FitPolicy.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Events = Fw.Events.InputViewEvents;
        var InputViewBase = /** @class */ (function (_super) {
            __extends(InputViewBase, _super);
            function InputViewBase(jqueryElem) {
                var _this = _super.call(this, jqueryElem) || this;
                _this.SetClassName('InputView');
                _this.Elem.addClass(_this.ClassName);
                _this._name = '';
                _this._value = '';
                _this._isReadOnly = false;
                _this.BackgroundColor = '#FFFFFF';
                _this.Elem.on('propertychange change keyup paste input', function () {
                    //this.Log('InputViewBase.Changed');
                    _this.DispatchEvent(Events.Changed, _this.Value);
                });
                _this.Elem.on('focus', function () {
                    //this.Log('InputViewBase.Focused');
                    _this.DispatchEvent(Events.Focused);
                });
                _this.Elem.on('blur', function () {
                    //this.Log('InputViewBase.Blurred');
                    _this.DispatchEvent(Events.Blurred);
                });
                return _this;
            }
            Object.defineProperty(InputViewBase.prototype, "Name", {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                    this.Elem.attr('name', this._name);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputViewBase.prototype, "Value", {
                get: function () {
                    this._value = this.Elem.val();
                    return this._value;
                },
                set: function (value) {
                    this.SetValue(value);
                },
                enumerable: true,
                configurable: true
            });
            InputViewBase.prototype.SetValue = function (value, eventDispatch) {
                if (eventDispatch === void 0) { eventDispatch = true; }
                var changed = (this._value !== value);
                this.Elem.val(value);
                this._value = this.Elem.val();
                this.Refresh();
                if (changed && eventDispatch) {
                    this.DispatchEvent(Events.Changed, this.Value);
                }
            };
            Object.defineProperty(InputViewBase.prototype, "IsReadOnly", {
                get: function () {
                    return this._isReadOnly;
                },
                set: function (value) {
                    var changed = (this._isReadOnly !== value);
                    if (changed) {
                        this._isReadOnly = value;
                        this.Elem.attr('readonly', this._isReadOnly);
                    }
                },
                enumerable: true,
                configurable: true
            });
            return InputViewBase;
        }(Views.ViewBase));
        Views.InputViewBase = InputViewBase;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/CheckBoxInputViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="ViewBase.ts" />
/// <reference path="InputViewBase.ts" />
/// <reference path="IInputView.ts" />
/// <reference path="Property/FitPolicy.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Events = Fw.Events.CheckBoxInputViewEvents;
        var CheckBoxInputView = /** @class */ (function (_super) {
            __extends(CheckBoxInputView, _super);
            function CheckBoxInputView() {
                var _this = _super.call(this, $('<div></div>')) || this;
                _this.SetClassName('CheckBoxInputView');
                _this.Elem.addClass(_this.ClassName);
                _this._input = $('<input type="checkbox" class="CheckBoxInputViewProperty"></input>');
                _this._label = $('<label class="CheckBoxInputViewProperty"></label >');
                _this.Elem.append(_this._input);
                _this.Elem.append(_this._label);
                _this._name = '';
                _this._boolValue = false;
                _this._text = '';
                _this.BackgroundColor = 'transparent';
                _this.SetStyle('borderWidth', '0');
                _this._input.prop('checked', false);
                _this._input.on('propertychange change keyup paste input', function () {
                    //this.Log('CheckBoxInputView.Changed');
                    _this.BoolValue = _this._input.prop('checked');
                });
                _this._input.on('focus', function () {
                    //this.Log('CheckBoxInputView.Focused');
                    _this.DispatchEvent(Events.Focused);
                });
                _this._input.on('blur', function () {
                    //this.Log('CheckBoxInputView.Blurred');
                    _this.DispatchEvent(Events.Blurred);
                });
                return _this;
            }
            Object.defineProperty(CheckBoxInputView.prototype, "Text", {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    this._text = value;
                    this._label.text(this._text);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckBoxInputView.prototype, "Name", {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                    this._input.attr('name', this._name);
                    var id = this._name + "_" + (this._boolValue === true ? 'true' : 'false');
                    this._input.attr('id', id);
                    this._label.attr('for', id);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckBoxInputView.prototype, "BoolValue", {
                get: function () {
                    return (this._boolValue === true);
                },
                set: function (value) {
                    this.SetValue(value === true ? 'true' : 'false');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckBoxInputView.prototype, "Value", {
                get: function () {
                    return (this.BoolValue)
                        ? 'true'
                        : 'false';
                },
                set: function (value) {
                    this.SetValue(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckBoxInputView.prototype, "IsReadOnly", {
                get: function () {
                    return this._isReadOnly;
                },
                set: function (value) {
                    var changed = (this._isReadOnly !== value);
                    if (changed) {
                        this._isReadOnly = value;
                        this._input.attr('disabled', this._isReadOnly);
                    }
                },
                enumerable: true,
                configurable: true
            });
            CheckBoxInputView.prototype.SetValue = function (value, eventDispatch) {
                if (eventDispatch === void 0) { eventDispatch = true; }
                this.SetBoolValue((value === 'true'), eventDispatch);
            };
            CheckBoxInputView.prototype.SetBoolValue = function (value, eventDispatch) {
                if (eventDispatch === void 0) { eventDispatch = true; }
                var changed = (this._boolValue !== value);
                this._boolValue = value;
                this._input.prop('checked', this._boolValue);
                if (changed && eventDispatch) {
                    this.DispatchEvent(Events.Changed, this.Value);
                }
            };
            return CheckBoxInputView;
        }(Views.InputViewBase));
        Views.CheckBoxInputView = CheckBoxInputView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            /**
             * @description font-weight
             */
            var FontWeight;
            (function (FontWeight) {
                FontWeight["Lighter"] = "lighter";
                FontWeight["Normal"] = "normal";
                FontWeight["Bold"] = "bold";
                FontWeight["Bolder"] = "bolder";
            })(FontWeight = Property.FontWeight || (Property.FontWeight = {}));
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ControlViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="ViewBase.ts" />
/// <reference path="Property/FontWeight.ts" />
/// <reference path="../Util/Num.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Num = Fw.Util.Num;
        var HtmlView = /** @class */ (function (_super) {
            __extends(HtmlView, _super);
            function HtmlView(elementType) {
                var _this = _super.call(this, $("<" + elementType + "></" + elementType + ">")) || this;
                _this.SetClassName('HtmlView');
                _this.Elem.addClass(_this.ClassName);
                _this._innerHtml = '';
                _this.BackgroundColor = 'transparent';
                _this.SetTransAnimation(false);
                _this.HasBorder = false;
                _this.BorderRadius = 0;
                return _this;
            }
            Object.defineProperty(HtmlView.prototype, "HasBorder", {
                get: function () {
                    return this._hasBorder;
                },
                set: function (value) {
                    this._hasBorder = value;
                    //this.Dom.style.borderWidth = (value) ? '1px' : '0';
                    this.SetStyle('borderWidth', (value)
                        ? '1px'
                        : '0');
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlView.prototype, "BorderRadius", {
                get: function () {
                    return this._borderRadius;
                },
                set: function (value) {
                    if (Num.IsNaN(value) || value === null || value === undefined)
                        value = 0;
                    if (value < 0)
                        value = 0;
                    if (value > 50)
                        value = 50;
                    this._borderRadius = value;
                    this.SetStyle('borderRadius', this._borderRadius + "%");
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlView.prototype, "InnerHtml", {
                get: function () {
                    return this._innerHtml;
                },
                set: function (value) {
                    var changed = (this._innerHtml !== value);
                    this._innerHtml = value;
                    if (changed) {
                        this.Elem.html(this._innerHtml);
                        this.Refresh();
                    }
                },
                enumerable: true,
                configurable: true
            });
            return HtmlView;
        }(Views.ViewBase));
        Views.HtmlView = HtmlView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="ViewBase.ts" />
/// <reference path="Property/FitPolicy.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var FitPolicy = Fw.Views.Property.FitPolicy;
        var ImageView = /** @class */ (function (_super) {
            __extends(ImageView, _super);
            function ImageView() {
                var _this = _super.call(this, $('<div></div>')) || this;
                _this._image = new Image();
                _this.SetClassName('ImageView');
                _this.Elem.addClass(_this.ClassName);
                _this.BackgroundColor = 'transparent';
                _this.SetStyles({
                    borderWidth: '0',
                    borderRadius: '0'
                });
                // 注) ImageオブジェクトはDomツリーに入れない。
                _this._image.onload = function () {
                    //this.Log('Image Loaded!!');
                    _this.Refresh();
                };
                _this._firPolicy = FitPolicy.Auto;
                return _this;
            }
            Object.defineProperty(ImageView.prototype, "Src", {
                get: function () {
                    return this._src;
                },
                set: function (value) {
                    this._src = value;
                    this._image.src = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ImageView.prototype, "FitPolicy", {
                get: function () {
                    return this._firPolicy;
                },
                set: function (value) {
                    this._firPolicy = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            ImageView.prototype.InnerRefresh = function () {
                try {
                    this.SuppressLayout();
                    _super.prototype.InnerRefresh.call(this);
                    this.SetStyles({
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: this.FitPolicy,
                        backgroundImage: (this._src) ? "url(" + this._src + ")" : null
                    });
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                }
            };
            ImageView.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
                this._image = null;
                this._src = null;
                this._firPolicy = null;
            };
            return ImageView;
        }(Views.ViewBase));
        Views.ImageView = ImageView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ControlViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="ViewBase.ts" />
/// <reference path="Property/FontWeight.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Events = Fw.Events.ControlViewEvents;
        var Property = Fw.Views.Property;
        var LabelView = /** @class */ (function (_super) {
            __extends(LabelView, _super);
            function LabelView() {
                var _this = _super.call(this, $('<label></label>')) || this;
                _this._hiddenSpan = document.createElement('span');
                _this.SetClassName('LabelView');
                _this.Elem.addClass(_this.ClassName);
                _this.BackgroundColor = 'transparent';
                _this.SetTransAnimation(false);
                //this.Dom.style.borderWidth = '0';
                //this.Dom.style.borderRadius = '0';
                _this.SetStyles({
                    borderWidth: '0',
                    borderRadius: '0'
                });
                _this._text = '';
                _this._fontWeight = Property.FontWeight.Normal;
                _this._fontSize = Property.FontSize.Medium;
                _this._fontFamily = 'Quicksand, 游ゴシック体, "Yu Gothic", YuGothic, "ヒラギノ角ゴシック Pro", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';
                _this._textAlign = Property.TextAlign.Center;
                _this._hiddenSpan.style.visibility = 'hidden';
                _this._hiddenSpan.style.fontWeight = _this._fontWeight;
                _this._hiddenSpan.style.fontSize = _this._fontSize;
                _this._hiddenSpan.style.fontFamily = _this._fontFamily;
                _this.AddEventListener(Events.Attached, function (e) {
                    _this.Parent.Elem.append(_this._hiddenSpan);
                });
                _this.AddEventListener(Events.Detached, function (e) {
                    $(_this._hiddenSpan).remove();
                });
                _this._autoSize = true;
                return _this;
            }
            Object.defineProperty(LabelView.prototype, "Text", {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    var changed = (this._text !== value);
                    this._text = value;
                    if (changed) {
                        this.Elem.text(''); // 一旦消す。
                        this._hiddenSpan.innerText = this._text;
                        this.Refresh();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LabelView.prototype, "FontWeight", {
                get: function () {
                    return this._fontWeight;
                },
                set: function (value) {
                    this._fontWeight = value;
                    this._hiddenSpan.style.fontWeight = this._fontWeight;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LabelView.prototype, "FontSize", {
                get: function () {
                    return this._fontSize;
                },
                set: function (value) {
                    this._fontSize = value;
                    this._hiddenSpan.style.fontSize = this._fontSize;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LabelView.prototype, "FontFamily", {
                get: function () {
                    return this._fontFamily;
                },
                set: function (value) {
                    this._fontFamily = value;
                    this._hiddenSpan.style.fontFamily = this._fontFamily;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LabelView.prototype, "TextAlign", {
                get: function () {
                    return this._textAlign;
                },
                set: function (value) {
                    this._textAlign = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LabelView.prototype, "AutoSize", {
                get: function () {
                    return this._autoSize;
                },
                set: function (value) {
                    this._autoSize = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            LabelView.prototype.InnerRefresh = function () {
                try {
                    if (this.IsDisposed !== false)
                        return;
                    _super.prototype.InnerRefresh.call(this);
                    this.SetStyles({
                        textAlign: this._textAlign,
                        fontWeight: this._fontWeight,
                        fontSize: this._fontSize,
                        fontFamily: this._fontFamily
                    });
                    this.Elem.text(this._text);
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
            };
            LabelView.prototype.CalcLayout = function () {
                try {
                    this.SuppressLayout();
                    if (this._autoSize) {
                        this.Size.Width = this._hiddenSpan.offsetWidth + 10;
                        if (this.Size.Height === 0)
                            this.Size.Height = this._hiddenSpan.offsetHeight;
                    }
                    _super.prototype.CalcLayout.call(this);
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                }
            };
            LabelView.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
                this._text = null;
                $(this._hiddenSpan).remove();
            };
            return LabelView;
        }(Views.ViewBase));
        Views.LabelView = LabelView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ControlViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="./BoxView.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Events = Fw.Events.BoxViewEvents;
        var LineView = /** @class */ (function (_super) {
            __extends(LineView, _super);
            function LineView(direction) {
                var _this = _super.call(this, $('<div></div>')) || this;
                // nullやundefinedを入れさせない。
                _this._direction = (direction === Views.Property.Direction.Horizontal)
                    ? Views.Property.Direction.Horizontal
                    : Views.Property.Direction.Vertical;
                _this.SetClassName('LineView');
                _this.Elem.addClass(_this.ClassName);
                _this._length = 0;
                return _this;
            }
            Object.defineProperty(LineView.prototype, "Direction", {
                get: function () {
                    return this._direction;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LineView.prototype, "Length", {
                get: function () {
                    return this._length;
                },
                set: function (value) {
                    var changed = (this._length !== value);
                    this._length = value;
                    if (changed && !this.IsSuppressedLayout())
                        this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LineView.prototype, "BackgroundColor", {
                get: function () {
                    throw new Error('Not supported');
                },
                set: function (value) {
                    throw new Error('Not supported');
                },
                enumerable: true,
                configurable: true
            });
            LineView.prototype.InnerRefresh = function () {
                try {
                    //this.Log(`${this.ClassName}.InnerRefresh`);
                    this.SuppressLayout();
                    _super.prototype.InnerRefresh.call(this);
                    this.SetStyles({
                        borderWidth: '0',
                        backgroundColor: "" + this.Color,
                    });
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                }
            };
            LineView.prototype.CalcLayout = function () {
                try {
                    //this.Log(`${this.ClassName}.CalcLayout`);
                    this.SuppressLayout();
                    this.SuppressEvent(Events.SizeChanged);
                    this.SuppressEvent(Events.PositionChanged);
                    if (this.Direction === Views.Property.Direction.Horizontal) {
                        //this.Log(`${this.ClassName}.Direction = ${this.Direction}`);
                        this.Size.Height = 2;
                        // 左右端がどちらかがアンカーされていないとき、Length基準で幅を決める。
                        if (!(this.Anchor.IsAnchoredLeft && this.Anchor.IsAnchoredRight))
                            this.Size.Width = this.Length;
                    }
                    else {
                        //this.Log(`${this.ClassName}.Direction = ${this.Direction}`);
                        this.Size.Width = 2;
                        // 上下端のどちらかがアンカーされていないとき、Length基準で高さを決める。
                        if (!(this.Anchor.IsAnchoredTop && this.Anchor.IsAnchoredBottom))
                            this.Size.Height = this.Length;
                    }
                    _super.prototype.CalcLayout.call(this);
                    if (this.Direction === Views.Property.Direction.Horizontal) {
                        // 左右両端がアンカーされているとき、Lengthは自動決定。
                        if (this.Anchor.IsAnchoredLeft && this.Anchor.IsAnchoredRight)
                            this.Length = this.Size.Width;
                    }
                    else {
                        // 上下両端がアンカーされているとき、Lengthは自動決定
                        if (this.Anchor.IsAnchoredTop && this.Anchor.IsAnchoredBottom)
                            this.Length = this.Size.Height;
                    }
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                    this.ResumeEvent(Events.SizeChanged);
                    this.ResumeEvent(Events.PositionChanged);
                }
            };
            LineView.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
            };
            return LineView;
        }(Views.ViewBase));
        Views.LineView = LineView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/InputViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="InputViewBase.ts" />
/// <reference path="Property/FitPolicy.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Events = Fw.Events.InputViewEvents;
        var NumberBoxInputView = /** @class */ (function (_super) {
            __extends(NumberBoxInputView, _super);
            function NumberBoxInputView() {
                var _this = _super.call(this, $('<input type="text"></input>')) || this;
                _this.SetClassName('NumberBoxInputView');
                _this.Elem.addClass(_this.ClassName);
                _this._numberValue = 0;
                _this._decimalPoint = 0;
                _this._thousandSeparator = false;
                _this._textAlign = Views.Property.TextAlign.Left;
                // タブや方向キー、BackSpaceなども無効化してしまう。
                // ちょうどいい具合のものがないか、検討中。
                // 数値以外の入力値を禁止する。
                //this.Elem.on('keypress', (e) => {
                //    // 数字以外の不要な文字を削除
                //    var st = String.fromCharCode(e.which);
                //    return ("0123456789-.,".indexOf(st, 0) < 0)
                //        ? false
                //        : true;
                //});
                _this.Elem.on('change', function () {
                    var value = _this.Elem.val().replace(/,/g, '');
                    if ($.isNumeric(value)) {
                        _this.SetNumberValue(parseFloat(value));
                    }
                    else {
                        _this.SetNumberValue(0);
                    }
                    _this.Refresh();
                });
                return _this;
            }
            Object.defineProperty(NumberBoxInputView.prototype, "TextAlign", {
                get: function () {
                    return this._textAlign;
                },
                set: function (value) {
                    this._textAlign = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NumberBoxInputView.prototype, "DecimalPoint", {
                get: function () {
                    return this._decimalPoint;
                },
                set: function (value) {
                    var changed = (this._decimalPoint !== value);
                    if (changed) {
                        this._decimalPoint = value;
                        this.Refresh();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NumberBoxInputView.prototype, "ThousandSeparator", {
                get: function () {
                    return this._thousandSeparator;
                },
                set: function (value) {
                    var changed = (this._thousandSeparator !== value);
                    if (changed) {
                        this._thousandSeparator = value;
                        this.Refresh();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NumberBoxInputView.prototype, "NumberValue", {
                get: function () {
                    return this._numberValue;
                },
                set: function (value) {
                    var changed = (this._numberValue !== value);
                    if (changed)
                        this.SetNumberValue(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NumberBoxInputView.prototype, "Value", {
                get: function () {
                    return (this._numberValue === null)
                        ? null
                        : this._numberValue.toFixed(this._decimalPoint);
                },
                set: function (value) {
                    this.SetValue(value);
                },
                enumerable: true,
                configurable: true
            });
            NumberBoxInputView.prototype.SetValue = function (value, eventDispatch) {
                if (eventDispatch === void 0) { eventDispatch = true; }
                if (!$.isNumeric(value)) {
                    Dump.Log('Not Number value: ' + value);
                    throw new Error('Not Number value: ' + value);
                }
                this.SetNumberValue(parseFloat(value), eventDispatch);
            };
            NumberBoxInputView.prototype.SetNumberValue = function (value, eventDispatch) {
                if (eventDispatch === void 0) { eventDispatch = true; }
                var changed = (this._numberValue !== value);
                this._numberValue = value;
                this.Refresh();
                if (changed && eventDispatch) {
                    this.DispatchEvent(Events.Changed, this.Value);
                }
            };
            NumberBoxInputView.prototype.InnerRefresh = function () {
                try {
                    if (this.IsDisposed !== false)
                        return;
                    _super.prototype.InnerRefresh.call(this);
                    var textValue = this._numberValue.toFixed(this._decimalPoint);
                    if (this.ThousandSeparator) {
                        textValue = this.addCommnas(textValue);
                    }
                    this.Elem.val(textValue);
                    this.SetStyles({
                        textAlign: this._textAlign,
                    });
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
            };
            NumberBoxInputView.prototype.addCommnas = function (numString) {
                numString += '';
                var x = numString.split('.');
                var x1 = x[0];
                var x2 = x.length > 1
                    ? '.' + x[1]
                    : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            };
            return NumberBoxInputView;
        }(Views.InputViewBase));
        Views.NumberBoxInputView = NumberBoxInputView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="../Util/Num.ts" />
/// <reference path="InputViewBase.ts" />
/// <reference path="Property/FitPolicy.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var SelectBoxInputView = /** @class */ (function (_super) {
            __extends(SelectBoxInputView, _super);
            function SelectBoxInputView() {
                var _this = _super.call(this, $('<select></select>')) || this;
                _this.SetClassName('SelectBoxInputView');
                _this.Elem.addClass(_this.ClassName);
                _this.AddItem('', '');
                return _this;
            }
            Object.defineProperty(SelectBoxInputView.prototype, "IsReadOnly", {
                get: function () {
                    return this._isReadOnly;
                },
                set: function (value) {
                    var _this = this;
                    var changed = (this._isReadOnly !== value);
                    if (changed) {
                        this._isReadOnly = value;
                        this.Elem.children().each(function (idx, elem) {
                            var $elem = $(elem);
                            var selected = $elem.prop('selected');
                            if (selected === true) {
                                // 常に有効
                                $elem.prop('disabled', false);
                            }
                            else {
                                // 無効化制御
                                $elem.prop('disabled', _this._isReadOnly);
                            }
                        });
                    }
                },
                enumerable: true,
                configurable: true
            });
            SelectBoxInputView.prototype.AddItem = function (name, value) {
                //this.Log('name: ' + name);
                //this.Log(`<option value="${value}">${name}</option>`);
                var option = $("<option value=\"" + value + "\"></option>");
                option.html(name);
                this.Elem.append(option);
            };
            SelectBoxInputView.prototype.ClearItems = function () {
                this.Elem.find('option').remove();
                this.AddItem('', '');
            };
            return SelectBoxInputView;
        }(Views.InputViewBase));
        Views.SelectBoxInputView = SelectBoxInputView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="../Events/SlidableBoxViewEvents.ts" />
/// <reference path="Animation/Animator.ts" />
/// <reference path="Animation/Params.ts" />
/// <reference path="BoxView.ts" />
/// <reference path="Property/Size.ts" />
/// <reference path="Property/MouseLocation.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Property = Fw.Views.Property;
        var Events = Fw.Events.SlidableBoxViewEvents;
        var MouseLocation = Fw.Views.Property.MouseLocation;
        var SlidableBoxView = /** @class */ (function (_super) {
            __extends(SlidableBoxView, _super);
            function SlidableBoxView(direction) {
                var _this = _super.call(this) || this;
                //private _innerBackgroundColor: string = '#F5F5F5';
                //public get InnerBackgroundColor(): string {
                //    return this._innerBackgroundColor;
                //}
                //public set InnerBackgroundColor(value: string) {
                //    this._innerBackgroundColor = value;
                //    this.Refresh();
                //}
                _this._innerLength = 10;
                _this._barMargin = 10;
                _this._isDragging = false;
                _this._spcvMouseSuppressor = false;
                // nullやundefinedを入れさせない。
                _this._direction = (direction === Property.Direction.Horizontal)
                    ? Property.Direction.Horizontal
                    : Property.Direction.Vertical;
                _this._innerBox = new Views.BoxView();
                _this._positionBarMax = new Views.LineView(_this._direction);
                _this._positionBarCurrent = new Views.LineView(_this._direction);
                _this.SetClassName('SlidablePanelView');
                _this.Elem.addClass(_this.ClassName);
                _this._dragStartMousePosition = new Property.Position();
                _this._dragStartViewPosition = new Property.Position();
                _this.Position.Policy = Property.PositionPolicy.LeftTop;
                _this.HasBorder = false;
                _this.BorderRadius = 0;
                _this._innerBox.HasBorder = false;
                _this._innerBox.SetTransAnimation(false);
                _this._innerBox.SetLeftTop(0, 0);
                _this._innerBox.BackgroundColor = 'transparent';
                _this._innerBox.SetParent(_this);
                _this.Elem.append(_this._innerBox.Elem);
                //this.EnableLog = true;
                // コンストラクタ完了後に実行。
                // コンストラクタ引数で取得したDirectionがセットされていないため。
                _this._positionBarMax.Position.Policy = Property.PositionPolicy.LeftTop;
                _this._positionBarMax.SetTransAnimation(false);
                _this._positionBarMax.Color = '#EEEEEE';
                _this._positionBarMax.SetParent(_this);
                _this.Elem.append(_this._positionBarMax.Elem);
                _this._positionBarCurrent.Position.Policy = Property.PositionPolicy.LeftTop;
                _this._positionBarCurrent.SetTransAnimation(false);
                _this._positionBarCurrent.Color = '#888888';
                _this._positionBarCurrent.SetParent(_this);
                _this.Elem.append(_this._positionBarCurrent.Elem);
                _this.AddEventListener(Events.Initialized, function (e) {
                    _this.InitView();
                });
                _this._innerBox.Elem.addClass('SlidablePanelInnerView');
                _this._innerBox.Elem.on('touchstart mousedown', function (e) {
                    //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                    //if (e.eventPhase !== 2)
                    //    return;
                    _this._isDragging = true;
                    var ml = MouseLocation.Create(e);
                    _this._dragStartMousePosition.X = ml.PageX;
                    _this._dragStartMousePosition.Y = ml.PageY;
                    _this._dragStartViewPosition.X = _this._innerBox.Position.Left;
                    _this._dragStartViewPosition.Y = _this._innerBox.Position.Top;
                    Fw.Root.Instance.SetTextSelection(false);
                });
                _this._innerBox.Elem.on('touchmove mousemove', function (e) {
                    // * ドラッグ処理中でないとき *　は無視する。
                    if (!_this._isDragging || _this._spcvMouseSuppressor)
                        return;
                    //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                    //if (e.eventPhase !== 2)
                    //    return;
                    var ml = MouseLocation.Create(e);
                    var addX = ml.ClientX - _this._dragStartMousePosition.X;
                    var addY = ml.ClientY - _this._dragStartMousePosition.Y;
                    if (_this._direction === Property.Direction.Horizontal) {
                        // 横方向
                        var left = _this._dragStartViewPosition.X + addX;
                        var margin = _this.Size.Width - _this.InnerLength;
                        if (left < margin)
                            left = margin;
                        else if (0 < left)
                            left = 0;
                        _this._innerBox.Position.Left = left;
                    }
                    else {
                        // 縦方向
                        var top_2 = _this._dragStartViewPosition.Y + addY;
                        var margin = _this.Size.Height - _this.InnerLength;
                        if (top_2 < margin)
                            top_2 = margin;
                        else if (0 < top_2)
                            top_2 = 0;
                        _this._innerBox.Position.Top = top_2;
                    }
                    _this.Refresh();
                });
                var mouseWheelEvent = 'onwheel' in document
                    ? 'wheel'
                    : 'onmousewheel' in document
                        ? 'mousewheel'
                        : 'DOMMouseScroll';
                _this._innerBox.Elem.on(mouseWheelEvent, function (e) {
                    // * ドラッグ処理中 * のときは無視する。
                    if (_this._isDragging || _this._spcvMouseSuppressor)
                        return;
                    var orgEv = e.originalEvent;
                    var delta = orgEv.deltaY
                        ? -(orgEv.deltaY)
                        : orgEv.wheelDelta
                            ? orgEv.wheelDelta
                            : -(orgEv.detail);
                    var direction = (delta === 0)
                        ? 0
                        : (delta > 0)
                            ? 1
                            : -1;
                    if (_this._direction === Property.Direction.Horizontal) {
                        // 横方向
                        var left = _this._innerBox.Position.Left + (direction * 20);
                        var margin = _this.Size.Width - _this.InnerLength;
                        if (left < margin)
                            left = margin;
                        else if (0 < left)
                            left = 0;
                        _this._innerBox.Position.Left = left;
                    }
                    else {
                        // 縦方向
                        var top_3 = _this._innerBox.Position.Top + (direction * 10);
                        var margin = _this.Size.Height - _this.InnerLength;
                        if (top_3 < margin)
                            top_3 = margin;
                        else if (0 < top_3)
                            top_3 = 0;
                        _this._innerBox.Position.Top = top_3;
                    }
                    _this.Refresh();
                });
                _this._innerBox.Elem.on('touchend mouseup mouseout', function (e) {
                    //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                    //if (e.eventPhase !== 2)
                    //    return;
                    _this._isDragging = false;
                    Fw.Root.Instance.SetTextSelection(true);
                });
                return _this;
            }
            Object.defineProperty(SlidableBoxView.prototype, "Children", {
                get: function () {
                    return this._innerBox.Children;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SlidableBoxView.prototype, "Direction", {
                get: function () {
                    return this._direction;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SlidableBoxView.prototype, "InnerLength", {
                get: function () {
                    return this._innerLength;
                },
                set: function (value) {
                    this._innerLength = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            SlidableBoxView.prototype.InitView = function () {
                if (this.Direction === Property.Direction.Horizontal) {
                    // 横方向
                    if (this.InnerLength < this.Size.Width)
                        this.InnerLength = this.Size.Width;
                    //this.Dom.style.overflowX = 'hidden';//'scroll';
                    //this.Dom.style.overflowY = 'hidden';
                    this.SetStyles({
                        overflowX: 'hidden',
                        overflowY: 'hidden'
                    });
                    this._innerBox.Size.Width = this.InnerLength;
                    this._innerBox.Size.Height = this.Size.Height;
                    this._innerBox.Position.X = (this._innerBox.Size.Width - this.Size.Width) / 2;
                    this._innerBox.Position.Y = 0;
                }
                else {
                    // 縦方向
                    if (this.InnerLength < this.Size.Height)
                        this.InnerLength = this.Size.Height;
                    //this.Dom.style.overflowY = 'hidden';//'scroll';
                    //this.Dom.style.overflowX = 'hidden';
                    this.SetStyles({
                        overflowX: 'hidden',
                        overflowY: 'hidden'
                    });
                    this._innerBox.Size.Height = this.InnerLength;
                    this._innerBox.Size.Width = this.Size.Width;
                    this._innerBox.Position.Y = (this._innerBox.Size.Height - this.Size.Height) / 2;
                    this._innerBox.Position.X = 0;
                }
            };
            SlidableBoxView.prototype.Add = function (view) {
                this._innerBox.Add(view);
            };
            SlidableBoxView.prototype.Remove = function (view) {
                this._innerBox.Remove(view);
            };
            SlidableBoxView.prototype.InnerRefresh = function () {
                try {
                    this.SuppressLayout();
                    this._innerBox.SuppressLayout();
                    this._positionBarMax.SuppressLayout();
                    this._positionBarCurrent.SuppressLayout();
                    _.each(this._innerBox.Children, function (view) {
                        view.SuppressLayout();
                    });
                    //this._innerBox.BackgroundColor = this._innerBackgroundColor;
                    _super.prototype.InnerRefresh.call(this);
                    this.SetStyles({
                        overflowY: 'hidden',
                        overflowX: 'hidden'
                    });
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                    this._innerBox.ResumeLayout();
                    this._innerBox.Refresh();
                    _.each(this._innerBox.Children, function (view) {
                        view.ResumeLayout();
                        view.Refresh();
                    });
                    this._positionBarMax.ResumeLayout();
                    this._positionBarMax.Refresh();
                    this._positionBarCurrent.ResumeLayout();
                    this._positionBarCurrent.Refresh();
                }
            };
            SlidableBoxView.prototype.CalcLayout = function () {
                try {
                    this.SuppressLayout();
                    this._innerBox.SuppressLayout();
                    this._positionBarMax.SuppressLayout();
                    this._positionBarCurrent.SuppressLayout();
                    _.each(this._innerBox.Children, function (view) {
                        view.SuppressLayout();
                    });
                    // 子Viewより前に、自身のサイズを確定させる。
                    _super.prototype.CalcLayout.call(this);
                    if (this.Direction === Property.Direction.Horizontal) {
                        // 横方向
                        if (this.InnerLength < this.Size.Width)
                            this.InnerLength = this.Size.Width;
                        var maxInnerLength = this.GetMaxInnerLength();
                        if (this.InnerLength < maxInnerLength)
                            this.InnerLength = maxInnerLength;
                        var margin = this.Size.Width - this.InnerLength;
                        if (this._innerBox.Position.Left < margin)
                            this._innerBox.Position.Left = margin;
                        else if (0 < this._innerBox.Position.Left)
                            this._innerBox.Position.Left = 0;
                        this._innerBox.Size.Width = this.InnerLength;
                        this._innerBox.Size.Height = this.Size.Height;
                        this._positionBarMax.SetAnchor(null, this._barMargin, this._barMargin, this._barMargin);
                        this._positionBarMax.Length = this.Size.Width - (this._barMargin * 2);
                        this._positionBarCurrent.SetAnchor(null, null, null, this._barMargin);
                        this._positionBarCurrent.Length
                            = this._positionBarMax.Length
                                * (this.Size.Width / this.InnerLength);
                        var maxLeft = this.InnerLength - this.Size.Width;
                        var currentLeft = this._innerBox.Position.Left;
                        var posRate = (maxLeft === 0)
                            ? 1
                            : currentLeft / maxLeft;
                        var leftLength = this._positionBarMax.Length - this._positionBarCurrent.Length;
                        this._positionBarCurrent.Position.Left = this._barMargin - (leftLength * posRate);
                        this._positionBarMax.CalcLayout();
                        this._positionBarCurrent.CalcLayout();
                        if (this.InnerLength <= this.Size.Width) {
                            this._positionBarMax.Hide();
                            this._positionBarCurrent.Hide();
                        }
                        else {
                            this._positionBarMax.Show();
                            this._positionBarCurrent.Show();
                        }
                        //this.Log({
                        //    max_Length: this._positionBarMax.Length,
                        //    current_Length: this._positionBarCurrent.Length,
                        //    maxLeft: maxLeft,
                        //    currentLeft: currentLeft,
                        //    posRate: posRate,
                        //    leftLength: leftLength,
                        //    current_Left: this._positionBarCurrent.Position.Left
                        //});
                    }
                    else {
                        // 縦方向
                        if (this.InnerLength < this.Size.Height)
                            this.InnerLength = this.Size.Height;
                        var maxInnerLength = this.GetMaxInnerLength();
                        if (this.InnerLength < maxInnerLength)
                            this.InnerLength = maxInnerLength;
                        var margin = this.Size.Height - this.InnerLength;
                        if (this._innerBox.Position.Top < margin)
                            this._innerBox.Position.Top = margin;
                        else if (0 < this._innerBox.Position.Top)
                            this._innerBox.Position.Top = 0;
                        this._innerBox.Size.Height = this.InnerLength;
                        this._innerBox.Size.Width = this.Size.Width;
                        this._positionBarMax.SetAnchor(this._barMargin, null, this._barMargin, this._barMargin);
                        this._positionBarMax.Length = this.Size.Height - (this._barMargin * 2);
                        this._positionBarCurrent.SetAnchor(null, null, this._barMargin, null);
                        this._positionBarCurrent.Length
                            = this._positionBarMax.Length
                                * (this.Size.Height / this.InnerLength);
                        var maxTop = this.InnerLength - this.Size.Height;
                        var currentTop = this._innerBox.Position.Top;
                        var posRate = (maxTop === 0)
                            ? 1
                            : currentTop / maxTop;
                        var topLength = this._positionBarMax.Length - this._positionBarCurrent.Length;
                        this._positionBarCurrent.Position.Top = this._barMargin - (topLength * posRate);
                        this._positionBarMax.CalcLayout();
                        this._positionBarCurrent.CalcLayout();
                        if (this.InnerLength <= this.Size.Height) {
                            this._positionBarMax.Hide();
                            this._positionBarCurrent.Hide();
                        }
                        else {
                            this._positionBarMax.Show();
                            this._positionBarCurrent.Show();
                        }
                    }
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                    this._innerBox.ResumeLayout();
                    this._positionBarMax.ResumeLayout();
                    this._positionBarCurrent.ResumeLayout();
                    _.each(this._innerBox.Children, function (view) {
                        view.ResumeLayout();
                    });
                }
            };
            SlidableBoxView.prototype.GetMaxInnerLength = function () {
                var _this = this;
                var maxWidth = 0;
                var maxHeight = 0;
                _.each(this._innerBox.Children, function (view) {
                    var right = view.Position.Left + view.Size.Width + _this._barMargin;
                    var bottom = view.Position.Top + view.Size.Height + _this._barMargin;
                    if (maxWidth < right)
                        maxWidth = right;
                    if (maxHeight < bottom)
                        maxHeight = bottom;
                });
                return (this.Direction === Property.Direction.Horizontal)
                    ? maxWidth
                    : maxHeight;
            };
            SlidableBoxView.prototype.Dispose = function () {
                this._innerBox.SetParent(null);
                this._positionBarMax.SetTransAnimation(null);
                this._positionBarCurrent.SetParent(null);
                this._innerBox.Elem.remove();
                this._positionBarMax.Elem.remove();
                this._positionBarCurrent.Elem.remove();
                _super.prototype.Dispose.call(this);
                this._innerLength = null;
                this._innerBox.Elem.off();
                this._innerBox.Dispose();
                this._innerBox = null;
                this._isDragging = null;
                this._spcvMouseSuppressor = null;
                this._dragStartMousePosition.Dispose();
                this._dragStartMousePosition = null;
                this._dragStartViewPosition.Dispose();
                this._dragStartViewPosition = null;
            };
            return SlidableBoxView;
        }(Views.BoxView));
        Views.SlidableBoxView = SlidableBoxView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="../Events/StuckerBoxViewEvents.ts" />
/// <reference path="../Events/ControlViewEvents.ts" />
/// <reference path="Animation/Animator.ts" />
/// <reference path="Animation/Params.ts" />
/// <reference path="BoxView.ts" />
/// <reference path="Property/Size.ts" />
/// <reference path="Property/MouseLocation.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Property = Fw.Views.Property;
        var Events = Fw.Events.StuckerBoxViewEvents;
        var ControlViewEvents = Fw.Events.ControlViewEvents;
        var MouseLocation = Fw.Views.Property.MouseLocation;
        var StuckerBoxView = /** @class */ (function (_super) {
            __extends(StuckerBoxView, _super);
            function StuckerBoxView() {
                var _this = _super.call(this) || this;
                _this.LockedImage = '';
                _this.UnlockedImage = '';
                _this._scrollMargin = 0;
                _this._childrenOrder = null;
                _this._isChildDragging = false;
                _this._isInnerDragging = false;
                _this._relocationTargetView = null;
                _this._sbvInMouseStartPosition = new Property.Position();
                _this._sbvInViewStartPosition = new Property.Position();
                _this._sbvChMouseStartPosition = new Property.Position();
                _this._sbvChViewStartPosition = new Property.Position();
                _this._innerBox = new Views.BoxView();
                _this._positionBarMax = new Views.LineView(Property.Direction.Vertical);
                _this._positionBarCurrent = new Views.LineView(Property.Direction.Vertical);
                _this._lockButton = new Views.ButtonView();
                _this._dummyView = new Fw.Views.BoxView();
                _this.LockedImage = 'images/Fw/Locked.png';
                _this.UnlockedImage = 'images/Fw/Unlocked.png';
                _this.SetClassName('StuckerBoxView');
                _this.Elem.addClass(_this.ClassName);
                _this._margin = 10;
                _this._rightMargin = 20;
                _this._referencePoint = Property.ReferencePoint.LeftTop;
                _this._scrollMargin = 0;
                _this._isChildRelocatable = true;
                _this._isChildRelocation = false;
                _this._innerBox.HasBorder = false;
                _this._innerBox.SetTransAnimation(false);
                _this._innerBox.SetLeftTop(0, 0);
                _this._innerBox.BackgroundColor = 'transparent';
                _this._innerBox.SetParent(_this);
                _this.Elem.append(_this._innerBox.Elem);
                //super.Add(this._innerBox); // Addメソッドでthis.Childrenを呼ぶため循環参照になる。
                _this._positionBarMax.Position.Policy = Property.PositionPolicy.LeftTop;
                _this._positionBarMax.SetTransAnimation(false);
                _this._positionBarMax.Color = '#EEEEEE';
                _this._positionBarMax.SetParent(_this);
                _this.Elem.append(_this._positionBarMax.Elem);
                _this._positionBarCurrent.Position.Policy = Property.PositionPolicy.LeftTop;
                _this._positionBarCurrent.SetTransAnimation(false);
                _this._positionBarCurrent.Color = '#888888';
                _this._positionBarCurrent.SetParent(_this);
                _this.Elem.append(_this._positionBarCurrent.Elem);
                _this._lockButton.SetSize(30, 30);
                _this._lockButton.Position.Policy = Property.PositionPolicy.LeftTop;
                _this._lockButton.BorderRadius = 50;
                _this._lockButton.HasBorder = true;
                _this._lockButton.Color = '#9d9e9e';
                _this._lockButton.BackgroundColor = '#FFFFFF';
                _this._lockButton.HoverColor = '#F4F4F4';
                _this._lockButton.ImageFitPolicy = Property.FitPolicy.Auto;
                _this._lockButton.ImageSrc = _this.LockedImage;
                _this._lockButton.Hide(0);
                _this._backupView = null;
                _this._dummyView.Elem.addClass('Shadow');
                _this._dummyView.Position.Policy = Property.PositionPolicy.LeftTop;
                // 下に定義済みのメソッドをthisバインドしておく。
                _this.OnInnerMouseDown = _this.OnInnerMouseDown.bind(_this);
                _this.OnInnerMouseMove = _this.OnInnerMouseMove.bind(_this);
                _this.OnInnerMouseUp = _this.OnInnerMouseUp.bind(_this);
                _this.OnChildMouseDown = _this.OnChildMouseDown.bind(_this);
                _this.OnChildMouseMove = _this.OnChildMouseMove.bind(_this);
                _this.OnInnerMouseWheel = _this.OnInnerMouseWheel.bind(_this);
                _this.OnChildMouseUp = _this.OnChildMouseUp.bind(_this);
                _this.OnInnerSingleClick = _this.OnInnerSingleClick.bind(_this);
                _this.OnLockButtonClick = _this.OnLockButtonClick.bind(_this);
                _this._innerBox.Elem.on('touchstart mousedown', _this.OnInnerMouseDown);
                _this._innerBox.Elem.on('touchmove mousemove', _this.OnInnerMouseMove);
                _this._innerBox.Elem.on('touchend mouseup mouseout', _this.OnInnerMouseUp);
                _this._lockButton.Elem.on('click', _this.OnLockButtonClick);
                var mouseWheelEvent = 'onwheel' in document
                    ? 'wheel'
                    : 'onmousewheel' in document
                        ? 'mousewheel'
                        : 'DOMMouseScroll';
                _this._innerBox.Elem.on(mouseWheelEvent, _this.OnInnerMouseWheel);
                _this.AddEventListener(Events.Attached, function () {
                    _this.Parent.Add(_this._lockButton);
                });
                _this.AddEventListener(Events.Detached, function () {
                    _this.Parent.Remove(_this._lockButton);
                });
                return _this;
            }
            Object.defineProperty(StuckerBoxView.prototype, "Children", {
                get: function () {
                    return this._innerBox.Children;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StuckerBoxView.prototype, "Margin", {
                get: function () {
                    return this._margin;
                },
                set: function (value) {
                    this._margin = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StuckerBoxView.prototype, "RightMargin", {
                get: function () {
                    return this._rightMargin;
                },
                set: function (value) {
                    this._rightMargin = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StuckerBoxView.prototype, "ReferencePoint", {
                get: function () {
                    return this._referencePoint;
                },
                set: function (value) {
                    this._referencePoint = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StuckerBoxView.prototype, "IsChildRelocatable", {
                get: function () {
                    return this._isChildRelocatable;
                },
                set: function (value) {
                    this._isChildRelocatable = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StuckerBoxView.prototype, "IsChildRelocation", {
                get: function () {
                    return this._isChildRelocation;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StuckerBoxView.prototype, "LockButton", {
                get: function () {
                    return this._lockButton;
                },
                enumerable: true,
                configurable: true
            });
            StuckerBoxView.prototype.Add = function (view) {
                view.Position.Policy = Property.PositionPolicy.LeftTop;
                this._innerBox.Add(view);
                //view.AddEventListener(ControlViewEvents.LongClick, this.OnChildLongClick, this);
                view.Elem.on('touchstart mousedown', this.OnChildMouseDown);
                view.Elem.on('touchmove mousemove', this.OnChildMouseMove);
                view.Elem.on('touchend mouseup', this.OnChildMouseUp);
            };
            StuckerBoxView.prototype.Remove = function (view) {
                this._innerBox.Remove(view);
                //view.RemoveEventListener(ControlViewEvents.LongClick, this.OnChildLongClick, this);
                view.Elem.off('touchstart mousedown', this.OnChildMouseDown);
                view.Elem.off('touchmove mousemove', this.OnChildMouseMove);
                view.Elem.off('touchend mouseup', this.OnChildMouseUp);
            };
            StuckerBoxView.prototype.AddSpacer = function () {
                var spacer = new Views.BoxView();
                spacer.BackgroundColor = App.Items.Color.Transparent;
                spacer.Color = App.Items.Color.Transparent;
                spacer.HasBorder = false;
                spacer.Opacity = 0;
                spacer.SetAnchor(null, 0, 0, null);
                spacer.Size.Height = 0;
                this.Add(spacer);
            };
            StuckerBoxView.prototype.OnInnerMouseDown = function (e) {
                //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                //if (e.eventPhase !== 2)
                //    return;
                //this.Log(`mousedown`);
                this._mouseClickTime = new Date();
                var ml = MouseLocation.Create(e);
                this._sbvInMouseStartPosition.X = ml.ClientX;
                this._sbvInMouseStartPosition.Y = ml.ClientY;
                this._sbvInViewStartPosition.X = this._innerBox.Position.Left;
                this._sbvInViewStartPosition.Y = this._innerBox.Position.Top;
                if (this._isChildRelocation) {
                }
                else {
                    //this.Log(`${this.ClassName}.OnInnerMouseDown`);
                    this._isInnerDragging = true;
                    Fw.Root.Instance.SetTextSelection(false);
                }
            };
            StuckerBoxView.prototype.OnInnerMouseMove = function (e) {
                //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                //if (e.eventPhase !== 2)
                //    return;
                //this.Log(`mousemove`);
                if (this._isChildRelocation || this._scrollMargin === 0)
                    return;
                // * ドラッグ処理中でないとき *　は無視する。
                if (!this._isInnerDragging)
                    return;
                //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                //if (e.eventPhase !== 2)
                //    return;
                var ml = MouseLocation.Create(e);
                var addY = ml.ClientY - this._sbvInMouseStartPosition.Y;
                var top = this._sbvInViewStartPosition.Y + addY;
                var margin = this._scrollMargin * -1;
                if (top < margin)
                    top = margin;
                else if (0 < top)
                    top = 0;
                this._innerBox.Position.Top = top;
                this.Refresh();
            };
            StuckerBoxView.prototype.OnInnerMouseWheel = function (e) {
                if (this._isChildRelocation || this._scrollMargin === 0)
                    return;
                // * ドラッグ処理中のとき *　は無視する。
                if (this._isInnerDragging)
                    return;
                var orgEv = e.originalEvent;
                var delta = orgEv.deltaY
                    ? -(orgEv.deltaY)
                    : orgEv.wheelDelta
                        ? orgEv.wheelDelta
                        : -(orgEv.detail);
                var direction = (delta === 0)
                    ? 0
                    : (delta > 0)
                        ? 1
                        : -1;
                var top = this._innerBox.Position.Top + (direction * 20);
                var margin = this._scrollMargin * -1;
                if (top < margin)
                    top = margin;
                else if (0 < top)
                    top = 0;
                this._innerBox.Position.Top = top;
                this.Refresh();
            };
            StuckerBoxView.prototype.OnInnerMouseUp = function (e) {
                //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                //if (e.eventPhase !== 2)
                //    return;
                this.Log("mouseup");
                // シングルクリック判定
                if (this._mouseClickTime) {
                    var elasped = (new Date()).getTime() - this._mouseClickTime.getTime();
                    var ml = MouseLocation.Create(e);
                    var addX = ml.ClientX - this._sbvInMouseStartPosition.X;
                    var addY = ml.ClientY - this._sbvInMouseStartPosition.Y;
                    if (elasped < 800
                        && (Math.abs(addX) + Math.abs(addY)) < 30) {
                        this.OnInnerSingleClick();
                    }
                    this._mouseClickTime = null;
                }
                //this.Log(`${this.ClassName}.OnInnerMouseUp`);
                if (this._isChildRelocation) {
                    // 子View再配置モードのとき
                }
                else {
                    // 内部Viewドラッグ中のとき
                    // ドラッグ終了処理。
                    this._isInnerDragging = false;
                    Fw.Root.Instance.SetTextSelection(true);
                }
            };
            // #endregion "上下スクロール"
            // #region "子View再配置"
            /**
             * スタッカーBox自身がクリックされたとき
             * @param e1
             */
            StuckerBoxView.prototype.OnInnerSingleClick = function () {
                //this.Log(`${this.ClassName}.OnSingleClick`);
                var _this = this;
                // 再配置不能のとき
                if (!this._isChildRelocatable) {
                    if (this._lockButton.IsVisible) {
                        this._lockButton.ClearAnimatedClass();
                        this._lockButton.Hide();
                    }
                    if (this._isChildRelocation) {
                        // 子View再配置モードのとき
                        // 配置を確定させる。
                        this.CommitRelocation();
                    }
                    return;
                }
                if (this._lockButton.IsVisible) {
                    // ロックボタン表示中のとき
                    if (!this._isChildRelocation) {
                        this._lockButton.ClearAnimatedClass();
                        this._lockButton.Hide();
                    }
                }
                else {
                    // ロックボタン非表示のとき
                    // 現在のロック状態を表示する。
                    var image = (this._isChildRelocation)
                        ? this.UnlockedImage
                        : this.LockedImage;
                    if (image !== this._lockButton.ImageSrc)
                        this._lockButton.ImageSrc = image;
                    this._lockButton.ClearAnimatedClass();
                    this._lockButton.Show();
                    // 再配置モードでないとき、2秒後も再配置モードにしていなければ、ボタンを消す。
                    if (!this._isChildRelocation) {
                        _.delay(function () {
                            if (!_this._isChildRelocation)
                                _this._lockButton.Hide();
                        }, 2000);
                    }
                }
            };
            /**
             * ロックボタンがクリックされたとき
             *
             * @param e
             */
            StuckerBoxView.prototype.OnLockButtonClick = function (e) {
                //if (e.eventPhase !== 2)
                //    return;
                var _this = this;
                // 一旦、変更後のロック状態を表示。
                this._lockButton.ImageSrc = (this._isChildRelocation)
                    ? this.LockedImage
                    : this.UnlockedImage;
                if (this._isChildRelocation) {
                    // 子View再配置モードのとき
                    // 配置を確定させる。
                    this.CommitRelocation();
                    _.delay(function () {
                        _this._lockButton.Hide();
                    }, 700);
                }
                else {
                    // 通常モードのとき
                    // 子View再配置モードを開始する。
                    this.StartRelocation();
                }
            };
            StuckerBoxView.prototype.StartRelocation = function () {
                var _this = this;
                //this.Log(`${this.ClassName}.StartRelocation`);
                this._isChildRelocation = true;
                // 再配置開始時点の配置順を保持する。
                this._childrenOrder = new Array();
                _.each(this._innerBox.Children, function (v) {
                    _this._childrenOrder.push(v.InstanceId);
                });
                Fw.Root.Instance.SetTextSelection(false);
                _.each(this._innerBox.Children, function (v) {
                    v.Opacity = 0.7;
                    v.SuppressEvent(ControlViewEvents.SingleClick);
                    v.SuppressEvent(ControlViewEvents.LongClick);
                });
                if (!this._lockButton.IsVisible) {
                    _.delay(function () {
                        if (!_this._lockButton.IsVisible) {
                            if (_this._lockButton.ImageSrc !== _this.UnlockedImage)
                                _this._lockButton.ImageSrc = _this.UnlockedImage;
                            _this._lockButton.ClearAnimatedClass();
                            _this._lockButton.Show();
                        }
                    }, 500);
                }
                this.DispatchEvent(Events.RelocationStarted);
                this.Refresh();
            };
            StuckerBoxView.prototype.CommitRelocation = function () {
                var _this = this;
                //this.Log(`${this.ClassName}.CommitRelocation`);
                if (this._relocationTargetView) {
                    this.RestoreDummyView();
                    this._relocationTargetView.SetTransAnimation(true);
                    this._relocationTargetView = null;
                }
                this._isChildRelocation = false;
                Fw.Root.Instance.SetTextSelection(true);
                _.each(this._innerBox.Children, function (v) {
                    v.Opacity = 1.0;
                    v.ResumeEvent(ControlViewEvents.SingleClick);
                    v.ResumeEvent(ControlViewEvents.LongClick);
                });
                var changed = false;
                _.each(this._innerBox.Children, function (v, idx) {
                    if (v.InstanceId !== _this._childrenOrder[idx])
                        changed = true;
                });
                this._childrenOrder = null;
                if (this._lockButton.IsVisible
                    && this._lockButton.ImageSrc !== this.LockedImage) {
                    if (this._lockButton.ImageSrc !== this.LockedImage)
                        this._lockButton.ImageSrc = this.LockedImage;
                }
                _.delay(function () {
                    if (_this._lockButton.IsVisible) {
                        _this._lockButton.ClearAnimatedClass();
                        _this._lockButton.Hide();
                        _this.Refresh();
                    }
                }, 700);
                if (changed)
                    this.DispatchEvent(Events.OrderChanged);
                this.DispatchEvent(Events.RelocationEnded);
                this.Refresh();
            };
            /**
             * 子要素上でマウスボタンが押されたとき
             * @param e
             */
            StuckerBoxView.prototype.OnChildMouseDown = function (e) {
                //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                //if (e.eventPhase !== 2)
                //    return;
                //this.Log(`${this.ClassName}.OnChildMouseDown`);
                if (!this._isChildRelocation)
                    return;
                var rect = this.Dom.getBoundingClientRect();
                var ml = MouseLocation.Create(e);
                var innerLeft = ml.PageX - rect.left;
                var innerTop = ml.PageY - rect.top + (this._innerBox.Position.Top * -1);
                var view = this.GetNearestByPosition(innerLeft, innerTop);
                if (view) {
                    //this.Log('OnChildMouseDown - view found: ' + (view as ButtonView).Label);
                    this._isChildDragging = true;
                    this._relocationTargetView = view;
                    this._sbvChMouseStartPosition.X = ml.PageX;
                    this._sbvChMouseStartPosition.Y = ml.PageY;
                    this._sbvChViewStartPosition.X = view.Position.Left;
                    this._sbvChViewStartPosition.Y = view.Position.Top;
                    this.SetDummyView(view);
                    view.SetTransAnimation(false);
                }
            };
            /**
             * 子要素上でマウスが動いたとき
             * @param e1
             */
            StuckerBoxView.prototype.OnChildMouseMove = function (e) {
                //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                //if (e.eventPhase !== 2)
                //    return;
                if (!this._isChildRelocation || !this._isChildDragging)
                    return;
                //this.Log(`${this.ClassName}.OnChildMouseMove`);
                var view = this._relocationTargetView;
                var ml = MouseLocation.Create(e);
                var addX = ml.PageX - this._sbvChMouseStartPosition.X;
                var addY = ml.PageY - this._sbvChMouseStartPosition.Y;
                view.Position.Left = this._sbvChViewStartPosition.X + addX;
                view.Position.Top = this._sbvChViewStartPosition.Y + addY;
                var replaceView = this.GetNearestByView(view);
                if (replaceView !== null && replaceView !== this._dummyView) {
                    this.MoveView(this._dummyView, replaceView);
                }
                this.Refresh();
            };
            StuckerBoxView.prototype.MoveView = function (movingView, toView) {
                var movingIndex = this._innerBox.Children.indexOf(movingView);
                var toIndex = this._innerBox.Children.indexOf(toView);
                if (movingIndex < 0)
                    throw new Error('Not contained movingView');
                if (toIndex < 0)
                    throw new Error('Not contained toView');
                // 差し込み対象を一旦配列から削除
                this._innerBox.Children.splice(movingIndex, 1);
                // 差し込み対象を目標位置に差し込む。※toIndexは配列に存在しなくても(=末尾でも)良い。
                this._innerBox.Children.splice(toIndex, 0, movingView);
            };
            /**
             * 子要素上でマウスボタンが離れたとき
             * @param e
             */
            StuckerBoxView.prototype.OnChildMouseUp = function (e) {
                //// 子Viewからのバブルアップイベント等は無視、自身のイベントのみ見る。
                //if (e.eventPhase !== 2)
                //    return;
                var _this = this;
                //this.Log(`${this.ClassName}.OnChildMouseUp`);
                if (!this._isChildRelocation) {
                    this._isChildDragging = false;
                }
                else {
                    this._isChildDragging = false;
                    if (this._relocationTargetView) {
                        this._relocationTargetView.SetTransAnimation(true);
                        this._relocationTargetView = null;
                    }
                    this.RestoreDummyView();
                    var changed_1 = false;
                    _.each(this._innerBox.Children, function (v, idx) {
                        if (v.InstanceId !== _this._childrenOrder[idx])
                            changed_1 = true;
                    });
                    if (changed_1)
                        this.DispatchEvent(Events.OrderUncommitChanged);
                    this.Refresh();
                }
            };
            StuckerBoxView.prototype.GetNearestByView = function (view) {
                var diff = Number.MAX_VALUE;
                var result = null;
                _.each(this._innerBox.Children, function (v) {
                    // 渡されたViewは対象外
                    if (v === view)
                        return;
                    var tmpDiff = Math.abs(v.Position.Left - view.Position.Left)
                        + Math.abs(v.Position.Top - view.Position.Top);
                    if (tmpDiff < diff) {
                        diff = tmpDiff;
                        result = v;
                    }
                });
                return result;
            };
            StuckerBoxView.prototype.GetNearestByPosition = function (x, y) {
                var _this = this;
                var diff = Number.MAX_VALUE;
                var result = null;
                _.each(this._innerBox.Children, function (v) {
                    // ダミーViewは対象外
                    if (v === _this._dummyView)
                        return;
                    var left = v.Position.Left + (v.Size.Width / 2);
                    var top = v.Position.Top + (v.Size.Height / 2);
                    var tmpDiff = Math.abs(left - x) + Math.abs(top - y);
                    if (tmpDiff < diff) {
                        diff = tmpDiff;
                        result = v;
                    }
                });
                return result;
            };
            StuckerBoxView.prototype.SetDummyView = function (view) {
                var _this = this;
                if (this._backupView)
                    this.RestoreDummyView();
                _.each(this._innerBox.Children, function (v, index) {
                    if (v === view) {
                        _this._backupView = v;
                        _this._innerBox.Children[index] = _this._dummyView;
                        _this._dummyView.Color = v.Color;
                        _this._dummyView.SetSize(v.Size.Width, v.Size.Height);
                    }
                });
                this._innerBox.Elem.append(this._dummyView.Elem);
            };
            StuckerBoxView.prototype.RestoreDummyView = function () {
                var _this = this;
                if (!this._backupView)
                    return;
                _.each(this._innerBox.Children, function (v, index) {
                    if (v === _this._dummyView)
                        _this._innerBox.Children[index] = _this._backupView;
                });
                this._backupView = null;
                this._dummyView.Elem.detach();
            };
            // #endregion "子View再配置"
            StuckerBoxView.prototype.InnerRefresh = function () {
                try {
                    this.Log(this.ClassName + ".InnerRefresh");
                    this.SuppressLayout();
                    this._innerBox.SuppressLayout();
                    this._positionBarMax.SuppressLayout();
                    this._positionBarCurrent.SuppressLayout();
                    this._lockButton.SuppressLayout();
                    _.each(this._innerBox.Children, function (view) {
                        view.SuppressLayout();
                    });
                    _super.prototype.InnerRefresh.call(this);
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                    this._innerBox.ResumeLayout();
                    this._innerBox.Refresh();
                    _.each(this._innerBox.Children, function (view) {
                        view.ResumeLayout();
                        view.Refresh();
                    });
                    this._positionBarMax.ResumeLayout();
                    this._positionBarMax.Refresh();
                    this._positionBarCurrent.ResumeLayout();
                    this._positionBarCurrent.Refresh();
                    this._lockButton.ResumeLayout();
                    this._lockButton.Refresh();
                    //this.Log(`${this.ClassName}.InnerRefresh-End`);
                }
            };
            StuckerBoxView.prototype.CalcLayout = function () {
                try {
                    this.SuppressLayout();
                    this._innerBox.SuppressLayout();
                    this._positionBarMax.SuppressLayout();
                    this._positionBarCurrent.SuppressLayout();
                    this._lockButton.SuppressLayout();
                    _.each(this._innerBox.Children, function (view) {
                        view.SuppressLayout();
                    });
                    // 子Viewより前に、自身のサイズを確定させる。
                    _super.prototype.CalcLayout.call(this);
                    this._innerBox.Size.Width = this.Size.Width;
                    this._innerBox.Size.Height = this.Size.Height;
                    _.each(this._innerBox.Children, function (view) {
                        view.CalcLayout();
                    });
                    // 先に描画領域を計算し、this._scrollMargin を得る。
                    switch (this._referencePoint) {
                        case Property.ReferencePoint.LeftTop:
                            this.InnerRefreshLeftTop(true);
                            break;
                        case Property.ReferencePoint.RightTop:
                            this.InnerRefreshRightTop(true);
                            break;
                        case Property.ReferencePoint.LeftBottom:
                            this.InnerRefreshLeftBottom(true);
                            break;
                        case Property.ReferencePoint.RightBottom:
                            this.InnerRefreshRightBottom(true);
                            break;
                        default:
                            throw new Error("ReferencePoint not found: " + this._referencePoint);
                    }
                    // this._scrollMargin の分だけ、内部Viewを広げる。
                    this._innerBox.Size.Height = this.Size.Height + Math.abs(this._scrollMargin);
                    // リサイズ後、過剰にスクロールしていた場合は戻す。
                    if ((this._scrollMargin * -1) > this._innerBox.Position.Top) {
                        this._innerBox.Position.Top = (this._scrollMargin * -1);
                    }
                    // 子Viewを配置する。
                    switch (this._referencePoint) {
                        case Property.ReferencePoint.LeftTop:
                            this.InnerRefreshLeftTop(false);
                            break;
                        case Property.ReferencePoint.RightTop:
                            this.InnerRefreshRightTop(false);
                            break;
                        case Property.ReferencePoint.LeftBottom:
                            this.InnerRefreshLeftBottom(false);
                            break;
                        case Property.ReferencePoint.RightBottom:
                            this.InnerRefreshRightBottom(false);
                            break;
                        default:
                            throw new Error("ReferencePoint not found: " + this._referencePoint);
                    }
                    this.InnerRefreshPositionLine();
                    this._lockButton.Position.Left
                        = this.Position.Left + this.Size.Width - this._lockButton.Size.Width;
                    this._lockButton.Position.Top
                        = this.Position.Top - (this._lockButton.Size.Height / 2);
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                    this._innerBox.ResumeLayout();
                    this._innerBox.Refresh();
                    _.each(this._innerBox.Children, function (view) {
                        view.ResumeLayout();
                        view.Refresh();
                    });
                    this._positionBarMax.ResumeLayout();
                    this._positionBarMax.Refresh();
                    this._positionBarCurrent.ResumeLayout();
                    this._positionBarCurrent.Refresh();
                    this._lockButton.ResumeLayout();
                    this._lockButton.Refresh();
                }
            };
            StuckerBoxView.prototype.InnerRefreshLeftTop = function (calcScrollMargin) {
                var _this = this;
                var maxRight = this.Size.Width - this._margin;
                var currentLeft = this._margin;
                var currentTop = this._margin;
                var rowMaxHeight = 0;
                var rowElemCount = 0;
                _.each(this._innerBox.Children, function (view) {
                    if (!view.IsVisible)
                        return;
                    var isOverWidth = (maxRight < (currentLeft + view.Size.Width + _this._rightMargin));
                    if (isOverWidth && rowElemCount !== 0) {
                        // 表示幅を超え、かつ既にその行に要素が出力されているとき
                        // 改行後に要素を出力する。
                        currentTop += rowMaxHeight + _this._margin;
                        currentLeft = _this._margin;
                        rowElemCount = 0;
                        rowMaxHeight = 0;
                    }
                    rowElemCount++;
                    if (!calcScrollMargin) {
                        view.Position.Left = currentLeft;
                        view.Position.Top = currentTop;
                    }
                    if (rowMaxHeight < view.Size.Height)
                        rowMaxHeight = view.Size.Height;
                    currentLeft += view.Size.Width + _this._margin;
                    if (isOverWidth && rowElemCount === 0) {
                        // 表示幅を超え、かつその行先頭要素のとき
                        // 要素を出力したあとで改行する。
                        currentLeft = _this._margin;
                        currentTop += rowMaxHeight + _this._margin;
                        rowElemCount = 0;
                        rowMaxHeight = 0;
                    }
                });
                if (calcScrollMargin) {
                    var maxBotton = currentTop + rowMaxHeight + this._margin;
                    if (this.Size.Height < maxBotton) {
                        this._scrollMargin = maxBotton - this.Size.Height;
                    }
                    else {
                        this._scrollMargin = 0;
                    }
                }
            };
            StuckerBoxView.prototype.InnerRefreshRightTop = function (calcScrollMargin) {
                var _this = this;
                var minLeft = this._margin;
                var currentRight = this.Size.Width - this._margin;
                var currentTop = this._margin;
                var rowMaxHeight = 0;
                var rowElemCount = 0;
                _.each(this._innerBox.Children, function (view) {
                    if (!view.IsVisible)
                        return;
                    var isOverWidth = ((currentRight - view.Size.Width + _this._rightMargin) < minLeft);
                    if (isOverWidth && rowElemCount !== 0) {
                        // 表示幅を超え、かつ既にその行に要素が出力されているとき
                        // 改行後に要素を出力する。
                        currentTop += rowMaxHeight + _this._margin;
                        currentRight = _this.Size.Width - _this._margin;
                        rowElemCount = 0;
                        rowMaxHeight = 0;
                    }
                    rowElemCount++;
                    if (!calcScrollMargin) {
                        view.Position.Left = currentRight - view.Size.Width;
                        view.Position.Top = currentTop;
                    }
                    if (rowMaxHeight < view.Size.Height)
                        rowMaxHeight = view.Size.Height;
                    currentRight -= view.Size.Width + _this._margin;
                    if (isOverWidth && rowElemCount === 0) {
                        // 表示幅を超え、かつその行先頭要素のとき
                        // 要素を出力したあとで改行する。
                        currentTop += rowMaxHeight + _this._margin;
                        currentRight = _this.Size.Width - _this._margin;
                        rowElemCount = 0;
                        rowMaxHeight = 0;
                    }
                });
                if (calcScrollMargin) {
                    var maxBotton = currentTop + rowMaxHeight + this._margin;
                    if (this.Size.Height < maxBotton) {
                        this._scrollMargin = maxBotton - this.Size.Height;
                    }
                    else {
                        this._scrollMargin = 0;
                    }
                }
            };
            StuckerBoxView.prototype.InnerRefreshLeftBottom = function (calcScrollMargin) {
                var _this = this;
                var maxRight = this.Size.Width - this._margin;
                var currentLeft = this._margin;
                var currentBottom = (calcScrollMargin)
                    ? this.Size.Height - this._margin
                    : this._innerBox.Size.Height - this._margin;
                var rowMaxHeight = 0;
                var rowElemCount = 0;
                _.each(this._innerBox.Children, function (view) {
                    if (!view.IsVisible)
                        return;
                    var isOverWidth = (maxRight < (currentLeft + view.Size.Width + _this._rightMargin));
                    if (isOverWidth && rowElemCount !== 0) {
                        // 表示幅を超え、かつ既にその行に要素が出力されているとき
                        // 改行後に要素を出力する。
                        currentBottom -= rowMaxHeight + _this._margin;
                        currentLeft = _this._margin;
                        rowElemCount = 0;
                        rowMaxHeight = 0;
                    }
                    rowElemCount++;
                    if (!calcScrollMargin) {
                        view.Position.Left = currentLeft;
                        view.Position.Top = currentBottom - view.Size.Height;
                    }
                    if (rowMaxHeight < view.Size.Height)
                        rowMaxHeight = view.Size.Height;
                    currentLeft += view.Size.Width + _this._margin;
                    if (isOverWidth && rowElemCount === 0) {
                        // 表示幅を超え、かつその行先頭要素のとき
                        // 要素を出力したあとで改行する。
                        currentBottom -= rowMaxHeight + _this._margin;
                        currentLeft = _this._margin;
                        rowElemCount = 0;
                        rowMaxHeight = 0;
                    }
                });
                if (calcScrollMargin) {
                    var minTop = currentBottom - rowMaxHeight - this._margin;
                    if (minTop < 0) {
                        this._scrollMargin = minTop * -1;
                    }
                    else {
                        this._scrollMargin = 0;
                    }
                }
            };
            StuckerBoxView.prototype.InnerRefreshRightBottom = function (calcScrollMargin) {
                var _this = this;
                var minLeft = this._margin;
                var currentRight = this.Size.Width - this._margin;
                var currentBottom = (calcScrollMargin)
                    ? this.Size.Height - this._margin
                    : this._innerBox.Size.Height - this._margin;
                var rowMaxHeight = 0;
                var rowElemCount = 0;
                _.each(this._innerBox.Children, function (view) {
                    if (!view.IsVisible)
                        return;
                    var isOverWidth = ((currentRight - view.Size.Width) < minLeft + _this._rightMargin);
                    if (isOverWidth && rowElemCount !== 0) {
                        // 表示幅を超え、かつ既にその行に要素が出力されているとき
                        // 改行後に要素を出力する。
                        currentBottom -= rowMaxHeight + _this._margin;
                        currentRight = _this.Size.Width - _this._margin;
                        rowElemCount = 0;
                        rowMaxHeight = 0;
                    }
                    rowElemCount++;
                    if (!calcScrollMargin) {
                        view.Position.Left = currentRight - view.Size.Width;
                        view.Position.Top = currentBottom - view.Size.Height;
                    }
                    if (rowMaxHeight < view.Size.Height)
                        rowMaxHeight = view.Size.Height;
                    currentRight -= view.Size.Width + _this._margin;
                    if (isOverWidth && rowElemCount === 0) {
                        // 表示幅を超え、かつその行先頭要素のとき
                        // 要素を出力したあとで改行する。
                        currentBottom -= rowMaxHeight + _this._margin;
                        currentRight = _this.Size.Width - _this._margin;
                        rowElemCount = 0;
                        rowMaxHeight = 0;
                    }
                });
                if (calcScrollMargin) {
                    var minTop = currentBottom - rowMaxHeight - this._margin;
                    if (minTop < 0) {
                        this._scrollMargin = minTop * -1;
                    }
                    else {
                        this._scrollMargin = 0;
                    }
                }
            };
            StuckerBoxView.prototype.InnerRefreshPositionLine = function () {
                switch (this._referencePoint) {
                    case Property.ReferencePoint.LeftTop:
                    case Property.ReferencePoint.LeftBottom:
                        this._positionBarMax.SetAnchor(this._margin, null, this._margin, this._margin);
                        this._positionBarCurrent.SetAnchor(null, null, this._margin, null);
                        break;
                    case Property.ReferencePoint.RightTop:
                    case Property.ReferencePoint.RightBottom:
                        this._positionBarMax.SetAnchor(this._margin, this._margin, null, this._margin);
                        this._positionBarCurrent.SetAnchor(null, this._margin, null, null);
                        break;
                    default:
                        throw new Error("ReferencePoint not found: " + this._referencePoint);
                }
                this._positionBarMax.Length = this.Size.Height - (this._margin * 2);
                this._positionBarCurrent.Length
                    = this._positionBarMax.Length
                        * (this.Size.Height / this._innerBox.Size.Height);
                var maxTop = this._innerBox.Size.Height - this.Size.Height;
                var currentTop = this._innerBox.Position.Top;
                var posRate = (maxTop === 0)
                    ? 1
                    : currentTop / maxTop;
                var topLength = this._positionBarMax.Length - this._positionBarCurrent.Length;
                this._positionBarCurrent.Position.Top = this._margin - (topLength * posRate);
                this._positionBarMax.CalcLayout();
                this._positionBarCurrent.CalcLayout();
                if (this._innerBox.Size.Height <= this.Size.Height) {
                    this._positionBarMax.Hide();
                    this._positionBarCurrent.Hide();
                }
                else {
                    this._positionBarMax.Show();
                    this._positionBarCurrent.Show();
                }
            };
            StuckerBoxView.prototype.Dispose = function () {
                this._innerBox.Elem.off();
                _super.prototype.Dispose.call(this);
                this._margin = null;
            };
            return StuckerBoxView;
        }(Views.BoxView));
        Views.StuckerBoxView = StuckerBoxView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="InputViewBase.ts" />
/// <reference path="Property/FitPolicy.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var TextAreaInputView = /** @class */ (function (_super) {
            __extends(TextAreaInputView, _super);
            function TextAreaInputView() {
                var _this = _super.call(this, $('<textarea></textarea>')) || this;
                _this.SetClassName('TextAreaInputView');
                _this.Elem.addClass(_this.ClassName);
                return _this;
            }
            return TextAreaInputView;
        }(Views.InputViewBase));
        Views.TextAreaInputView = TextAreaInputView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="InputViewBase.ts" />
/// <reference path="Property/FitPolicy.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var TextBoxInputView = /** @class */ (function (_super) {
            __extends(TextBoxInputView, _super);
            function TextBoxInputView() {
                var _this = _super.call(this, $('<input type="text"></input>')) || this;
                _this.SetClassName('TextBoxInputView');
                _this.Elem.addClass(_this.ClassName);
                _this._textAlign = Views.Property.TextAlign.Left;
                return _this;
            }
            Object.defineProperty(TextBoxInputView.prototype, "TextAlign", {
                get: function () {
                    return this._textAlign;
                },
                set: function (value) {
                    this._textAlign = value;
                    this.Refresh();
                },
                enumerable: true,
                configurable: true
            });
            TextBoxInputView.prototype.InnerRefresh = function () {
                try {
                    if (this.IsDisposed !== false)
                        return;
                    _super.prototype.InnerRefresh.call(this);
                    this.SetStyles({
                        textAlign: this._textAlign,
                    });
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
            };
            return TextBoxInputView;
        }(Views.InputViewBase));
        Views.TextBoxInputView = TextBoxInputView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../Events/ToggleButtonInputViewEvents.ts" />
/// <reference path="../Util/Dump.ts" />
/// <reference path="ControlView.ts" />
/// <reference path="IInputView.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Dump = Fw.Util.Dump;
        var Events = Fw.Events.ToggleButtonInputViewEvents;
        var ToggleButtonInputView = /** @class */ (function (_super) {
            __extends(ToggleButtonInputView, _super);
            function ToggleButtonInputView() {
                var _this = _super.call(this) || this;
                _this.HoverColor = '';
                _this._sliderBox = new Views.BoxView();
                _this._notch = new Views.BoxView();
                _this._maskOn = new Views.BoxView();
                _this._boolValue = false;
                _this._overMargin = 5;
                _this.SetClassName('ToggleButtonView');
                _this.Elem.addClass(_this.ClassName);
                // 標準サイズ：50 x 20
                var width = 50;
                var height = 20;
                _this.HasBorder = false;
                _this.SetSize(width, height);
                _this._sliderBox.Size.Width = _this.Size.Width - _this._overMargin;
                _this._sliderBox.Size.Height = _this.Size.Height - _this._overMargin;
                _this._sliderBox.HasBorder = true;
                _this._sliderBox.BorderRadius = 15;
                _this._sliderBox.Color = '#e5e5e5';
                _this._sliderBox.BackgroundColor = '#FFFFFF';
                _this._sliderBox.Dom.style.overflow = 'hidden';
                _this.Add(_this._sliderBox);
                _this._maskOn.Size.Width = _this.Size.Width - _this._overMargin;
                _this._maskOn.Size.Height = _this.Size.Height - _this._overMargin;
                _this._maskOn.HasBorder = false;
                _this._maskOn.BorderRadius = 15;
                _this._maskOn.BackgroundColor = '#4e748b';
                _this._maskOn.Position.X = -(_this.Size.Width - _this._overMargin);
                _this._sliderBox.Add(_this._maskOn);
                _this._notch.SetSize(_this.Size.Height, _this.Size.Height);
                _this._notch.HasBorder = true;
                _this._notch.BorderRadius = 50;
                _this._notch.Color = '#e5e5e5';
                _this._notch.BackgroundColor = '#cfcfcf';
                _this._notch.Position.X = -(_this.Size.Width / 2) + (_this.Size.Height / 2);
                _this.Add(_this._notch);
                _this.Elem.hover(function () {
                    _this.SetStyle('backgroundColor', _this.HoverColor);
                    _this.Refresh();
                }, function () {
                    _this.SetStyle('backgroundColor', _this.BackgroundColor);
                    _this.Refresh();
                });
                _this.AddEventListener(Events.SingleClick, function (e) {
                    //this.Log(`${this.ClassName}.SingleClick`);
                    if (_this.IsReadOnly)
                        return;
                    _this.BoolValue = !_this.BoolValue;
                    _this.Refresh();
                });
                return _this;
            }
            Object.defineProperty(ToggleButtonInputView.prototype, "Name", {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ToggleButtonInputView.prototype, "BoolValue", {
                get: function () {
                    return (this._boolValue === true);
                },
                set: function (value) {
                    this.SetValue(value === true ? 'true' : 'false');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ToggleButtonInputView.prototype, "Value", {
                get: function () {
                    return (this.BoolValue)
                        ? 'true'
                        : 'false';
                },
                set: function (value) {
                    this.SetValue(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ToggleButtonInputView.prototype, "IsReadOnly", {
                get: function () {
                    return this._isReadOnly;
                },
                set: function (value) {
                    var changed = (this._isReadOnly !== value);
                    if (changed) {
                        this._isReadOnly = value;
                        this.Elem.attr('readonly', this._isReadOnly);
                    }
                },
                enumerable: true,
                configurable: true
            });
            ToggleButtonInputView.prototype.SetValue = function (value, eventDispatch) {
                if (eventDispatch === void 0) { eventDispatch = true; }
                this.SetBoolValue((value === 'true'), eventDispatch);
            };
            ToggleButtonInputView.prototype.SetBoolValue = function (value, eventDispatch) {
                if (eventDispatch === void 0) { eventDispatch = true; }
                var changed = (this._boolValue !== value);
                this._boolValue = value;
                this.Refresh();
                if (changed && eventDispatch) {
                    this.DispatchEvent(Events.Changed, this.Value);
                }
            };
            ToggleButtonInputView.prototype.CalcLayout = function () {
                try {
                    this.SuppressLayout();
                    this._sliderBox.SuppressLayout();
                    this._maskOn.SuppressLayout();
                    this._notch.SuppressLayout();
                    this._sliderBox.Size.Width = this.Size.Width - this._overMargin;
                    this._sliderBox.Size.Height = this.Size.Height - this._overMargin;
                    this._maskOn.Size.Width = this.Size.Width - this._overMargin;
                    this._maskOn.Size.Height = this.Size.Height - this._overMargin;
                    this._notch.SetSize(this.Size.Height, this.Size.Height);
                    this._notch.Position.X = (this.BoolValue)
                        ? (this.Size.Width / 2) - (this.Size.Height / 2)
                        : -(this.Size.Width / 2) + (this.Size.Height / 2);
                    this._maskOn.Position.X = (this.BoolValue)
                        ? 0
                        : -(this.Size.Width - this._overMargin);
                    _super.prototype.CalcLayout.call(this);
                }
                catch (e) {
                    Dump.ErrorLog(e, this.ClassName);
                }
                finally {
                    this.ResumeLayout();
                    this._sliderBox.ResumeLayout();
                    this._maskOn.ResumeLayout();
                    this._notch.ResumeLayout();
                }
            };
            ToggleButtonInputView.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);
                this.HoverColor = null;
            };
            return ToggleButtonInputView;
        }(Views.ControlView));
        Views.ToggleButtonInputView = ToggleButtonInputView;
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/EntityBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../Items/ValidationFailType.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Entities;
        (function (Entities) {
            var ValidationResult = /** @class */ (function (_super) {
                __extends(ValidationResult, _super);
                function ValidationResult(entity, name, message, type) {
                    if (name === void 0) { name = null; }
                    if (message === void 0) { message = null; }
                    if (type === void 0) { type = 1 /* Error */; }
                    var _this = _super.call(this) || this;
                    _this.Entity = entity;
                    if (name)
                        _this.Name = name;
                    if (message)
                        _this.Message = message;
                    if (type)
                        _this.Type = type;
                    return _this;
                }
                return ValidationResult;
            }(Fw.Models.EntityBase));
            Entities.ValidationResult = ValidationResult;
        })(Entities = Models.Entities || (Models.Entities = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/StoreBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Util/Xhr/Query.ts" />
/// <reference path="../Entities/ControlSet.ts" />
/// <reference path="../Entities/Control.ts" />
/// <reference path="../../Items/OperationType.ts" />
/// <reference path="../../Items/DeviceType.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Stores;
        (function (Stores) {
            var OperationStore = /** @class */ (function (_super) {
                __extends(OperationStore, _super);
                function OperationStore() {
                    var _this = _super.call(this) || this;
                    _this.SetClassName('OperationStore');
                    return _this;
                    //this.EnableLog = true;
                }
                Object.defineProperty(OperationStore, "Instance", {
                    get: function () {
                        if (OperationStore._instance === null)
                            OperationStore._instance = new OperationStore();
                        return OperationStore._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                OperationStore.prototype.Exec = function (controlSet, control) {
                    return __awaiter(this, void 0, void 0, function () {
                        var result, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    this.Log('Exec');
                                    // 渡し値がヘン
                                    if (!controlSet
                                        || !control
                                        || !control.Code
                                        || control.Code === '') {
                                        return [2 /*return*/, false];
                                    }
                                    result = false;
                                    _a = controlSet.OperationType;
                                    switch (_a) {
                                        case 1 /* RemoteControl */: return [3 /*break*/, 1];
                                        case 2 /* BroadlinkDevice */: return [3 /*break*/, 1];
                                        case 3 /* WakeOnLan */: return [3 /*break*/, 1];
                                        case 5 /* RemoteHostScript */: return [3 /*break*/, 1];
                                        case 4 /* Script */: return [3 /*break*/, 2];
                                        case 99 /* Scene */: return [3 /*break*/, 4];
                                    }
                                    return [3 /*break*/, 5];
                                case 1:
                                    alert('まちがい！');
                                    return [3 /*break*/, 6];
                                case 2: return [4 /*yield*/, Stores.Scripts.Exec(controlSet, control)];
                                case 3:
                                    result = _b.sent();
                                    return [3 /*break*/, 6];
                                case 4:
                                    alert('Not Implements!');
                                    return [3 /*break*/, 6];
                                case 5: return [3 /*break*/, 6];
                                case 6:
                                    if (result === true
                                        && (control.IsAssignToggleOn || control.IsAssignToggleOff)) {
                                        this.EnsureToggles(controlSet, control);
                                    }
                                    return [2 /*return*/, result];
                            }
                        });
                    });
                };
                OperationStore.prototype.EnsureToggles = function (controlSet, control) {
                    // コマンド送信成功、かつトグルがアサインされているとき
                    if (control.IsAssignToggleOn && control.IsAssignToggleOff) {
                        // On/Off 両方アサインされているボタンのとき
                        // 一旦Onにし、しばらく置いてOffに戻す。
                        var changed = (controlSet.ToggleState !== true);
                        controlSet.ToggleState = true;
                        if (changed)
                            controlSet.DispatchChanged();
                        _.delay(function () {
                            var changed2 = (controlSet.ToggleState !== false);
                            controlSet.ToggleState = false;
                            if (changed2)
                                controlSet.DispatchChanged();
                            Stores.ControlSets.UpdateHeader(controlSet);
                        }, 1000);
                    }
                    else if (control.IsAssignToggleOn) {
                        // Onだけがアサインされているボタンのとき
                        // トグルをOnにする。
                        var changed3 = (controlSet.ToggleState !== true);
                        controlSet.ToggleState = true;
                        if (changed3)
                            controlSet.DispatchChanged();
                        Stores.ControlSets.UpdateHeader(controlSet);
                    }
                    else if (control.IsAssignToggleOff) {
                        // Offだけがアサインされているボタンのとき
                        // トグルをOffにする。
                        var changed4 = (controlSet.ToggleState !== false);
                        controlSet.ToggleState = false;
                        if (changed4)
                            controlSet.DispatchChanged();
                        Stores.ControlSets.UpdateHeader(controlSet);
                    }
                    else {
                        // ここには来ない
                        throw new Error('そんなばかなー！');
                    }
                };
                OperationStore.prototype.GetNewEntity = function () {
                    throw new Error('Not Supported');
                };
                OperationStore.prototype.Write = function (entity) {
                    throw new Error('Not Supported');
                };
                OperationStore._instance = null;
                return OperationStore;
            }(Fw.Models.StoreBase));
            Stores.OperationStore = OperationStore;
            Stores.Operations = OperationStore.Instance;
        })(Stores = Models.Stores || (Models.Stores = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/StoreBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Util/Xhr/Query.ts" />
/// <reference path="../Entities/ControlSet.ts" />
/// <reference path="../Entities/Control.ts" />
/// <reference path="../Entities/Script.ts" />
/// <reference path="../../Items/OperationType.ts" />
/// <reference path="../../Items/DeviceType.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Stores;
        (function (Stores) {
            var Xhr = Fw.Util.Xhr;
            var Script = App.Models.Entities.Script;
            var RemoteStore = /** @class */ (function (_super) {
                __extends(RemoteStore, _super);
                function RemoteStore() {
                    var _this = _super.call(this) || this;
                    _this.SetClassName('RemoteStore');
                    return _this;
                    //this.EnableLog = true;
                }
                Object.defineProperty(RemoteStore, "Instance", {
                    get: function () {
                        if (RemoteStore._instance === null)
                            RemoteStore._instance = new RemoteStore();
                        return RemoteStore._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                RemoteStore.prototype.GetHostname = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var params, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Log('GetHostname');
                                    params = new Xhr.Params('RemoteHosts/GetHostname', Xhr.MethodType.Get);
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        return [2 /*return*/, res.Values];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, null];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                RemoteStore.prototype.GetList = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var params, res, id_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Log('GetList');
                                    params = new Xhr.Params('RemoteHosts', Xhr.MethodType.Get);
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        this.Clear();
                                        id_1 = 1;
                                        _.each(res.Values, function (e) {
                                            e.Id = id_1;
                                            _this.Merge(e);
                                            id_1++;
                                        });
                                        return [2 /*return*/, _.values(this.List)];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, []];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                RemoteStore.prototype.GetIdByJson = function (scriptJson) {
                    if (!scriptJson || scriptJson === '')
                        return null;
                    try {
                        var entity = JSON.parse(scriptJson);
                        return this.GetIdByEntity(entity);
                    }
                    catch (e) {
                        return null;
                    }
                };
                RemoteStore.prototype.GetIdByEntity = function (script) {
                    if (this.Length <= 0)
                        return null;
                    var target = _.find(this.List, function (e) {
                        return (e.ControlId === script.ControlId && e.RemoteHostId === script.RemoteHostId);
                    });
                    if (!target)
                        return null;
                    return target.Id;
                };
                RemoteStore.prototype.Exec = function (controlSet, control) {
                    return __awaiter(this, void 0, void 0, function () {
                        var script, params, res, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Log('Exec');
                                    // 渡し値がヘン
                                    if (!controlSet
                                        || !control
                                        || !control.Code
                                        || control.Code === ''
                                        || controlSet.OperationType !== 5 /* RemoteHostScript */) {
                                        return [2 /*return*/, false];
                                    }
                                    script = JSON.parse(control.Code);
                                    params = new Xhr.Params("RemoteHosts", Xhr.MethodType.Post, script);
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        result = res.Values;
                                        // Suceededのときはtrue以外返ってこない。
                                        return [2 /*return*/, result];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, false];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                RemoteStore.prototype.GetNewEntity = function () {
                    return new Script();
                };
                RemoteStore.prototype.Write = function (entity) {
                    throw new Error('Not Supported');
                };
                RemoteStore._instance = null;
                return RemoteStore;
            }(Fw.Models.StoreBase));
            Stores.RemoteStore = RemoteStore;
            Stores.Remotes = RemoteStore.Instance;
        })(Stores = Models.Stores || (Models.Stores = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/StoreBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Util/Xhr/Query.ts" />
/// <reference path="../Entities/ControlSet.ts" />
/// <reference path="../Entities/Control.ts" />
/// <reference path="../../Items/OperationType.ts" />
/// <reference path="../../Items/DeviceType.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Stores;
        (function (Stores) {
            var Xhr = Fw.Util.Xhr;
            var ScriptStore = /** @class */ (function (_super) {
                __extends(ScriptStore, _super);
                function ScriptStore() {
                    var _this = _super.call(this) || this;
                    _this.SetClassName('ScriptStore');
                    return _this;
                    //this.EnableLog = true;
                }
                Object.defineProperty(ScriptStore, "Instance", {
                    get: function () {
                        if (ScriptStore._instance === null)
                            ScriptStore._instance = new ScriptStore();
                        return ScriptStore._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                ScriptStore.prototype.Exec = function (controlSet, control) {
                    return __awaiter(this, void 0, void 0, function () {
                        var params, res, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Log('Exec');
                                    // 渡し値がヘン
                                    if (!controlSet
                                        || !control
                                        || !control.Code
                                        || control.Code === ''
                                        || controlSet.OperationType !== 4 /* Script */) {
                                        return [2 /*return*/, false];
                                    }
                                    params = new Xhr.Params("Scripts/" + control.Id, Xhr.MethodType.Post);
                                    return [4 /*yield*/, Xhr.Query.Invoke(params)];
                                case 1:
                                    res = _a.sent();
                                    if (res.Succeeded) {
                                        result = res.Values;
                                        // Suceededのときはtrue以外返ってこない。
                                        return [2 /*return*/, result];
                                    }
                                    else {
                                        this.Log('Query Fail');
                                        this.Log(res.Errors);
                                        return [2 /*return*/, false];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                ScriptStore.prototype.GetNewEntity = function () {
                    throw new Error('Not Supported');
                };
                ScriptStore.prototype.Write = function (entity) {
                    throw new Error('Not Supported');
                };
                ScriptStore._instance = null;
                return ScriptStore;
            }(Fw.Models.StoreBase));
            Stores.ScriptStore = ScriptStore;
            Stores.Scripts = ScriptStore.Instance;
        })(Stores = Models.Stores || (Models.Stores = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Models/StoreBase.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Util/Xhr/Query.ts" />
/// <reference path="../Entities/ControlSet.ts" />
/// <reference path="../Entities/Control.ts" />
/// <reference path="../Entities/ValidationResult.ts" />
/// <reference path="../../Items/OperationType.ts" />
/// <reference path="../../Items/Lang/Lang.ts" />
/// <reference path="../../Items/ValidationFailType.ts" />
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Stores;
        (function (Stores) {
            var ControlSet = App.Models.Entities.ControlSet;
            var Lang = App.Items.Lang.Lang;
            var ValidationStore = /** @class */ (function (_super) {
                __extends(ValidationStore, _super);
                function ValidationStore() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(ValidationStore, "Instance", {
                    get: function () {
                        if (ValidationStore._instance === null)
                            ValidationStore._instance = new ValidationStore();
                        return ValidationStore._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                ValidationStore.prototype.Write = function (entity) {
                    throw new Error("Method not implemented.");
                };
                ValidationStore.prototype.GetNewEntity = function () {
                    throw new Error("Method not implemented.");
                };
                ValidationStore.prototype.Validate = function (entity) {
                    if (entity instanceof ControlSet) {
                        return Stores.ControlSets.Validate(entity);
                    }
                    else {
                        // ここには来ないはず。
                        alert('なんでやー');
                        throw new Error('なんでやー');
                    }
                };
                ValidationStore.prototype.HasError = function (errors) {
                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i].Type === 1 /* Error */)
                            return true;
                    }
                    return false;
                };
                ValidationStore.prototype.HasWarning = function (errors) {
                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i].Type === 2 /* Warning */)
                            return true;
                    }
                    return false;
                };
                ValidationStore.prototype.GetFirstError = function (errors) {
                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i].Type === 1 /* Error */)
                            return errors[i];
                    }
                    return null;
                };
                ValidationStore.prototype.GetMessage = function (errors) {
                    var hasError = false;
                    var hasWarning = false;
                    var errs = new Array();
                    var warns = new Array();
                    _.each(errors, function (err) {
                        if (err.Type === 1 /* Error */) {
                            hasError = true;
                            errs.push('・' + err.Message + '<br/>');
                        }
                        if (err.Type === 2 /* Warning */) {
                            hasWarning = true;
                            warns.push('・' + err.Message + '<br/>');
                        }
                    });
                    var result = '';
                    if (hasError && hasWarning) {
                        result = Lang.ErrorsAndWarnings + '<br/><br/>';
                        result += '　' + Lang.Errors + ':<br/>';
                        result += errs.join('');
                        result += '<br/>';
                        result += '　' + Lang.Warnings + ':<br/>';
                        result += warns.join('');
                        result += '<br/>';
                    }
                    else if (hasError) {
                        result = 'Errors<br/><br/>';
                        result += errs.join('');
                        result += '<br/>';
                    }
                    else if (hasWarning) {
                        result = 'Warnings<br/><br/>';
                        result += warns.join('');
                        result += '<br/>';
                    }
                    else {
                        return '';
                    }
                    return result;
                };
                ValidationStore._instance = null;
                return ValidationStore;
            }(Fw.Models.StoreBase));
            Stores.ValidationStore = ValidationStore;
            Stores.Validations = ValidationStore.Instance;
        })(Stores = Models.Stores || (Models.Stores = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/ButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../Items/Color.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_8) {
        var Controls;
        (function (Controls) {
            var Color = App.Items.Color;
            var ButtonView = /** @class */ (function (_super) {
                __extends(ButtonView, _super);
                function ButtonView() {
                    var _this = _super.call(this) || this;
                    _this.HasBorder = false;
                    _this.BorderRadius = 10;
                    _this.BackgroundColor = Color.Transparent;
                    _this.HoverColor = Color.MainHover;
                    _this.Color = Color.Main;
                    return _this;
                }
                return ButtonView;
            }(Fw.Views.ButtonView));
            Controls.ButtonView = ButtonView;
        })(Controls = Views_8.Controls || (Views_8.Controls = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../../lib/popperjs/index.d.ts" />
/// <reference path="../../../../lib/tippyjs/index.d.ts" />
/// <reference path="../../../Fw/Views/RelocatableButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../../Fw/Events/EntityEvents.ts" />
/// <reference path="../../Items/Color.ts" />
/// <reference path="../../Events/Controls/ControlButtonViewEvents.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_9) {
        var Controls;
        (function (Controls) {
            var Dump = Fw.Util.Dump;
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var Color = App.Items.Color;
            var Events = App.Events.Controls.ControlButtonViewEvents;
            var EntityEvents = Fw.Events.EntityEvents;
            var ControlButtonView = /** @class */ (function (_super) {
                __extends(ControlButtonView, _super);
                function ControlButtonView() {
                    var _this = _super.call(this) || this;
                    _this._hoverEnable = true;
                    _this._isActive = false;
                    _this.SetSize(75, 75);
                    _this.GridSize = 90;
                    _this.Margin = 5;
                    _this.Position.Policy = Property.PositionPolicy.LeftTop;
                    _this.HasBorder = true;
                    _this.BorderRadius = 10;
                    _this.BackgroundColor = Color.MainBackground;
                    _this.HoverColor = Color.ButtonHoverColors[0];
                    _this.Color = Color.ButtonColors[0];
                    _this.ImageFitPolicy = Property.FitPolicy.Auto;
                    _this._name = '';
                    _this._hoverEnable = true;
                    _this.AddEventListener(Events.PositionChanged, function () {
                        if (_this._control) {
                            _this._control.PositionLeft = _this.Position.Left;
                            _this._control.PositionTop = _this.Position.Top;
                        }
                    });
                    return _this;
                }
                Object.defineProperty(ControlButtonView.prototype, "Name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                        if (this.ImageSrc === '')
                            this.Text = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ControlButtonView.prototype, "Tooltip", {
                    get: function () {
                        return this._tooltip;
                    },
                    set: function (value) {
                        this._tooltip = value;
                        this.Refresh();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ControlButtonView.prototype, "HoverEnable", {
                    get: function () {
                        return this._hoverEnable;
                    },
                    set: function (value) {
                        var _this = this;
                        this._hoverEnable = value;
                        // 一旦、Hover関連イベントを削除する。
                        this.Elem.off('mouseenter mouseleave');
                        if (this._hoverEnable) {
                            // Hoverを有効にするとき
                            this.Elem.on('mouseenter', function () {
                                _this.Dom.style.backgroundColor = _this.HoverColor;
                            });
                            this.Elem.on('mouseleave', function () {
                                _this.Dom.style.backgroundColor = _this.BackgroundColor;
                            });
                        }
                        else {
                            // Hoverを無効にするとき
                            // なにもしない。
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ControlButtonView.prototype, "IsActive", {
                    get: function () {
                        return this._isActive;
                    },
                    set: function (value) {
                        if (this._hoverEnable)
                            throw new Error('Hover is Enable, Cannot Active-Control.');
                        this._isActive = value;
                        if (this._isActive) {
                            // 有効化
                            this.BackgroundColor = Color.GetButtonHoverColor(this.Color);
                            this.Dom.style.backgroundColor = this.BackgroundColor;
                        }
                        else {
                            // 無効化
                            this.BackgroundColor = Color.MainBackground;
                            this.Dom.style.backgroundColor = this.BackgroundColor;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ControlButtonView.prototype, "Control", {
                    get: function () {
                        return this._control;
                    },
                    set: function (value) {
                        if (this._control) {
                            this._control.RemoveEventListener(EntityEvents.Changed, this.ApplyFromEntity, this);
                        }
                        this._control = value;
                        if (this._control) {
                            this._control.AddEventListener(EntityEvents.Changed, this.ApplyFromEntity, this);
                        }
                        this.ApplyFromEntity();
                    },
                    enumerable: true,
                    configurable: true
                });
                ControlButtonView.prototype.ApplyFromEntity = function () {
                    if (!this._control)
                        return;
                    this.Name = this._control.Name;
                    this.SetImage(this._control.IconUrl);
                    this.SetColor(this._control.Color);
                    if (this._control.Name
                        && this._control.Name !== ''
                        && this._control.IconUrl
                        && this._control.IconUrl !== '') {
                        this.Tooltip = this._control.Name;
                    }
                    else {
                        this.Tooltip = null;
                    }
                    this.Refresh();
                };
                ControlButtonView.prototype.SetImage = function (value) {
                    if (value === undefined || value === null || value === '') {
                        this.ImageSrc = '';
                        this.Text = this.Name;
                    }
                    else {
                        this.ImageSrc = value;
                        this.Text = '';
                    }
                };
                ControlButtonView.prototype.SetColor = function (value) {
                    var idx = Color.ButtonColors.indexOf(value);
                    if (idx === -1) {
                        // 色が見つからないとき、デフォルト
                        this.Color = Color.MainHover;
                        this.HoverColor = Color.MainHover;
                        if (this._control) {
                            this._control.Color = Color.MainHover;
                        }
                    }
                    else {
                        // 色が定義済みのとき、ホバー色とともにセット
                        this.Color = value;
                        this.HoverColor = Color.ButtonHoverColors[idx];
                        if (this._control) {
                            this._control.Color = value;
                        }
                    }
                    this.Refresh();
                };
                ControlButtonView.prototype.InnerRefresh = function () {
                    try {
                        _super.prototype.InnerRefresh.call(this);
                        if (this._tippy) {
                            this._tippy.destroy();
                            this._tippy = null;
                        }
                        if (this._tooltip && this._tooltip !== '') {
                            this._tippy = tippy.one(this.Dom, {
                                content: this._tooltip,
                                delay: 100,
                                arrow: true,
                                arrowType: 'round',
                                size: 'large',
                                duration: 500,
                                animation: 'scale'
                            });
                        }
                    }
                    catch (e) {
                        Dump.ErrorLog(e, this.ClassName);
                    }
                    finally {
                        this.ResumeLayout();
                    }
                };
                ControlButtonView.prototype.Dispose = function () {
                    if (this._control) {
                        this._control.RemoveEventListener(EntityEvents.Changed, this.ApplyFromEntity, this);
                    }
                    this._control = null;
                    this._name = null;
                    _super.prototype.Dispose.call(this);
                };
                return ControlButtonView;
            }(Views.RelocatableButtonView));
            Controls.ControlButtonView = ControlButtonView;
        })(Controls = Views_9.Controls || (Views_9.Controls = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/ButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../../Items/Color.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_10) {
        var Controls;
        (function (Controls) {
            var Color = App.Items.Color;
            var PropertyButtonView = /** @class */ (function (_super) {
                __extends(PropertyButtonView, _super);
                function PropertyButtonView() {
                    var _this = _super.call(this) || this;
                    _this.HasBorder = true;
                    _this.BorderRadius = 0;
                    _this.BackgroundColor = Color.Transparent;
                    _this.HoverColor = Color.MainHover;
                    _this.Color = Color.Main;
                    return _this;
                }
                return PropertyButtonView;
            }(Fw.Views.ButtonView));
            Controls.PropertyButtonView = PropertyButtonView;
        })(Controls = Views_10.Controls || (Views_10.Controls = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/PageView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Events/PageViewEvents.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../Controls/HeaderBarView.ts" />
/// <reference path="../../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_11) {
        var Pages;
        (function (Pages) {
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var Controls = App.Views.Controls;
            var Lang = App.Items.Lang.Lang;
            var ControlHeaderPropertyPageView = /** @class */ (function (_super) {
                __extends(ControlHeaderPropertyPageView, _super);
                function ControlHeaderPropertyPageView() {
                    var _this = _super.call(this) || this;
                    _this.HeaderBar = new Controls.HeaderBarView();
                    _this.InputPanel = new Views.StuckerBoxView();
                    _this.TxtName = new Views.TextBoxInputView();
                    _this.LabelColor = new Views.LabelView();
                    _this.BtnColor = new Controls.ItemSelectButtonView();
                    _this.LabelRm = new Views.LabelView();
                    _this.SboRm = new Views.SelectBoxInputView();
                    _this.DeleteButton = new Controls.PropertyButtonView();
                    _this.SetClassName('ControlHeaderPropertyPageView');
                    var background = new Views.ImageView();
                    background.SetAnchor(0, 0, 0, 0);
                    background.FitPolicy = Property.FitPolicy.Cover;
                    background.Src = 'images/Pages/ControlProperty/background.jpg';
                    _this.Add(background);
                    _this.HeaderBar.Text = '';
                    _this.HeaderBar.LeftButton.Hide(0);
                    _this.HeaderBar.RightButton.Hide(0);
                    _this.Add(_this.HeaderBar);
                    var label = new Views.LabelView();
                    label.FontSize = Property.FontSize.Large;
                    label.Color = App.Items.Color.Main;
                    label.SetAnchor(null, 5, null, null);
                    label.Text = Lang.RemoteControl;
                    _this.HeaderBar.Add(label);
                    _this.InputPanel.Position.Policy = Property.PositionPolicy.LeftTop;
                    _this.InputPanel.ReferencePoint = Property.ReferencePoint.LeftTop;
                    _this.InputPanel.Size.Width = 280;
                    _this.InputPanel.SetAnchor(70, 10, null, 10);
                    _this.InputPanel.Color = App.Items.Color.MainBackground;
                    _this.InputPanel.IsChildRelocatable = false;
                    _this.Add(_this.InputPanel);
                    var lbl1 = new Views.LabelView();
                    lbl1.Text = Lang.Name;
                    lbl1.TextAlign = Property.TextAlign.Left;
                    lbl1.AutoSize = true;
                    lbl1.SetAnchor(null, 5, null, null);
                    lbl1.Size.Height = 21;
                    _this.InputPanel.Add(lbl1);
                    _this.TxtName.SetAnchor(null, 5, 15, null);
                    _this.TxtName.Size.Height = 30;
                    _this.InputPanel.Add(_this.TxtName);
                    _this.LabelColor = new Views.LabelView();
                    _this.LabelColor.Text = Lang.Color;
                    _this.LabelColor.TextAlign = Property.TextAlign.Left;
                    _this.LabelColor.AutoSize = true;
                    _this.LabelColor.SetAnchor(null, 5, null, null);
                    _this.LabelColor.Size.Height = 21;
                    _this.InputPanel.Add(_this.LabelColor);
                    _this.InputPanel.AddSpacer();
                    _this.InputPanel.Add(_this.BtnColor);
                    _this.InputPanel.AddSpacer();
                    _this.LabelRm = new Views.LabelView();
                    _this.LabelRm.Text = Lang.Controller;
                    _this.LabelRm.TextAlign = Property.TextAlign.Left;
                    _this.LabelRm.AutoSize = true;
                    _this.LabelRm.SetAnchor(null, 5, null, null);
                    _this.LabelRm.Size.Height = 21;
                    _this.InputPanel.Add(_this.LabelRm);
                    _this.SboRm.SetAnchor(null, 5, 15, null);
                    _this.SboRm.Size.Height = 30;
                    _.each(App.Items.Icon.Names, function (iconName) {
                        var dispName = iconName.substr(0, iconName.indexOf('.')).replace('_', ' ');
                        _this.SboRm.AddItem(dispName, "images/icons/" + iconName);
                    });
                    _this.InputPanel.Add(_this.SboRm);
                    _this.DeleteButton.SetAnchor(null, 5, 15, null);
                    _this.DeleteButton.Size.Height = 30;
                    _this.DeleteButton.Text = Lang.Delete;
                    _this.InputPanel.Add(_this.DeleteButton);
                    return _this;
                }
                return ControlHeaderPropertyPageView;
            }(Fw.Views.PageView));
            Pages.ControlHeaderPropertyPageView = ControlHeaderPropertyPageView;
        })(Pages = Views_11.Pages || (Views_11.Pages = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/PageView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Events/PageViewEvents.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../Controls/HeaderBarView.ts" />
/// <reference path="../../Items/Color.ts" />
/// <reference path="../../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_12) {
        var Pages;
        (function (Pages) {
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var Controls = App.Views.Controls;
            var Color = App.Items.Color;
            var Lang = App.Items.Lang.Lang;
            var ControlPropertyPageView = /** @class */ (function (_super) {
                __extends(ControlPropertyPageView, _super);
                function ControlPropertyPageView() {
                    var _this = _super.call(this) || this;
                    _this.HeaderBar = new Controls.HeaderBarView();
                    _this.InputPanel = new Views.StuckerBoxView();
                    _this.TxtName = new Views.TextBoxInputView();
                    _this.BtnIcon = new Controls.ItemSelectButtonView();
                    _this.BtnColor = new Controls.ItemSelectButtonView();
                    _this.LblCode = new Views.LabelView();
                    _this.TarCode = new Views.TextAreaInputView();
                    _this.TxtMac = new Views.TextBoxInputView();
                    _this.SboRemote = new Views.SelectBoxInputView();
                    _this.BtnLearn = new Controls.PropertyButtonView();
                    _this.BtnSend = new Controls.PropertyButtonView();
                    _this.ChkToggleOn = new Views.CheckBoxInputView();
                    _this.ChkToggleOff = new Views.CheckBoxInputView();
                    _this.DeleteButton = new Controls.PropertyButtonView();
                    _this.SetClassName('ControlPropertyPageView');
                    var background = new Views.ImageView();
                    background.SetAnchor(0, 0, 0, 0);
                    background.FitPolicy = Property.FitPolicy.Cover;
                    background.Src = 'images/Pages/ControlProperty/background.jpg';
                    _this.Add(background);
                    _this.HeaderBar.Text = '';
                    _this.HeaderBar.LeftButton.Hide(0);
                    _this.HeaderBar.RightButton.Hide(0);
                    _this.Add(_this.HeaderBar);
                    var label = new Views.LabelView();
                    label.FontSize = Property.FontSize.Large;
                    label.Color = Color.Main;
                    label.SetAnchor(null, 5, null, null);
                    label.Text = Lang.Property;
                    _this.HeaderBar.Add(label);
                    _this.InputPanel.Position.Policy = Property.PositionPolicy.LeftTop;
                    _this.InputPanel.ReferencePoint = Property.ReferencePoint.LeftTop;
                    _this.InputPanel.Size.Width = 280;
                    _this.InputPanel.SetAnchor(70, 10, null, 10);
                    _this.InputPanel.Color = Color.MainBackground;
                    _this.InputPanel.IsChildRelocatable = false;
                    _this.Add(_this.InputPanel);
                    var lbl1 = new Views.LabelView();
                    lbl1.Text = Lang.Name;
                    lbl1.TextAlign = Property.TextAlign.Left;
                    lbl1.AutoSize = true;
                    lbl1.SetAnchor(null, 5, null, null);
                    lbl1.Size.Height = 21;
                    _this.InputPanel.Add(lbl1);
                    _this.TxtName.SetAnchor(null, 5, 15, null);
                    _this.TxtName.Size.Height = 30;
                    _this.InputPanel.Add(_this.TxtName);
                    var lbl2 = new Views.LabelView();
                    lbl2.Text = Lang.IconColor;
                    lbl2.TextAlign = Property.TextAlign.Left;
                    lbl2.AutoSize = true;
                    lbl2.SetAnchor(null, 5, null, null);
                    lbl2.Size.Height = 21;
                    _this.InputPanel.Add(lbl2);
                    _this.InputPanel.AddSpacer();
                    _this.InputPanel.Add(_this.BtnIcon);
                    _this.InputPanel.Add(_this.BtnColor);
                    _this.InputPanel.AddSpacer();
                    _this.LblCode = new Views.LabelView();
                    _this.LblCode.Text = Lang.Code;
                    _this.LblCode.TextAlign = Property.TextAlign.Left;
                    _this.LblCode.AutoSize = true;
                    _this.LblCode.SetAnchor(null, 5, null, null);
                    _this.LblCode.Size.Height = 21;
                    _this.InputPanel.Add(_this.LblCode);
                    _this.TarCode.SetAnchor(null, 5, 15, null);
                    _this.TarCode.Size.Height = 90;
                    _this.InputPanel.Add(_this.TarCode);
                    _this.TxtMac.SetAnchor(null, 5, 15, null);
                    _this.TxtMac.Size.Height = 30;
                    _this.InputPanel.Add(_this.TxtMac);
                    _this.SboRemote.SetAnchor(null, 5, 15, null);
                    _this.SboRemote.Size.Height = 30;
                    _this.InputPanel.Add(_this.SboRemote);
                    _this.BtnLearn.SetAnchor(null, 5, 15, null);
                    _this.BtnLearn.Size.Height = 30;
                    _this.BtnLearn.Text = Lang.Learn;
                    _this.InputPanel.Add(_this.BtnLearn);
                    _this.BtnSend.SetAnchor(null, 5, 15, null);
                    _this.BtnSend.Size.Height = 30;
                    _this.BtnSend.Text = Lang.Test;
                    _this.InputPanel.Add(_this.BtnSend);
                    var lbl5 = new Views.LabelView();
                    lbl5.Text = Lang.ToggleAssigns;
                    lbl5.TextAlign = Property.TextAlign.Left;
                    lbl5.AutoSize = true;
                    lbl5.SetAnchor(null, 5, null, null);
                    lbl5.Size.Height = 21;
                    _this.InputPanel.Add(lbl5);
                    _this.ChkToggleOn.SetAnchor(null, 5, 15, null);
                    _this.ChkToggleOn.Size.Height = 30;
                    _this.ChkToggleOn.Text = Lang.MainPanelToggleOn;
                    _this.InputPanel.Add(_this.ChkToggleOn);
                    _this.ChkToggleOff.SetAnchor(null, 5, 15, null);
                    _this.ChkToggleOff.Size.Height = 30;
                    _this.ChkToggleOff.Text = Lang.MainPanelToggleOff;
                    _this.InputPanel.Add(_this.ChkToggleOff);
                    _this.DeleteButton.SetAnchor(null, 5, 15, null);
                    _this.DeleteButton.Size.Height = 30;
                    _this.DeleteButton.Text = Lang.Delete;
                    _this.InputPanel.Add(_this.DeleteButton);
                    return _this;
                }
                return ControlPropertyPageView;
            }(Fw.Views.PageView));
            Pages.ControlPropertyPageView = ControlPropertyPageView;
        })(Pages = Views_12.Pages || (Views_12.Pages = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/PageView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Events/PageViewEvents.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../Controls/HeaderBarView.ts" />
/// <reference path="../../Items/Color.ts" />
/// <reference path="../../Items/Lang/Lang.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_13) {
        var Pages;
        (function (Pages) {
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var Controls = App.Views.Controls;
            var Color = App.Items.Color;
            var Lang = App.Items.Lang.Lang;
            var ControlSetPageView = /** @class */ (function (_super) {
                __extends(ControlSetPageView, _super);
                function ControlSetPageView() {
                    var _this = _super.call(this) || this;
                    _this.HeaderBar = new Controls.HeaderBarView();
                    _this.EditButton = new Controls.ButtonView();
                    _this.HeaderLeftLabel = new Views.LabelView();
                    _this.ButtonPanel = new Views.SlidableBoxView(Property.Direction.Vertical);
                    _this.SetClassName('ControlSetPageView');
                    var background = new Views.ImageView();
                    background.SetAnchor(0, 0, 0, 0);
                    background.FitPolicy = Property.FitPolicy.Cover;
                    background.Src = 'images/Pages/ControlSet/background.jpg';
                    _this.Add(background);
                    _this.HeaderBar.Text = Lang.RemoteControl;
                    _this.HeaderBar.RightButton.Hide(0);
                    _this.Add(_this.HeaderBar);
                    _this.EditButton.SetSize(40, 40);
                    _this.EditButton.BackgroundColor = Color.HeaderButtonBackground;
                    _this.EditButton.HoverColor = Color.HeaderButtonHover;
                    _this.EditButton.Color = Color.Main;
                    _this.EditButton.Text = '@';
                    _this.EditButton.SetAnchor(null, 255, null, null);
                    _this.HeaderBar.Add(_this.EditButton);
                    _this.HeaderLeftLabel.FontSize = Property.FontSize.Large;
                    _this.HeaderLeftLabel.Color = Color.Main;
                    _this.HeaderLeftLabel.SetAnchor(null, 5, null, null);
                    _this.HeaderBar.Add(_this.HeaderLeftLabel);
                    _this.ButtonPanel.Position.Policy = Property.PositionPolicy.LeftTop;
                    _this.ButtonPanel.Size.Width = 280;
                    _this.ButtonPanel.SetAnchor(70, null, null, 10);
                    _this.ButtonPanel.Color = Color.MainBackground;
                    _this.Add(_this.ButtonPanel);
                    _this.HeaderBar.Elem.hover(function () {
                        if (_this.EditButton.IsVisible) {
                            _this.HeaderBar.SetStyles({
                                backgroundColor: Color.MainBackground,
                                cursor: 'normal'
                            });
                            _this.HeaderBar.ApplyStyles();
                            return;
                        }
                        _this.HeaderBar.SetStyles({
                            backgroundColor: Color.MainHover,
                            cursor: 'pointer'
                        });
                        _this.HeaderBar.ApplyStyles();
                    }, function () {
                        _this.HeaderBar.SetStyles({
                            backgroundColor: Color.MainBackground,
                            cursor: 'normal'
                        });
                        _this.HeaderBar.ApplyStyles();
                    });
                    return _this;
                }
                return ControlSetPageView;
            }(Fw.Views.PageView));
            Pages.ControlSetPageView = ControlSetPageView;
        })(Pages = Views_13.Pages || (Views_13.Pages = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../Fw/Views/PageView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Events/PageViewEvents.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="../Controls/HeaderBarView.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_14) {
        var Pages;
        (function (Pages) {
            var Views = Fw.Views;
            var Property = Fw.Views.Property;
            var Controls = App.Views.Controls;
            var ItemSelectPageView = /** @class */ (function (_super) {
                __extends(ItemSelectPageView, _super);
                function ItemSelectPageView() {
                    var _this = _super.call(this) || this;
                    _this.HeaderBar = new Controls.HeaderBarView();
                    _this.SelectorPanel = new Views.StuckerBoxView();
                    _this.SetClassName('ItemSelectionPageView');
                    var background = new Views.ImageView();
                    background.SetAnchor(0, 0, 0, 0);
                    background.FitPolicy = Property.FitPolicy.Cover;
                    background.Src = 'images/Pages/ControlProperty/background.jpg';
                    _this.Add(background);
                    _this.HeaderBar.Text = '';
                    _this.HeaderBar.LeftButton.Hide(0);
                    _this.HeaderBar.RightButton.Hide(0);
                    _this.Add(_this.HeaderBar);
                    _this.Label = new Views.LabelView();
                    _this.Label.FontSize = Property.FontSize.Large;
                    _this.Label.Color = App.Items.Color.Main;
                    _this.Label.SetAnchor(null, 5, null, null);
                    _this.Label.Text = '';
                    _this.HeaderBar.Add(_this.Label);
                    _this.SelectorPanel.Position.Policy = Property.PositionPolicy.LeftTop;
                    _this.SelectorPanel.ReferencePoint = Property.ReferencePoint.LeftTop;
                    _this.SelectorPanel.Size.Width = 280;
                    _this.SelectorPanel.Margin = 5;
                    _this.SelectorPanel.RightMargin = 20;
                    _this.SelectorPanel.SetAnchor(70, 10, null, 10);
                    _this.SelectorPanel.Color = App.Items.Color.MainBackground;
                    _this.SelectorPanel.IsChildRelocatable = false;
                    _this.Add(_this.SelectorPanel);
                    return _this;
                }
                return ItemSelectPageView;
            }(Fw.Views.PageView));
            Pages.ItemSelectPageView = ItemSelectPageView;
        })(Pages = Views_14.Pages || (Views_14.Pages = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../../lib/MagnificPopup/index.d.ts" />
/// <reference path="../../../Fw/Views/ButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="PopupBase.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_15) {
        var Popup;
        (function (Popup) {
            var CancellablePopup = /** @class */ (function (_super) {
                __extends(CancellablePopup, _super);
                function CancellablePopup() {
                    var _this = _super.call(this, $('#PtplCancellable')) || this;
                    _this.CloseOnBgClick = false;
                    _this.ShowCloseBtn = false;
                    _this.EnableEscapeKey = false;
                    _this.Elem.find('.ButtonCancel').on('click', function () {
                        _this.Close();
                        if (_this._callbackCancel)
                            _this._callbackCancel();
                    });
                    return _this;
                }
                Object.defineProperty(CancellablePopup, "Instance", {
                    get: function () {
                        if (!CancellablePopup._instance)
                            CancellablePopup._instance = new CancellablePopup();
                        return CancellablePopup._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                CancellablePopup.prototype.Open = function (params) {
                    if (typeof params === 'object') {
                        this._callbackCancel = _.isFunction(params.CallbackCancel)
                            ? params.CallbackCancel
                            : null;
                    }
                    _super.prototype.Open.call(this, params);
                };
                CancellablePopup._instance = null;
                return CancellablePopup;
            }(Popup.PopupBase));
            Popup.CancellablePopup = CancellablePopup;
            Popup.Cancellable = CancellablePopup.Instance;
        })(Popup = Views_15.Popup || (Views_15.Popup = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../../lib/MagnificPopup/index.d.ts" />
/// <reference path="../../../Fw/Views/ButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="PopupBase.ts" />
var App;
(function (App) {
    var Views;
    (function (Views_16) {
        var Popup;
        (function (Popup) {
            var ConfirmPopup = /** @class */ (function (_super) {
                __extends(ConfirmPopup, _super);
                function ConfirmPopup() {
                    var _this = _super.call(this, $('#PtplConfirm')) || this;
                    _this.CloseOnBgClick = false;
                    _this.ShowCloseBtn = false;
                    _this.EnableEscapeKey = false;
                    _this.Elem.find('.ButtonOk').on('click', function () {
                        _this.Close();
                        if (_this._callbackOk)
                            _this._callbackOk();
                    });
                    _this.Elem.find('.ButtonCancel').on('click', function () {
                        _this.Close();
                        if (_this._callbackCancel)
                            _this._callbackCancel();
                    });
                    return _this;
                }
                Object.defineProperty(ConfirmPopup, "Instance", {
                    get: function () {
                        if (!ConfirmPopup._instance)
                            ConfirmPopup._instance = new ConfirmPopup();
                        return ConfirmPopup._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                ConfirmPopup.prototype.Open = function (params) {
                    // Callback方式で使えるけど、やめとけ、というやつ。
                    throw new Error('OpenAsyncを使いたまへ！');
                    if (typeof params === 'object') {
                        this._callbackOk = _.isFunction(params.CallbackOk)
                            ? params.CallbackOk
                            : null;
                        this._callbackCancel = _.isFunction(params.CallbackCancel)
                            ? params.CallbackCancel
                            : null;
                    }
                    _super.prototype.Open.call(this, params);
                };
                ConfirmPopup.prototype.OpenAsync = function (params) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    _this._callbackOk = function () {
                                        resolve(true);
                                    };
                                    _this._callbackCancel = function () {
                                        resolve(false);
                                    };
                                    // TODO: ↓ときどき、この書き方が通らずthisのメソッドが呼ばれるようなフローがある。
                                    // TODO: ↓いずれきちんと理解する。
                                    // コールバックが上書きされないよう、thisでなくsuperのOpenを呼ぶ。
                                    _super.prototype.Open.call(_this, params);
                                })];
                        });
                    });
                };
                ConfirmPopup._instance = null;
                return ConfirmPopup;
            }(Popup.PopupBase));
            Popup.ConfirmPopup = ConfirmPopup;
            Popup.Confirm = ConfirmPopup.Instance;
        })(Popup = Views_16.Popup || (Views_16.Popup = {}));
    })(Views = App.Views || (App.Views = {}));
})(App || (App = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var Xhr;
        (function (Xhr) {
            var MethodType;
            (function (MethodType) {
                MethodType[MethodType["Get"] = 1] = "Get";
                MethodType[MethodType["Post"] = 2] = "Post";
                MethodType[MethodType["Put"] = 3] = "Put";
                MethodType[MethodType["Delete"] = 4] = "Delete";
            })(MethodType = Xhr.MethodType || (Xhr.MethodType = {}));
        })(Xhr = Util.Xhr || (Util.Xhr = {}));
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Util/Dump.ts" />
/// <reference path="../../Util/Obj.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var Xhr;
        (function (Xhr) {
            var Params = /** @class */ (function () {
                function Params(url, method, values) {
                    if (method === void 0) { method = null; }
                    if (values === void 0) { values = null; }
                    this.Method = Xhr.MethodType.Post;
                    this.Values = {};
                    this.Callback = function () { };
                    this.Url = url;
                    this.Method = method || Xhr.MethodType.Post;
                    this.Values = (values)
                        ? values
                        : {};
                }
                return Params;
            }());
            Xhr.Params = Params;
        })(Xhr = Util.Xhr || (Util.Xhr = {}));
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Util/Dump.ts" />
var Fw;
(function (Fw) {
    var Util;
    (function (Util) {
        var Xhr;
        (function (Xhr) {
            var Error = /** @class */ (function () {
                function Error(message, name) {
                    this.Message = '';
                    this.Name = '';
                    this.Message = message;
                    this.Name = name || '';
                }
                return Error;
            }());
            Xhr.Error = Error;
            // まだ使わない。
            // API仕様が固まったら、やろうかな。
            var Result = /** @class */ (function () {
                function Result(succeeded, values, errors) {
                    this.Succeeded = succeeded;
                    this.Values = values;
                    this.Errors = errors;
                }
                Result.CreateSucceeded = function (values) {
                    return new Result(true, values, []);
                };
                Result.CreateError = function (errors) {
                    return new Result(false, {}, errors);
                };
                return Result;
            }());
            Xhr.Result = Result;
        })(Xhr = Util.Xhr || (Util.Xhr = {}));
    })(Util = Fw.Util || (Fw.Util = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Util/Dump.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            var Direction;
            (function (Direction) {
                Direction[Direction["Horizontal"] = 0] = "Horizontal";
                Direction[Direction["Vertical"] = 1] = "Vertical";
            })(Direction = Property.Direction || (Property.Direction = {}));
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            /**
             * @description font-size
             */
            var FontSize;
            (function (FontSize) {
                FontSize["XxSmall"] = "xx-small";
                FontSize["XSmall"] = "x-small";
                FontSize["Small"] = "small";
                FontSize["Medium"] = "medium";
                FontSize["Large"] = "large";
                FontSize["XLarge"] = "x-large";
                FontSize["XxLarge"] = "xx-large";
            })(FontSize = Property.FontSize || (Property.FontSize = {}));
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Events/ViewEvents.ts" />
/// <reference path="../../Util/Dump.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            /**
             * @description 基点、スタッキング時の基準点
             */
            var ReferencePoint;
            (function (ReferencePoint) {
                ReferencePoint[ReferencePoint["LeftTop"] = 1] = "LeftTop";
                ReferencePoint[ReferencePoint["RightTop"] = 2] = "RightTop";
                ReferencePoint[ReferencePoint["LeftBottom"] = 3] = "LeftBottom";
                ReferencePoint[ReferencePoint["RightBottom"] = 4] = "RightBottom";
            })(ReferencePoint = Property.ReferencePoint || (Property.ReferencePoint = {}));
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../Util/Dump.ts" />
var Fw;
(function (Fw) {
    var Views;
    (function (Views) {
        var Property;
        (function (Property) {
            var TextAlign;
            (function (TextAlign) {
                TextAlign["Left"] = "left";
                TextAlign["Center"] = "center";
                TextAlign["Right"] = "right";
                TextAlign["JustifyAll"] = "justify-all";
            })(TextAlign = Property.TextAlign || (Property.TextAlign = {}));
        })(Property = Views.Property || (Views.Property = {}));
    })(Views = Fw.Views || (Fw.Views = {}));
})(Fw || (Fw = {}));
//# sourceMappingURL=tsout.js.map