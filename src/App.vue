<template>
  <div id="app">
    <AppHeader />
    <div class="main-wrapper">
      <RouterView />
    </div>
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
.main-wrapper {
  padding-top: 55px;
}
</style>
