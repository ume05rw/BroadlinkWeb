﻿/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />
/// <reference path="../../Fw/Controllers/ControllerBase.ts" />
/// <reference path="../../Fw/Controllers/Manager.ts" />
/// <reference path="../../Fw/Util/Dump.ts" />
/// <reference path="../../Fw/Events/ControlViewEvents.ts" />
/// <reference path="../../Fw/Views/Property/FitPolicy.ts" />
/// <reference path="../Views/Pages/MainPageView.ts" />

namespace App.Controllers {
    import Dump = Fw.Util.Dump;
    import Events = Fw.Events;
    import Manager = Fw.Controllers.Manager;
    import Property = Fw.Views.Property;
    import Pages = App.Views.Pages;

    export class MainController extends Fw.Controllers.ControllerBase {

        constructor(id: string) {
            super(id);

            this.Init();
        }

        private Init(): void {
            this.SetClassName('MainController');

            this.View = new Pages.MainPageView();
            const page = this.View as Pages.MainPageView;

            page.BtnGoSub1.AddEventListener(Events.ControlViewEvents.SingleClick, () => {
                // イベント通知でなく、参照保持でよいか？
                Manager.Instance.Show("Sub1");
            });

            page.BtnGoSub2.AddEventListener(Events.ControlViewEvents.SingleClick, () => {
                // イベント通知でなく、参照保持でよいか？
                Manager.Instance.Show("Sub2");
            });

            page.BtnGoDynamic.AddEventListener(Events.ControlViewEvents.SingleClick, () => {
                // イベント通知でなく、参照保持でよいか？
                const ctr = new LayoutCheckController('LayoutCheck');
                Manager.Instance.ShowOnce(ctr);
            });
        }
    }
}