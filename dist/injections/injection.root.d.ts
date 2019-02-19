declare type TTypes = any;
export declare type TIncomeData = string | object | ArrayBuffer | number[] | Uint8Array;
export declare type TStringifyOutput = string | Uint8Array;
export declare class ProtocolState {
    private _debug;
    debug(value: boolean): void;
    isDebugged(): boolean;
}
export declare const state: ProtocolState;
export declare enum EEntityType {
    root = "root",
    class = "class",
    namespace = "namespace",
    complex = "complex",
    primitive = "primitive",
    repeated = "repeated",
    reference = "reference",
    enum = "enum"
}
export interface IProperty {
    name: string;
    type: EEntityType;
    optional: boolean;
    value: any;
}
export declare const StandardTypes: string[];
export declare function _getPropNameAlias(propName: string, signature: string): string | Error;
export declare function _getPropName(alias: string, signature: string): string | Error;
export declare function _parse(source: TIncomeData, target?: any): TTypes | Error[];
export declare function _stringify(target: any, classRef: any): {
    [key: string]: any;
} | Error[];
export declare function _JSONToBinary(target: any, signature: string): Uint8Array | Error;
export declare function _JSONFromBinary(data: Uint8Array): {} | Error;
export declare function getTypes(): {
    [key: string]: any;
};
export declare function getJSONFromStr(str: string): {} | Error;
export declare function getJSONFromIncomeData(income: TIncomeData): {} | Error;
export declare function stringify(target: any, classRef: any): TStringifyOutput | Error;
export declare function parse(source: TIncomeData, target?: any): TTypes | Error;
export declare function parseFrom(source: TIncomeData, protocols: any | any[]): any;
export declare function typeOf(smth: any): string;
export declare function validateParams(params: any, classRef: any): Error[];
export declare function convertTypesToStandard(target: {
    [key: string]: any;
}): {
    [key: string]: any;
};
export declare function isInstanceOf(signature: string, target: any): boolean;
export declare class Root {
}
export {};
