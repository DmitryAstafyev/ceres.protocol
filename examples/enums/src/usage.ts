

import * as Protocol from './protocol';

const error: Protocol.ConnectionError = new Protocol.ConnectionError({
    reason: Protocol.ConnectionError.Reasons.FAIL_AUTH,
    message: 'wrong password or username'
});

