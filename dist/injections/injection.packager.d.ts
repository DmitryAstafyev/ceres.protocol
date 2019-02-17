export declare namespace Packager {
    function join(...items: any[]): string | Uint8Array | Error;
    function split(source: string | Uint8Array): string[] | Uint8Array[] | Error;
    function isPackage(source: any): boolean;
}
