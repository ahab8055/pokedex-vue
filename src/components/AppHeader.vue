<template>
  <header class="header">
    <img src="../assets/header-logo.png" />
    <nav class="header__nav">
      <RouterLink class="header__nav__link" to="/">
        Home
      </RouterLink>
      <RouterLink class="header__nav__link" to="/pokedex">
        Pokedex
      </RouterLink>
      <RouterLink class="header__nav__link" to="/legendary">
        Legendary
      </RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
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

.header__nav__link {
  text-decoration: none;
  color: #000;
}</style>
