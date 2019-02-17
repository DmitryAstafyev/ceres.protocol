export declare namespace Protocol {
    type TTypes = Message;
    const KeysMapLeft: {
        [key: string]: any;
    };
    const KeysMapRight: {
        [key: string]: any;
    };
    const TypedEntitiesMap: {
        [key: string]: any;
    };
    const AdvancedTypes: {
        [key: string]: any;
    };
    interface IPrimitiveType<T> {
        tsType: string;
        binaryType: string;
        init: string;
        parse: (value: string | number | T) => T;
        serialize: (value: T) => string | number | boolean | T;
        validate: (value: string | number | T) => boolean;
        implementation?: () => {};
    }
    const PrimitiveTypes: {
        [key: string]: IPrimitiveType<any>;
    };
    namespace Packager {
        function join(...items: any[]): string | Uint8Array | Error;
        function split(source: string | Uint8Array): string[] | Uint8Array[] | Error;
        function isPackage(source: any): boolean;
    }
    namespace Json {
        namespace Impls {
            class Boolean {
                static toUint8(value: any): Uint8Array;
                static fromUint8(bytes: Uint8Array): boolean;
                static validate(value: number): Error | undefined;
            }
            class Float32 {
                static toUint8(int: any): Uint8Array;
                static fromUint8(bytes: Uint8Array): number;
                static validate(value: number): Error | undefined;
            }
            class Float64 {
                static toUint8(int: any): Uint8Array;
                static fromUint8(bytes: Uint8Array): number;
                static validate(value: number): Error | undefined;
            }
            class Int8 {
                static toUint8(int: any): Uint8Array;
                static fromUint8(bytes: Uint8Array): number;
                static validate(value: number): Error | undefined;
            }
            class Int16 {
                static toUint8(int: any): Uint8Array;
                static fromUint8(bytes: Uint8Array): number;
                static validate(value: number): Error | undefined;
            }
            class Int32 {
                static toUint8(int: any): Uint8Array;
                static fromUint8(bytes: Uint8Array): number;
                static validate(value: number): Error | undefined;
            }
            class Uint8 {
                static fromAsciiStr(str: string): Uint8Array;
                static toAsciiStr(data: Uint8Array): string;
                static fromUtf8Str(str: string): Uint8Array;
                static toUtf8Str(bytes: Uint8Array): string;
                static toUint8(int: any): Uint8Array;
                static fromUint8(bytes: Uint8Array): number;
                static validate(value: number): Error | undefined;
            }
            class Uint16 {
                static toUint8(int: any): Uint8Array;
                static fromUint8(bytes: Uint8Array): number;
                static validate(value: number): Error | undefined;
            }
            class Uint32 {
                static toUint8(int: any): Uint8Array;
                static fromUint8(bytes: Uint8Array): number;
                static validate(value: number): Error | undefined;
            }
        }
        namespace Scheme {
            const Types: {
                int8: number;
                int16: number;
                int32: number;
                uint8: number;
                uint16: number;
                uint32: number;
                float32: number;
                float64: number;
                boolean: number;
                asciiString: number;
                utf8String: number;
                object: number;
                array: number;
            };
            const TypesNames: {
                [x: number]: string;
            };
            const TypesSizes: {
                [x: number]: number;
            };
            const TypesProviders: {
                [x: number]: typeof Impls.Uint32 | typeof Impls.Boolean;
            };
            const LengthConvertor: {
                [x: number]: typeof Impls.Uint32.toUint8;
                object: typeof Impls.Uint32.toUint8;
            };
            const SizeDeclaration: {
                [x: number]: boolean;
            };
        }
        class Convertor {
            static encode(target: any, scheme: any, validation?: boolean): Uint8Array;
            static decode(target: Uint8Array, maxInteractionsCount?: number): any;
            private static _encodePrimitive;
            private static _isPrimitive;
            private static _getPrimitiveType;
        }
    }
    type TIncomeData = string | object | ArrayBuffer | number[] | Uint8Array;
    class ProtocolState {
        private _debug;
        debug(value: boolean): void;
        isDebugged(): boolean;
    }
    const state: ProtocolState;
    enum EEntityType {
        root = "root",
        class = "class",
        namespace = "namespace",
        complex = "complex",
        primitive = "primitive",
        repeated = "repeated",
        reference = "reference",
        enum = "enum"
    }
    interface IProperty {
        name: string;
        type: EEntityType;
        optional: boolean;
        value: any;
    }
    const StandardTypes: string[];
    function _getPropNameAlias(propName: string, signature: string): string | Error;
    function _getPropName(alias: string, signature: string): string | Error;
    function _parse(source: TIncomeData, target?: any): TTypes | Error[];
    function _stringify(target: any, classRef: any): {
        [key: string]: any;
    } | Error[];
    function _JSONToBinary(target: any, signature: string): Uint8Array | Error;
    function _JSONFromBinary(data: Uint8Array): {} | Error;
    function getTypes(): {
        [key: string]: any;
    };
    function getJSONFromStr(str: string): {} | Error;
    function getJSONFromIncomeData(income: TIncomeData): {} | Error;
    function stringify(target: any, classRef: any): string | Uint8Array | Error;
    function parse(source: TIncomeData, target?: any): TTypes | Error;
    function parseFrom(source: TIncomeData, protocols: any | any[]): any;
    function typeOf(smth: any): string;
    function validateParams(params: any, classRef: any): Error[];
    function convertTypesToStandard(target: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    class Root {
    }
    let ConvertedTypedEntitiesMap: {
        [key: string]: any;
    };
    let ReferencesMap: {
        [key: string]: any;
    };
    function init(): void;
    function getSignature(): string;
}
export declare class Message extends Protocol.Root {
    static getDescription(): {
        [key: string]: Protocol.IProperty;
    };
    static __signature: string;
    static getSignature(): string;
    __signature: string;
    getSignature(): string;
    static parse(str: string | object): Protocol.TTypes | Error;
    stringify(): string;
    clientId: string;
    guid?: string;
    message: string;
    created: Date;
    constructor(args: {
        clientId: string;
        guid?: string;
        message: string;
        created: Date;
    });
}
export declare type TProtocolTypes = Protocol.TTypes;
export declare const parse: typeof Protocol.parse;
export declare const parseFrom: typeof Protocol.parseFrom;
export declare const stringify: typeof Protocol.stringify;
export declare const join: typeof Protocol.Packager.join;
export declare const split: typeof Protocol.Packager.split;
export declare const isPackage: typeof Protocol.Packager.isPackage;
export declare const getSignature: typeof Protocol.getSignature;
export interface IClass {
    getSignature: () => string;
    parse: (str: string | object) => any;
}
export interface IImplementation {
    getSignature: () => string;
    stringify: () => string | Uint8Array;
}
