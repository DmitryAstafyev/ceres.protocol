"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const Path = require("path");
const INJECTIONS_COMMENT_OUT = [
    { reg: /declare /g, replaceTo: '// declare ' },
];
class Injections {
    get(files) {
        return new Promise((resolve, reject) => {
            const errors = [];
            // Check files
            files.forEach((file) => {
                if (!FS.existsSync(file)) {
                    errors.push(new Error(`Injectable file "${file}" doesn't exsist.`));
                }
            });
            if (errors.length > 0) {
                return reject(errors);
            }
            const result = [];
            // Read files
            Promise.all(files.map((file) => {
                return new Promise((resolveFileTask, rejectFileTask) => {
                    FS.readFile(file, (error, buffer) => {
                        if (error) {
                            return rejectFileTask(error);
                        }
                        result.push({
                            content: this._serialize(buffer.toString('utf8')),
                            file: Path.basename(file),
                            path: Path.dirname(file),
                        });
                        resolveFileTask();
                    });
                });
            }))
                .then(() => {
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    _serialize(content) {
        INJECTIONS_COMMENT_OUT.forEach((toComment) => {
            content = content.replace(toComment.reg, toComment.replaceTo);
        });
        return content;
    }
}
exports.Injections = Injections;
//# sourceMappingURL=protocol.injections.js.map