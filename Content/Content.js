const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ContentModel = require("./Content.model.js");
app.use(cors());
app.use(express.json());


const mongoUrl = "mongodb://127.0.0.1:27017/contentdb";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection established with ContentService");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.get("/", (req, res) => {
  res.send("Content Service");
})

app.get("/getall", (req, res) => {
  ContentModel.find({}, (err, users) => {
    if (err) {
      res.status(403).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});

app.post("/getbulk/", (req, res) => {
  const contentIds = req.body.contentIds;
  const userId = req.body.userId;
  ContentModel.find({ _id: { $in: contentIds }, user: userId }, (err, contents) => {
    if (err) {
      res.status(403).send(err);
    } else {
      res.status(200).send(contents);
    }
  });
})

app.post("/create", (req, res) => {
  const user = new ContentModel(req.body);
  user
    .save()
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send("Content Save could not be placed");
      }
    })
    .catch((err) => res.send(err));
});

app.post("/createbulk", (req, res) => {
  success = 0;
  errors = 0;
  for (var i = 0; i < req.body.length; i++) {
    var content = new ContentModel(req.body[i]);
    content.save().then((data) => {
      if (data) {
        success += 1;
      } else {
        errors += 1;
      }
    });
    res.status(200).send(`Bulk addition status Success: ${success} Failed: ${errors}`);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
  console.log("Up and running Content service");
});