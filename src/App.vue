<template>
  <div id="app">
    <Navbar />
    <Hero />
    <UrlInput
      @shorten-url="shortenUrl"
      :shortened-url="shortenedUrl"
      :results="results"
    />
    <Info />
    <CtaSecondaryBanner />
    <Footer />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Navbar from "./components/Navbar/Navbar.vue";
import Hero from "./components/Hero/Hero.vue";
import UrlInput from "./components/UrlInput/UrlInput.vue";
import Info from "./components/Info/Info.vue";
import CtaSecondaryBanner from "./components/CtaSecondaryBanner/CtaSecondaryBanner.vue";
import Footer from "./components/Footer/Footer.vue";
import { postApiLink } from "./services/rebrandly-service";
export default {
  name: "App",
  components: {
    HelloWorld,
    Navbar,
    Hero,
    UrlInput,
    Info,
    CtaSecondaryBanner,
    Footer,
  },
  data() {
    return {
      shortenedUrl: "String as prop",
      results: [
        {
          data: {
            createdAt: "2021-01-26T22:45:54.000Z",
            shortUrl: "rebrand.ly/6lhn0x1",
            destination: "www.google.com",
          },
          copied: false,
        },
      ],
    };
  },
  methods: {
    async shortenUrl(value) {
      let shortenedUrl = {
        data: await postApiLink(value),
        copied: false,
      };
      console.log(shortenedUrl);

      if (shortenedUrl) {
        this.results.push(shortenedUrl);
      } else {
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
