const client = require('../dataBase/postgres');

module.exports = async (req,res)=>{
    try{
        const {roll_no,subject,attempt,date,question_id} = req.body;
        //if these fields are missing
        if(!roll_no || !subject || !attempt || !question_id){
            return res.json({
                statusCode:404,
                body:"data should not be empty"
            });
        }
        await client.connect();
        const query = `select * from examAnswers where roll_no = '${roll_no}'
                and subject='${subject}' and attempt=${attempt} 
                and question_id = '${question_id}'`;
        const answerSheet = await client.query(query)
        return res.json({
            statusCode: 200,
            body: answerSheet.rows
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}