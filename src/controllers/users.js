const User = require('../models/users');
const { generateToken } = require ('../utils/jwt');

async function addUser(req, res) {
    const { username, password, email } = req.body;
    const user = new User({
        username,
        password , 
        email
    });
    //using package express-async-error for error handling.
    await user.hashPassword();  //ha  sh function defined in schema
    await user.save();
    const token = generateToken( user );
    return res.json({ username, token });
}


module.exports = {
    addUser
}