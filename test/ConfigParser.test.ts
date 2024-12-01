import ConfigParser from "../src/ConfigParser";
import * as assert from 'assert';

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

const sconfig = new ConfigParser();
sconfig.read(configStr);

assert.strictEqual(sconfig.get('webserver', 'port'), '8080');
assert.strictEqual(sconfig.get('webserver', 'host'), 'localhost');
assert.strictEqual(sconfig.get('database', 'user'), 'testuser');
console.log('Passed');

console.log("Test 2: Config file reader");
const fconfig = new ConfigParser();
fconfig.readFile('main.config');
assert.strictEqual(fconfig.get('webserver', 'port'), '80');
assert.strictEqual(fconfig.get('webserver', 'host'), 'google');
assert.strictEqual(fconfig.get('database', 'user'), 'fileuser');
console.log('Passed');


console.log("Test 3: Config file scanner and reader");
const fsconfig = new ConfigParser();
fsconfig.readFile();
assert.strictEqual(fsconfig.get('webserver', 'port'), '80');
assert.strictEqual(fsconfig.get('webserver', 'host'), 'google');
assert.strictEqual(fsconfig.get('database', 'user'), 'fileuser');
console.log('Passed');