"use strict";
/**
 * @class
 * Settings object validator
 *
 * @property {boolean} throwOnError         - Throw exeption on validation error
 * @property {boolean} recursive            - Check types nested objects also
 * @property {boolean} replaceIfMissed      - Replace value by default if missed on target object
 * @property {boolean} replaceIfWrongType   - Replace value by default if target object value has wrong type
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectValidateParameters {
    constructor({ throwOnError = true, recursive = true, replaceIfMissed = true, replaceIfWrongType = true, }) {
        this.throwOnError = throwOnError;
        this.recursive = recursive;
        this.replaceIfMissed = replaceIfMissed;
        this.replaceIfWrongType = replaceIfWrongType;
    }
}
exports.ObjectValidateParameters = ObjectValidateParameters;
function objectValidate(obj, defaults, params) {
    const parameters = params instanceof ObjectValidateParameters ? params : (new ObjectValidateParameters({}));
    let error = null;
    if (typeof obj !== 'object' || obj === null) {
        error = new Error('Property [obj] expected to be [object].');
        if (parameters.throwOnError) {
            throw error;
        }
        return error;
    }
    if (typeof defaults !== 'object' || defaults === null) {
        error = new Error('Property [defaults] expected to be [object].');
        if (parameters.throwOnError) {
            throw error;
        }
        return error;
    }
    const objectValidator = (nestedObj, nestedDefaults) => {
        Object.keys(nestedDefaults).forEach((key) => {
            if (error !== null) {
                return false;
            }
            if (nestedObj[key] === void 0) {
                if (parameters.replaceIfMissed) {
                    nestedObj[key] = nestedDefaults[key];
                }
                else {
                    error = new Error(`key [${key}] isn't found in target object.`);
                }
            }
            else if (nestedObj[key] !== void 0 && typeof nestedDefaults[key] !== 'undefined' && typeof nestedDefaults[key] !== typeof nestedObj[key]) {
                if (parameters.replaceIfWrongType) {
                    nestedObj[key] = nestedDefaults[key];
                }
                else {
                    error = new Error(`key [${key}] has type <${(typeof nestedObj[key])}>, but expected: <${(typeof nestedDefaults[key])}>.`);
                }
            }
            else if (nestedDefaults[key] === null) {
                // Nothing to do
            }
            else if (nestedDefaults[key] instanceof Array) {
                arrayValidator(nestedObj[key], nestedDefaults[key], key);
            }
            else if (typeof nestedDefaults[key] === 'object') {
                objectValidator(nestedObj[key], nestedDefaults[key]);
            }
        });
    };
    const arrayValidator = (nestedObj, nestedDefaults, key) => {
        // Expecting that defaults[key][0] is a pattern of items in an array
        if (nestedDefaults.length !== 0) {
            error = new Error(`key [${key}] should have only one item, which is a pattern for validation target array in object.`);
            return false;
        }
        const itemPattern = nestedDefaults[0];
        nestedObj.forEach((item, index) => {
            if (typeof item !== typeof itemPattern) {
                if (parameters.replaceIfWrongType) {
                    nestedObj[index] = itemPattern;
                }
                else {
                    error = new Error(`key [${key}], array item #${index} has not expected type <${(typeof item)}>, but expected <${(typeof itemPattern)}>.`);
                }
            }
            else if (itemPattern instanceof Array) {
                arrayValidator(item, itemPattern, key);
            }
            else if (typeof itemPattern === 'object' && itemPattern !== null) {
                objectValidate(item, itemPattern);
            }
        });
    };
    objectValidator(obj, defaults);
    if (error !== null && parameters.throwOnError) {
        throw error;
    }
    return error !== null ? error : obj;
}
exports.default = objectValidate;
//# sourceMappingURL=tools.object.validator.js.map