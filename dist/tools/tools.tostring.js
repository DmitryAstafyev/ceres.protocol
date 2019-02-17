"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function enumToString(name, instance) {
    let results = `enum ${name} {\n`;
    results += Object.keys(instance).map((key) => {
        return `\t${key} = ${(typeof instance[key] === 'string' ? `"${instance[key]}"` : instance[key])}`;
    }).join(',\n');
    return `${results}\n}`;
}
exports.enumToString = enumToString;
function objectToString(declaretion, name, instance) {
    function objToStr(obj, level = 1) {
        let result = '';
        result += Object.keys(obj).map((key) => {
            return `${'\t'.repeat(level)}${key}: ${(typeof obj[key] === 'object' ? `{\n${objToStr(obj[key], level + 1)}\n${'\t'.repeat(level)}}` : (typeof obj[key] === 'string' ? `"${obj[key]}"` : obj[key]))}`;
        }).join(',\n');
        return result;
    }
    let results = `${declaretion} ${name} = {\n`;
    results += objToStr(instance);
    return `${results}\n}`;
}
exports.objectToString = objectToString;
//# sourceMappingURL=tools.tostring.js.map