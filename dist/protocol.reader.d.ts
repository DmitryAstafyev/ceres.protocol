export declare class Reader {
    private _path;
    read(file: string): Promise<any>;
    private _getNested;
    private _clearComments;
    private _getJSONFromBuffer;
}
