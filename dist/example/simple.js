"use strict";
/* tslint:disable */
/*
* This file generated automaticaly (Sat Feb 16 2019 17:37:27 GMT+0100 (CET))
* Do not remove or change this code.
* Protocol version: 0.0.1
*/
Object.defineProperty(exports, "__esModule", { value: true });
var Protocol;
(function (Protocol) {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * Injection: map of types
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    Protocol.KeysMapLeft = {
        "70D1C8A2": {
            clientId: "a",
            guid: "b",
            message: "c",
            created: "d",
        },
    };
    Protocol.KeysMapRight = {
        "70D1C8A2": {
            a: "clientId",
            b: "guid",
            c: "message",
            d: "created",
        },
    };
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * Injection: typed map
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    Protocol.TypedEntitiesMap = {
        "70D1C8A2": {
            a: "string",
            b: "guid",
            c: "string",
            d: "datetime",
        },
    };
    Protocol.AdvancedTypes = {};
    Protocol.PrimitiveTypes = {
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
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * Injection: injection.packager.ts
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // tslint:disable:no-namespace
    // tslint:disable:max-classes-per-file
    // tslint:disable:object-literal-sort-keys
    // declare var Json: any;
    let Packager;
    (function (Packager) {
        function join(...items) {
            if (items instanceof Array && items.length === 1 && items[0] instanceof Array) {
                items = items[0];
            }
            if (!(items instanceof Array) || items.length === 0) {
                return new Error(`No arguments provided to join`);
            }
            const strs = [];
            const bytes = [];
            let isBinary;
            try {
                items.forEach((item, i) => {
                    if (item instanceof Uint8Array && (isBinary === undefined || isBinary === true)) {
                        isBinary = true;
                        if (i === 0) {
                            // Set type as array
                            bytes.push(Json.Scheme.Types.array);
                        }
                        // Set length of item
                        bytes.push(...Json.Impls.Uint32.toUint8(item.length));
                        // Put item
                        bytes.push(...item);
                    }
                    else if (typeof item === 'string' && (isBinary === undefined || isBinary === false)) {
                        isBinary = false;
                        strs.push(item);
                    }
                    else {
                        throw new Error(`Only strings or Uint8Array can be joined. Each array item should be same type.`);
                    }
                });
                if (isBinary) {
                    return new Uint8Array(bytes);
                }
            }
            catch (error) {
                return error;
            }
            return JSON.stringify(strs);
        }
        Packager.join = join;
        function split(source) {
            if (!isPackage(source)) {
                return new Error(`Source isn't a package of protocol data.`);
            }
            if (source instanceof ArrayBuffer) {
                source = new Uint8Array(source);
            }
            if (source instanceof Uint8Array) {
                let buffer = source.slice(1, source.length);
                const items = [];
                do {
                    const itemLength = Json.Impls.Uint32.fromUint8(buffer.slice(0, 4));
                    items.push(buffer.slice(4, 4 + itemLength));
                    buffer = buffer.slice(4 + itemLength, buffer.length);
                } while (buffer.length > 0);
                return items;
            }
            else {
                return JSON.parse(source);
            }
        }
        Packager.split = split;
        function isPackage(source) {
            if (source instanceof Uint8Array) {
                return source[0] === Json.Scheme.Types.array;
            }
            else if (source instanceof ArrayBuffer) {
                const uint8array = new Uint8Array(source);
                return uint8array.length > 0 ? (uint8array[0] === Json.Scheme.Types.array) : false;
            }
            else if (typeof source === 'string') {
                try {
                    return JSON.parse(source) instanceof Array;
                }
                catch (error) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        Packager.isPackage = isPackage;
    })(Packager = Protocol.Packager || (Protocol.Packager = {}));
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * Injection: injection.convertor.ts
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // tslint:disable:no-namespace
    // tslint:disable:max-classes-per-file
    // tslint:disable:no-bitwise
    // tslint:disable:object-literal-sort-keys
    let Json;
    (function (Json) {
        let Impls;
        (function (Impls) {
            class Boolean {
                static toUint8(value) {
                    return new Uint8Array((new Uint8Array([value ? 1 : 0])).buffer);
                }
                static fromUint8(bytes) {
                    const int8 = new Uint8Array((new Uint8Array(bytes)).buffer);
                    return int8[0] === 1;
                }
                static validate(value) {
                    if (typeof value !== 'boolean') {
                        return new Error(`Invalid basic type: ${typeof value}. Expected type: boolean.`);
                    }
                    return undefined;
                }
            }
            Impls.Boolean = Boolean;
            class Float32 {
                static toUint8(int) {
                    return new Uint8Array((new Float32Array([int])).buffer);
                }
                static fromUint8(bytes) {
                    const float32 = new Float32Array((new Uint8Array(bytes)).buffer);
                    return float32[0];
                }
                static validate(value) {
                    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
                        return new Error(`Invalid basic type: ${typeof value}. Expected type: number.`);
                    }
                    let generated = this.fromUint8(this.toUint8(value));
                    if (generated !== value) {
                        const valueAsStr = value.toString();
                        const decimalPos = valueAsStr.indexOf('.');
                        if (decimalPos === -1) {
                            generated = Math.round(generated);
                        }
                        else {
                            const decimal = valueAsStr.substr(decimalPos + 1, valueAsStr.length).length;
                            generated = parseFloat(generated.toFixed(decimal));
                        }
                    }
                    return generated === value ? undefined : new Error(`Values dismatch. Original value: ${value}. Encoded & decoded value: ${generated}`);
                }
            }
            Impls.Float32 = Float32;
            class Float64 {
                static toUint8(int) {
                    return new Uint8Array((new Float64Array([int])).buffer);
                }
                static fromUint8(bytes) {
                    const float64 = new Float64Array((new Uint8Array(bytes)).buffer);
                    return float64[0];
                }
                static validate(value) {
                    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
                        return new Error(`Invalid basic type: ${typeof value}. Expected type: number.`);
                    }
                    let generated = this.fromUint8(this.toUint8(value));
                    if (generated !== value) {
                        const valueAsStr = value.toString();
                        const decimalPos = valueAsStr.indexOf('.');
                        if (decimalPos === -1) {
                            generated = Math.round(generated);
                        }
                        else {
                            const decimal = valueAsStr.substr(decimalPos + 1, valueAsStr.length).length;
                            generated = parseFloat(generated.toFixed(decimal));
                        }
                    }
                    return generated === value ? undefined : new Error(`Values dismatch. Original value: ${value}. Encoded & decoded value: ${generated}`);
                }
            }
            Impls.Float64 = Float64;
            class Int8 {
                static toUint8(int) {
                    return new Uint8Array((new Int8Array([int])).buffer);
                }
                static fromUint8(bytes) {
                    const int8 = new Int8Array((new Uint8Array(bytes)).buffer);
                    return int8[0];
                }
                static validate(value) {
                    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
                        return new Error(`Invalid basic type: ${typeof value}. Expected type: number.`);
                    }
                    const generated = this.fromUint8(this.toUint8(value));
                    return generated === value ? undefined : new Error(`Values dismatch. Original value: ${value}. Encoded & decoded value: ${generated}`);
                }
            }
            Impls.Int8 = Int8;
            class Int16 {
                static toUint8(int) {
                    return new Uint8Array((new Int16Array([int])).buffer);
                }
                static fromUint8(bytes) {
                    const int16 = new Int16Array((new Uint8Array(bytes)).buffer);
                    return int16[0];
                }
                static validate(value) {
                    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
                        return new Error(`Invalid basic type: ${typeof value}. Expected type: number.`);
                    }
                    const generated = this.fromUint8(this.toUint8(value));
                    return generated === value ? undefined : new Error(`Values dismatch. Original value: ${value}. Encoded & decoded value: ${generated}`);
                }
            }
            Impls.Int16 = Int16;
            class Int32 {
                static toUint8(int) {
                    return new Uint8Array((new Int32Array([int])).buffer);
                }
                static fromUint8(bytes) {
                    const int32 = new Int32Array((new Uint8Array(bytes)).buffer);
                    return int32[0];
                }
                static validate(value) {
                    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
                        return new Error(`Invalid basic type: ${typeof value}. Expected type: number.`);
                    }
                    const generated = this.fromUint8(this.toUint8(value));
                    return generated === value ? undefined : new Error(`Values dismatch. Original value: ${value}. Encoded & decoded value: ${generated}`);
                }
            }
            Impls.Int32 = Int32;
            class Uint8 {
                static fromAsciiStr(str) {
                    const result = new Uint8Array(str.length);
                    Array.prototype.forEach.call(str, (char, i) => {
                        result[i] = char.charCodeAt(0);
                    });
                    return result;
                }
                static toAsciiStr(data) {
                    let result = '';
                    data.map((code) => {
                        result += String.fromCharCode(code);
                        return code;
                    });
                    return result;
                }
                static fromUtf8Str(str) {
                    // Source of method implementation: https://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
                    const utf8 = [];
                    for (let i = 0; i < str.length; i++) {
                        let charcode = str.charCodeAt(i);
                        if (charcode < 0x80) {
                            utf8.push(charcode);
                        }
                        else if (charcode < 0x800) {
                            utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
                        }
                        else if (charcode < 0xd800 || charcode >= 0xe000) {
                            utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
                        }
                        else {
                            i++;
                            // UTF-16 encodes 0x10000-0x10FFFF by
                            // subtracting 0x10000 and splitting the
                            // 20 bits of 0x0-0xFFFFF into two halves
                            charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                                | (str.charCodeAt(i) & 0x3ff));
                            utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
                        }
                    }
                    return new Uint8Array(utf8);
                }
                static toUtf8Str(bytes) {
                    // Source of method implementation: https://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
                    let out = "";
                    let i = 0;
                    const len = bytes.length;
                    while (i < len) {
                        let char2;
                        let char3;
                        const c = bytes[i++];
                        switch (c >> 4) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                                // 0xxxxxxx
                                out += String.fromCharCode(c);
                                break;
                            case 12:
                            case 13:
                                // 110x xxxx   10xx xxxx
                                char2 = bytes[i++];
                                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                                break;
                            case 14:
                                // 1110 xxxx  10xx xxxx  10xx xxxx
                                char2 = bytes[i++];
                                char3 = bytes[i++];
                                out += String.fromCharCode(((c & 0x0F) << 12) |
                                    ((char2 & 0x3F) << 6) |
                                    ((char3 & 0x3F) << 0));
                                break;
                        }
                    }
                    return out;
                }
                static toUint8(int) {
                    return new Uint8Array((new Uint8Array([int])).buffer);
                }
                static fromUint8(bytes) {
                    const int8 = new Uint8Array((new Uint8Array(bytes)).buffer);
                    return int8[0];
                }
                static validate(value) {
                    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
                        return new Error(`Invalid basic type: ${typeof value}. Expected type: number.`);
                    }
                    const generated = this.fromUint8(this.toUint8(value));
                    return generated === value ? undefined : new Error(`Values dismatch. Original value: ${value}. Encoded & decoded value: ${generated}`);
                }
            }
            Impls.Uint8 = Uint8;
            class Uint16 {
                static toUint8(int) {
                    return new Uint8Array((new Uint16Array([int])).buffer);
                }
                static fromUint8(bytes) {
                    const int16 = new Uint16Array((new Uint8Array(bytes)).buffer);
                    return int16[0];
                }
                static validate(value) {
                    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
                        return new Error(`Invalid basic type: ${typeof value}. Expected type: number.`);
                    }
                    const generated = this.fromUint8(this.toUint8(value));
                    return generated === value ? undefined : new Error(`Values dismatch. Original value: ${value}. Encoded & decoded value: ${generated}`);
                }
            }
            Impls.Uint16 = Uint16;
            class Uint32 {
                static toUint8(int) {
                    return new Uint8Array((new Uint32Array([int])).buffer);
                }
                static fromUint8(bytes) {
                    const int32 = new Uint32Array((new Uint8Array(bytes)).buffer);
                    return int32[0];
                }
                static validate(value) {
                    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
                        return new Error(`Invalid basic type: ${typeof value}. Expected type: number.`);
                    }
                    const generated = this.fromUint8(this.toUint8(value));
                    return generated === value ? undefined : new Error(`Values dismatch. Original value: ${value}. Encoded & decoded value: ${generated}`);
                }
            }
            Impls.Uint32 = Uint32;
        })(Impls = Json.Impls || (Json.Impls = {}));
        let Scheme;
        (function (Scheme) {
            Scheme.Types = {
                // Primitive types
                int8: 0,
                int16: 1,
                int32: 2,
                uint8: 3,
                uint16: 4,
                uint32: 5,
                float32: 6,
                float64: 7,
                boolean: 8,
                asciiString: 9,
                utf8String: 10,
                // Complex types
                object: 100,
                array: 101,
            };
            Scheme.TypesNames = {
                [Scheme.Types.int8]: 'int8',
                [Scheme.Types.int16]: 'int16',
                [Scheme.Types.int32]: 'int32',
                [Scheme.Types.uint8]: 'uint8',
                [Scheme.Types.uint16]: 'uint16',
                [Scheme.Types.uint32]: 'uint32',
                [Scheme.Types.float32]: 'float32',
                [Scheme.Types.float64]: 'float64',
                [Scheme.Types.boolean]: 'boolean',
                [Scheme.Types.asciiString]: 'asciiString',
                [Scheme.Types.utf8String]: 'utf8String',
                [Scheme.Types.object]: 'object',
            };
            Scheme.TypesSizes = {
                [Scheme.Types.int8]: 1,
                [Scheme.Types.int16]: 2,
                [Scheme.Types.int32]: 4,
                [Scheme.Types.uint8]: 1,
                [Scheme.Types.uint16]: 2,
                [Scheme.Types.uint32]: 4,
                [Scheme.Types.float32]: 4,
                [Scheme.Types.float64]: 8,
                [Scheme.Types.boolean]: 1,
            };
            Scheme.TypesProviders = {
                [Scheme.Types.int8]: Impls.Int8,
                [Scheme.Types.int16]: Impls.Int16,
                [Scheme.Types.int32]: Impls.Int32,
                [Scheme.Types.uint8]: Impls.Uint8,
                [Scheme.Types.uint16]: Impls.Uint16,
                [Scheme.Types.uint32]: Impls.Uint32,
                [Scheme.Types.float32]: Impls.Float32,
                [Scheme.Types.float64]: Impls.Float64,
                [Scheme.Types.boolean]: Impls.Boolean,
            };
            Scheme.LengthConvertor = {
                object: Impls.Uint32.toUint8,
                [Scheme.Types.asciiString]: Impls.Uint32.toUint8,
                [Scheme.Types.utf8String]: Impls.Uint32.toUint8,
            };
            Scheme.SizeDeclaration = {
                [Scheme.Types.asciiString]: true,
                [Scheme.Types.utf8String]: true,
            };
        })(Scheme = Json.Scheme || (Json.Scheme = {}));
        const MAX_INTERACTIONS_COUNT = 1000;
        class Convertor {
            static encode(target, scheme, validation = true) {
                const paket = [];
                Object.keys(target).forEach((key) => {
                    const type = this._getPrimitiveType(scheme[key]);
                    const value = target[key];
                    const propName = Impls.Uint8.fromAsciiStr(key);
                    if (type === null || type === undefined) {
                        throw new Error(`Incorrect type provided in scheme: ${typeof type}; key: ${key}.`);
                    }
                    if (value === undefined) {
                        return;
                    }
                    if (typeof type !== 'object' && !(type instanceof Array)) {
                        // Primitives
                        const propValue = this._encodePrimitive(value, type, validation);
                        if (propValue instanceof Error) {
                            throw new Error(`Fail to encode property "${key}" due error: ${propValue.message}.`);
                        }
                        // Save data
                        const data = [];
                        data.push(propName.length);
                        data.push(...propName);
                        data.push(type);
                        if (Scheme.SizeDeclaration[type]) {
                            data.push(...Scheme.LengthConvertor[type](propValue.length));
                        }
                        data.push(...propValue);
                        paket.push(...data);
                    }
                    else if (type instanceof Array) {
                        if (type.length !== 1) {
                            throw new Error(`Array declaration should have one (only) type definition. Property: ${propName}.`);
                        }
                        if (!(value instanceof Array)) {
                            throw new Error(`Type of value isn't an array. Property: ${propName}.`);
                        }
                        // We have an array
                        const itemType = this._getPrimitiveType(type[0]);
                        const items = [];
                        const data = [];
                        data.push(propName.length);
                        data.push(...propName);
                        data.push(Scheme.Types.array);
                        if (this._isPrimitive(itemType)) {
                            if ([Scheme.Types.asciiString, Scheme.Types.utf8String].indexOf(itemType) !== -1) {
                                value.forEach((item, index) => {
                                    const propValue = this._encodePrimitive(item, itemType, validation);
                                    if (propValue instanceof Error) {
                                        throw new Error(`Fail to encode property "${key}" due error: ${propValue.message}. Index in array: ${index}; key: ${key}.`);
                                    }
                                    items.push(...Scheme.LengthConvertor[itemType](propValue.length));
                                    items.push(...propValue);
                                });
                            }
                            else {
                                value.forEach((item, index) => {
                                    const propValue = this._encodePrimitive(item, itemType, validation);
                                    if (propValue instanceof Error) {
                                        throw new Error(`Fail to encode property "${key}" due error: ${propValue.message}. Index in array: ${index}; key: ${key}.`);
                                    }
                                    items.push(...propValue);
                                });
                            }
                            // Save data
                            data.push(itemType);
                        }
                        else if (typeof itemType === 'object' && itemType !== null && !(itemType instanceof Array)) {
                            value.forEach((item) => {
                                const propValue = this.encode(item, itemType, validation);
                                items.push(...propValue);
                            });
                            data.push(Scheme.Types.object);
                        }
                        else {
                            throw new Error(`Incorrect declaration of array type: ${typeof itemType} / ${itemType}; key: ${key}`);
                        }
                        data.push(...Impls.Uint32.toUint8(items.length));
                        data.push(...items);
                        paket.push(...data);
                    }
                    else {
                        // Nested
                        const propValue = this.encode(target[key], scheme[key], validation);
                        paket.push(propName.length);
                        paket.push(...propName);
                        paket.push(...propValue);
                    }
                });
                // Set size
                paket.unshift(...Impls.Uint32.toUint8(paket.length));
                // Set type
                paket.unshift(Scheme.Types.object);
                // Return value
                return new Uint8Array(paket);
            }
            static decode(target, maxInteractionsCount = MAX_INTERACTIONS_COUNT) {
                const paket = {};
                const type = target[0];
                if (type !== Scheme.Types.object) {
                    throw new Error(`Expecting type to be object (type = ${Scheme.Types.object}), but type is "${type}"`);
                }
                const length = Impls.Uint32.fromUint8(target.slice(1, 5));
                let buffer = target.slice(5, 5 + length);
                let counter = 0;
                do {
                    // Get name of prop
                    const propNameLength = buffer[0];
                    const propName = Impls.Uint8.toAsciiStr(buffer.slice(1, propNameLength + 1));
                    const propType = Impls.Uint8.fromUint8(buffer.slice(propNameLength + 1, propNameLength + 2));
                    const offset = propNameLength + 1 + 1;
                    switch (propType) {
                        case Scheme.Types.object:
                            const objValueLength = Impls.Uint32.fromUint8(buffer.slice(offset, offset + 4));
                            const objValueBytes = buffer.slice(offset - 1, offset + 4 + objValueLength);
                            if (objValueLength > 0) {
                                paket[propName] = this.decode(objValueBytes);
                            }
                            else {
                                paket[propName] = {};
                            }
                            buffer = buffer.slice(offset + 4 + objValueLength, buffer.length);
                            break;
                        case Scheme.Types.array:
                            const itemType = Impls.Uint8.fromUint8(buffer.slice(offset, offset + 1));
                            const arrayLength = Impls.Uint32.fromUint8(buffer.slice(offset + 1, offset + 4 + 1));
                            let arrayBytes = buffer.slice(offset + 4 + 1, offset + 4 + 1 + arrayLength);
                            const items = [];
                            if (arrayLength > 0) {
                                if (this._isPrimitive(itemType)) {
                                    if ([Scheme.Types.asciiString, Scheme.Types.utf8String].indexOf(itemType) !== -1) {
                                        let strLength;
                                        let strValue;
                                        do {
                                            strLength = Impls.Uint32.fromUint8(arrayBytes.slice(0, 4));
                                            strValue = arrayBytes.slice(4, 4 + strLength);
                                            switch (itemType) {
                                                case Scheme.Types.asciiString:
                                                    items.push(Impls.Uint8.toAsciiStr(strValue));
                                                    break;
                                                case Scheme.Types.utf8String:
                                                    items.push(Impls.Uint8.toUtf8Str(strValue));
                                                    break;
                                            }
                                            arrayBytes = arrayBytes.slice(4 + strLength, arrayBytes.length);
                                        } while (arrayBytes.length > 0);
                                    }
                                    else {
                                        do {
                                            items.push(Scheme.TypesProviders[itemType].fromUint8(arrayBytes.slice(0, Scheme.TypesSizes[itemType])));
                                            arrayBytes = arrayBytes.slice(Scheme.TypesSizes[itemType], arrayBytes.length);
                                        } while (arrayBytes.length > 0);
                                    }
                                }
                                else if (itemType === Scheme.Types.object) {
                                    let objType;
                                    let objLength;
                                    let objBody;
                                    do {
                                        objType = Impls.Uint8.fromUint8(arrayBytes.slice(0, 1));
                                        if (objType !== Scheme.Types.object) {
                                            throw new Error(`Expecting to have as an item of array object, but found type = ${Scheme.TypesNames[objType]} / ${objType}`);
                                        }
                                        objLength = Impls.Uint32.fromUint8(arrayBytes.slice(1, 5));
                                        objBody = arrayBytes.slice(0, objLength + 5);
                                        items.push(this.decode(objBody));
                                        arrayBytes = arrayBytes.slice(5 + objLength, arrayBytes.length);
                                    } while (arrayBytes.length > 0);
                                }
                            }
                            paket[propName] = items;
                            buffer = buffer.slice(offset + 4 + 1 + arrayLength, buffer.length);
                            break;
                        case Scheme.Types.uint8:
                        case Scheme.Types.uint16:
                        case Scheme.Types.uint32:
                        case Scheme.Types.int8:
                        case Scheme.Types.int16:
                        case Scheme.Types.int32:
                        case Scheme.Types.float32:
                        case Scheme.Types.float64:
                        case Scheme.Types.boolean:
                            paket[propName] = Scheme.TypesProviders[propType].fromUint8(buffer.slice(offset, offset + Scheme.TypesSizes[propType]));
                            buffer = buffer.slice(offset + Scheme.TypesSizes[propType], buffer.length);
                            break;
                        case Scheme.Types.asciiString:
                            const asciiStringLength = Impls.Uint32.fromUint8(buffer.slice(offset, offset + 4));
                            const asciiStringBytes = buffer.slice(offset + 4, offset + 4 + asciiStringLength);
                            paket[propName] = Impls.Uint8.toAsciiStr(asciiStringBytes);
                            buffer = buffer.slice(offset + 4 + asciiStringLength, buffer.length);
                            break;
                        case Scheme.Types.utf8String:
                            const utf8StringLength = Impls.Uint32.fromUint8(buffer.slice(offset, offset + 4));
                            const utf8StringBytes = buffer.slice(offset + 4, offset + 4 + utf8StringLength);
                            paket[propName] = Impls.Uint8.toUtf8Str(utf8StringBytes);
                            buffer = buffer.slice(offset + 4 + utf8StringLength, buffer.length);
                            break;
                        default:
                            throw new Error(`Was detected unknown type of data or some errors during parsing. Found type of data: ${propType}.`);
                    }
                    counter += 1;
                    if (counter >= maxInteractionsCount) {
                        throw new Error(`Max count of interactions was done. Probably parser works with error because data isn't right.`);
                    }
                } while (buffer.length > 0);
                return paket;
            }
            static _encodePrimitive(value, type, validation) {
                const encoded = [];
                // Get value of property
                switch (type) {
                    case Scheme.Types.uint8:
                    case Scheme.Types.uint16:
                    case Scheme.Types.uint32:
                    case Scheme.Types.int8:
                    case Scheme.Types.int16:
                    case Scheme.Types.int32:
                    case Scheme.Types.float32:
                    case Scheme.Types.float64:
                    case Scheme.Types.boolean:
                        if (validation) {
                            const validationError = Scheme.TypesProviders[type].validate(value);
                            if (validationError) {
                                return new Error(`Invalid value = ${value}. Declared type is: ${Scheme.TypesNames[type]}. Checks finished with error: ${validationError.message}.`);
                            }
                        }
                        encoded.push(...Scheme.TypesProviders[type].toUint8(value));
                        break;
                    case Scheme.Types.asciiString:
                        encoded.push(...Impls.Uint8.fromAsciiStr(value));
                        break;
                    case Scheme.Types.utf8String:
                        encoded.push(...Impls.Uint8.fromUtf8Str(value));
                        break;
                }
                return encoded;
            }
            static _isPrimitive(type) {
                switch (type) {
                    case Scheme.Types.uint8:
                    case Scheme.Types.uint16:
                    case Scheme.Types.uint32:
                    case Scheme.Types.int8:
                    case Scheme.Types.int16:
                    case Scheme.Types.int32:
                    case Scheme.Types.float32:
                    case Scheme.Types.float64:
                    case Scheme.Types.boolean:
                    case Scheme.Types.asciiString:
                    case Scheme.Types.utf8String:
                        return true;
                    default:
                        return false;
                }
            }
            static _getPrimitiveType(type) {
                if (typeof type === 'number') {
                    return type;
                }
                else if (typeof type === 'string') {
                    return Scheme.Types[type];
                }
                else {
                    return type;
                }
            }
        }
        Json.Convertor = Convertor;
    })(Json = Protocol.Json || (Protocol.Json = {}));
    class ProtocolState {
        constructor() {
            this._debug = false;
        }
        debug(value) {
            this._debug = value;
        }
        isDebugged() {
            return this._debug;
        }
    }
    Protocol.ProtocolState = ProtocolState;
    Protocol.state = new ProtocolState();
    let EEntityType;
    (function (EEntityType) {
        EEntityType["root"] = "root";
        EEntityType["class"] = "class";
        EEntityType["namespace"] = "namespace";
        EEntityType["complex"] = "complex";
        EEntityType["primitive"] = "primitive";
        EEntityType["repeated"] = "repeated";
        EEntityType["reference"] = "reference";
        EEntityType["enum"] = "enum";
    })(EEntityType = Protocol.EEntityType || (Protocol.EEntityType = {}));
    Protocol.StandardTypes = [
        'int8', 'int16', 'int32',
        'uint8', 'uint16', 'uint32',
        'float32', 'float64', 'boolean',
        'asciiString', 'utf8String',
    ];
    function _getPropNameAlias(propName, signature) {
        if (Protocol.state.isDebugged() || propName === '__signature') {
            return propName;
        }
        if (Protocol.KeysMapLeft[signature] === void 0) {
            return new Error(`Fail to find keys map for ${signature}`);
        }
        if (Protocol.KeysMapLeft[signature][propName] === void 0) {
            return new Error(`Fail to find keys map for ${signature}; property "${propName}".`);
        }
        return Protocol.KeysMapLeft[signature][propName];
    }
    Protocol._getPropNameAlias = _getPropNameAlias;
    function _getPropName(alias, signature) {
        if (Protocol.state.isDebugged() || alias === '__signature') {
            return alias;
        }
        if (Protocol.KeysMapRight[signature] === void 0) {
            return new Error(`Fail to find keys map for ${signature}`);
        }
        if (Protocol.KeysMapRight[signature][alias] === void 0) {
            return new Error(`Fail to find keys map for ${signature}; property alias "${alias}".`);
        }
        return Protocol.KeysMapRight[signature][alias];
    }
    Protocol._getPropName = _getPropName;
    function _parse(source, target) {
        const types = getTypes();
        const json = getJSONFromIncomeData(source);
        if (json instanceof Error) {
            return [json];
        }
        if (typeof json.__signature !== 'string' || json.__signature.trim() === '') {
            return [new Error(`Cannot find signature of entity.`)];
        }
        if (Protocol.ReferencesMap[json.__signature] === void 0) {
            return [new Error(`Entity with signature "${json.__signature}" doesn't exist in this protocol implementation. Check protocol name or protocol version.`)];
        }
        const classRef = Protocol.ReferencesMap[json.__signature];
        if (target !== undefined) {
            if (classRef.getSignature() !== target.getSignature()) {
                return [new Error(`Target reference doesn't match with entity in json.`)];
            }
        }
        // Get description of entity
        const description = classRef.getDescription();
        // Parsing properties
        const errors = [];
        Object.keys(json).forEach((alias) => {
            const prop = _getPropName(alias, json.__signature);
            if (prop instanceof Error) {
                errors.push(new Error(`Cannot get property name by alias "${alias}" due error: ${prop.message}.`));
                return;
            }
            if (prop === alias) {
                return;
            }
            json[prop] = json[alias];
            delete json[alias];
        });
        if (errors.length > 0) {
            return errors;
        }
        Object.keys(description).forEach((prop) => {
            const desc = description[prop];
            if (desc.optional && json[prop] === void 0) {
                return;
            }
            switch (desc.type) {
                case EEntityType.repeated:
                    if (!(json[prop] instanceof Array)) {
                        errors.push(new Error(`Property "${prop}" has wrong format. Expected an array (repeated).`));
                        break;
                    }
                    if (typeof desc.value === 'string') {
                        json[prop] = json[prop].map((value) => {
                            const nestedType = types[desc.value];
                            if (!nestedType.validate(value)) {
                                errors.push(new Error(`Property "${prop}" has wrong format.`));
                                return undefined;
                            }
                            return nestedType.parse(value);
                        });
                    }
                    else if (typeof desc.value === 'function') {
                        // It's reference to class
                        const parsed = json[prop].map((value) => {
                            const nested = _parse(value, desc.value);
                            if (nested instanceof Array) {
                                errors.push(new Error(`Cannot get instance of class "${desc.value.name}" from property "${prop}" due error: \n${nested.map((e) => e.message).join(';\n')}`));
                                return null;
                            }
                            return nested;
                        });
                        if (errors.length > 0) {
                            break;
                        }
                        json[prop] = parsed;
                    }
                    else if (typeof desc.value === 'object') {
                        // It's reference to enum
                        json[prop].forEach((value) => {
                            if (desc.value[value] === void 0) {
                                errors.push(new Error(`Property "${prop}" has wrong value: "${value}". Available values: ${Object.keys(desc.value).join(', ')}.`));
                            }
                        });
                    }
                    break;
                case EEntityType.primitive:
                    const type = types[desc.value];
                    if (!type.validate(json[prop])) {
                        errors.push(new Error(`Property "${prop}" has wrong format.`));
                    }
                    json[prop] = type.parse(json[prop]);
                    break;
                case EEntityType.reference:
                    if (typeof desc.value === 'function') {
                        // It's reference to class
                        const nested = _parse(json[prop], desc.value);
                        if (nested instanceof Array) {
                            errors.push(new Error(`Cannot get instance of class "${desc.value.name}" from property "${prop}" due error: \n${nested.map((e) => e.message).join(';\n')}`));
                        }
                        else {
                            json[prop] = nested;
                        }
                    }
                    else if (typeof desc.value === 'object') {
                        // It's reference to enum
                        if (desc.value[json[prop]] === void 0) {
                            errors.push(new Error(`Property "${prop}" has wrong value: "${json[prop]}". Available values: ${Object.keys(desc.value).join(', ')}.`));
                        }
                    }
                    break;
            }
        });
        if (errors.length > 0) {
            return errors;
        }
        // Create instance
        try {
            return new classRef(json);
        }
        catch (error) {
            return [error];
        }
    }
    Protocol._parse = _parse;
    function _stringify(target, classRef) {
        if (!(target instanceof classRef)) {
            return [new Error(`Defined wrong reference to class.`)];
        }
        const types = getTypes();
        const description = classRef.getDescription();
        const errors = [];
        const json = {
            __signature: target.getSignature(),
        };
        Object.keys(description).forEach((prop) => {
            const propNameAlias = _getPropNameAlias(prop, target.getSignature());
            if (propNameAlias instanceof Error) {
                errors.push(new Error(`Cannot get property alias for property "${prop}" due error: ${propNameAlias.message}.`));
                return;
            }
            const desc = description[prop];
            if (desc.optional && target[prop] === void 0) {
                return;
            }
            switch (desc.type) {
                case EEntityType.repeated:
                    if (!(target[prop] instanceof Array)) {
                        errors.push(new Error(`Property "${prop}" has wrong format. Expected an array (repeated).`));
                        break;
                    }
                    if (typeof desc.value === 'string') {
                        json[propNameAlias] = target[prop].map((value) => {
                            const nestedType = types[desc.value];
                            if (!nestedType.validate(value)) {
                                errors.push(new Error(`Property "${prop}" has wrong format. Value: ${value}; type: ${typeof value}.`));
                                return undefined;
                            }
                            return nestedType.serialize(value);
                        });
                    }
                    else if (typeof desc.value === 'function') {
                        // It's reference to class
                        const parsed = target[prop].map((value) => {
                            const nested = _stringify(value, desc.value);
                            if (nested instanceof Array) {
                                errors.push(new Error(`Cannot get instance of class "${desc.value.name}" from property "${prop}" due error: \n${nested.map((e) => e.message).join(';\n')}`));
                                return null;
                            }
                            return nested;
                        });
                        if (errors.length > 0) {
                            break;
                        }
                        json[propNameAlias] = parsed;
                    }
                    else if (typeof desc.value === 'object') {
                        // It's reference to enum
                        json[propNameAlias] = target[prop].map((value) => {
                            if (desc.value[value] === void 0) {
                                errors.push(new Error(`Property "${prop}" has wrong value: "${value}". Available values: ${Object.keys(desc.value).join(', ')}.`));
                                return undefined;
                            }
                            return value;
                        });
                    }
                    break;
                case EEntityType.primitive:
                    const type = types[desc.value];
                    if (!type.validate(target[prop])) {
                        errors.push(new Error(`Property "${prop}" has wrong format.`));
                        break;
                    }
                    json[propNameAlias] = type.serialize(target[prop]);
                    break;
                case EEntityType.reference:
                    if (typeof desc.value === 'function') {
                        // It's reference to class
                        const nested = _stringify(target[prop], desc.value);
                        if (nested instanceof Array) {
                            errors.push(new Error(`Cannot get instance of class "${desc.value.name}" from property "${prop}" due error: \n${nested.map((e) => e.message).join(';\n')}`));
                            break;
                        }
                        json[propNameAlias] = nested;
                    }
                    else if (typeof desc.value === 'object') {
                        // It's reference to enum
                        if (desc.value[target[prop]] === void 0) {
                            errors.push(new Error(`Property "${prop}" has wrong value: "${target[prop]}". Available values: ${Object.keys(desc.value).join(', ')}.`));
                            break;
                        }
                        json[propNameAlias] = target[prop];
                    }
                    break;
            }
        });
        if (errors.length > 0) {
            return errors;
        }
        return json;
    }
    Protocol._stringify = _stringify;
    function _JSONToBinary(target, signature) {
        if (Protocol.ConvertedTypedEntitiesMap[signature] === void 0) {
            return new Error(`Cannot find typed map for "${signature}"`);
        }
        try {
            return Json.Convertor.encode(target, Protocol.ConvertedTypedEntitiesMap[signature]);
        }
        catch (error) {
            return error;
        }
    }
    Protocol._JSONToBinary = _JSONToBinary;
    function _JSONFromBinary(data) {
        try {
            return Json.Convertor.decode(data);
        }
        catch (error) {
            return error;
        }
    }
    Protocol._JSONFromBinary = _JSONFromBinary;
    function getTypes() {
        const defTypes = Object.assign({}, Protocol.PrimitiveTypes);
        const adTypes = Object.assign({}, Protocol.AdvancedTypes);
        return Object.assign(defTypes, adTypes);
    }
    Protocol.getTypes = getTypes;
    function getJSONFromStr(str) {
        try {
            return JSON.parse(str);
        }
        catch (error) {
            return error;
        }
    }
    Protocol.getJSONFromStr = getJSONFromStr;
    function getJSONFromIncomeData(income) {
        if (typeof income === 'string') {
            return getJSONFromStr(income);
        }
        else if (income instanceof Uint8Array) {
            return _JSONFromBinary(income);
        }
        else if (income instanceof ArrayBuffer) {
            return _JSONFromBinary(new Uint8Array(income));
        }
        else if (income instanceof Array) {
            return _JSONFromBinary(new Uint8Array(income));
        }
        else if (typeof income === 'object' && income !== null) {
            return income;
        }
        else {
            return new Error(`Unsupported format of income data. Type: ${typeof income}`);
        }
    }
    Protocol.getJSONFromIncomeData = getJSONFromIncomeData;
    function stringify(target, classRef) {
        const result = _stringify(target, classRef);
        if (result instanceof Array) {
            return new Error(`Cannot stringify due errors:\n ${result.map((error) => error.message).join('\n')}`);
        }
        // Create binary
        if (Protocol.state.isDebugged()) {
            return JSON.stringify(result);
        }
        return _JSONToBinary(result, classRef.getSignature());
    }
    Protocol.stringify = stringify;
    function parse(source, target) {
        const json = getJSONFromIncomeData(source);
        if (json instanceof Error) {
            return json;
        }
        const result = _parse(json, target);
        if (result instanceof Array) {
            return new Error(`Cannot parse due errors:\n ${result.map((error) => error.message).join('\n')}`);
        }
        return result;
    }
    Protocol.parse = parse;
    function parseFrom(source, protocols) {
        const json = getJSONFromIncomeData(source);
        if (json instanceof Error) {
            return json;
        }
        protocols = protocols instanceof Array ? protocols : [protocols];
        let result;
        protocols.forEach((protocol, i) => {
            if (result !== undefined) {
                return;
            }
            if (protocol === undefined || protocol === null || typeof protocol.parse !== 'function') {
                result = new Error(`Incorrect ref to protocol is provided`);
            }
            result = protocol.parse(json);
            if (result instanceof Error && i !== protocols.length - 1) {
                result = undefined;
            }
        });
        return result;
    }
    Protocol.parseFrom = parseFrom;
    function typeOf(smth) {
        switch (typeof smth) {
            case 'object':
                if (smth === null) {
                    return 'null';
                }
                if (smth.constructor !== void 0) {
                    return smth.constructor.name;
                }
                return 'object';
            default:
                return typeof smth;
        }
    }
    Protocol.typeOf = typeOf;
    function validateParams(params, classRef) {
        const errors = [];
        const description = classRef.getDescription();
        const types = getTypes();
        const classRefName = classRef.name;
        if (Object.keys(description).length === 0 && params === undefined) {
            return errors;
        }
        if (typeof params !== 'object' || params === null) {
            errors.push(new Error(`Expecting "params" will be an object on "${classRefName}".`));
            return errors;
        }
        Object.keys(description).forEach((prop) => {
            const desc = description[prop];
            if (!desc.optional && params[prop] === void 0) {
                errors.push(new Error(`Property "${prop}" isn't defined, but it's obligatory property for "${classRefName}".`));
                return;
            }
            if (desc.optional && params[prop] === void 0) {
                return;
            }
            switch (desc.type) {
                case EEntityType.repeated:
                    if (!(params[prop] instanceof Array)) {
                        errors.push(new Error(`Property "${prop}" has wrong format. Expected an array (repeated). Reference: "${classRefName}"`));
                        break;
                    }
                    if (typeof desc.value === 'string') {
                        params[prop] = params[prop].map((value) => {
                            const nestedType = types[desc.value];
                            if (typeOf(value) !== nestedType.tsType) {
                                errors.push(new Error(`Property "${prop}" has wrong format. Expected an array (repeated) of "${nestedType.tsType}"`));
                            }
                        });
                    }
                    else if (typeof desc.value === 'function') {
                        // It's reference to class
                        params[prop].forEach((instance, index) => {
                            if (!(instance instanceof desc.value)) {
                                errors.push(new Error(`Expecting property "${prop}", index "${index}" should be instance of "${desc.value.name}".`));
                            }
                        });
                    }
                    else if (typeof desc.value === 'object') {
                        // It's reference to enum
                        params[prop].forEach((value) => {
                            if (desc.value[value] === void 0) {
                                errors.push(new Error(`Property "${prop}" has wrong value: "${value}". Available values: ${Object.keys(desc.value).join(', ')}.`));
                            }
                        });
                    }
                    break;
                case EEntityType.primitive:
                    const type = types[desc.value];
                    if (typeOf(params[prop]) !== type.tsType) {
                        errors.push(new Error(`Property "${prop}" has wrong format. Expected: "${type.tsType}".`));
                    }
                    break;
                case EEntityType.reference:
                    if (typeof desc.value === 'function') {
                        // It's reference to class
                        if (!(params[prop] instanceof desc.value)) {
                            errors.push(new Error(`Expecting property "${prop}" will be instance of "${desc.value.name}".`));
                        }
                    }
                    else if (typeof desc.value === 'object') {
                        // It's reference to enum
                        if (desc.value[params[prop]] === void 0) {
                            errors.push(new Error(`Property "${prop}" has wrong value: "${params[prop]}". Available values: ${Object.keys(desc.value).join(', ')}.`));
                        }
                    }
                    break;
            }
        });
        return errors;
    }
    Protocol.validateParams = validateParams;
    function convertTypesToStandard(target) {
        function getTypeFromStr(type) {
            let result;
            if (Protocol.PrimitiveTypes[type] !== void 0) {
                result = Protocol.PrimitiveTypes[type].binaryType;
            }
            else if (Protocol.AdvancedTypes[type] !== void 0) {
                if (typeof Protocol.AdvancedTypes[type].binaryType === 'string') {
                    result = Protocol.AdvancedTypes[type].binaryType;
                }
                else {
                    result = new Error(`Type "${type}" is defined as advanced type, but property "binaryType" isn't defined.`);
                }
            }
            else {
                const availableTypes = [...Object.keys(Protocol.PrimitiveTypes), ...Object.keys(Protocol.AdvancedTypes)];
                result = new Error(`Found unexpected type: "${type}". This type isn't defined in protocol. Available types in this protocol: ${availableTypes.join(', ')}`);
            }
            if (result instanceof Error) {
                return result;
            }
            if (Protocol.StandardTypes.indexOf(result) === -1) {
                result = new Error(`Type "${result}" isn't standard type. Available standard types: ${Protocol.StandardTypes.join(', ')}`);
            }
            return result;
        }
        const converted = { __signature: 'asciiString' };
        Object.keys(target).forEach((key) => {
            const value = target[key];
            if (typeof value === 'string') {
                const type = getTypeFromStr(value);
                if (type instanceof Error) {
                    throw type;
                }
                converted[key] = type;
            }
            else if (value instanceof Array && value.length === 1) {
                const type = typeof value[0] === 'string' ? getTypeFromStr(value[0]) : convertTypesToStandard(value[0]);
                if (type instanceof Error) {
                    throw type;
                }
                converted[key] = [type];
            }
            else if (typeof value === 'object' && value !== null) {
                converted[key] = convertTypesToStandard(value);
            }
            else {
                throw new Error(`Unexpected value of type: ${value}. Check key: ${key}`);
            }
        });
        return converted;
    }
    Protocol.convertTypesToStandard = convertTypesToStandard;
    class Root {
    }
    Protocol.Root = Root;
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * Injection: map of references
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    Protocol.ConvertedTypedEntitiesMap = {};
    Protocol.ReferencesMap = {};
    function init() {
        Protocol.ReferencesMap["70D1C8A2"] = Message;
        Protocol.ConvertedTypedEntitiesMap = convertTypesToStandard(Protocol.TypedEntitiesMap);
    }
    Protocol.init = init;
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * Injection: protocol signature
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    function getSignature() {
        return "EEE09F";
    }
    Protocol.getSignature = getSignature;
})(Protocol = exports.Protocol || (exports.Protocol = {}));
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Primitive type injections
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function guid() {
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
}
class Message extends Protocol.Root {
    constructor(args) {
        super();
        this.__signature = Message.__signature;
        this.clientId = "";
        this.guid = guid();
        this.message = "";
        this.created = new Date();
        this.clientId = args.clientId;
        args.guid !== void 0 && (this.guid = args.guid);
        this.message = args.message;
        this.created = args.created;
        const errors = Protocol.validateParams(args, Message);
        if (errors.length > 0) {
            throw new Error(`Cannot create class of "Message" due error(s):\n${errors.map((error) => { return `\t- ${error.message}`; }).join('\n')}`);
        }
    }
    static getDescription() {
        return {
            clientId: { name: "clientId", value: "string", type: Protocol.EEntityType.primitive, optional: false },
            guid: { name: "guid", value: "guid", type: Protocol.EEntityType.primitive, optional: true },
            message: { name: "message", value: "string", type: Protocol.EEntityType.primitive, optional: false },
            created: { name: "created", value: "datetime", type: Protocol.EEntityType.primitive, optional: false },
        };
    }
    static getSignature() {
        return Message.__signature;
    }
    getSignature() {
        return this.__signature;
    }
    static parse(str) {
        return Protocol.parse(str, Message);
    }
    stringify() {
        return Protocol.stringify(this, Message);
    }
}
Message.__signature = "70D1C8A2";
exports.Message = Message;
exports.parse = Protocol.parse;
exports.parseFrom = Protocol.parseFrom;
exports.stringify = Protocol.stringify;
exports.join = Protocol.Packager.join;
exports.split = Protocol.Packager.split;
exports.isPackage = Protocol.Packager.isPackage;
exports.getSignature = Protocol.getSignature;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Injection: initialization
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
Protocol.init();
//# sourceMappingURL=simple.js.map