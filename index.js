const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { createClient } = require("redis");

const app = express();
app.use(cors());
const REDIS_HOST = "redis";
const REDIS_PORT = 6379;
const redisClient = createClient(REDIS_PORT, REDIS_HOST);
redisClient.on("connect", () => console.log("Connected to Redis"));

redisClient.on("error", function (error) {
  console.error(error);
});

app.delete("/delete_data", (req, res) => {
  if (req.query.dataType === undefined || req.query.dataType.length === 0) {
    res.status(400).send({
      status: "failure",
      message: "Missing dataType field"
    });
    return;
  }
  const dataType = req.query.dataType;
  redisClient.get(dataType, (err, response) => {
    if (err) {
      console.log(err);
    }
    if (response == null) {
      res.status(404).send({
        status: "failure",
        message: "No such dataType stored in db: " + dataType
      });
    } else {
      redisClient.del(dataType);
      res.status(200).send({
        status: "success",
        message: "Data type deletion successful"
      });
      return;
    }
  });
});

app.get("/get_email", (req, res) => {
  const dataType = "email";

  redisClient.get(dataType, (err, response) => {
    if (err) {
      console.log(err);
    }
    if (response === null) {
      axios.get(
        "https://my.api.mockaroo.com/email.json?key=4394e770"
        ).then(result => {
          if (result === null) {
            res.status(404).send({
              status: "failure",
              message: result.data
            });
            return;
          } else {
            redisClient.set(dataType, JSON.stringify(result.data), redisClient.print);
            res.status(200).send({
              status: "success",
              message: result.data
            });
            return;
          }
        });
    } else {
      console.log("reached redis");
      res.status(200).send({
          status: "redis read success",
          message: response
      });
      return;
    }
  });
});

app.listen(9600);