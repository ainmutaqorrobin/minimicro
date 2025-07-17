const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const ENDPOINT = {
  POST_SERVICE: "http://localhost:4000/events",
  COMMENT_SERVICE: "http://localhost:4001/events",
  QUERY_SERVICE: "http://localhost:4002/events",
  MODERATION_SERVICE: "http://localhost:4003/events",

  POST_SERVICE_DEPLOYMENT: "http://posts-clusterip-svc:4000/events",
  COMMENT_SERVICE_DEPLOYMENT: "http://comments-svc:4001/events",
  QUERY_SERVICE_DEPLOYMENT: "http://query-svc:4002/events",
  MODERATION_SERVICE_DEPLOYMENT: "http://moderation-svc:4003/events",
};

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  axios
    .post(ENDPOINT.POST_SERVICE_DEPLOYMENT, event)
    .catch((err) => console.log(err.message));
  axios
    .post(ENDPOINT.COMMENT_SERVICE_DEPLOYMENT, event)
    .catch((err) => console.log(err.message));
  axios
    .post(ENDPOINT.QUERY_SERVICE_DEPLOYMENT, event)
    .catch((err) => console.log(err.message));
  axios
    .post(ENDPOINT.MODERATION_SERVICE_DEPLOYMENT, event)
    .catch((err) => console.log(err.message));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on port 4005");
});
