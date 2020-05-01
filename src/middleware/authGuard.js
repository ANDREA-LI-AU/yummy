const { validateToken } = require('../utils/jwt');



module.exports = ( req, res, next ) => {
    const authHeader = req.header('Authorization');
    if (!authHeader ) return res.status(401).json('Access denied: NO auth header');

    const contentArr = authHeader.split( ' ' );
    if (contentArr.length !== 2 || contentArr[0] !== 'Bearer') //jwt bearer
    return res.status(401).json('Access denied: No jwt Brearer.');

    const decoded = validateToken(contentArr[1]); ////obtain payload.
    if (decoded) {
        req.user = decoded;
        return next();  
    }
    return res.status(401).json('Access denied: Invalid token.');
}