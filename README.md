# ConfigParser-TS

`ConfigParser-TS` is a TypeScript library that provides functionality to read, write, and manipulate configuration files similar to Python's `configparser` module.

## Features
- **Read Configuration Files**: Read configuration data from a string or file.
- **Write Configuration Files**: Write configuration data to a file.
- **Get/Set Configuration Values**: Retrieve and modify configuration values.
- **Support for Sections and Keys**: Handle configuration data structured with sections and keys.

## Installation

You can install `ConfigParser-TS` via npm:

```bash
npm install configparser-ts
```

## Usage

### Importing the Module

```typescript
import ConfigParser from 'configparser-ts';
```

### Reading from a String

```typescript
const configStr = `
[webserver]
host = localhost
port = 8080

[database]
user = testuser
password = testuserpwd
`;

const config = new ConfigParser();
config.read(configStr);

console.log(config.get('webserver', 'host')); // Output: localhost
console.log(config.get('webserver', 'port')); // Output: 8080
```

### Reading from a File

```typescript
const config = new ConfigParser();
config.readFile('path/to/config.file');

console.log(config.get('database', 'user')); // Output: testuser
```

### Writing to a File

```typescript
const config = new ConfigParser();
config.read(configStr);

config.set('webserver', 'host', '127.0.0.1');
config.write('path/to/output.file');
```

### Methods

- **read(configStr: string)**: Reads configuration from a string.
- **readFile(filePath?: string)**: Reads configuration from a specified file or from `main.config` in the current directory if no file path is specified.
- **get(section: string, key: string)**: Retrieves the value for a given section and key. Returns `null` if not found.
- **set(section: string, key: string, value: string)**: Sets the value for a given section and key.
- **toString()**: Returns the configuration data as a string.
- **write(filePath?: string)**: Writes the configuration data to a specified file or to the last read configuration file.

### Example Configuration File

Here's an example of a configuration file that `ConfigParser-TS` can read:

```plaintext
# Example configuration
[webserver]
host = localhost
port = 8080

[database]
user = testuser
password = testuserpwd
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
