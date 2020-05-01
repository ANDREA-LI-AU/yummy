// collectively handle all kinds of async errors while communicate with database.
// with express-async-errors

const responseFormatter = require('../utils/responseFormatter');

  
//   if (err.name === "ValidationError"){
//     return res.status(400).json("invalid email or username.").send();
// } 
//   return res.status(400),json("invalid request").send();
module.exports = (error, req, res, next) => {
  
  if (error.name === "ValidationError"){
    return responseFormatter(
      res,
      400,
      error.message,
      null
    )
  } 
  else if (error.code === 11000) {
    return responseFormatter(
      res,
      400,
      "The email or username is taken, be creative and try another ones!",
      error.errmsg
    )
  } 
  else   
  return res.json(error);
  return responseFormatter(
    res,
    500,
    'Something failed, we are investigating!',
    null
  );
};

