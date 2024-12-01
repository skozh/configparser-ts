import * as fs from 'fs';
import * as path from 'path';

class Config {
    [section: string]: {
        [key: string]: string;
    };
}

class ConfigParser {
    private config: Config = {};
    private configFile: string = '';

    read(configStr: string): void {
        const lines = configStr.split("\n");
        let section: string | null = null;

        lines.forEach((line: string) => {
            line = line.trim();

            if (line.startsWith('#')) {
                return;
            }

            if (line.startsWith('[') && line.endsWith(']')) {
                section = line.substring(1, line.length - 1);
                this.config[section] = {};
            }
            else if (section) {
                const [key, value] = line.split("=");
                if(key && value){
                    this.config[section][key.trim()] = value.trim();
                }
            }
        });
    }

    readFile(filePath?: string): void {
        if (filePath) {
            try{
                const configStr = fs.readFileSync(filePath, 'utf-8');
                this.read(configStr);
                this.configFile = filePath;
            } catch(err){
                throw new Error(`Error reading file ${filePath} - ${err}`);
            }
        } else {
            const defaultFilePath = path.join(process.cwd(), 'main.config');
            if (fs.existsSync(defaultFilePath)) {
                try{
                    const configStr = fs.readFileSync(defaultFilePath, 'utf-8');
                    this.read(configStr);
                    this.configFile = defaultFilePath;
                } catch(err){
                    throw new Error(`Error reading file ${defaultFilePath} - ${err}`);
                }
            } else {
                throw new Error("No main.config File Found!");
            }
        }
    }

    get(section: string, key: string): string | null {
        return this.config[section]?.[key] || null;
    }


    set(section: string, key: string, value: string): void {
        if (!this.config[section]) {
            this.config[section] = {};
        }
        this.config[section][key] = value;
    }

    toString() {
        let configStr = '';
        for (const section in this.config) {
            configStr += `[${section}]\n`;

            for (const key in this.config[section]) {
                configStr += `${key}=${this.config[section][key]}\n`;
            }
        }
        return configStr;
    }

    write(filePath?: string): void {
        if (!filePath && !this.configFile){
            throw new Error("No config file provided.")
        }
        else if(filePath){
            try{
                fs.writeFileSync(filePath, this.toString(), 'utf-8');
            }
            catch(err){
                throw new Error(`Cannot write to the config file ${filePath} - ${err}`);
            }
        }
        else if(this.configFile){
            try{
                fs.writeFileSync(this.configFile, this.toString(), 'utf-8');
            }
            catch(err){
                throw new Error(`Cannot write to the config file ${this.configFile} - ${err}`);
            }
        }

    }
}

export default ConfigParser;