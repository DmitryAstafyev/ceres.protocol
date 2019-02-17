"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedTypes = {
    email: {
        // Binary type or primitive type
        binaryType: 'asciiString',
        // Initialization value. This value is used as default value
        init: '""',
        // Parse value. We should not do any extra decode operations with it
        parse: (value) => { return value; },
        // Also we should not do any encoding operations with it
        serialize: (value) => { return value; },
        // Typescript type
        tsType: 'string',
        // Validation function to valid value
        validate: (value) => {
            if (typeof value !== 'string') {
                return false;
            }
            if (value.trim() === '') {
                // Initialization value is "''", so we allow use empty string.
                return true;
            }
            const validationRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
            return validationRegExp.test(value);
        },
    }
};
//# sourceMappingURL=advanced.types.js.map