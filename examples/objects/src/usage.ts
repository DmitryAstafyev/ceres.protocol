

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

