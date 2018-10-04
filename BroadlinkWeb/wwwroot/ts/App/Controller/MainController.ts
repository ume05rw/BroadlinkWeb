﻿/// <reference path="../../../lib/jquery/index.d.ts" />
/// <reference path="../../../lib/underscore/index.d.ts" />

namespace App.Controller {
    export class MainController extends Fw.Controller.ControllerBase {

        private _btnGoSub1: JQuery;
        private _btnGoSub2: JQuery;
        
        

        constructor(elem: JQuery, manager: Fw.Controller.Manager) {
            super(elem, manager);
            this.Init();
        }

        private Init(): void {
            this._btnGoSub1 = this.View.find('button[name=GoSub1]');
            this._btnGoSub2 = this.View.find('button[name=GoSub2]');

            this._btnGoSub1.click(() => {
                // イベント通知でなく、参照保持でよいか？
                this.Manager.show("Sub1");
            });

            this._btnGoSub2.click(() => {
                // イベント通知でなく、参照保持でよいか？
                this.Manager.show("Sub2");
            });
        }
    }
}