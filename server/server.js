const express = require("express");
const cors = require("cors");
const app = express();
const api_helper = require("./API_helper");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/CRUD");
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: String,
});

const UserModel = mongoose.model("users", UserSchema);

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

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
