"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ETypes;
(function (ETypes) {
    // Primitive
    ETypes["string"] = "string";
    ETypes["number"] = "number";
    ETypes["function"] = "function";
    ETypes["array"] = "array";
    ETypes["object"] = "object";
    ETypes["boolean"] = "boolean";
    ETypes["undefined"] = "undefined";
    ETypes["null"] = "null";
    // Classes
    ETypes["Error"] = "Error";
    ETypes["Date"] = "Date";
})(ETypes = exports.ETypes || (exports.ETypes = {}));
function getTypeOf(smth) {
    if (typeof smth === ETypes.undefined) {
        return ETypes.undefined;
    }
    else if (smth === null) {
        return ETypes.null;
    }
    else if (smth.constructor !== void 0 && typeof smth.constructor.name === ETypes.string) {
        return ETypes[smth.constructor.name.toLowerCase()] !== void 0 ? smth.constructor.name.toLowerCase() : smth.constructor.name;
    }
    else {
        return (typeof smth);
    }
}
exports.getTypeOf = getTypeOf;
//# sourceMappingURL=tools.primitivetypes.js.map