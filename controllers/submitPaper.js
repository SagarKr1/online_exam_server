const client = require('../dataBase/postgres');
const now = new Date();

module.exports = async (req, res) => {
    try {
        const { roll_no, subject } = req.body;
        if (!roll_no || !subject) {
            return res.json({
                statusCode: 404,
                body: "date should not be empty"
            })
        }

        await client.connect();

        const query = `select * from ExamSheet where roll_no='${roll_no}' 
            and paper='${subject}'`;

        const userDetails = await client.query(query);

        if (userDetails.rows[0] === undefined) {
            return res.json({
                statusCode: 404,
                body: "User not found"
            })
        }
        console.log(now.toLocaleTimeString());
        var query1;
        switch (userDetails.rows[0].attempt) {
            case 1:
                query1 = `
                    UPDATE ExamSheet
                    SET f_time_end = $1
                    WHERE id = $2
                `;
                await client.query(query1, [
                    now.toLocaleTimeString(),
                    userDetails.rows[0].id
                ])
                break;

            case 2:
                query1 = `
                    UPDATE ExamSheet
                    SET s_time_end = $1
                    WHERE id = $2
                `;
                await client.query(query1, [
                    now.toLocaleTimeString(),
                    userDetails.rows[0].id
                ])
                break;

            case 3:
                query1 = `
                    UPDATE ExamSheet
                    SET th_time_end = $1
                    WHERE id = $2
                `;
                await client.query(query1, [
                    now.toLocaleTimeString(),
                    userDetails.rows[0].id
                ])
                break;

            default:
                return res.json({
                    statusCode: 404,
                    body: "something went wrong"
                })
        }
        return res.json({
            statusCode: 200,
            body: "Paper Submitted Successfully"
        });
    } catch (e) {
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}