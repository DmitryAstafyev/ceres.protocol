# Ceres Typescript protocol generator for network usage
Generates protocol description (typescript) from JSON sources. Allows convert packages to binary data or simple JSON format.

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
- left side - naa me of property; right - a type of property. For example "clientId" should be a "string".
- Ceres.Protocol supports custom types. For example, you can see the type "guid". This is string with unique value like "XXX-xxx-xxx-xxx". 

Before generate your first protocol you should install ceres.protocol with `npm install ceres.protocol --save-dev` or `npm install ceeres.protocol -g` if you want to have it global.

> You never will need ceres.protocol library in producation, generated protocol files already has everything to work. So, install ceres.protocol globally or use npm flag `--save-dev`

Time to generate protocol. If you install ceres.protocol locally:
```
./node_modules/.bin/ceres -s ./chat.message.json -o ./simple.ts -r
```
And if ceres.protocol installed globably
```
ceres -s ./chat.message.json -o ./simple.ts -r
```

A few notes here:
- flag `-s` or `--source` next after you should define path to JSON source file
- flag `-o` or `--output` next after you should define path and name of TypeScript output file
- flag `-r` or `--replace` tells ceres.protocol to overwrite output-file if it exists.

That's all! We can start use out generated protocol. Create "chat.message.ts" and try it:

[gif]: https://github.com/DmitryAstafyev/ceres.protocol/raw/master/docs/assets/example_0.gif


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

Probably you already notices: method `stringify` could return also "string". You can switch (on fly) you protocol to debug mode and in this case `stringify` will return you JSON-string.  

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
    "ChatMessageType": ["public", "prrivate"]
}
```

> Note: ceres.protocol supports commends `/* your comment here */`. 

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
Type | Value Range | Description | Size, bytes
--- | --- | --- | ---
utf8String |  | string in UTF8 coding | x
asciiString |  | simple ascii string | 1 symbol - 1 byte
int8 | -128 to 127 | | 1
int16 | -32768 to 32767 | | 2 
int32 | -2147483648 to 2147483647 | | 4
uint8 | 0 to 255 | | 1
uint16 | 0 to 65535 | | 2
uint32 | 0 to 4294967295 | | 4
float32 | 1.2x10<sup>-38</sup> to 3.4x10<sup>38</sup> | | 4
float64 | 5.0x10<sup>-324</sup> to 1.8x10<sup>308</sup> | | 8
boolean | | | 1

## Type aliases
Ceres.protocol uses a few refs to primitive types, just to make JSON sources a little bit easy read.
Alias (used in JSON description) | Actual primitive type 
--- | ---
string | utf8String
integer | int32
float | float64
byte | int8

## Advanced types
Advanced type incudes:
- generator of value (like "guid" will generates unique GUID)
- parser (to encode/decode during packaging data)
- validator

By default ceres.protocol include a few advanced types. 
Alias | Primitive type | Description 
--- | --- | ---
guid | asciiString | automatically generate unique GUID
datetime | uint32 | Javascript Date type

Ceres.protocol allows eeasy add your own types. Let's do it with next example.

Let's make new sources file. Name it *advanced.json*
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
ceres -s ./advanced.json -o advanced.ts -r
```
you will see an error:

```
Error converting: 
 Cannot parse prop "email" due error: unknown primitive / generic type "email". Available types: uint8, uint16, uint32, int8, int16, int32, float32, float64, string, integer, float, boolean, datetime, guid. To define reference to class, use uppercase for the first letter.
```

This is because type `email` doesn't exist.

Let's create it. Create new file **type.email.ts** with next code:

```typescript
export const AdvancedTypes: { [key:string]: any} = {
    email: {
        // Binary type or primitive type
        binaryType  : 'asciiString',
        // Initialization value. This value is used as default value
        init        : '',
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
