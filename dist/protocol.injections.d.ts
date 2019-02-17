export interface IInejection {
    content: string;
    file: string;
    path: string;
}
export declare class Injections {
    get(files: string[]): Promise<IInejection[]>;
    private _serialize;
}
