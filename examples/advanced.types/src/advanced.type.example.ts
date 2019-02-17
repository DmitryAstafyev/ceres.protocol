import {
    // Creates protocol implementation from JSON
    Convertor,
    // Reads JSON sources files
    Reader,
    // Write/read files
    Builder
} from 'ceres.protocol';

import { AdvancedTypes } from './advanced.types';
import * as Path from 'path';

const SOURCE_PROTOCOL_FILE = Path.resolve(__dirname, 'protocol.advanced.json');
const OUTPUT_PROTOCOL_FILE = Path.resolve(__dirname, 'protocol.advanced.ts');
const ADVANCED_TYPE_IMPL_FILE = Path.resolve(__dirname, 'advanced.types.ts');

const reader: Reader = new Reader();
// Step: 0 reading JSON file.
reader.read(SOURCE_PROTOCOL_FILE) .then((json: any) => {
    const convertor: Convertor = new Convertor();
    // Step 1: Converting JSON protocol to protocol implementation (typescript version of protocol)
    convertor.convert(json, [], {
        // Here we should provide reference to advanced types definitions
        implementation: AdvancedTypes,
        // Here we should provide path to file with advanced types definitions
        path: ADVANCED_TYPE_IMPL_FILE
    }).then((protocol: string) => {
        const builder: Builder = new Builder();
        // Step 2: Write protocol implementation file (typescript version of protocol)
        builder.write(OUTPUT_PROTOCOL_FILE, protocol, true).then(() => {
            console.log('Protocol is generated and saved');
        }).catch((e: Error) => {
            console.log(`Fail to write protocol file due error: ${e.message}`);
        });  
    }).catch((e: Error) => {
        console.log(`Fail to convert protocol file due error: ${e.message}`);
    });
}).catch((e)=>{
    console.log(`Fail to read protocol source file due error: ${e.message}`);
});