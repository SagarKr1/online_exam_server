module.exports = (req,res)=>{
    try{
        return res.json({
            statusCode: 200,
            body: "save all answers"
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}