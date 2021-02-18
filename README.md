# vue-link-shorten
Squisheo is a simple url shortener, so it accepts a valid url through an input form and returns a shortened link to that url. 

I setup a http endpoint in Express that uses Firebase Dynamic Links to create the shortened link. The Express API also uses a library called JSDom to scrape metadata so that preview image, title, and description appear when sharing the shortened link on social media.

The urls are branded with my own domain name called squis.co, which is handled on my Firebase account.

I built the frontend in Vue, and setup a simple caching service to store results in localStorage. 

I learned how to setup Nginx to run 2 server blocks simultaneouly and setup reverse proxys. That's happening in the background of the live site.

## Install packages
```
npm install
```

### Run locally
```
npm run serve
```

### Compile a dist folder for a live site
```
npm run build
```

If you are running the node server locally, you'll have to replace https://www.squisheo.com with your localhost:port. This can be found in the server folder, and in firebase-service.js on the frontend. You'll also have to to use your own Firebase API as mine are obscured. So just a heads-up if you're trying to use the node server locally.
