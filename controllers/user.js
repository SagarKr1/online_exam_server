const jwt = require('jsonwebtoken');
const client = require('../dataBase/postgres');

module.exports = async (req, res) => {
    try {
        //postgres making connection
        await client.connect();
        // const data = await client.query('select * from employees;');
        //Data from client
        const data = req.body;

        // Validate roll_no field
        if (!data.roll_no || !data.password) {
            //connection close
            // client.end();
            return res.json({
                statusCode: 404,
                body: "Data not found"
            });
        }

        // if user already login 
        const userInfo = await client.query(`select * from Login where roll_no='${data.roll_no}'`);
        // console.log(userInfo);

        //If user already login 
        if (userInfo.rows[0] !== undefined) {
            //connection close
            // client.end();
            const userdata = {
                "name":userInfo.rows[0].name,
                "roll_no":userInfo.rows[0].roll_no,
                "dept":userInfo.rows[0].department,
                "subjects":userInfo.rows[0].subjects
            }
            return res.json({
                statusCode: 200,
                body: userdata,
                token: jwt.sign({
                    exp: 30 * 86400000,
                    userdata,
                }, "#hckbjagskj@hasg")
            });
        }
        // if user not login 

        //find data from another table of roll_no
        const userFind = await client.query(`select * from Student where roll_no='${data.roll_no}'`);

        // if roll_no not found in another table
        if(userFind.rows[0]===undefined){
            return res.json({
                statusCode:400,
                body:"Invalid roll number"
            });
        }
        //making insert data query
        const insertData = `
            INSERT INTO Login (roll_no, name, department, subjects, password)
            VALUES ($1, $2, $3, $4, $5)`;
        const values = [
            data.roll_no,
            userFind.rows[0].name,
            userFind.rows[0].department,
            userFind.rows[0].subjects, // Array value
            data.password,
        ];
        await client.query(insertData, values);

        return res.json({
            statusCode: 200,
            body:"Successfully registered for exam",
        });
    } catch (e) {
        // Handle unexpected errors
        return res.json({
            statusCode: 500,
            body: e
        });
    }
};
