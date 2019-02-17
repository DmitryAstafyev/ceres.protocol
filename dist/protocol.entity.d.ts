import { IPrimitiveType } from './injections/injection.types.primitive';
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
export interface IEntity {
    type: EEntityType;
    name: string;
    children: {
        [key: string]: IEntity;
    };
    value: any;
    single: boolean;
    parent: IEntity | null;
    request: boolean;
}
export declare class EntityType {
    private _types;
    constructor();
    getTypes(): {
        [key: string]: IPrimitiveType<any>;
    };
    setAdvancedTypes(advancedTypes: {
        [key: string]: any;
    }): Error[] | undefined;
    isPrimitive(type: string): boolean;
    isClassReference(type: string): boolean;
    isRepeated(type: string): boolean;
    serializeName(name: string): string;
    hardSerializeName(name: string): string;
    isSingle(name: string): boolean;
    getRepeatedType(type: string): string;
    getType(prop: string, target: any): EEntityType | Error[];
    getInjections(): string;
    private _getAdvancedTypeErrors;
    private _getEnumError;
}
