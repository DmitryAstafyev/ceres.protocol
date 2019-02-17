"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAUT_ALLOWED_CONSOLE = {
    DEBUG: true,
    ENV: true,
    ERROR: true,
    INFO: true,
    VERBOS: false,
    WARNING: true,
};
/**
 * @class
 * Settings of logger
 *
 * @property {boolean} console - Show / not show logs in console
 * @property {Function} output - Sends ready string message as argument to output functions
 */
class LoggerParameters {
    constructor({ console = true, output = null, allowedConsole = DEFAUT_ALLOWED_CONSOLE, }) {
        this.console = true;
        this.allowedConsole = {};
        this.output = null;
        this.console = console;
        this.output = output;
        this.allowedConsole = allowedConsole;
    }
}
exports.LoggerParameters = LoggerParameters;
//# sourceMappingURL=tools.logger.parameters.js.map