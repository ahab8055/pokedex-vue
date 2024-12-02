<template>
  <Layout>
    <div class="main__wrapper">
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default {
  name: "HomeView",
  components: {
    Layout
  }
};
</script>

<style scoped>
.main__wrapper {
  background: var(--Third, #F5DB13);
  height: calc(100vh - 80px);
}
</style>