"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const Tools = require("./tools/index");
const protocol_convertor_1 = require("./protocol.convertor");
const protocol_reader_1 = require("./protocol.reader");
const logger = new Tools.Logger('ProtocolBuilder');
class Builder {
    build(source, dest, replace = false) {
        return new Promise((resolve, reject) => {
            if (Tools.getTypeOf(source) !== Tools.EPrimitiveTypes.string) {
                return reject(new Error(logger.error(`Argument "source" should be a {string} type, but was gotten: ${Tools.inspect(source)}.`)));
            }
            if (Tools.getTypeOf(dest) !== Tools.EPrimitiveTypes.string) {
                return reject(new Error(logger.error(`Argument "dest" should be a {string} type, but was gotten: ${Tools.inspect(dest)}.`)));
            }
            const reader = new protocol_reader_1.Reader();
            reader.read(source)
                .then((json) => {
                const convertor = new protocol_convertor_1.Convertor();
                convertor.convert(json)
                    .then((str) => {
                    this.write(dest, str, replace)
                        .then(resolve)
                        .catch(reject);
                })
                    .catch((error) => {
                    reject(error);
                });
            })
                .catch(reject);
        });
    }
    write(dest, content, replace = false) {
        return new Promise((resolve, reject) => {
            try {
                if (FS.existsSync(dest) && replace) {
                    FS.unlinkSync(dest);
                    logger.warn(`File "${dest}" exists. This file will be overwritten.`);
                }
                else if (FS.existsSync(dest)) {
                    return reject(new Error(logger.error(`File "${dest}" already exists`)));
                }
                FS.writeFile(dest, content, (error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.Builder = Builder;
//# sourceMappingURL=protocol.builder.js.map