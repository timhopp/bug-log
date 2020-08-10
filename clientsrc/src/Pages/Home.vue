<template>
  <div class="home mt-5">
    <h1 class="text-center"></h1>
<div class="container">
  <div class="row rounded">
 <h3 class="col-3 bg-secondary text-white border">Title </h3>
 <h3 class="col-3 bg-secondary text-white border">Reported By </h3>
 <h3 @click="openToClosed = !openToClosed" class="col-3 bg-secondary text-white border">Status </h3>
 <h3 class="col-3 bg-secondary text-white border">Last Modified</h3>
  </div>
  
  
    <bug
   v-for="bugItem in bugs"
   :bug="bugItem"
   :key="bugItem.id"
   
    ></bug>
    </div>

    <!-- Modal -->
    <form @submit.prevent="addBug(newBug)">
<div class="modal fade" id="bugModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Report Bug</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         Your Name
        <div class="input-group mb-3">
         
  <input type="text" class="form-control" placeholder="enter your Name..." v-model="newBug.name">
</div>
Title
<div class="input-group mb-3">
         
  <input type="text" class="form-control" placeholder="enter Title..." v-model="newBug.title">
</div>
Description
<div class="input-group">
  
  <input type="text" class="form-control" placeholder="enter description..." v-model="newBug.description">
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</form>
  </div>
</template>

<script>
import Bug from "../components/Bug"
export default {
  name: "home",
  props: ["bug"],
  data(){
    return {
      newBug: {},
      openToClosed: true,
    }
  },
  mounted(){
    this.$store.dispatch("getAllBugs")
  },
  computed: {
    bugs(){
      let bugs = this.$store.state.bugs
      if(this.openToClosed) {
        return bugs.sort((a,b) => a.closed - b.closed)
      } else {
        return bugs.sort((a,b) => b.closed - a.closed)
      }
    }
  },
  methods: {
    addBug(newBug){
      this.$store.dispatch("addBug", {
        name: this.newBug.name,
        title: this.newBug.title,
        description: this.newBug.description,
        creatorEmail: this.$store.state.profile.email
      })
        $("#bugModal").modal("hide");
      this.$store.dispatch("getAllBugs")
    }
  },
  components: {
    Bug,
  }
};
</script>
