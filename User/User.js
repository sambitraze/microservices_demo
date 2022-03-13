const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./User.model.js");
app.use(cors());
app.use(express.json());


const mongoUrl = "mongodb://127.0.0.1:27017/userdb";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection established with UserService");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.get("/", (req, res) => {
  res.send("User Service");
})

app.get("/getall", (req, res) => {
  UserModel.find({}, (err, users) => {
    if (err) {
      res.status(403).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});

app.post("/create", (req, res) => {
  const user = new UserModel(req.body);
  user
    .save()
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send("User Save could not be placed");
      }
    })
    .catch((err) => res.send(err));
});


const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
  console.log("Up and running user service");
});