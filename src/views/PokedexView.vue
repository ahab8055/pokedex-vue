<template>
  <Layout>
    <div class="flex flex-col items-center gap-y-4 mt-5">
      <p class="text-4xl">800 <b>Pokemons</b> for you to choose your favorite</p>
      <input type="text" v-model="search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block p-3.5 outline-none w-9/12 search_input"
        placeholder="Search your favorite pokemon" />
      <div class="flex gap-x-4">
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" @change="onTypeChange">
          <option selected disabled>Type</option>
          <option v-for="type in types" :key="type.name" :value="type.name" class="capitalize">{{ type.name }}</option>
        </select>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" @change="onGrowthChange">
          <option selected disabled>Growth</option>
          <option v-for="growth in growths" :key="growth.name" :value="growth.name" class="capitalize">{{ growth.name }}
          </option>
        </select>
      </div>
      <div class="flex gap-4 flex-wrap w-full justify-center" v-if="!loading">
        <PokeCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" @pokemon-selected="selectPokemon" />
      </div>
      <div class="flex gap-2 flex-wrap w-full items-center justify-center" v-if="loading">
        <CardSkelton v-for="index in 9" :key="index" />
      </div>
      <Pagination v-if="!loading" :data="pagination" @prev="prevPage" @next="nextPage" />
      <PokemonDetailModal :pokemon="selectedPokemon" :isOpen="showModal" @close="closeModal" />
    </div>
  </Layout>
</template>

<script>
import CardSkelton from '@/components/CardSkelton.vue';
import Layout from '@/components/Layout.vue';
import Pagination from '@/components/Pagination.vue';
import PokeCard from '@/components/PokeCard.vue';
import PokemonDetailModal from '@/components/PokemonDetailModal.vue';
import { debounce } from 'lodash';

export default {
  name: "PokedexView",
  components: {
    Layout,
    PokeCard,
    CardSkelton,
    Pagination,
    PokemonDetailModal
  },
  data() {
    return {
      loading: true,
      limit: 9,
      offset: 0,
      type: null,
      growth: null,
      search: "",
      showModal: false,
      selectedPokemon: null
    }
  },
  watch: {
    pokemons() {
      this.loading = false
    },
    offset() {
      this.loading = true
      const params = { limit: this.limit, offset: this.offset }
      if (this.type) params.type = this.type
      if (this.growth) params.growth = this.growth
      if (this.search) params.search = this.search
      this.$store.dispatch("fetchPokemons", params);
    },
    search: debounce(function() {
      this.offset = 0
      this.loading = true
      const params = { limit: this.limit, offset: 0 }
      if (this.type) params.type = this.type
      if (this.growth) params.growth = this.growth
      if (this.search) params.search = this.search
      this.$store.dispatch("fetchPokemons", params);
    }, 500),
    type() {
      this.offset = 0
      this.search = ""
      this.loading = true
      const params = { limit: this.limit, offset: 0 }
      if (this.type) params.type = this.type
      if (this.growth) params.growth = this.growth
      this.$store.dispatch("fetchPokemons", params);
    },
    growth() {
      this.offset = 0
      this.search = ""
      this.loading = true
      const params = { limit: this.limit, offset: 0 }
      if (this.type) params.type = this.type
      if (this.growth) params.growth = this.growth
      this.$store.dispatch("fetchPokemons", params);
    },
  },
  computed: {
    pokemons() {
      return this.$store.state.pokemons
    },
    types() {
      return this.$store.state.types
    },
    growths() {
      return this.$store.state.growths
    },
    pagination() {
      return { ...this.$store.state.pagination, from: this.offset, limit: this.limit }
    },
  },
  methods: {
    nextPage() {
      this.offset += this.limit;
    },
    prevPage() {
      this.offset -= this.limit;
    },
    onTypeChange(event) {
      this.type = event.target.value;
    },
    onGrowthChange(event) {
      this.growth = event.target.value;
    },
    selectPokemon(pokemon) {
      this.selectedPokemon = pokemon;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedPokemon = null;
    }
  },
  async mounted() {
    this.$store.dispatch("fetchPokemons", { limit: this.limit, offset: this.offset });
    this.$store.dispatch("fetchPokemonTypes");
    this.$store.dispatch("fetchPokemonGrowth");
  }
};
</script>

<style scoped>
.search_input {
  box-shadow: rgba(1, 28, 64, 0.2) 0px 2px 8px 0px;
}
</style>