import { createLogger, createStore } from "vuex";
import instance from "@/config/instance";
import { map } from "lodash";
import axios from "axios";

const store = createStore({
  plugins: [createLogger()],
  state: {
    pokemons: [],
    types: [],
    natures: [],
    growths: [],
  },
  getters: {},
  actions: {
    async fetchPokemons({ commit }) {
      try {
        const { data } = await instance.get("pokemon?limit=9");
        const pokemonsApis = map(data.results, (pokemon) => {
          console.log(pokemon);
          const url = pokemon.url;
          return axios.get(url);
        });
        const responses = await axios.all(pokemonsApis);
        const resultData = map(responses, (response) => response.data);
        commit("SET_POKEMONS", resultData);
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
    async fetchPokemonNature({ commit }) {
      try {
        const { data } = await instance.get("nature/?limit=30");
        commit("SET_NATURES", data.results);
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
    SET_NATURES(state, natures) {
      state.natures = natures;
    },
    SET_GROWTHS(state, growths) {
      state.growths = growths;
    },
  },
});

export default store;
