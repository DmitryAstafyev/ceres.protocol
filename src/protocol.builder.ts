import * as FS from 'fs';
import * as Tools from './tools/index';

import { Convertor } from './protocol.convertor';
import { Reader } from './protocol.reader';

const logger: Tools.Logger = new Tools.Logger('ProtocolBuilder');

export class Builder {

    public build(source: string, dest: string, replace: boolean = false, advancedTypeTS?: string, advancedTypeJS?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (Tools.getTypeOf(source) !== Tools.EPrimitiveTypes.string) {
                return reject(new Error(logger.error(`Argument "source" should be a {string} type, but was gotten: ${Tools.inspect(source)}.`)));
            }
            if (Tools.getTypeOf(dest) !== Tools.EPrimitiveTypes.string) {
                return reject(new Error(logger.error(`Argument "dest" should be a {string} type, but was gotten: ${Tools.inspect(dest)}.`)));
            }
            const reader = new Reader();
            reader.read(source).then((json: any) => {
                const convertor = new Convertor();
                if (typeof advancedTypeTS === 'string' && typeof advancedTypeJS === 'string') {
                    import(advancedTypeJS).then((module: any) => {
                        const keys: string[] = Object.keys(module);
                        let implementation: any = undefined;
                        if (keys.length === 0) {
                            logger.warn(`File ${advancedTypeJS} doesn't have export declarations. Advanced types will isn't applied.`);
                        } else if (keys.length > 1) {
                            logger.warn(`File ${advancedTypeJS} has more than one export declarations. Only first export will be used.`);
                            implementation = module[keys[0]];
                        } else {
                            implementation = module[keys[0]];
                        }
                        convertor.convert(json, [], implementation === undefined ? undefined : {
                            implementation: implementation,
                            path: advancedTypeTS
                        }).then((str: string) => {
                            this.write(dest, str, replace)
                                .then(resolve)
                                .catch(reject);
                        }).catch((error: Error) => {
                            reject(error);
                        });
                    }).catch((advTypeError: Error) => {
                        reject(logger.error(`Fail to load declaration of advanced types from file "${advancedTypeJS}" due error: ${advTypeError.message}`));
                    });
                } else {
                    convertor.convert(json).then((str: string) => {
                        this.write(dest, str, replace)
                            .then(resolve)
                            .catch(reject);
                    }).catch((error: Error) => {
                        reject(error);
                    });
                }
            }).catch(reject);
        });
    }

    public write(dest: string, content: string, replace: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (FS.existsSync(dest) && replace) {
                    FS.unlinkSync(dest);
                    logger.warn(`File "${dest}" exists. This file will be overwritten.`);
                } else if (FS.existsSync(dest)) {
                    return reject(new Error(logger.error(`File "${dest}" already exists`)));
                }
                FS.writeFile(dest, content, (error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }

}
