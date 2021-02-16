const express = require("express");
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(helmet());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://squisheo.com");
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

app.post("/links", async (req, res) => {
  console.log("Reached");
  let destination = req.body.destination;
  let fullPath = addHttpProtocol(destination);
  let previewMetadata = await getPreviewMetadata(fullPath);
  let body = {
    dynamicLinkInfo: {
      domainUriPrefix: "https://squis.co",
      link: fullPath,
      ...previewMetadata,
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
        createdAt: new Date().toISOString(),
        shortUrl: data.shortLink.replace(/(^\w+:|^)\/\//, ""),
        destination: destination,
        ...previewMetadata,
      });
    } else {
      res.status(400).json({ error: "Something went wrong on the server" });
    }
  });
});

app.post("/test-links", async (req, res) => {
  let destination = req.body.destination;
  let fullPath = addHttpProtocol(destination);

  let body = {
    dynamicLinkInfo: {
      domainUriPrefix: "https://squis.co/" + "xyz",
      link: fullPath,
    },
    suffix: {
      option: "SHORT",
    },
  };
  let previewMetadata = await getPreviewMetadata(fullPath);
  setTimeout(function() {
    res.status(200).json({
      createdAt: new Date().toISOString(),
      shortUrl: body.dynamicLinkInfo.domainUriPrefix,
      destination: destination,
      ...previewMetadata,
    });
  }, 2000);
});

let getPreviewMetadata = function(url) {
  return axios
    .get(url)
    .then(
      (response) => {
        if (response.status === 200) {
          return response.data;
        }
      },
      (error) => console.log(error)
    )
    .then((rawhtml) => {
      if (rawhtml) {
        let dom = new JSDOM(rawhtml);
        let title = dom.window.document.title;
        let description = dom.window.document.querySelector(
          'meta[name="description"]'
        );
        if (description) {
          description = description.content;
        }
        let imgs = dom.window.document.getElementsByTagName("img");
        let previewImageSrc = "";
        if (imgs.length > 0) {
          previewImageSrc = imgs[0].getAttribute("src");
        } else {
          console.log("Did not find an image on the site");
        }
        return {
          socialMetaTagInfo: {
            socialTitle: title,
            socialDescription: description,
            socialImageLink: previewImageSrc,
          },
        };
      } else {
        console.log("Did not get a 200 response");
        return null;
      }
    });
};

let addHttpProtocol = function(value) {
  if (!/^https?:\/\//i.test(value)) {
    return "https://" + value;
  } else {
    return value;
  }
};
