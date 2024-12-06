const express = require('express');
const user = require('../controllers/user');
// const userVerification = require('../controllers/userVerification');
const router = express.Router();



router.get('/',(req,res)=>{
    res.send("<h1>Hello user</h1>")
})

router.post('/login',user);
// router.post('/verify',userVerification);



module.exports = router;