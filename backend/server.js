const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./schema/message");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const port = 5000;
mongoose.connect(
  "mongodb+srv://abhi:abhi@cluster0.mgaxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    console.log("Connected to MongoDB", err);
  }
);

app.post("/message/send", async (req, res) => {
  try {
    const newmsg = new Message({
      room: req.body.room,
      msg: req.body.message,
    });
    const data = await newmsg.save();
    res.status(200).send("post has been inserted");
  } catch (error) {
    res.status(400).json(error);
  }
});
app.get("/message/recive/:room", async (req, res) => {
  try {
    const msg = await Message.find({ room: req.params.room });
    if (msg.length === 0) {
      res.send([]);
    }
    else{
    const allMsg=[];
    msg.map((msg)=>{
      allMsg.push(msg.msg);
    })
    res.status(200).json(allMsg);
  }} catch (error) {
    res.status(400).json("error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
