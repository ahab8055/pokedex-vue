<template>
  <Layout>
    <div class="flex flex-col items-center gap-y-4 mt-5">
      <p class="text-4xl">800 <b>Pokemons</b> for you to choose your favorite</p>
      <input type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block p-3.5 outline-none w-9/12 search_input"
        placeholder="Search your favorite pokemon" />
      <div class="flex gap-x-4">
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
          <option selected disabled>Type</option>
          <option v-for="type in types" :key="type.name" :value="type.name" class="capitalize">{{ type.name }}</option>
        </select>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
          <option selected disabled>Nature</option>
          <option v-for="nature in natures" :key="nature.name" :value="nature.name" class="capitalize">{{ nature.name }}
          </option>
        </select>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
          <option selected disabled>Growth</option>
          <option v-for="growth in growths" :key="growth.name" :value="growth.name" class="capitalize">{{ growth.name }}
          </option>
        </select>
      </div>
      <div class="flex gap-4 flex-wrap w-[60%]" v-if="!loading">
        <PokeCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
      </div>
      <div class="flex gap-2 flex-wrap w-[65%] items-center justify-center" v-if="loading">
        <CardSkelton v-for="index in 9" :key="index" />
      </div>
      <Pagination v-if="!loading" :data="pagination" @prev="prevPage" @next="nextPage" />
    </div>
  </Layout>
</template>

<script>
import CardSkelton from '@/components/CardSkelton.vue';
import Layout from '@/components/Layout.vue';
import Pagination from '@/components/Pagination.vue';
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: "PokedexView",
  components: {
    Layout,
    PokeCard,
    CardSkelton,
    Pagination
  },
  data() {
    return {
      loading: true,
      limit: 9,
      offset: 0
    }
  },
  watch: {
    pokemons() {
      this.loading = false
    },
    offset() {
      this.loading = true
      this.$store.dispatch("fetchPokemons", { limit: this.limit, offset: this.offset });
    }
  },
  computed: {
    pokemons() {
      return this.$store.state.pokemons
    },
    types() {
      return this.$store.state.types
    },
    natures() {
      return this.$store.state.natures
    },
    growths() {
      return this.$store.state.growths
    },
    pagination() {
      return this.$store.state.pagination
    },
  },
  methods: {
    nextPage() {
      this.offset += this.limit;
    },
    prevPage() {
      this.offset -= this.limit;
    }
  },
  async mounted() {
    this.$store.dispatch("fetchPokemons", { limit: this.limit, offset: this.offset });
    this.$store.dispatch("fetchPokemonTypes");
    this.$store.dispatch("fetchPokemonNature");
    this.$store.dispatch("fetchPokemonGrowth");
  }
};
</script>

<style scoped>
.search_input {
  box-shadow: rgba(1, 28, 64, 0.2) 0px 2px 8px 0px;
}
</style>