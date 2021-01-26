<template>
  <div id="app">
    <Navbar />
    <Hero />
    <UrlInput @shorten-url="shortenUrl" :shortened-url="shortenedUrl" />
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
    };
  },
  methods: {
    shortenUrl(value) {
      this.shortenedUrl = "(shortened)" + value;
      console.log(`Sending ${value}`);
      console.log(postApiLink(value));
    },
  },
};
</script>

<style>
@import url("./app.css");
</style>
