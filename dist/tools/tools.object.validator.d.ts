/**
 * @class
 * Settings object validator
 *
 * @property {boolean} throwOnError         - Throw exeption on validation error
 * @property {boolean} recursive            - Check types nested objects also
 * @property {boolean} replaceIfMissed      - Replace value by default if missed on target object
 * @property {boolean} replaceIfWrongType   - Replace value by default if target object value has wrong type
 */
export declare class ObjectValidateParameters {
    throwOnError: boolean;
    recursive: boolean;
    replaceIfMissed: boolean;
    replaceIfWrongType: boolean;
    constructor({ throwOnError, recursive, replaceIfMissed, replaceIfWrongType, }: {
        throwOnError?: boolean;
        recursive?: boolean;
        replaceIfMissed?: boolean;
        replaceIfWrongType?: boolean;
    });
}
export default function objectValidate(obj: any, defaults: any, params?: ObjectValidateParameters): any;
