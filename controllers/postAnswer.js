const client = require('../dataBase/postgres');
module.exports = async (req, res) => {
    try {
        const {
            question_id,
            roll_no,
            attempt,
            subject,
            selected_option
        } = req.body;
        const id = Date.now() +""+ question_id;

        await client.connect();

        const answer = await client.query(`select * from examAnswers where question_id = '${question_id}' and roll_no ='${roll_no}' and attempt = ${attempt} and subject='${subject}'`)
        if(answer.rows[0]!==undefined){
            return res.json({
                statusCode:200,
                body:"Answer already saved"
            })
        }
        const query = `
            INSERT INTO examAnswers (id, question_id, roll_no, attempt, selected_option, subject)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const value = [
            id,
            question_id,
            roll_no,
            attempt,
            selected_option,
            subject
        ]
        await client.query(query,value);
        return res.json({
            statusCode: 200,
            body:"answer saved"
        });
    } catch (e) {
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}