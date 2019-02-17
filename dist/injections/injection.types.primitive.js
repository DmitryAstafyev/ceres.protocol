"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveTypes = {
    uint8: {
        binaryType: 'uint8',
        init: '0',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            if (value < 0) {
                return false;
            }
            return true;
        },
    },
    uint16: {
        binaryType: 'uint16',
        init: '0',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            if (value < 0) {
                return false;
            }
            return true;
        },
    },
    uint32: {
        binaryType: 'uint32',
        init: '0',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            if (value < 0) {
                return false;
            }
            return true;
        },
    },
    int8: {
        binaryType: 'int8',
        init: '-1',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            return true;
        },
    },
    int16: {
        binaryType: 'int16',
        init: '-1',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            return true;
        },
    },
    int32: {
        binaryType: 'int32',
        init: '-1',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            return true;
        },
    },
    float32: {
        binaryType: 'float32',
        init: '-1',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            return true;
        },
    },
    float64: {
        binaryType: 'float64',
        init: '-1',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            return true;
        },
    },
    asciiString: {
        binaryType: 'asciiString',
        init: '""',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'string',
        validate: (value) => {
            if (typeof value !== 'string') {
                return false;
            }
            return true;
        },
    },
    utf8String: {
        binaryType: 'utf8String',
        init: '""',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'string',
        validate: (value) => {
            if (typeof value !== 'string') {
                return false;
            }
            return true;
        },
    },
    string: {
        binaryType: 'utf8String',
        init: '""',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'string',
        validate: (value) => {
            if (typeof value !== 'string') {
                return false;
            }
            return true;
        },
    },
    integer: {
        binaryType: 'int32',
        init: '-1',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            return true;
        },
    },
    float: {
        binaryType: 'float64',
        init: '-1',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'number',
        validate: (value) => {
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            return true;
        },
    },
    boolean: {
        binaryType: 'boolean',
        init: 'false',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'boolean',
        validate: (value) => {
            if (typeof value !== 'boolean') {
                return false;
            }
            return true;
        },
    },
    datetime: {
        binaryType: 'float64',
        init: 'new Date()',
        parse: (value) => {
            return new Date(value);
        },
        serialize: (value) => value.getTime(),
        tsType: 'Date',
        validate: (value) => {
            if (value instanceof Date) {
                return true;
            }
            if (typeof value !== 'number') {
                return false;
            }
            if (isNaN(value)) {
                return false;
            }
            if (!Number.isInteger(value)) {
                return false;
            }
            const date = new Date(value);
            if (!(date instanceof Date)) {
                return false;
            }
            if (date.toString().toLowerCase().indexOf('invalid date') !== -1) {
                return false;
            }
            return !isNaN(date.getTime());
        },
    },
    guid: {
        binaryType: 'asciiString',
        implementation: function guid() {
            const lengths = [4, 4, 4, 8];
            let resultGuid = '';
            for (let i = lengths.length - 1; i >= 0; i -= 1) {
                resultGuid += (Math.round(Math.random() * Math.random() * Math.pow(10, lengths[i] * 2))
                    .toString(16)
                    .substr(0, lengths[i])
                    .toUpperCase() + '-');
            }
            resultGuid += ((new Date()).getTime() * (Math.random() * 100))
                .toString(16)
                .substr(0, 12)
                .toUpperCase();
            return resultGuid;
        },
        init: 'guid()',
        parse: (value) => value,
        serialize: (value) => value,
        tsType: 'string',
        validate: (value) => {
            return typeof value === 'string' ? (value.trim() !== '' ? true : false) : false;
        },
    },
};
//# sourceMappingURL=injection.types.primitive.js.map