"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatcher = void 0;
var abstractions_1 = require("./abstractions");
var util_1 = require("./util");
var meta = "__meta";
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this._observers = {};
        this._count = 0;
        this._ended = false;
    }
    Dispatcher.prototype.dispatch = function (key, value) {
        var e_1, _a;
        // TODO: observers may be mutated while in this loop!
        if (this._observers[key])
            try {
                for (var _b = __values(this._observers[key]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var s = _c.value;
                    s(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        if (abstractions_1.isEnd(value)) {
            this._ended = true;
        }
    };
    Dispatcher.prototype.on = function (key, observer) {
        var _this = this;
        var _a;
        if (!this._observers[key])
            this._observers[key] = [];
        if ((_a = this._observers[key]) === null || _a === void 0 ? void 0 : _a.includes(observer)) {
            console.warn("Already subscribed");
        }
        if (this._ended) {
            observer(abstractions_1.endEvent);
            return util_1.nop;
        }
        else {
            this._observers[key].push(observer);
            if (key !== meta) {
                this._count++;
                if (this._count == 1) {
                    this.dispatch(meta, 1);
                }
            }
            return function () { return _this.off(key, observer); };
        }
    };
    Dispatcher.prototype.off = function (key, observer) {
        var _a;
        if (!this._observers[key])
            return;
        var index = this._observers[key].indexOf(observer);
        if (index >= 0) {
            this._observers[key].splice(index, 1);
            if (((_a = this._observers.key) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                delete this._observers[key];
            }
            if (key !== meta) {
                this._count--;
                if (this._count == 0) {
                    this.dispatch(meta, 0);
                }
            }
        }
    };
    Dispatcher.prototype.onObserverCount = function (subscriber) {
        return this.on(meta, subscriber);
    };
    Dispatcher.prototype.hasObservers = function () {
        return this._count > 0;
    };
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map