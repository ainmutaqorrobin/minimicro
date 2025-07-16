const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const EVENT_BUS = "http://localhost:4005/events";
const EVENT_BUS_DEPLOYMENT = "http://eventbus-svc:4005/events";

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { status, ...others } = data;
    const ModifiedStatus = data.content.includes("orange")
      ? "rejected"
      : "approved";

    console.log({ ...others, status: ModifiedStatus });
    await axios.post(EVENT_BUS_DEPLOYMENT, {
      type: "CommentModerated",
      data: { ...others, status: ModifiedStatus },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on port 4003");
});
