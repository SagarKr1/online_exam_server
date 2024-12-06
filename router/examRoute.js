const express = require('express');
const question = require("../controllers/getQuestion");
const answer = require("../controllers/postAnswer");
const changeAnswer = require("../controllers/updateAnswer");
const getAnswer = require('../controllers/getAnswer');
const savedAnswer = require('../controllers/getAnswer');
const getAllAnswer = require('../controllers/getAllAnswer');
const submit = require('../controllers/submitPaper');


const router = express.Router();

const authMiddleware = require('../auth/user_auth');

router.get('/',(req,res)=>{
    res.send("<h1>best of luck for exam</h1>")
});
router.post('/savedAnswer',authMiddleware,savedAnswer);

router.post('/submit',authMiddleware,submit);

router.post('/getAllAnswer',getAllAnswer)

router.post('/get',authMiddleware,question);

router.post('/save',authMiddleware,answer);

router.put('/update',authMiddleware,changeAnswer);


module.exports = router;