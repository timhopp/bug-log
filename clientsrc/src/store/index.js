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
    currentComment: {},
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
    },
    setComments(state, notes){
      state.notes = notes
      console.log('current notes', state.notes)
    },
    setCurrentComment(state, currentComment){
      state.currentComment = currentComment
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
        let res = await api.post("bugs", payload)
        dispatch("getAllBugs")
       
      } catch(error){
        console.error(error)
      }
    },

    async addComment({commit, dispatch}, payload){
      try{
        let res = await api.post("notes", payload)
        dispatch("getCommentsByBug", payload.bugId)
        console.log('added comment', payload)
      } catch(error){
        console.error(error)
      }
    },

    setCurrentBug({ commit, dispatch, state }, bugId){
      let currentPost = this.state.bugs.find(bug => bugId == bug.id);
      commit("setCurrentBug", currentPost)
      dispatch("getCommentsByBug", bugId)
    },

    setCurrentComment({commit, dispatch, state }, commentId){
      let currentComment = this.state.notes.find(comment => commentId == comment.id)
      commit("setCurrentComment", currentComment)
    },

    async getCommentsByBug({ commit, dispatch, state}, bugId){
      try{
        this.state.notes = []
        let notes = await api.get("bugs/" + bugId + "/notes") 
        commit("setComments", notes.data)
      } catch(error){
        console.error(error)
      }
    },
    async deleteBug({ commit, dispatch, state}, bugId){
      try{
        await api.delete("bugs/" + bugId)
      } catch(error){
        console.error(error)
      }
    },
    async deleteComment({ commit, dispatch, state}, commentId){
      try{
        await api.delete("notes/" + commentId)
        dispatch("getCommentsByBug", this.state.currentBug.id)
      } catch(error){
        console.error(error)
      }
    },
    async editBug ({ commit, dispatch }, payload){
      try{
        let res = await api.put("bugs/" + payload.bugId, payload)
        commit("setCurrentBug", res.data)
      } catch(error){
        console.error(error)
      }
    },
    async closeBug ({ commit, dispatch }, payload){
      try{
        let res = await api.put("bugs/" + payload.bugId, payload)
        commit("setCurrentBug", res.data)
      } catch(error){
        console.error(error)
      }
    },
    async editComment ({ commit, dispatch}, payload){
      try{
        let res = await api.put("notes/" + payload.id, payload)
        dispatch("getCommentsByBug", payload.bugId)
      } catch(error){
        console.error(error)
      }
    }
  }
});
