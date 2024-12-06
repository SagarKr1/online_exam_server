const client = require('../dataBase/postgres');
const jwt = require('jsonwebtoken');
const currentDate = new Date().toISOString().split('T')[0];
const now = new Date();
console.log(now.toLocaleTimeString());

module.exports = async (req, res) => {
    try {
        const time24 = now.toLocaleTimeString('en-US', { hourCycle: 'h23' }); // Enforce 24-hour format
        console.log(`Time in 24-hour format: ${time24}`);
        const [hour, minute] = time24.split(':'); // Split into hour and minute

        console.log(`Hour: ${Number(hour)}`);
        console.log(`Minute: ${minute}`);

        if(Number(hour)<9){
            return res.json({
                statusCode: 200,
                body: "exam is not started"
            });
        }

        if(Number(hour)>14){
            return res.json({
                statusCode: 200,
                body: "exam ended"
            });
        }
        await client.connect();
        const { language, subject, roll_no } = req.body;
        //if any field will missed 
        if (!language || !subject || !roll_no) {
            return res.json({
                statusCode: 404,
                body: "data should not be empty"
            });
        }

        //check exam date of a paper
        const checkDate = await client.query(`select * from Paper where subject='${subject}' and date='${currentDate}'`);
        if (checkDate.rows[0] === undefined) {
            //if paper and date does not match
            return res.json({
                statusCode: 404,
                body: "Please check exam date of a subject"
            })
        }

        // if paper and date match
        const userData = await client.query(`SELECT * FROM Login WHERE '${subject}' = ANY(subjects) and roll_no = '${roll_no}' and department = 'PHD'`);

        //if data does not found 
        if (userData.rows[0] === undefined) {
            return res.json({
                statusCode: 404,
                body: "Please check your subject or roll No. is not present"
            })
        }

        console.log(now.toLocaleTimeString());

        //find data according to exam attempt if no then we have to create one
        const examQuery = `SELECT * FROM ExamSheet where roll_no ='${roll_no}' and dept='PHD' and paper='${subject}' `;
        const checkExam = await client.query(examQuery);
        console.log(checkExam.rows);

        // if data not found 
        var atm;
        if (checkExam.rows[0] !== undefined) {
            //check no. of attempt
            switch (checkExam.rows[0].attempt) {
                case 1:
                    atm = checkExam.rows[0].attempt + 1;
                    const query1 = `
                        UPDATE ExamSheet
                        SET attempt = ${atm}, s_time_attempt = '${now.toLocaleTimeString()}', sA_language='${language}'
                        WHERE id='${checkExam.rows[0].id}'
                    `;

                    await client.query(query1);
                    break;

                case 2:
                    atm = checkExam.rows[0].attempt + 1;
                    const query2 = `
                        UPDATE ExamSheet
                        SET attempt = ${atm}, th_time_attempt = '${now.toLocaleTimeString()}' , thA_language='${language}'
                        WHERE id='${checkExam.rows[0].id}'
                    `;

                    await client.query(query2);
                    break;

                default:
                    return res.json({
                        statusCode: 200,
                        body: "no attempt left"
                    });
            }
        }
        if (checkExam.rows[0] === undefined) {
            console.log("First Attempt ");
            atm = 1;
            const query = `
            INSERT INTO ExamSheet (
                id, roll_no, dept,exam_date, attempt, paper, fA_language,
                sA_language,thA_language, 
                f_time_attempt, s_time_attempt, th_time_attempt, 
                f_time_end, s_time_end, th_time_end
            ) VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14,$15)`;

            const values = [
                `${Date.now() + "" + roll_no}`,       // id
                roll_no,       // roll_no
                userData.rows[0].department,
                currentDate,
                Number(atm),            // attempt
                subject,    // paper
                language,
                null,
                null,    // language
                now.toLocaleTimeString(),   // f_time_attmpt
                null,         // s_time_attmpt
                null,         // th_time_ampt
                null,         // f_time_end
                null,         // s_time_end
                null          // th_time_end
            ];

            await client.query(query, values);
        }
        const question = await client.query(`select * from ExamQuestion where language='${language}' and subject='${subject}';`);
        const detail = {
            "name":userData.rows[0].name,
            "roll_no":userData.rows[0].roll_no,
            "dept":userData.rows[0].department,
            "subjects":userData.rows[0].subjects
        }
        return res.json({
            statusCode: 200,
            examDetails: {
                roll_no:roll_no,
                attempt:atm,
                language:language,
                subject:subject
            },
            token:jwt.sign({
                exp: 30 * 86400000,
                detail,
            }, "#hckbjagskj@hasg"),
            body: question.rows
        });
    } catch (e) {
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}