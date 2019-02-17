"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const Path = require("path");
const Tools = require("./tools/index");
const logger = new Tools.Logger('ProtocolFileLoader');
class Reader {
    constructor() {
        this._path = '';
    }
    read(file) {
        return new Promise((resolve, reject) => {
            if (this._path === '') {
                this._path = Path.dirname(file);
            }
            if (Tools.getTypeOf(file) !== Tools.EPrimitiveTypes.string || file.trim() === '') {
                return reject(new Error(logger.error(`Wrong format of filename.`)));
            }
            if (!FS.existsSync(file)) {
                return reject(new Error(logger.error(`File "${file}" doesn't exsist.`)));
            }
            FS.readFile(file, (error, buffer) => {
                if (error) {
                    return reject(error);
                }
                const json = this._getJSONFromBuffer(buffer);
                if (json instanceof Error) {
                    reject(json);
                }
                this._getNested(json).then(resolve).catch(reject);
            });
        });
    }
    _getNested(json) {
        return new Promise((resolve, reject) => {
            if (Tools.getTypeOf(json) !== Tools.EPrimitiveTypes.object) {
                return reject(new Error(`Target isn't an object.`));
            }
            const promises = [];
            Object.keys(json).forEach((key) => {
                const value = json[key];
                if (Tools.getTypeOf(value) === Tools.EPrimitiveTypes.object) {
                    promises.push(this._getNested(value).then((nested) => {
                        json[key] = nested;
                    }));
                }
                if (Tools.getTypeOf(value) === Tools.EPrimitiveTypes.string) {
                    if (key.indexOf(':findin') !== -1) {
                        const file = value;
                        const prop = key.replace(':findin', '');
                        delete json[key];
                        promises.push(this.read(Path.resolve(this._path, file)).then((nested) => {
                            json[prop] = nested;
                        }));
                    }
                }
            });
            Promise.all(promises).then(() => {
                resolve(json);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    _clearComments(str) {
        return str.replace(/[\n\r]/gi, '').replace(/\/\*[^\*\/]*\*\//gi, '');
    }
    _getJSONFromBuffer(buffer) {
        try {
            return JSON.parse(this._clearComments(buffer.toString('utf8')));
        }
        catch (e) {
            return new Error(logger.error(`Error during parsing file: ${e.message}`));
        }
    }
}
exports.Reader = Reader;
//# sourceMappingURL=protocol.reader.js.map