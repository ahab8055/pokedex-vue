import { createLogger, createStore } from "vuex";


const store = createStore({
  plugins: [createLogger()],
  state: {
    users: []
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    }
  },
  
})