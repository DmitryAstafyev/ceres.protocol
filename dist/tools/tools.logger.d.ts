import { LoggerParameters } from './tools.logger.parameters';
export declare enum ELogLevels {
    INFO = "INFO",
    DEBUG = "DEBUG",
    WARNING = "WARNING",
    VERBOS = "VERBOS",
    ERROR = "ERROR",
    ENV = "ENV"
}
/**
 * @class
 * Logger
 */
export default class Logger {
    private _signature;
    private _parameters;
    private _area;
    /**
     * @constructor
     * @param {string} signature        - Signature of logger instance
     * @param {LoggerParameters} params - Logger parameters
     */
    constructor(signature: string, params?: LoggerParameters);
    /**
     * Publish info logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    info(...args: any[]): string;
    /**
     * Publish warnings logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    warn(...args: any[]): string;
    /**
     * Publish verbose logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    verbose(...args: any[]): string;
    /**
     * Publish error logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    error(...args: any[]): string;
    /**
     * Publish debug logs
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    debug(...args: any[]): string;
    /**
     * Publish environment logs (low-level stuff, support or tools)
     * @param {any} args - Any input for logs
     * @returns {string} - Formatted log-string
     */
    env(...args: any[]): string;
    /**
     * Define target area before posting logs
     * @param {string} area - ID of target area
     * @returns {Logger} - returns instance of current logger
     */
    area(area: string): Logger;
    private _console;
    private _output;
    private _getMessage;
    private _log;
}
