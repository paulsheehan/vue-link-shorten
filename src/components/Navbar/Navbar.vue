<template>
  <header>
    <!-- Desktop Nav Menu -->
    <div class="content-container header-container">
      <ul class="nav-list nav-list-primary">
        <li class="nav-home">
          <!-- <a href="#"><img src="../../assets/logo.svg"/></a> -->
          <a href="#">Squisheo</a>
        </li>
        <li class="desktop"><a href="#">Features</a></li>
        <li class="desktop"><a href="#">Pricing</a></li>
        <li class="desktop"><a href="#">Resources</a></li>
      </ul>
      <ul class="nav-list nav-list-secondary desktop">
        <li><a href="#">Login</a></li>
        <li class="btn-link"><a href="#">Sign Up</a></li>
      </ul>
      <button class="hamburger-button" @click="navMenuToggle">
        <img
          class="mobile"
          src="../../assets/mobile-hamburger.svg"
          alt="Hamburger Button"
        />
      </button>
    </div>

    <!-- Mobile Nav Menu -->
    <ul class="mobile-nav" :class="isNavMenuOpen ? 'open' : null">
      <li><a href="#">Features</a></li>
      <li><a href="#">Pricing</a></li>
      <li class="has-br"><a href="#">Resources</a></li>
      <span class="nav-menu-br" />
      <li class="has-line"><a href="#">Login</a></li>
      <li><button class="btn-link">Sign Up</button></li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isNavMenuOpen: false,
    };
  },
  methods: {
    navMenuToggle() {
      this.isNavMenuOpen = !this.isNavMenuOpen;
    },
  },
};
</script>

<style scoped>
@import url("./navbar.css");
</style>
