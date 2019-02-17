"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_builder_1 = require("./protocol.builder");
const ERRORS = {
    doubleParameter: 'doubleParameter',
    noParameter: 'noParameter',
};
const COMMANDS = {
    help: 'help',
    output: 'output',
    replace: 'replace',
    source: 'source',
};
const ARGUMENTS = {
    [COMMANDS.output]: {
        args: ['-o', '--outout', '--out'],
        description: 'Definition of output file. Format: ts (TypeScript)',
        errors: { [ERRORS.noParameter]: 'Key "-o" (--output, --out) expected file name after.', [ERRORS.doubleParameter]: 'Key "-o" (--output, --out) can be defined twice.' },
        hasParameter: true,
    },
    [COMMANDS.source]: {
        args: ['-s', '--source', '--src'],
        description: 'Definition of input file. Expected format is JSON',
        errors: { [ERRORS.noParameter]: 'Key "-s" (--source, --src) expected file name after.', [ERRORS.doubleParameter]: 'Key "-s" (--source, --src) can be defined twice.' },
        hasParameter: true,
    },
    [COMMANDS.replace]: {
        args: ['-r', '--replace'],
        description: 'Replace output file if it exists',
        errors: {},
        hasParameter: false,
    },
    [COMMANDS.help]: {
        args: ['-h', '--help'],
        description: 'Show this message',
        errors: {},
        hasParameter: false,
    },
};
function isItArgument(smth) {
    let result = false;
    Object.keys(ARGUMENTS).forEach((command) => {
        const description = ARGUMENTS[command];
        description.args.forEach((_arg) => {
            if (smth === _arg) {
                result = true;
            }
        });
    });
    return result;
}
const OUTPUTS = {
    help: () => {
        console.log(`Supported commands: \n${Object.keys(ARGUMENTS).map((command) => {
            const description = ARGUMENTS[command];
            return `${description.args.join(' | ')} - ${description.description};`;
        }).join('\n')}`);
    },
};
if (process.argv instanceof Array) {
    const commands = {};
    let error = false;
    const started = (new Date()).getTime();
    try {
        process.argv.forEach((arg, index) => {
            Object.keys(ARGUMENTS).forEach((command) => {
                const description = ARGUMENTS[command];
                description.args.forEach((_arg) => {
                    if (_arg === arg) {
                        if (description.hasParameter) {
                            if (process.argv[index + 1] !== void 0) {
                                if (!isItArgument(process.argv[index + 1]) && process.argv[index + 1].trim() !== '') {
                                    if (commands[command] === void 0) {
                                        commands[command] = process.argv[index + 1];
                                    }
                                    else {
                                        console.log(description.errors[ERRORS.doubleParameter]);
                                        throw ERRORS.doubleParameter;
                                    }
                                }
                                else {
                                    console.log(description.errors[ERRORS.noParameter]);
                                    throw ERRORS.noParameter;
                                }
                            }
                            else {
                                console.log(description.errors[ERRORS.noParameter]);
                                throw ERRORS.noParameter;
                            }
                        }
                        else {
                            commands[command] = '';
                        }
                    }
                });
            });
        });
    }
    catch (e) {
        if (typeof e !== 'string') {
            throw e;
        }
        else {
            error = true;
        }
    }
    if (!error) {
        if (Object.keys(commands).length > 0) {
            if (Object.keys(commands).indexOf(COMMANDS.help) !== -1) {
                OUTPUTS.help();
            }
            else if (Object.keys(commands).indexOf(COMMANDS.source) !== -1 && Object.keys(commands).indexOf(COMMANDS.output) !== -1) {
                try {
                    const builder = new protocol_builder_1.Builder();
                    builder.build(commands[COMMANDS.source], commands[COMMANDS.output], Object.keys(commands).indexOf(COMMANDS.replace) !== -1 ? true : false)
                        .then(() => {
                        const finished = (new Date()).getTime();
                        console.log(`File "${commands[COMMANDS.output]}" generated for ${((finished - started) / 1000).toFixed(2)} s.`);
                    })
                        .catch((e) => {
                        console.log(e.message);
                    });
                }
                catch (e) {
                    console.log(e.message);
                }
            }
        }
        else {
            OUTPUTS.help();
        }
    }
}
//# sourceMappingURL=protocol.cli.js.map