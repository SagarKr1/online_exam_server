const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const data = req.body;

        // Validate roll_no field
        if (!data.roll_no) {
            return res.json({
                statusCode: 404,
                body: "Data not found"
            });
        }

        // jwt.sign({
        //     exp: Math.floor(Date.now() / 1000) + (60 * 60),
        //     data,
        // }, "#hckbjagskj@hasg");

        // Respond with success if validation passes
        return res.json({
            statusCode: 200,
            body: data,
            token: jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data,
            }, "#hckbjagskj@hasg")
        });
    } catch (e) {
        // Handle unexpected errors
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }
};
