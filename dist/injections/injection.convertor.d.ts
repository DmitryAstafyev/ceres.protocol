export declare namespace Json {
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
            [x: number]: typeof Impls.Boolean | typeof Impls.Float32;
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
