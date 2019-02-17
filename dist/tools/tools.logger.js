"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_inspect_1 = require("./tools.inspect");
const tools_logger_parameters_1 = require("./tools.logger.parameters");
const tools_logger_stdout_1 = require("./tools.logger.stdout");
var ELogLevels;
(function (ELogLevels) {
    ELogLevels["INFO"] = "INFO";
    ELogLevels["DEBUG"] = "DEBUG";
    ELogLevels["WARNING"] = "WARNING";
    ELogLevels["VERBOS"] = "VERBOS";
    ELogLevels["ERROR"] = "ERROR";
    ELogLevels["ENV"] = "ENV";
})(ELogLevels = exports.ELogLevels || (exports.ELogLevels = {}));
let aliasMaxLength = 0;
const typeMaxLength = 7;
// tslint:disable-next-line:only-arrow-functions
(function () {
    if (typeof process !== 'object' || process === null || process.stdout === void 0) {
        return undefined;
    }
    if (typeof global !== 'object' || global === null) {
        return undefined;
    }
    if (global.logStdout !== undefined) {
        return;
    }
    global.logStdout = new tools_logger_stdout_1.StdoutController(process.stdout);
}());
/**
 * @class
 * Logger
 */
class Logger {
    /**
     * @constructor
     * @param {string} signature        - Signature of logger instance
     * @param {LoggerParameters} params - Logger parameters
     */
    constructor(signature, params) {
        this._signature = '';
        this._parameters = new tools_logger_parameters_1.LoggerParameters({});
        params instanceof tools_logger_parameters_1.LoggerParameters && (this._parameters = params);
        this._signature = signature;
        if (aliasMaxLength < signature.length) {
            aliasMaxLength = signature.length;
        }
    }
    /**
     * Publish info logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    info(...args) {
        return this._log(this._getMessage(...args), ELogLevels.INFO);
    }
    /**
     * Publish warnings logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    warn(...args) {
        return this._log(this._getMessage(...args), ELogLevels.WARNING);
    }
    /**
     * Publish verbose logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    verbose(...args) {
        return this._log(this._getMessage(...args), ELogLevels.VERBOS);
    }
    /**
     * Publish error logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    error(...args) {
        return this._log(this._getMessage(...args), ELogLevels.ERROR);
    }
    /**
     * Publish debug logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    debug(...args) {
        return this._log(this._getMessage(...args), ELogLevels.DEBUG);
    }
    /**
     * Publish environment logs (low-level stuff, support or tools)
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    env(...args) {
        return this._log(this._getMessage(...args), ELogLevels.ENV);
    }
    /**
     * Define target area before posting logs
     * @param {string} area - ID of target area
     * @returns {Logger} - returns instance of current logger
     */
    area(area) {
        if (typeof area !== 'string' || area.trim() === '') {
            return this;
        }
        this._area = area;
        return this;
    }
    _console(message, level) {
        if (!this._parameters.console) {
            return false;
        }
        if (!this._parameters.allowedConsole[level]) {
            return false;
        }
        if (global.logStdout) {
            const area = this._area;
            this._area = undefined;
            global.logStdout.out(message, area);
        }
        else {
            /* tslint:disable */
            console.log(message);
            /* tslint:enable */
        }
    }
    _output(message) {
        if (typeof this._parameters.output === 'function') {
            this._parameters.output(message);
            return true;
        }
        return false;
    }
    _getMessage(...args) {
        let message = ``;
        if (args instanceof Array) {
            args.forEach((smth, index) => {
                if (typeof smth !== 'string') {
                    message = `${message} (type: ${(typeof smth)}): ${tools_inspect_1.default(smth)}`;
                }
                else {
                    message = `${message}${smth}`;
                }
                index < (args.length - 1) && (message = `${message},\n `);
            });
        }
        return message;
    }
    _log(message, level) {
        message = `[${Date.now()}][${this._signature}${' '.repeat(aliasMaxLength - this._signature.length)}][${level}${' '.repeat(typeMaxLength - level.length)}]: ${message}`;
        !this._output(message) && this._console(message, level);
        return message;
    }
}
exports.default = Logger;
//# sourceMappingURL=tools.logger.js.map