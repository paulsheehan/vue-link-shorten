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

// Rebrandly /links response
// {
//     "id": "a991883ce0c545b49c8b118e5021e171",
//     "title": "20somethingdublin",
//     "slashtag": "6lhn0x1",
//     "destination": "https://www.20somethingdublin.com/",
//     "createdAt": "2021-01-26T22:45:54.000Z",
//     "updatedAt": "2021-01-26T22:45:54.000Z",
//     "status": "active",
//     "tags": [],
//     "clicks": 0,
//     "isPublic": false,
//     "shortUrl": "rebrand.ly/6lhn0x1",
//     "domainId": "8f104cc5b6ee4a4ba7897b06ac2ddcfb",
//     "domainName": "rebrand.ly",
//     "domain": {
//         "id": "8f104cc5b6ee4a4ba7897b06ac2ddcfb",
//         "ref": "/domains/8f104cc5b6ee4a4ba7897b06ac2ddcfb",
//         "fullName": "rebrand.ly",
//         "sharing": {
//             "protocol": {
//                 "allowed": [
//                     "http",
//                     "https"
//                 ],
//                 "default": "https"
//             }
//         },
//         "active": true
//     },
//     "https": true,
//     "favourite": false,
//     "creator": {
//         "id": "e05ffe9c737248e084e9c36d93c525a0",
//         "fullName": "paul sheehan",
//         "avatarUrl": "https://s.gravatar.com/avatar/03f4ba5cc442256758e3a3fbbfe4068f?size=80&d=retro&rating=g"
//     },
//     "integrated": false
// }

// Create new Rebrandly link
// POST: https://api.rebrandly.com/v1/links
app.post("/links", (req, res) => {
  // apiRequest(req, res, "/links", "POST", {
  //   title: "20somethingdublin",
  //   destination: "https://www.20somethingdublin.com/",
  // });
  const link = {
    createdAt: "2021-01-26T22:45:54.000Z",
    shortUrl: "rebrand.ly/6lhn0x1",
    destination: req.body.destination,
  };
  res.status(200).json(link);
});

// Get Rebrandly account data
// GET: https://api.rebrandly.com/v1/account
app.get("/account", (req, res) => {
  apiRequest(req, res, "/account", "GET");
});
