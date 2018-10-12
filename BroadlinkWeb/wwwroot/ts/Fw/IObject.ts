﻿/// <reference path="../../lib/jquery/index.d.ts" />
/// <reference path="../../lib/underscore/index.d.ts" />

namespace Fw {
    export interface IObject {
        readonly Elem: JQuery;
        readonly ClassName: string;

        AddEventListener(name: string, handler: (e: JQueryEventObject) => void, bindObject?: IObject): void;
        RemoveEventListener(name: string, handler: (e: JQueryEventObject) => void): void;
        DispatchEvent(name: string): void;
        SuppressEvent(name: string): void;
        IsSuppressedEvent(name: string): boolean;
        ResumeEvent(name: string): void;

        Dispose(): void;
    }
}