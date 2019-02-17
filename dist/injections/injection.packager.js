"use strict";
// tslint:disable:no-namespace
// tslint:disable:max-classes-per-file
// tslint:disable:object-literal-sort-keys
Object.defineProperty(exports, "__esModule", { value: true });
var Packager;
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
})(Packager = exports.Packager || (exports.Packager = {}));
//# sourceMappingURL=injection.packager.js.map