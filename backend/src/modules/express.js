const express = require("express");
const routes = require("../routes");
const cors = require("cors");

const app = express();
const port = 3333;

app.use((req, res, next) => {
    console.log(`Your request type is: ${req.method}`);
    next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
})

module.exports;