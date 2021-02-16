<template>
  <section class="secondary-banner">
    <h2>Boost your links today</h2>
    <button @click="onCtaClick" class="btn-link">Try It Out</button>
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
@import url("./ctaSecondaryBanner.css");
</style>
