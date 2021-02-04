<template>
  <header>
    <div class="content-container header-container">
      <ul class="nav-list nav-list-primary">
        <li class="nav-home">
          <a href="#"><img src="../../assets/logo.svg"/></a>
        </li>
        <li class="desktop"><a href="#">Features</a></li>
        <li class="desktop"><a href="#">Pricing</a></li>
        <li class="desktop"><a href="#">Resources</a></li>
      </ul>
      <ul class="nav-list nav-list-secondary desktop">
        <li><a href="#">Login</a></li>
        <li class="btn-link"><a href="#">Sign Up</a></li>
      </ul>
      <button class="hamburger-button">
        <img
          class="mobile"
          src="../../assets/mobile-hamburger.svg"
          alt="Hamburger Button"
        />
      </button>
    </div>
    <ul class="mobile-nav">
      <li><a href="#">Features</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Resources</a></li>
      <li class="has-line"><a href="#">Login</a></li>
      <li class="btn-link"><a href="#">Sign Up</a></li>
    </ul>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("./navbar.css");
</style>
