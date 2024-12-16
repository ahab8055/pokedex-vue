<template>
  <Layout>
    <div class="flex flex-col items-center gap-y-6 mt-14">
      <p class="text-4xl">800 <b>Pokemons</b> for you to choose your favorite</p>
      <input type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block p-3.5 outline-none w-9/12 search_input"
        placeholder="Search your favorite pokemon" />
      <div class="flex gap-x-4">
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
          <option selected>Type</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
          <option selected>Attack</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
          <option selected>Experience</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div class="flex gap-4 flex-wrap w-[60%]">
        <PokeCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: "PokedexView",
  components: {
    Layout,
    PokeCard
  },

  computed: {
    pokemons() {
      return this.$store.state.pokemons
    }
  },
  async mounted() {
    this.$store.dispatch("fetchPokemons");
  }
};
</script>

<style scoped>
.search_input {
  box-shadow: rgba(1, 28, 64, 0.2) 0px 2px 8px 0px;
}
</style>