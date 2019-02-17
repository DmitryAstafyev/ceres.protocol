export declare class Builder {
    build(source: string, dest: string, replace?: boolean): Promise<void>;
    write(dest: string, content: string, replace?: boolean): Promise<void>;
}
