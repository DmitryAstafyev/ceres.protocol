"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_primitivetypes_1 = require("./tools.primitivetypes");
const DEFAULT_MAX_DEEP = 4;
function renderPrimitive(type, value) {
    return `<${type}>: ${value}`;
}
function inspect(smth, maxDeep = DEFAULT_MAX_DEEP, deep = 0) {
    try {
        const type = tools_primitivetypes_1.getTypeOf(smth);
        maxDeep <= 0 && (maxDeep = DEFAULT_MAX_DEEP);
        if (deep >= maxDeep) {
            return `maximum deep reached (${maxDeep})`;
        }
        if ([tools_primitivetypes_1.ETypes.number, tools_primitivetypes_1.ETypes.boolean].indexOf(type) !== -1) {
            return renderPrimitive(type, smth);
        }
        else if (type === tools_primitivetypes_1.ETypes.string) {
            return renderPrimitive(type, `"${smth}"`);
        }
        else if (type === tools_primitivetypes_1.ETypes.array) {
            const items = smth.map((smthNested, i) => {
                return `${i}: ${inspect(smthNested, maxDeep, (deep + 1))}`;
            });
            return `${type}[${smth.length}]: [${items.join(',')}]`;
        }
        else if (type === tools_primitivetypes_1.ETypes.null) {
            return renderPrimitive(type, 'null');
        }
        else if (type === tools_primitivetypes_1.ETypes.function) {
            return `${type}: ${smth.constructor.name}`;
        }
        else if (type === tools_primitivetypes_1.ETypes.undefined) {
            return tools_primitivetypes_1.ETypes.undefined;
        }
        else if (tools_primitivetypes_1.getTypeOf(smth.map) === tools_primitivetypes_1.ETypes.function) {
            const items = smth.map((smthNested, i) => {
                return `${i}: ${inspect(smthNested, maxDeep, (deep + 1))}`;
            });
            return `${type}: [${items.join(',')}]`;
        }
        else if (type === tools_primitivetypes_1.ETypes.Error && tools_primitivetypes_1.getTypeOf(smth.message) === tools_primitivetypes_1.ETypes.string) {
            return `${type}: {${smth.message}}`;
        }
        else if (type === tools_primitivetypes_1.ETypes.object || typeof smth === 'object') {
            const properties = [];
            Object.keys(smth).forEach((prop) => {
                properties.push(`${prop}: ${inspect(smth[prop], maxDeep, (deep + 1))}`);
            });
            return `${type}: {${properties.join(',')}}`;
        }
        else if (tools_primitivetypes_1.getTypeOf(smth.toString) === tools_primitivetypes_1.ETypes.function) {
            return `${type}: ${smth.toString()}`;
        }
        else {
            return `${type}`;
        }
    }
    catch (e) {
        return `Error during detection of type (${(typeof smth)}): ${e.message}.`;
    }
}
exports.default = inspect;
//# sourceMappingURL=tools.inspect.js.map