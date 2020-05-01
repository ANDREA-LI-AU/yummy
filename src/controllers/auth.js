const User = require('../models/users');
const { generateToken } = require('../utils/jwt');

async function loginUser(req, res){
    const { username, password } = req.body;
    
    const existingUser = await User.findById( username ).exec();
    
    if (!existingUser){
        return res.status(401).json('invalid username or password.');
    }
    if ( await !existingUser.validatePassword(password)){
        return res.status(401).json('invalid username or password.')
    }

    const token = generateToken(existingUser);
    
    return res.json( { username, token }).send();
}

module.exports = {
    loginUser
};