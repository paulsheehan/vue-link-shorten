<template>
  <section class="hero-container">
    <div class="content-container hero-row">
      <div class="hero-info">
        <h1>Short Urls that stand out</h1>
        <p>
          Promote your brands content by creating trendy shortened links.
        </p>
        <button class="btn-link" @click="onCtaClick">Try It Out</button>
      </div>
      <div class="hero-image">
        <img
          class="desktop"
          src="../../assets/hero-bg-image.svg"
          alt="Background image of person sitting at desk"
        />
        <img
          class="mobile-image"
          src="../../assets/hero-bg-mobile-image.svg"
          alt="Background image of person sitting at desk"
        />
        <img
          class="hero-bg-path"
          src="../../assets/hero-bg-mobile-path-image.svg"
          alt="Background image of person sitting at desk"
        />
        <!-- <img
          class="mobile"
          src="../../assets/hero-bg-mobile-bg-image.svg"
          alt="Background image of person sitting at desk"
        /> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    onCtaClick() {
      this.$emit("on-cta-click");
    },
  },
  emits: ["on-cta-click"],
};
</script>

<style scoped>
@import url("./hero.css");
</style>
