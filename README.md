# Ceres Typescript protocol generator for network usage
Generates protocol description (typescript) from JSON sources. Allows convert packages to binary data or simple JSON format.

# What ceres.protocol does?
If you have almost any kind of communication between parts of your application (solution) ceres.protocol could be intresting and useful because:
- a developer can describe all messages/events of a system as an easily readable JSON format. It allows describe communication in one file (or several bound files) and generates protocol from it for all parts of a system (solution). No more pieces of data in different parts of the application - everything in one place.
- for each message/event could be defined types of properties. Ceres.protocol will check types on fly and prevent any not valid messages/events.
- according to the previous point, ceres.protocol prevents any errors/bugs, which comes from incorrect type or format of messages/events
- developer doesn't need anymore to care about parsers of data - ceres.protocol will cares about it
- ceres.protocol encodes packages into binary data - it will make the load on traffic much less

# Benifits of ceres.protocol
- the generated protocol doesn't need any additional libraries (even ceres.protocol library) to work. All developer need to do: generate and use.
- ceres.protocol allows adding advanced types of data (to inject addition validation procedures)
- ceres.protocol creates binary packages to safe traffic.
- ceres.protocol validates data on all steps: generating data, encoding data and decoding. Such strict politic allows prevent appearing any incorrect messages in the communication process and allows developer "catch" it on generating step.
- the developing process became much easier because all properties (and types of it) will be highlighted by IDE. A developer should not "back" to documentation if he forgot what some message include - IDE will show all available properties of an entity.

# Table of content

