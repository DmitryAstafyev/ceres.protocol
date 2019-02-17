"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Protocol = require("./simple");
const message = new Protocol.Message({
    clientId: 'xxx-xxx-xxx',
    created: new Date(),
    message: 'some message here'
});
message.stringify();
console.log(message.stringify());
//# sourceMappingURL=simple.usage.js.map