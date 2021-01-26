const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

let apiRequest = function(req, res, endpoint, httpmethod, body = null) {
  console.log("Making a http request");

  let API_KEY = process.env.API_KEY;

  return axios({
    method: httpmethod,
    data: body ? body : null,
    headers: {
      apikey: API_KEY,
    },
    url: "https://api.rebrandly.com/v1/" + endpoint,
  })
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        res.status(error.response.status).send({
          message: `Node API returned with an error: ${error.response}`,
        });
        res.send(error);
      } else if (error.request) {
        // The request was made but no response was received
        res.status(500).send({
          message: `Error: The request was made but no response was received: ${error.requerst}`,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(
          "Error: Something happened in setting up the request that triggered an Error: ",
          error.message
        );
      }
      console.log(error.config);
    });
};

app.get("/", (req, res) => {
  let API_KEY = process.env.API_KEY;
  res.send(`Hi! API Key is  ${process.env.API_KEY}`);
});

// listen on the port
app.listen(port);

// Create new Rebrandly link
// POST: https://api.rebrandly.com/v1/links
app.post("/links", (req, res) => {
  // apiRequest(req, res, "/links", "POST", {
  //   title: "20somethingdublin",
  //   destination: "https://www.20somethingdublin.com/",
  // });
  console.log(req.body);
  res.send({ name: "paul" });
});

// Get Rebrandly account data
// GET: https://api.rebrandly.com/v1/account
app.get("/account", (req, res) => {
  apiRequest(req, res, "/account", "GET");
});
