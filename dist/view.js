"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = void 0;
var abstractions_1 = require("./abstractions");
var atom_1 = require("./atom");
var L = __importStar(require("./lens"));
var map_1 = require("./map");
var util_1 = require("./util");
var combine_1 = require("./combine");
function view() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args[1] instanceof abstractions_1.Property || args[1] instanceof Function) {
        // properties + function
        var properties = args.slice(0, args.length - 1);
        var fn = args[args.length - 1];
        if (!(fn instanceof Function)) {
            throw Error("Expecting n properties + function");
        }
        return combine_1.combine(properties, fn);
    }
    else {
        // property/atom + lens
        var atom = args[0];
        var view_1 = args[1];
        var lens = mkView(view_1);
        var desc = atom + ".view(" + util_1.toString(view_1) + ")";
        if (atom instanceof abstractions_1.Atom) {
            return new atom_1.LensedAtom(desc, atom.consume(), lens);
        }
        else {
            return util_1.rename(desc, map_1.map(lens.get)(atom));
        }
    }
}
exports.view = view;
function mkView(view) {
    if (typeof view === "string") {
        return L.prop(view);
    }
    else if (typeof view === "number") {
        return L.item(view);
    }
    else {
        return view;
    }
}
//# sourceMappingURL=view.js.map