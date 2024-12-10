const connection = require("../database/connect");

module.exports = {
    async index(req, res) {
        try {
            const user = await connection("user").select("*");
            return res.status(200).send(user);        
        } catch (error) {
            console.log(error);
        }
    },

    async store(req, res) {
        try {
            const { user_code, name } = req.body;
            
            await connection("user").insert({
                user_code,
                name
            })

            return res.status(201).send( {user_code} );
        } catch (error) {
            console.log(error);
        }
    },

    async show(req, res) {
        try {
            const userCode = req.params.user_code;
            const user = await connection("user").select("*").where("user_code", userCode);

            return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
};