const express = require("express");
const UserController = require("./controllers/UserControler");
const WorkingController = require("./controllers/WorkingController");

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.status(200).json({message: "Hello World with json message"})
});

routes.get('/users', UserController.index);
routes.post('/usercreate', UserController.store);
routes.get('/users/:user_code', UserController.show);

routes.get("/workinglist/:user_id", WorkingController.show);
routes.post("/workingcreate", WorkingController.store);

module.exports = routes;