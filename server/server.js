const express = require("express");
const cors = require("cors");
const app = express();
const api_helper = require('./API_helper')

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
    api_helper.make_API_call('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});