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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigParser_1 = __importDefault(require("../src/ConfigParser"));
const assert = __importStar(require("assert"));
// String reader
console.log("Test 1: Config string reader");
const configStr = `
[webserver]
host = localhost
port = 8080

[database]
user = testuser
password = testuserpwd
`;
const sconfig = new ConfigParser_1.default();
sconfig.read(configStr);
assert.strictEqual(sconfig.get('webserver', 'port'), '8080');
assert.strictEqual(sconfig.get('webserver', 'host'), 'localhost');
assert.strictEqual(sconfig.get('database', 'user'), 'testuser');
console.log('Passed');
console.log("Test 2: Config file reader");
const fconfig = new ConfigParser_1.default();
fconfig.readFile('main.config');
assert.strictEqual(fconfig.get('webserver', 'port'), '80');
assert.strictEqual(fconfig.get('webserver', 'host'), 'google');
assert.strictEqual(fconfig.get('database', 'user'), 'fileuser');
console.log('Passed');
console.log("Test 3: Config file reader");
const fsconfig = new ConfigParser_1.default();
fsconfig.readFile();
assert.strictEqual(fsconfig.get('webserver', 'port'), '80');
assert.strictEqual(fsconfig.get('webserver', 'host'), 'google');
assert.strictEqual(fsconfig.get('database', 'user'), 'fileuser');
console.log('Passed');
