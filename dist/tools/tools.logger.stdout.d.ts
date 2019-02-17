export interface IWritebleStreamCutted {
    write: (...args: any[]) => void;
}
export interface IArea {
    count: number;
    last: string;
}
export declare class StdoutController {
    private _areas;
    private _stream;
    constructor(stream: IWritebleStreamCutted);
    out(content: string, areaId?: string): void;
    private _outStream;
    private _outArea;
    private _redrawAreas;
    private _redrawAreasAfter;
    private _getAreasHeight;
    private _getHeightAfterArea;
}
