<template>
  <div id="app">
    <Navbar />
    <Hero />
    <UrlInput
      @shorten-url="shortenUrl"
      :is-loading="isLoading"
      :shortened-url="shortenedUrl"
      :results="results"
    />
    <Info />
    <CtaSecondaryBanner />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar/Navbar.vue";
import Hero from "./components/Hero/Hero.vue";
import UrlInput from "./components/UrlInput/UrlInput.vue";
import Info from "./components/Info/Info.vue";
import CtaSecondaryBanner from "./components/CtaSecondaryBanner/CtaSecondaryBanner.vue";
import Footer from "./components/Footer/Footer.vue";
import { postApiLink } from "./services/firebase-service";
import {
  saveNewCachedResult,
  getLatestCachedResults,
} from "./services/localStorage-service";
export default {
  name: "App",
  components: {
    Navbar,
    Hero,
    UrlInput,
    Info,
    CtaSecondaryBanner,
    Footer,
  },
  data() {
    return {
      shortenedUrl: "",
      isLoading: false,
      results: [
        // {
        //   data: {
        //     createdAt: "2021-01-26T22:45:54.000Z",
        //     shortUrl: "rebrand.ly/6lhn0x1",
        //     destination: "www.google.com",
        //   },
        //   copied: false,
        // },
      ],
    };
  },
  mounted: function() {
    let cachedResults = getLatestCachedResults();
    if (cachedResults) {
      this.results = cachedResults;
    }
  },
  methods: {
    async shortenUrl(value) {
      // Set loading animation
      this.isLoading = true;

      // (await) Post value to API then save results
      let shortenedUrl = {
        data: await postApiLink(value),
        copied: false,
      };

      //End loading animation
      this.isLoading = false;

      if (shortenedUrl.data) {
        // Store last 3 results on frontend
        if (this.results.length > 2) {
          this.results.pop();
          this.results.unshift(shortenedUrl);
        } else {
          this.results.unshift(shortenedUrl);
        }
        saveNewCachedResult(shortenedUrl);
      } else {
        // Error, NULL results returned
        console.log(
          "Something went wrong, and could not return a shortened link"
        );
      }
    },
  },
};
</script>

<style>
@import url("./app.css");
</style>
