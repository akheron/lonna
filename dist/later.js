"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.later = void 0;
var applyscope_1 = require("./applyscope");
var _1 = require(".");
var scheduler_1 = __importDefault(require("./scheduler"));
var abstractions_1 = require("./abstractions");
function later(delay, value, scope) {
    return applyscope_1.applyScopeMaybe(new _1.EventStreamSeed("interval(" + delay + ", " + value + ")", function (observer) {
        var timeout = scheduler_1.default.scheduler.setTimeout(function () {
            observer(abstractions_1.valueEvent(value));
            observer(abstractions_1.endEvent);
        }, delay);
        return function () { return scheduler_1.default.scheduler.clearTimeout(timeout); };
    }), scope);
}
exports.later = later;
//# sourceMappingURL=later.js.map