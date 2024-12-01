"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Config {
}
class ConfigParser {
    constructor() {
        this.config = {};
    }
    read(configStr) {
        const lines = configStr.split("\n");
        let section = null;
        lines.forEach((line) => {
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
                if (key && value) {
                    this.config[section][key.trim()] = value.trim();
                }
            }
        });
    }
    readFile(filePath) {
        if (filePath) {
            try {
                const configStr = fs.readFileSync(filePath, 'utf-8');
                this.read(configStr);
            }
            catch (err) {
                throw new Error(`Error reading file ${filePath} - ${err}`);
            }
        }
        else {
            const defaultFilePath = path.join(process.cwd(), 'main.config');
            if (fs.existsSync(defaultFilePath)) {
                try {
                    const configStr = fs.readFileSync(defaultFilePath, 'utf-8');
                    this.read(configStr);
                }
                catch (err) {
                    throw new Error(`Error reading file ${filePath} - ${err}`);
                }
            }
            else {
                throw new Error("No main.config File Found!");
            }
        }
    }
    get(section, key) {
        var _a;
        return ((_a = this.config[section]) === null || _a === void 0 ? void 0 : _a[key]) || null;
    }
    set(section, key, value) {
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
}
exports.default = ConfigParser;
