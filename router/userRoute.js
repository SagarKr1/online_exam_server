const express = require('express');
const user = require('../controllers/user');
const router = express.Router();



router.get('/',(req,res)=>{
    res.send("<h1>Hello user</h1>")
})

router.post('/',user);



module.exports = router;