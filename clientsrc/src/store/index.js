import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    currentBug: {},
    notes: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs;
    },
    setCurrentBug(state, currentBug) {
      state.currentBug = currentBug;
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    getAllBugs(){
      api.get('bugs')
      .then(res => {
        this.commit('setBugs', res.data)
      })
    },
    async addBug({ commit, dispatch }, payload){
      try {
        debugger
        let res = await api.post("bugs", payload)
        dispatch("getAllBugs")
       
      } catch(error){
        console.error(error)
      }
    },

    setCurrentBug({ commit, dispatch, state }, bugId){
      let currentPost = this.state.bugs.find(bug => bugId == bug.id);
      commit("setCurrentBug", currentPost)
    }
  }
});
