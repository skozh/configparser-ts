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
        try { 
            const configFilePath = filePath || path.join(process.cwd(), 'main.config'); 
            if (!fs.existsSync(configFilePath)) { 
                throw new Error('File not found') 
            } 
            const configStr = fs.readFileSync(configFilePath, 'utf-8'); 
            this.read(configStr); 
            this.configFile = configFilePath; 
        } catch (err) { 
            throw new Error(`Error reading file: ${err instanceof Error ? err.message : err}`); 
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
        try { const configFilePath = filePath || this.configFile; 
            if (!configFilePath) { 
                throw new Error('No config file provided');  
            } 
            fs.writeFileSync(configFilePath, this.toString(), 'utf-8'); 
        } catch (err) { 
            throw new Error(`Error writing file: ${err instanceof Error ? err.message : err}`); 
        }
    }
}

export default ConfigParser;