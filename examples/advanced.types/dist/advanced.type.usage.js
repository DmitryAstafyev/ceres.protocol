"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Protocol = require("./protocol.advanced");
const user = new Protocol.User({
    firstname: 'Brad',
    lastname: 'Pitt',
    email: 'not_valid_email'
});
console.log(user);
//# sourceMappingURL=advanced.type.usage.js.map