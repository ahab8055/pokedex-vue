<template>
  <header class="header">
    <img src="../assets/header-logo.png" class="inline " />
    <nav class="header__nav">
      <RouterLink :class="{ 'active__link': $route.path === '/' }" to="/">
        Home
      </RouterLink>
      <RouterLink :class="{ 'active__link': $route.path === '/pokedex' }" to="/pokedex">
        Pokedex
      </RouterLink>
      <RouterLink :class="{ 'active__link': $route.path === '/legendary' }" to="/legendary">
        Legendary
      </RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    navLink: function () {
      return this.$route.path
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  z-index: 1;
  background: var(--Third, #F5DB13);
  box-shadow: 0px 4px 16px 0px #011C4033;
}

.header__title {
  color: goldenrod;
}

.header__nav {
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  float: right;
  margin-top: 20px;
}

.header__nav a {
  text-decoration: none;
  color: #000;
  position: relative;
}

.header__nav a.active__link::after {
  content: '';
  position: absolute;
  top: 28px;
  border: 1.5px solid;
  width: 100%;
  right: 0px;
  left: 0;
  border-radius: 20px;
  transition: ease-in 0.2s;
}
</style>
