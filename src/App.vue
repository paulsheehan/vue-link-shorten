<template>
  <div id="app">
    <Navbar />
    <Hero />
    <UrlInput />
    <Info />
    <CtaSecondaryBanner />
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

export default {
  name: "App",
  components: {
    HelloWorld,
    Navbar,
    Hero,
    UrlInput,
    Info,
    CtaSecondaryBanner,
  },
};
</script>

<style>
@import url("./app.css");
</style>
