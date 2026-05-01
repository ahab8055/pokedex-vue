import { createLogger, createStore } from "vuex";
import instance from "@/config/instance";
import { map } from "lodash";
import axios from "axios";

const store = createStore({
  plugins: [createLogger()],
  state: {
    pokemons: [],
    types: [],
    growths: [],
    pagination: {
      next: null,
      previous: null,
      count: 0,
    },
  },
  getters: {},
  actions: {
    async fetchPokemons({ commit }, payload) {
      try {
        let paginationData = { next: null, previous: null, count: 0 };
        let filteredPokemon = [];

        // Get the base pokemon list based on type or growth filter
        if (payload.type) {
          const { data } = await instance.get(`type/${payload.type}`);
          filteredPokemon = map(data.pokemon, (p) => p.pokemon);
        } else if (payload.growth) {
          const { data } = await instance.get(`growth-rate/${payload.growth}`);
          const allSpecies = data.pokemon_species;
          filteredPokemon = map(allSpecies, (s) => ({
            name: s.name,
            url: s.url.replace("pokemon-species", "pokemon"),
          }));
        } else {
          // Fetch all pokemon with a large limit for search capability
          const { data } = await instance.get("pokemon", {
            params: {
              limit: 1000,
              offset: 0,
            },
          });
          filteredPokemon = data.results;
        }

        // Apply search filter by name
        if (payload.search) {
          filteredPokemon = filteredPokemon.filter((p) =>
            p.name.toLowerCase().includes(payload.search.toLowerCase())
          );
        }

        const total = filteredPokemon.length;
        const sliced = filteredPokemon.slice(
          payload.offset,
          payload.offset + payload.limit
        );

        paginationData = {
          count: total,
          next: payload.offset + payload.limit < total ? "next" : null,
          previous: payload.offset > 0 ? "prev" : null,
        };

        const responses = await axios.all(
          map(sliced, (p) => axios.get(p.url))
        );
        commit("SET_POKEMONS", map(responses, (r) => r.data));
        commit("SET_PAGINATION", paginationData);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPokemonTypes({ commit }) {
      try {
        const { data } = await instance.get("type?limit=30");
        commit("SET_TYPES", data.results);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPokemonGrowth({ commit }) {
      try {
        const { data } = await instance.get("growth-rate/?limit=30");
        commit("SET_GROWTHS", data.results);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons;
    },
    SET_TYPES(state, types) {
      state.types = types;
    },
    SET_GROWTHS(state, growths) {
      state.growths = growths;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
  },
});

export default store;
