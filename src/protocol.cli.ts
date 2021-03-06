/* tslint:disable:no-console */

import { Builder } from './protocol.builder';
import * as fs from 'fs';
import * as path from 'path';
import { setFlagsFromString } from 'v8';

type TArgumentDescription = { description: string, hasParameter: boolean, args: string[], errors: {[key: string]: string}};

const ERRORS = {
    doubleParameter: 'doubleParameter',
    noParameter: 'noParameter',
};

const COMMANDS = {
    help    : 'help',
    output  : 'output',
    replace : 'replace',
    source  : 'source',
    advanced: 'advanced',
    advancedCom: 'advancedCom'
};

const ARGUMENTS: {[key: string]: TArgumentDescription } = {
    [COMMANDS.output]  : {
        args: ['-o', '--outout', '--out'],
        description: 'Definition of output file. Format: ts (TypeScript)',
        errors: { [ERRORS.noParameter]: 'Key "-o" (--output, --out) expected file name after.', [ERRORS.doubleParameter]: 'Key "-o" (--output, --out) can be defined twice.'},
        hasParameter: true,
    },
    [COMMANDS.source]  : {
        args: ['-s', '--source', '--src'],
        description: 'Definition of input file. Expected format is JSON',
        errors: { [ERRORS.noParameter]: 'Key "-s" (--source, --src) expected file name after.', [ERRORS.doubleParameter]: 'Key "-s" (--source, --src) can be defined twice.'},
        hasParameter: true,
    },
    [COMMANDS.advanced]  : {
        args: ['-a', '--advanced', '--adv'],
        description: 'Path to TS file with declaration of advanced types',
        errors: { [ERRORS.noParameter]: 'Key "-a" (--advanced, --adv) expected file name after.', [ERRORS.doubleParameter]: 'Key "-a" (--advanced, --adv) can be defined twice.'},
        hasParameter: true,
    },
    [COMMANDS.advancedCom]  : {
        args: ['-ac', '--advanced-compiled', '--adv-comp'],
        description: 'Path to complited JS file of TS file with declaration of advanced types',
        errors: { [ERRORS.noParameter]: 'Key "-ac" (--advanced-compiled, --adv-comp) expected file name after.', [ERRORS.doubleParameter]: 'Key "-ac" (--advanced-compiled, --adv-comp) can be defined twice.'},
        hasParameter: true,
    },
    [COMMANDS.replace]    : {
        args: ['-r', '--replace'],
        description: 'Replace output file if it exists',
        errors: {},
        hasParameter: false,
    },
    [COMMANDS.help]    : {
        args: ['-h', '--help'],
        description: 'Show this message',
        errors: {},
        hasParameter: false,
    },
};

const CHECK_PATHS = [
    COMMANDS.source,
    COMMANDS.advanced,
    COMMANDS.advancedCom
];

function getValidPath(file: string): undefined | string {
    const fullfile = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullfile)) {
        return fullfile;
    }
    if (fs.existsSync(file)) {
        return file;
    }
    return undefined;
}

function isItArgument(smth: string): boolean {
    let result = false;
    Object.keys(ARGUMENTS).forEach((command: string) => {
        const description: TArgumentDescription = ARGUMENTS[command];
        description.args.forEach((_arg: string) => {
            if (smth === _arg) {
                result = true;
            }
        });
    });
    return result;
}

const OUTPUTS = {
    help: () => {
        console.log(`Supported commands: \n${Object.keys(ARGUMENTS).map((command: string) => {
            const description: TArgumentDescription = ARGUMENTS[command];
            return `${description.args.join(' | ')} - ${description.description};`;
        }).join('\n')}`);
    },
};

if (process.argv instanceof Array) {
    const commands: { [key: string]: string} = {};
    let error = false;
    const started = (new Date()).getTime();
    try {
        process.argv.forEach((arg: string, index: number) => {
            Object.keys(ARGUMENTS).forEach((command: string) => {
                const description: TArgumentDescription = ARGUMENTS[command];
                description.args.forEach((_arg: string) => {
                    if (_arg === arg) {
                        if (description.hasParameter) {
                            if (process.argv[index + 1] !== void 0) {
                                if (!isItArgument(process.argv[index + 1]) && process.argv[index + 1].trim() !== '') {
                                    if (commands[command] === void 0) {
                                        commands[command] = process.argv[index + 1];
                                    } else {
                                        console.log(description.errors[ERRORS.doubleParameter]);
                                        throw ERRORS.doubleParameter;
                                    }
                                } else {
                                    console.log(description.errors[ERRORS.noParameter]);
                                    throw ERRORS.noParameter;
                                }
                            } else {
                                console.log(description.errors[ERRORS.noParameter]);
                                throw ERRORS.noParameter;
                            }
                        } else {
                            commands[command] = '';
                        }
                    }
                });
            });
        });
    } catch (e) {
        if (typeof e !== 'string') {
            throw e;
        } else {
            error = true;
        }
    }

    if (!error) {
        if (Object.keys(commands).length > 0) {
            if (Object.keys(commands).indexOf(COMMANDS.help) !== -1) {
                OUTPUTS.help();
            } else if (Object.keys(commands).indexOf(COMMANDS.source) !== -1 && Object.keys(commands).indexOf(COMMANDS.output) !== -1) {
                if (commands[COMMANDS.advanced] !== undefined || commands[COMMANDS.advancedCom] !== undefined) {
                    if (commands[COMMANDS.advanced] === undefined || commands[COMMANDS.advancedCom] === undefined) {
                        console.log(`Keys -a and -ac can be used only together.`);
                        process.exit(1);
                    }
                }
                let errors: string[] = [];
                CHECK_PATHS.forEach((key: string) => {
                    if (commands[key] === undefined) {
                        return;
                    }
                    const filename: string | undefined = getValidPath(commands[key]);
                    if (filename === undefined) {
                        errors.push(`File ${commands[key]} isn't found.`)
                        return;
                    }
                    commands[key] = filename;
                });
                if (errors.length > 0) {
                    console.log(errors.join('\n'));
                    process.exit(2);
                }
                try {
                    const builder = new Builder();
                    builder.build(
                        commands[COMMANDS.source],
                        commands[COMMANDS.output],
                        Object.keys(commands).indexOf(COMMANDS.replace) !== -1 ? true : false,
                        commands[COMMANDS.advanced],
                        commands[COMMANDS.advancedCom],
                    ).then(() => {
                        const finished = (new Date()).getTime();
                        console.log(`File "${commands[COMMANDS.output]}" generated for ${((finished - started) / 1000).toFixed(2)} s.`);
                    }).catch((e) => {
                        console.log(e.message);
                    });
                } catch (e) {
                    console.log(e.message);
                }
            }
        } else {
            OUTPUTS.help();
        }
    }

}
