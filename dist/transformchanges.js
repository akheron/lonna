"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformChanges = void 0;
var abstractions_1 = require("./abstractions");
var applyscope_1 = require("./applyscope");
var changes_1 = require("./changes");
var util_1 = require("./util");
function transformChanges(desc, x, transformer, scope) {
    if (x instanceof abstractions_1.EventStream || x instanceof abstractions_1.EventStreamSeed) {
        return util_1.rename(desc, transformer(x)); // Note: stream passed as seed, seems to work...
    }
    else if (x instanceof abstractions_1.Atom || x instanceof abstractions_1.AtomSeed) {
        var source_1 = x instanceof abstractions_1.Property ? x : x.consume();
        return applyscope_1.applyScopeMaybe(new abstractions_1.AtomSeed(desc, function () { return source_1.get(); }, function (observer) {
            return transformer(changes_1.changes(source_1)).subscribe(observer);
        }, source_1.set));
    }
    else if (x instanceof abstractions_1.Property || x instanceof abstractions_1.PropertySeed) {
        var source_2 = x instanceof abstractions_1.Property ? x : x.consume();
        return applyscope_1.applyScopeMaybe(new abstractions_1.PropertySeed(desc, function () { return source_2.get(); }, function (observer) {
            return transformer(changes_1.changes(source_2)).subscribe(observer);
        }));
    }
    else {
        throw Error("Unknown observable " + x);
    }
}
exports.transformChanges = transformChanges;
//# sourceMappingURL=transformchanges.js.map