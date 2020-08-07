<template>
  <div class="home mt-5">
    <h1 class="text-center">Bug de Log!</h1>
<div class="container">
  <div class="row">
 <h3 class="col-3">Title </h3>
 <h3 class="col-3">Reported By </h3>
 <h3 class="col-3">Status </h3>
 <h3 class="col-3">Last Modified</h3>
  </div>
  
  
    <bug
   v-for="bugItem in bugs"
   :bug="bugItem"
   :key="bugItem.id"
   
    ></bug>
    </div>
  </div>
</template>

<script>
import Bug from "../components/Bug"
export default {
  name: "home",
  props: ["bug"],
  data(){
    return {}
  },
  mounted(){
    this.$store.dispatch("getAllBugs")
  },
  computed: {
    bugs(){
      return this.$store.state.bugs
    }
  },
  components: {
    Bug,
  }
};
</script>
