const jwt = require ('jsonwebtoken');

const secret = 'long secret';

const token = ''

const valid = jwt.verify(token, secret);
//decode payload information.