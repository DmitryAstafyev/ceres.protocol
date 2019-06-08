export declare class Builder {
    build(source: string, dest: string, replace?: boolean, advancedTypeTS?: string, advancedTypeJS?: string): Promise<void>;
    write(dest: string, content: string, replace?: boolean): Promise<void>;
}
