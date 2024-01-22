<template>
  <header class="header">
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
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.9);
}
.header__title {
  color: goldenrod;
}
.header__nav {
  display: flex;
  justify-content: space-evenly;
}
.header__nav__link {
  text-decoration: none;
  color: white;
}
</style>
