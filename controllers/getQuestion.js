module.exports = (req,res)=>{
    try{
        return res.json({
            statusCode: 200,
            body: "get all question"
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}