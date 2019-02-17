"use strict";
// tslint:disable:no-namespace
// tslint:disable:max-classes-per-file
// tslint:disable:no-bitwise
// tslint:disable:object-literal-sort-keys
Object.defineProperty(exports, "__esModule", { value: true });
var Json;
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
})(Json = exports.Json || (exports.Json = {}));
//# sourceMappingURL=injection.convertor.js.map