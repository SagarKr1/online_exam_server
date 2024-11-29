const express = require('express');
const cors = require('cors');
const userRouter = require('./router/userRoute');
const examRouter = require('./router/examRoute');
require('dotenv').config()


const app = express();
//Required Parameter
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/user',userRouter);
app.use('/exam',examRouter);


//For testing . Server is running or not
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to online exam</h1>")
})


app.listen(process.env.PORT || 8080 ,()=>{
    console.log(`http://localhost:${process.env.PORT || 8080}`)
})