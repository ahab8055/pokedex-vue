import { createLogger, createStore } from "vuex";
import instance from "@/config/instance";
import { map } from "lodash";
import axios from "axios";

const store = createStore({
  plugins: [createLogger()],
  state: {
    pokemons: []
  },
  getters: {},
  actions: {
    async fetchPokemons({ commit }) {
      try {
        const { data } = await instance.get("pokemon?limit=9");
        const pokemonsApis = map(data.results, (pokemon) => {
          console.log(pokemon)
          const url = pokemon.url;
          return axios.get(url);
        })
        const responses = await axios.all(pokemonsApis);
        const resultData = map(responses, (response) => response.data);
        commit("SET_POKEMONS", resultData);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons;
    }
  },
  
})

export default store;