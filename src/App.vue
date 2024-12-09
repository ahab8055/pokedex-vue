<template>
  <div id="app">
    <AppHeader v-if="!$route.meta.disableNavbar" />
    <RouterView />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap');

html,
body {
  font-family: "Karla", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

#app {
  font-family: "Karla", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>
