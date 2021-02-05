const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(helmet());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let apiRequest = function(req, res, destination, httpmethod, body = null) {
  let API_KEY = process.env.API_KEY;
  return axios({
    method: httpmethod,
    data: body ? body : null,
    url: destination + API_KEY,
  })
    .then(function(data) {
      return data.data;
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        // res.status(error.response.status).send({
        //   message: `Node API returned with an error: ${error.response}`,
        // });
        // res.send(error);
      } else if (error.request) {
        // The request was made but no response was received
        // res.status(500).send({
        //   message: `Error: The request was made but no response was received: ${error.requerst}`,
        // });
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

// listen on the port
app.listen(port);

app.post("/links", (req, res) => {
  let destination = req.body.destination;

  let body = {
    dynamicLinkInfo: {
      domainUriPrefix: "https://squis.co",
      link: "https://" + destination,
    },
    suffix: {
      option: "SHORT",
    },
  };

  apiRequest(
    req,
    res,
    "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=",
    "POST",
    body
  ).then((data) => {
    if (data) {
      res.status(200).json({
        createdAt: "2021-01-26T22:45:54.000Z",
        shortUrl: data.shortLink,
        destination: destination,
      });
    } else {
      res.status(400).json({ error: "Something went wrong on the server" });
    }
  });
});
