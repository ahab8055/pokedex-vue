import { createLogger, createStore } from "vuex";
import instance from "@/config/instance";

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
        commit("SET_POKEMONS", data.results);
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