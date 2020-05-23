const express = require('express');
const router = express.Router();
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
//a collection of routes from ./routes
const authGuard = require('./middleware/authGuard');
const videoRoute = require('./routes/videos')

router.use('/signup', userRoute);
router.use('/login', authRoute );
router.use('/video', authGuard ,videoRoute );

module.exports = router;