- [Ceres Typescript protocol generator for network usage](#ceres-typescript-protocol-generator-for-network-usage)
- [What ceres.protocol does?](#what-ceresprotocol-does)
- [Benifits of ceres.protocol](#benifits-of-ceresprotocol)
- [Table of content](#table-of-content)
- [Installation](#installation)
- [Example of usage](#example-of-usage)
- [Documentation](#documentation)
  - [Syntax](#syntax)
    - [JSON format](#json-format)
    - [Optional properties](#optional-properties)
    - [Inheritance](#inheritance)
  - [Primitive types](#primitive-types)
  - [Type aliases](#type-aliases)
  - [Advanced types](#advanced-types)
  - [Enums](#enums)
  - [Classes / objects as type](#classes--objects-as-type)
  - [Usage "instanceof"](#usage-%22instanceof%22)
  - [Nested sources (findin)](#nested-sources-findin)
- [Encode / decode](#encode--decode)
  - [Encode](#encode)
  - [Decode](#decode)
- [Protocol API](#protocol-api)
  - [Access to API](#access-to-api)
  - [Methods](#methods)
- [CLI (generate protocol implementation)](#cli-generate-protocol-implementation)
- [Network usage tips](#network-usage-tips)
  - [Multiple packets](#multiple-packets)
  - [Debug mode](#debug-mode)

# Installation
> **Note**: in most cases, you will not need ceres.protocol as a dependency, because generated protocol implementation already has everything it needs to work. 

Install locally
```
npm install ceres.protocol --save-dev
```
Or global installation (the recommended way)
```
npm install ceres.protocol --global
```

# Example of usage

Let's create a simple chat message entity. Create file "chat.message.json" and put the next code there:
```
{
    "Message": {
        "clientId"  : "string",
        "guid?"     : "guid",
        "message"   : "string",
        "created"   : "datetime"
    },
    "version": "0.0.1"
}
```

As you can see this is a simple JSON format. A few notes:
- simbol "?" in field "guid?" means the same as in TypeScript - this property can be defined or can be postponed. 
- left side - name of property; right - a type of property. For example "clientId" should be a "string".
- Ceres.Protocol supports custom types. For example, you can see the type "guid". This is string with unique value like "XXX-xxx-xxx-xxx". 

Before generate your first protocol you should install ceres.protocol with `npm install ceres.protocol --save-dev` or `npm install ceres.protocol -g` if you want to have it global.

> You never will need ceres.protocol library in producation, generated protocol files already has everything to work. So, install ceres.protocol globally or use npm flag `--save-dev`

Time to generate protocol. If you install ceres.protocol locally:
```
./node_modules/.bin/ceres.protocol -s ./chat.message.json -o ./simple.ts -r
```
And if ceres.protocol installed globably
```
ceres.protocol -s ./chat.message.json -o ./simple.ts -r
```

A few notes here:
- flag `-s` or `--source` next after you should define path to JSON source file
- flag `-o` or `--output` next after you should define path and name of TypeScript output file
- flag `-r` or `--replace` tells ceres.protocol to overwrite output-file if it exists.
- flag `-a` or `--advanced` path to TS (TypeScript) file with definitions of advanced types.
- flag `-ac` or `--advanced-compiled` path to compiled JS file of TS (TypeScript) file with definitions of advanced types

> Note: keys `-a` and `-ac` can be used only together. 


That's all! We can start use out generated protocol. Create "chat.message.ts" and try it:

![Example][example]

[example]: https://github.com/DmitryAstafyev/ceres.protocol/blob/master/docs/assets/example_0.gif?raw=true "example"

Benifits here:
- you have tips with a description of properties, which has class "Message". 
- you have type checks, not only on TypeScript: ceres.protocol will check/valid types for all properties automatically and will throw an exception if something will be wrong.
  
So, basically "ceres.protocol" based on our JSON file creates class Message:
```typescript
class Message {

    public message: string;
    public created: Date;
    public clientId: string;
    public guid?: string;

}
```

Now you able to create a chat message, pack it and send. Let's pack it:

```typescript
import * as Protocol from './simple';

const message: Protocol.Message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'some message here'
});

// Convert our message to binary
const bytes: Uint8Array | string = message.stringify();
// Create buffer if we need it
const buffer = Buffer.from(bytes.buffer);
// Send binary data somewhere
```

Our message will be converted to data like:
```
64 79 00 00 00 0b 5f 5f 73 69 67 6e 61 74 75 72 65 09 08 00 00 00 37 30 44 31 43 38 41 32 01 61 0a 0b 00 00 00 78 78 78 2d 78 78 78 2d 78 78 78 01 62 ...
```

Basicaly within each package, which we are sending, we can safe 20-30% of trafic.

Probably you already notices: method `stringify` could return also "string". You can switch (on fly) your protocol to debug mode and in this case `stringify` will return JSON-string.  

> This is very useful to debug your app because you will see the content of all your messages.

Let's do it:
```typescript
... cut ...

// Convert our message to binary
const bytes: Uint8Array | string = message.stringify();
// Create buffer if we need it
const buffer = Buffer.from(bytes.buffer);
// Show result in console
console.log(buffer);
// Switch protocol to debug
Protocol.Protocol.state.debug(true);
const JSONString: Uint8Array | string = message.stringify();
// Show result in console
console.log(JSONString);
```

As you can see we switched protocol into debug-mode and now converted message looks like:

```
{"__signature":"70D1C8A2","clientId":"xxx-xxx-xxx","guid":"B297B8EE-1585-250A-FD48-1E166DA285DC","message":"some message here","created":1550338257713}
```

Again, this is useful to debug your application. And you already can compare the size of the string result and buffer. 

Time to decode our message back.

```typescript
import * as Protocol from './simple';

const message: Protocol.Message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'some message here'
});

// Convert our message to binary
const bytes: Uint8Array | string = message.stringify();
//Decode message from bytes to instance
const decodedMessage: Protocol.TProtocolTypes | Error = Protocol.parse(bytes);

if (decodedMessage instanceof Protocol.Message) {
    console.log('Message was gotten');
}
```

Comments:
- method `parse` will recognize your message and return an instance of it (an instance of class Message)
- method `parse` returns always instances of classes, but not JSON objects. So it allows you to check message as `decodedMessage instance of Protocol.Message`. It makes the code more clear.
- method `parse` will validate income data and if something wrong will return an error. It means if a package will be "broken" and property "clientId" will be missed, `parse` will return an error.

# Documentation
## Syntax
### JSON format
Ceres.protocol as sources file uses a simple JSON format. Each property can be:
- definition of `primitive value`: string, datetime etc.
- definition of `class` 
- definition of `enum`
- definition of `array`

```
{
    /* Class Message */
    "Message": {
        "clientId"  : "string",         /* primitive {string} value */
        "messageId" : "string",         /* primitive {string} value */
        /* Class ChatMessage */
        /* inherit properties "clientId" and "messageId" from parent class Message */
        "ChatMessage": {
            "text": "string",           /* primitive {string} value */
            "type": "ChatMessageType",  /* primitive reference to enum */
            "sent": "datetime",         /* primitive {datetime} value */
            "targetUserId": "string"    /* primitive {string} value */
        },
        /* Class Users */
        /* inherit properties "clientId" and "messageId" from parent class Message */
        "Users": {
            "users": "Array<User>"      /* Array of instances of User class */
        }
    },
    /* Class User */
    "User": {
        "firstName": "string",          /* primitive {string} value */
        "lastName": "string",           /* primitive {string} value */
        "nickname": "string",           /* primitive {string} value */
        "email": "string"               /* primitive {string} value */
    },
    /* Definition on enum */
    "ChatMessageType": ["public", "private"]
}
```

> Note: ceres.protocol supports commends `/* your comment here */`. 

| Type | Available values | Description / Rules | Usage / Definition in JSON scheme |
| --- | --- | --- | --- |
| **Primitive type** | utf8String;<br/>asciiString;<br/>int8;<br/>int16;<br/>int32;<br/>uint8;<br/>uint16;<br/>uint32;<br/>float32;<br/>float64;<br/>boolean | All data of protocol will be converted into primitive type only. It's basic types, which are used for encode/decode operations.<br/><br/>Name of primitive type **always** starts from lowercase.| ```{ "name_of_prop": "type" }```<br/>for example:<br/>```{ "nickname": "asciiString" }```<br/>Using in array:<br/>```{ "bytes": "Array<uint8>" }```|
|**Alias to primitive type** | datetime<br/>string<br/>integer<br/>float<br/>byte | This is just a reference to primitive type. Aliases used just to make JSON scheme easy to read.<br/><br/>Name of alias type **always** starts from lowercase.| ```{ "name_of_prop": "type" }```<br/>for example:<br/>```{ "nickname": "datetime" }```<br/>Using in array:<br/>```{ "bytes": "Array<byte>" }```|
| **Class** | All defined in JSON scheme | Each object in JSON scheme is a class on protocol level. <br/><br/>Name of class type **always** starts from **uppercase**.| ```{ "Name_of_class_from_UPPERCASE": { ... } }```<br/>for example:<br/>```{ "User": { "name": "string", "age": "int8" } }```<br/>Reference to class<br/>```{ "user": "User" }```<br/>Using in array:<br/>```{ "users": "Array<User>" }```|
| **Enum** | All defined in JSON scheme | Enums are used to list in protocol available values of some property. Protocol automatically validates values and throw exception if value isn't correct. <br/><br/>Name of enum type **always** starts from **uppercase**.<br/><br/>Diffrence between class and enum is: **class** - is a object; **enum** - is array of values. <br/><br/> | ```{ "Name_of_enum_from_UPPERCASE": string[] }```<br/>for example:<br/>```{ "ErrorsCodes": ["FAIL_CONNECTION", "FAIL_LOGIN", "USER_NOT_FOUND"] }```<br/>Reference to enum<br/>```{ "error": "ErrorsCodes" }```<br/>Using in array:<br/>```{ "errors": "Array<ErrorsCodes>" }```|

> **Note**. To define class or enum you should start name of property from **UPPERCASE**.
> **Note**. To define an array you should use key-word `Array<type>` from **UPPERCASE**.

### Optional properties

With symbol `?` you can define property, which can be ignored (to be not defined)
```
{
    "Message": {
        "clientId"  : "string",
        "guid?"     : "guid",           /* This property is optional. If it will not be defined ceres.protocol will not throw exception*/
        "message"   : "string",
        "created"   : "datetime"
    },
    "version": "0.0.1"
}
```

### Inheritance
Each object in JSON is a class. Each nested object in JSON is a class, which include properties on the parent object.

```
{
    "Entity_A": {
        "prop_a": "string",
        "prop_b": "string",
        "Entity_B": {
            "prop_b_a": "string",
            "prop_b_b": "string",
            "Entity_C": {
                "prop_c_b_a": "string",
                "prop_c_b_b": "string"
            }
        }
    }
}
```

From this JSON will be genereated next classes:

```typescript
class Entity_A {
    public prop_a: string;
    public prop_b: string;
}

class Entity_B extends Entity_A {
    public prop_b_a: string;
    public prop_b_b: string;
}

class Entity_C extends Entity_B {
    public prop_c_b_a: string;
    public prop_c_b_b: string;
}
```

To avoid inheritance you can:
- put a definition of entity into root-segment
- use symbol `@` in the name of property

```
{
    "Entity_A": {
        "prop_a": "string",
        "prop_b": "string",
        "Entity_B": {
            "prop_b_a": "string",
            "prop_b_b": "string",
            /* Using symbol @ to tell ceres.protocol: Entity_C class should NOT inherence properties from parents */
            "@Entity_C": {
                "prop_c_b_a": "string",
                "prop_c_b_b": "string"
            }
        }
    }
}
```

As result:
```typescript
class Entity_A {
    public prop_a: string;
    public prop_b: string;
}

class Entity_B extends Entity_A {
    public prop_b_a: string;
    public prop_b_b: string;
}

// Class Entity_C doesn't include properties of Entity_A and Entity_B
class Entity_C {
    public prop_c_b_a: string;
    public prop_c_b_b: string;
}
```

## Primitive types
Ceres.protocol supports next primitives types:

| Type | Value Range | Description | Size, bytes |
| --- | --- | --- | --- |
| utf8String |  | string in UTF8 coding | x |
| asciiString |  | simple ascii string | 1 symbol - 1 byte |
| int8 | -128 to 127 | | 1 |
| int16 | -32768 to 32767 | | 2 | 
| int32 | -2147483648 to 2147483647 | | 4 |
| uint8 | 0 to 255 | | 1 |
| uint16 | 0 to 65535 | | 2 |
| uint32 | 0 to 4294967295 | | 4 |
| float32 | 1.2x10<sup>-38</sup> to 3.4x10<sup>38</sup> | | 4 |
| float64 | 5.0x10<sup>-324</sup> to 1.8x10<sup>308</sup> | | 8 |
| boolean | | | 1 |

## Type aliases
Ceres.protocol uses a few refs to primitive types, just to make JSON sources a little bit easy read.

| Alias (used in JSON description) | Actual primitive type |
| --- | --- |
| string | utf8String |
| integer | int32 |
| float | float64 |
| byte | int8 |


## Advanced types
Advanced type incudes:
- generator of value (like "guid" will generates unique GUID)
- parser (to encode/decode during packaging data)
- validator

By default ceres.protocol include a few advanced types. 

| Alias | Primitive type | Description  |
| --- | --- | --- |
| guid | asciiString | automatically generate unique GUID |
| datetime | uint32 | Javascript Date type |


Ceres.protocol allows eeasy add your own types. Let's do it with next example.

Let's make new sources file. Name it **protocol.advanced.json**
```
{
    "User": {
        "firstname": "string",
        "lastname": "string",
        "email": "email"
    },
    "version":"0.0.1"
}
```

Ok. We created simple class User, which includes **"firstname"**, **"lastname"** and **"email"**. But pay your attention to **"email"**. It has type "email". If you will try to generate now protocol 

```
ceres.protocol -s ./advanced.json -o advanced.ts -r
```
you will see an error:

```
Error converting: 
 Cannot parse prop "email" due error: unknown primitive / generic type "email". Available types: uint8, uint16, uint32, int8, int16, int32, float32, float64, string, integer, float, boolean, datetime, guid. To define reference to class, use uppercase for the first letter.
```

This is because type `email` doesn't exist.

Let's create it. Create new file **advanced.types.ts** with next code:

```typescript
export const AdvancedTypes: { [key:string]: any} = {
    email: {
        // Binary type or primitive type
        binaryType  : 'asciiString',
        // Initialization value. This value is used as default value
        init        : '""',
        // Parse value. We should not do any extra decode operations with it
        parse       : (value: string) => { return value; },
        // Also we should not do any encoding operations with it
        serialize   : (value: string) => { return value; },
        // Typescript type
        tsType      : 'string',
        // Validation function to valid value
        validate    : (value: string) => { 
            if (typeof value !== 'string'){
                return false;
            }
            if (value.trim() === '') {
                // Initialization value is "''", so we allow use empty string.
                return true;
            }
            const validationRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
            return validationRegExp.test(value);
        },
    }
};
```
Let's generate our protocol now:

```
ceres.protocol -s ./advanced.json -o advanced.ts -a advanced.types.ts -ac advanced.types.js -r
```

> Note: to include your advanced types into protocol via CLI you should compile before TS file to JS. As you can see we are used key `-a` to define TS file with declaration of advanced types and key `-ac` to define path to JS file.

Also you can generate protocol with advanced types programicaly. In this case you do not need compile your TS file to JS. Let's do it. Create file **advanced.type.example.ts** with next content:

```typescript
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
```
That's all. We just created protocol with type **email**. Let's try it:

```typescript
import * as Protocol from './protocol.advanced';

const user: Protocol.User = new Protocol.User({
    firstname: 'Brad',
    lastname: 'Pitt',
    email: 'not_valid_email'
});

console.log(user);
```

Oops. In concole we can see error:

```
Error: Cannot create class of "User" due error(s):
        - Property "email" has wrong value; validation was failed with value "not_valid_email".
```
This is very ***important***: protocol prevent creating wrong (not valid) entity. Wrong entity will not go into network, will not used in system and will not "create" new bugs in system.

Let's try with valid email

```typescript
import * as Protocol from './protocol.advanced';

const user: Protocol.User = new Protocol.User({
    firstname: 'Brad',
    lastname: 'Pitt',
    email: 'fake@email.com'
});

console.log(user);
```

Everything works.

```typescript
User {
  __signature: '3B609EF0',
  firstname: 'Brad',
  lastname: 'Pitt',
  email: 'fake@email.com' }
```

## Enums

> **Note**. To define class or enum you should start name of property from **UPPERCASE**.

In many cases we should define a state of something as a string constant. Enum is a great thing to do it. Let's create a simple protocol description.

```
{
    "Message": {
        "clientId"  : "asciiString",
        "guid?"     : "guid",
        "Handshake": {
            "allowed"   : "boolean",
            "error?"    : "string",
        }
    },
    "ConnectionError": {
        "reason": "Reasons",
        "message": "string",
        "Reasons": ["FAIL_AUTH", "NO_TOKEN_FOUND", "NO_CLIENT_ID_FOUND", "NO_TOKEN_PROVIDED", "TOKEN_IS_WRONG"]
    },
    "version": "0.0.1"
}
```

As you can see, we have "ConnectionError" entity, which has property "reason". Value of "reason" can be only one of defined in "Reasons". In typescript it looks like:

```typescript
enum Reasons {
    FAIL_AUTH = 'FAIL_AUTH',
    NO_TOKEN_FOUND = 'NO_TOKEN_FOUND',
    NO_CLIENT_ID_FOUND = 'NO_CLIENT_ID_FOUND',
    NO_TOKEN_PROVIDED = 'NO_TOKEN_PROVIDED',
    TOKEN_IS_WRONG = 'TOKEN_IS_WRONG'
}

class ConnectionError {

    public reason: Reasons;
    public message: string;

}
```

Ceres.protocol will check values during creating entity "ConnectionError" and prevent not valid value of property "reason". Also, it makes a life of developer much easier.

![Example][example_1]

[example_1]: https://github.com/DmitryAstafyev/ceres.protocol/blob/master/docs/assets/example_1.gif?raw=true "example"

## Classes / objects as type

> **Note**. To define class or enum you should start name of property from **UPPERCASE**.

In many cases we would like to have a way to define some kind of object (class). Take a look on next example.

```
{
    "Message": {
        "clientId"  : "asciiString",
        "guid?"     : "guid",
        "Handshake" : {
            "allowed"   : "boolean",
            "error?"    : "ConnectionError"
        },
        "GetUsersList"  : {
            "users"     : "Array<User>"
        }
    },
    "User": {
        "firstname" : "string",
        "lastname"  : "string",
        "email"     : "asciiString"
    },
    "ConnectionError": {
        "reason"    : "Reasons",
        "message"   : "string",
        "Reasons"   : ["FAIL_AUTH", "NO_TOKEN_FOUND", "NO_CLIENT_ID_FOUND", "NO_TOKEN_PROVIDED", "TOKEN_IS_WRONG"]
    },
    "version": "0.0.1"
}
```

Message "**GetUsersList**" should delivery list of users. Each user is an instance of class **User**. Everything you need - define object "**User**" on same level (where you are using it or on upper level to get possibility to use it with other messages).

Try to generate protocol with this sources and you will get protocol implementation:

```typescript
import * as Protocol from './protocol';

const user: Protocol.User = new Protocol.User({
    firstname: 'Brad',
    lastname: 'Pitt',
    email: 'fake@email.com'
});

const usersListResponse: Protocol.Message.GetUsersList = new Protocol.Message.GetUsersList({
    users: [user],
    clientId: ''
});
```

## Usage "instanceof"
In most cases **instanceof** will show you expected result.

```typescript
import * as Protocol from './simple';

const message: Protocol.Message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'some message here'
});

// Convert message to binary
const bytes: Uint8Array | string = message.stringify();
//Decode message from bytes to instance
const decodedMessage: Protocol.TProtocolTypes | Error = Protocol.parse(bytes);

console.log(decodedMessage instanceof Protocol.Message); // true

if (decodedMessage instanceof Protocol.Message) {
    // instanceof works as expected
    console.log('Message was gotten');
}
```

But if you create NPM module (just as example), which also include implementation of your protocol (not as **peerDependency**, but as simple **dependency**), **instanceof** will not work anymore. 

```typescript
// We get protocol from application sources
import * as Protocol from './simple';
// We get SAME protocol from "external" module
import { LibProtocol } from 'some_npm_module';

const message: Protocol.Message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'some message here'
});

// Convert message to binary
const bytes: Uint8Array | string = message.stringify();

// NOTE: we are decoding message using protocol from "external" module
const decodedMessage: LibProtocol.TProtocolTypes | Error = LibProtocol.parse(bytes);

console.log(decodedMessage instanceof Protocol.Message); // false
console.log(decodedMessage instanceof LibProtocol.Message); // true
```

Both protocols (**Protocol** and **LibProtocol**) are same, but in scope of javascript - not. To prevent possible issues you can use static method **instanceOf**. This method is available with all classes of protocol implementation. Let's see on same example:

```typescript
// ... cut ...

const decodedMessage: LibProtocol.TProtocolTypes | Error = LibProtocol.parse(bytes);

console.log(Protocol.Message.instanceOf(decodedMessage));       // true
console.log(LibProtocol.Message.instanceOf(decodedMessage));    // true
```
Now everything is correct.

## Nested sources (findin)
In some cases to make code easy to read better to split JSON description into a few files. It's possible with ceres.protocol via very simple synax:

```
{
    /* Attach description of State section*/
    "State:findin": "protocol.state.json",
    /* Attach description of Data section*/
    "Data:findin": "protocol.data.json",
    /* Description of message section */
    "Message": {
        "clientId"  : "asciiString",
        "guid?"     : "guid",
        "Handshake": {
            "Response": {
                "allowed"   : "boolean",
                "reason?"   : "Reasons",
                "error?"    : "string",
                "Reasons"   : ["FAIL_AUTH", "NO_TOKEN_FOUND", "NO_CLIENT_ID_FOUND"]
            }
        },
    },
    "ConnectionError": {
        "reason": "array<Reasons>",
        "message": "string",
        "Reasons": ["FAIL_AUTH", "NO_TOKEN_FOUND", "NO_CLIENT_ID_FOUND", "NO_TOKEN_PROVIDED", "TOKEN_IS_WRONG"]
    },
    "Disconnect": {
        "reason": "Reasons",
        "message": "string",
        "Reasons": ["SHUTDOWN"]
    },
    "version": "0.0.1"
}
```

With keyword **findin** we can tell ceres.protocol where it should find definitions of entity.

# Encode / decode
Ceres.protocol was developed for network. Each entity (instance of class) can be encoded to be sent via network.

Let's create a simple chat message entity. Create file "chat.message.json" and put the next code there:
```
{
    "Message": {
        "clientId"  : "string",
        "guid?"     : "guid",
        "message"   : "string",
        "created"   : "datetime"
    },
    "version": "0.0.1"
}
```

Generate protocol from this sources. If you install ceres.protocol locally:

```
./node_modules/.bin/ceres.protocol -s ./chat.message.json -o ./simple.ts -r
```
And if ceres.protocol installed globably
```
ceres.protocol -s ./chat.message.json -o ./simple.ts -r
```
## Encode
Now you able to create a chat message amd encode it:

```typescript
import * as Protocol from './simple';

const message: Protocol.Message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'some message here'
});

// Convert (encode) our message to binary
const bytes: Uint8Array | string = message.stringify();
// Create buffer if we need it
const buffer = Buffer.from(bytes.buffer);
// Send binary data somewhere
```

Our message will be converted to data like:
```
64 79 00 00 00 0b 5f 5f 73 69 67 6e 61 74 75 72 65 09 08 00 00 00 37 30 44 31 43 38 41 32 01 61 0a 0b 00 00 00 78 78 78 2d 78 78 78 2d 78 78 78 01 62 ...
```

Basicaly within each package, which we are sending, we can safe 20-30% of trafic.

To debug your application it could be useful to see in network trafic not binary data, but readble text data. To do it, you can switch protocol into **debug** mode.

Let's do it:
```typescript
... cut ...

// Switch protocol to debug
Protocol.Protocol.state.debug(true);
// Convert (encode) message
const JSONString: Uint8Array | string = message.stringify();
// Show result in console
console.log(JSONString);
```

As you can see we switched protocol into **debug** mode and now converted message looks like:

```
{"__signature":"70D1C8A2","clientId":"xxx-xxx-xxx","guid":"B297B8EE-1585-250A-FD48-1E166DA285DC","message":"some message here","created":1550338257713}
```

Again, this is useful to debug your application. And you already can compare the size of the string result and buffer. 

## Decode
Protocol will automaticaly recognize message (never mind is it binary or string (in debug mode)). All you need: call method **parse** from instance of your Protocol.

> Note: you should use **same** protocol implementation, which was used to generate and encode message.

```typescript
import * as Protocol from './simple';

const message: Protocol.Message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'some message here'
});

// Convert our message to binary
const bytes: Uint8Array | string = message.stringify();
//Decode message from bytes to instance
const decodedMessage: Protocol.TProtocolTypes | Error = Protocol.parse(bytes);

if (decodedMessage instanceof Protocol.Message) {
    console.log('Message was gotten');
}
```

You can use global method **parse** or bound method:

```typescript
// Decode using global method "parse"
const decodedMessage: Protocol.TProtocolTypes | Error = Protocol.parse(bytes);

// Decode using bound method "parse"
const decodedMessage: Protocol.TProtocolTypes | Error = Protocol.Message.parse(bytes);

```
# Protocol API
The major benefit of ceres.protocol - you don't need ceres.protocol library to use generated protocol. All you need already will be included in protocol implementation. 

That's why you never need to install ceres.protocol as a dependency, will be enough to add it as developer dependency. 

## Access to API
After your protocol implementation is generated you have access to API:
```typescript
import * as Protocol from './simple';

// Access to defitions of entities:
const message: Protocol.Message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'some message here'
});

const someBinaryData = [...];

// Access to protocol API
const decoded = Protocol.parse(someBinaryData);
```

## Methods

| Name | Arguments | Description |
| --- | --- | --- |
| parse | parse(**source**: *TIncomeData*, **target**?: *any*): *any* | Will try to convert source into instance of entity from current implementation of protocol. |
| parseFrom | parseFrom(**source**: *TIncomeData*, **protocols**: *any* \| *any[]*): *any* | Work same like method **parse**, but looking for implementation of entity not only in current implementation of protocol, but also in protocols listed in argument protocols: *Protocols[]* |
| stringify | stringify(**target**: *any*, **classRef**: *any*): *string* \| *Uint8Array* \| *Error*  | Convert (encode) entity to package (binary or string in debug mode). It doesn't make sence to use this method globaly, better call it from instance of entity: ```message.stringify();``` |
| join | join(...**items**: *any[]*): *string* \| *Uint8Array* \| *Error* | This method will be useful if you need pack a few protocol packets into one. |
| split | split(**source**: *string* \| *Uint8Array*): *string[]* \| *Uint8Array[]* \| *Error* | Allows split package (with a few protocol packets) |
| isPackage | isPackage(**source**: *any*): *boolean* | Checks is defined source package (has a few protocol packets) or single protocol packet |


# CLI (generate protocol implementation)

If you install ceres.protocol locally:
```
./node_modules/.bin/ceres.protocol -s path_and_name_of_JSON_file -o ./path_and_name_of_result_TS_file
```
And if ceres.protocol installed globably
```
ceres.protocol -s path_and_name_of_JSON_file -o ./path_and_name_of_result_TS_file
```

Flags:
- flag `-s` or `--source` next after you should define path to JSON source file
- flag `-o` or `--output` next after you should define path and name of TypeScript output file
- flag `-r` or `--replace` tells ceres.protocol to overwrite output-file if it exists.

# Network usage tips
## Multiple packets 
It could be you will need to send not one single packet, but a few of them. If you will join packets manually you will lose a possibility to decode it. But you can easily do it with protocol implementation.

```typescript
import * as Protocol from './simple';

// Create message A
const messageA: Protocol.Message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'message A'
});

// Create message 2
const messageB: Protocol.Message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'message B'
});

// Create package
const packageOfData = Protocol.join(
    messageA.stringify(),
    messageB.stringify()
);

// Now we can send somewhere both messages in one package
```

For example on server side we can unpack our messages:
```typescript
import * as Protocol from './simple';

let packets: any[] = [];

// Check: is income data package or not
if (Protocol.isPackage(packageOfData)) {
    // Yes, this is package
    packets = Protocol.split(packageOfData);
} else {
    // No, this is single packet
    packets = [packageOfData];
}

// Decode all
const decoded: any[] = packets.map((packet: any) => {
    return Protocol.parse(packet);
});
```
## Debug mode
To switch protocol into **debug** mode you should do next:
```typescript
import * as Protocol from './simple';
// Switch protocol to debug
Protocol.Protocol.state.debug(true);
```
After you switching into debug mode, all message will be convereted into string. It will allow you to see messages in network trafic as readble text messages. Like it:

```
{"__signature":"70D1C8A2","clientId":"xxx-xxx-xxx","guid":"B297B8EE-1585-250A-FD48-1E166DA285DC","message":"some message here","created":1550338257713}
```

