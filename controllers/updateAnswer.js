module.exports = (req,res)=>{
    try{
        return res.json({
            statusCode: 200,
            body: "update your answer"
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}