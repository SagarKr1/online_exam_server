const express = require('express');
const question = require("../controllers/getQuestion");
const answer = require("../controllers/postAnswer");
const changeAnswer = require("../controllers/updateAnswer");

const router = express.Router();

const authMiddleware = require('../auth/user_auth');

router.get('/',(req,res)=>{
    res.send("<h1>best of luck for exam</h1>")
})

router.get('/get',authMiddleware,question);

router.post('/save',authMiddleware,answer);

router.put('/update',authMiddleware,changeAnswer);


module.exports = router;