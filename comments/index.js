const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const EVENT_BUS = "http://localhost:4005/events";
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comment", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[postId] = comments;

  const event = {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
      status: "pending",
    },
  };
  await axios.post(EVENT_BUS, event);

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
