import * as Protocol from './protocol.advanced';

const user: Protocol.User = new Protocol.User({
    firstname: 'Brad',
    lastname: 'Pitt',
    email: 'not_valid_email'
});

console.log(user);