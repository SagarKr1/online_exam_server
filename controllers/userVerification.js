const client = require('../dataBase/postgres');

module.exports = async (req,res)=>{
    try{
        await client.connect();
        const data = await client.query('select * from employees;');

        return res.json({
            statusCode: 200,
            body: data.rows
        });
    }catch(e){
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
}