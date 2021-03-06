/// <reference path="../../../../lib/jquery/index.d.ts" />
/// <reference path="../../../../lib/underscore/index.d.ts" />
/// <reference path="../../../../lib/MagnificPopup/index.d.ts" />
/// <reference path="../../../Fw/Views/ButtonView.ts" />
/// <reference path="../../../Fw/Views/Property/Anchor.ts" />
/// <reference path="../../../Fw/Util/Dump.ts" />
/// <reference path="PopupBase.ts" />

namespace App.Views.Popup {
    import Dump = Fw.Util.Dump;
    import Views = Fw.Views;
    import Property = Fw.Views.Property;

    export class ConfirmPopup extends PopupBase {

        private static _instance: ConfirmPopup = null;
        public static get Instance(): ConfirmPopup {
            if (!ConfirmPopup._instance)
                ConfirmPopup._instance = new ConfirmPopup();

            return ConfirmPopup._instance;
        }

        private _callbackOk: Function;
        private _callbackCancel: Function;

        protected constructor() {
            super($('#PtplConfirm'));

            this.CloseOnBgClick = false;
            this.ShowCloseBtn = false;
            this.EnableEscapeKey = false;

            this.Elem.find('.ButtonOk').on('click', () => {
                this.Close();

                if (this._callbackOk)
                    this._callbackOk();
            });

            this.Elem.find('.ButtonCancel').on('click', () => {
                this.Close();

                if (this._callbackCancel)
                    this._callbackCancel();
            });
        }

        public Open(params?: any): void {
            // Callback方式で使えるけど、やめとけ、というやつ。
            throw new Error('OpenAsyncを使いたまへ！');

        }

        public async OpenAsync(params?: any): Promise<boolean> {

            //return super.OpenAsync(params);

            return new Promise<boolean>((resolve: (value: boolean) => void) => {
                this._callbackOk = () => {
                    resolve(true);
                };
                this._callbackCancel = () => {
                    resolve(false);
                };

                // TODO: ↓ときどき、この書き方が通らずthisのメソッドが呼ばれるようなフローがある。
                // TODO: ↓いずれきちんと理解する。
                // コールバックが上書きされないよう、thisでなくsuperのOpenを呼ぶ。
                super.Open(params);
            });
        }
    }

    export const Confirm: ConfirmPopup = ConfirmPopup.Instance;
}
