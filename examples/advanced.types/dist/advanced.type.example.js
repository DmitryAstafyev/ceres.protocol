"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ceres_protocol_1 = require("ceres.protocol");
const advanced_types_1 = require("./advanced.types");
const Path = require("path");
const SOURCE_PROTOCOL_FILE = Path.resolve(__dirname, 'protocol.advanced.json');
const OUTPUT_PROTOCOL_FILE = Path.resolve(__dirname, 'protocol.advanced.ts');
const ADVANCED_TYPE_IMPL_FILE = Path.resolve(__dirname, 'advanced.types.ts');
const reader = new ceres_protocol_1.Reader();
// Step: 0 reading JSON file.
reader.read(SOURCE_PROTOCOL_FILE).then((json) => {
    const convertor = new ceres_protocol_1.Convertor();
    // Step 1: Converting JSON protocol to protocol implementation (typescript version of protocol)
    convertor.convert(json, [], {
        // Here we should provide reference to advanced types definitions
        implementation: advanced_types_1.AdvancedTypes,
        // Here we should provide path to file with advanced types definitions
        path: ADVANCED_TYPE_IMPL_FILE
    }).then((protocol) => {
        const builder = new ceres_protocol_1.Builder();
        // Step 2: Write protocol implementation file (typescript version of protocol)
        builder.write(OUTPUT_PROTOCOL_FILE, protocol, true).then(() => {
            console.log('Protocol is generated and saved');
        }).catch((e) => {
            console.log(`Fail to write protocol file due error: ${e.message}`);
        });
    }).catch((e) => {
        console.log(`Fail to convert protocol file due error: ${e.message}`);
    });
}).catch((e) => {
    console.log(`Fail to read protocol source file due error: ${e.message}`);
});
//# sourceMappingURL=advanced.type.example.js.map