const jwt = require('jsonwebtoken');

function generateToken( id ){
    const token = jwt.sign(
        { id }, process.env.JWT_KEY,{
            expiresIn:'1d' //token expired in one day.
        }
    );
    return token;
};
//id here can be an object.
//here we will generate a token for the whole user object


function validateToken( token ){
    let decoded;
    try{
        decoded = jwt.verify( token , process.env.JWT_KEY);
    } catch (e) {
        return null;
    }
    return decoded;
}
///check the result that if the token is correctly decoded.
///BY checking the return value of validateToken 

module.exports = { validateToken, generateToken }