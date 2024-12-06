const client = require('../dataBase/postgres');
module.exports = async (req,res)=>{
    try{
        const {
            question_id,
            roll_no,
            attempt,
            subject,
            selected_option
        } =req.body; 
        await client.connect();
        const answer = await client.query(`select * from examAnswers where question_id = '${question_id}' and roll_no ='${roll_no}' and attempt = ${attempt} and subject='${subject}'`)
        if(answer.rows[0]===undefined){
            return res.json({
                statusCode:404,
                body:"Wrong request"
            });
        }

        const query = `
            UPDATE examAnswers
            SET selected_option = $1
            WHERE id = $2
        `;
        await client.query(query,[
            selected_option,
            answer.rows[0].id
        ])
        return res.json({
            statusCode: 200,
            body: "answer updated"
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}