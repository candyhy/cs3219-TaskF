const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { createClient } = require("redis");

const app = express();
app.use(cors());
const REDIS_HOST = "redis";
const REDIS_PORT = 6379;
const redisClient = createClient(REDIS_PORT, REDIS_HOST);

app.get("/get_email", (req, res) => {
  const dataType = "email";
  redisClient.get(dataType, (response, err) => {
    if (response === null) {
      const data = await.axios.get(
        "https://my.api.mockaroo.com/email.json?key=4394e770");
      res.json(data);
      redisClient.set(dataType, data);
    } else {
      return res.json(JSON.parse(response));
    }
  });
});

app.listen(9600);