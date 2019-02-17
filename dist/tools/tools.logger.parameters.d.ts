export declare type TOutputFunc = (...args: any[]) => any;
/**
 * @class
 * Settings of logger
 *
 * @property {boolean} console - Show / not show logs in console
 * @property {Function} output - Sends ready string message as argument to output functions
 */
export declare class LoggerParameters {
    console: boolean;
    allowedConsole: {
        [key: string]: boolean;
    };
    output: TOutputFunc | null;
    constructor({ console, output, allowedConsole, }: {
        console?: boolean;
        output?: TOutputFunc | null;
        allowedConsole?: {
            [key: string]: boolean;
        };
    });
}
