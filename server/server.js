const express = require("express");
const cors = require("cors");
const app = express();
const api_helper = require("./API_helper");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
//getting values fron config file- Start
{
  var API_KEY = process.env.REACT_APP_API_KEY;
}
//getting values fron config file- End
//implemented cors for domain security in application - Start
app.use(cors());
//implemented cors for domain security in application - End
app.use(express.json());
//Implemented MongoDB connectivity and creating userModel - Start
mongoose.connect("mongodb://localhost:27017/CRUD");
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: String,
});

const UserModel = mongoose.model("users", UserSchema);
//Implemented MongoDB connectivity and creating userModel - End
// Call API - Start
app.get("/getWeatherAPI", (req, res) => {
  const { city } = req.query;
  api_helper
    .make_API_call(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city.city +
        "&appid=" +
        API_KEY
    )
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then(function (users) {
      res.json(users);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/usermessage", (req, res) => {
  api_helper
    .make_API_call("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.send(error);
    });
});
// Call API - End

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
