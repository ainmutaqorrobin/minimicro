const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const EVENT_BUS = "http://localhost:4005/events";
const EVENT_BUS_DEPLOYMENT = "http://eventbus-svc:4005/events";

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
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
  await axios.post(EVENT_BUS_DEPLOYMENT, event);

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const comments = commentsByPostId[data.postId];

    const comment = comments.find((comment) => comment.id === data.id);
    comment.status = data.status;
    const event = {
      type: "CommentUpdated",
      data,
    };
    console.log(event);

    await axios.post(EVENT_BUS_DEPLOYMENT, event);
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
