const connection = require("../database/connect");

module.exports = {
    async show(req, res) {
        try {
            const userId = req.params.user_id
            const workedHour = await connection("workingcontrol").select("*").where("user_id", userId);

            return res.status(200).send(workedHour);
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    async store(req, res) {
        try {
            const { entry_time, user_id, departure_time } = req.body;

            await connection("workingcontrol").insert({
                entry_time,
                departure_time,
                user_id
            })

            return res.status(201).send( {"Success": "hour inserted"} )
        } catch (error) {
            console.log(error)
        }
    }
}