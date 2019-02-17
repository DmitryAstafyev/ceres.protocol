export interface IAdvancedTypeDeclaration {
    implementation: {
        [key: string]: any;
    };
    path: string;
}
export declare class Convertor {
    private _requestFields;
    private _logger;
    private _entityType;
    private _version;
    private _entities;
    private _injections;
    private _map;
    private _keysMapLeft;
    private _keysMapRight;
    private _typedMap;
    convert(JSON: any, injections?: string[], adTypes?: IAdvancedTypeDeclaration | null): Promise<string>;
    private _getBase;
    private _isTargetRequest;
    private _restoreStructure;
    private _getMap;
    private _getProtocolSignature;
    private _getInitialization;
    private _getGlobalExport;
    private _getTypes;
    private _getEntities;
    private _validateEntities;
    private _findEntityWithRefImpl;
    private _findEntityByPath;
    private _getPathToRef;
    private _findRefImpl;
    private _getClassConstructor;
    private _getOwnArguments;
    private _getParentsArguments;
    private _getClassChain;
    private _getClassImplementation;
    private _getDescriptionEntity;
    private _getTypedMap;
    private _setTypedMap;
    private _getEntityTypedMap;
    private _setKeysMap;
    private _getKeysMaps;
    private _getImplementation;
}
