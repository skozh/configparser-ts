declare class ConfigParser {
    private config;
    private configFile;
    read(configStr: string): void;
    readFile(filePath?: string): void;
    get(section: string, key: string): string | null;
    set(section: string, key: string, value: string): void;
    toString(): string;
    write(filePath?: string): void;
}
export default ConfigParser;
