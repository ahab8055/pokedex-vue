<template>
  <Layout>
    <div class="main__wrapper flex flex-row justify-between">
      <div class="flex flex-col justify-center items-center w-1/2 px-40 gap-14">
        <p class="text-8xl font-light">
          <span class="font-semibold">Find</span> all your favorite
          <span class="font-semibold"> pokemon </span>
        </p>
        <p class="text-4xl">
          You can know the type of Pokemon, its strengths, disadvantages and
          abilities
        </p>
        <button
          class="self-baseline bg-[#73D677] text-[#212121] px-4 py-3 rounded-lg shadow text-xl hover:scale-105 ease-in duration-200 font-semibold"
        >
          See pokemons
        </button>
      </div>
      <div>
        <img src="../assets/banner.png" class="h-full w-full" alt="pokemon-banner"/>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";

export default {
  name: "HomeView",
  components: {
    Layout,
  },
};
</script>

<style scoped>
.main__wrapper {
  background: var(--Third, #f5db13);
  height: calc(100vh - 80px);
}
</style>
