export interface IPrimitiveType<T> {
    tsType: string;
    binaryType: string;
    init: string;
    parse: (value: string | number | T) => T;
    serialize: (value: T) => string | number | boolean | T;
    validate: (value: string | number | T) => boolean;
    implementation?: () => {};
}
export declare const PrimitiveTypes: {
    [key: string]: IPrimitiveType<any>;
};
