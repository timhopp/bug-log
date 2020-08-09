<template>
  <div class="currentBug container bg-secondary mt-5">
   <h1 class=" text-white">{{currentBug.title}} </h1>
  <h5 class="text-white">{{currentBug.name}}</h5>
  <p class="text-white"> {{currentBug.description}}</p>
  <h5 class="text-white"> Comments </h5>
  <button type="button" class="btn btn-warning mr-5" data-toggle="modal" data-target="#commentModal">
          Add Comment
          </button>





  <form @submit.prevent="addComment(newComment)">
<div class="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Report Bug</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
Comment
<div class="input-group mb-3">
         
  <input type="text" class="form-control" placeholder="enter Comment..." v-model="newComment.comment">
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Add Comment</button>
      </div>
    </div>
  </div>
</div>
</form>
  </div>


  
</template>


<script>
export default {
  name: 'currentBug',
  data(){
    return {
      newComment: {},
    }
  },
  mounted() {
     this.$store.dispatch("setCurrentBug", this.$route.params.bugId)
  },
  computed:{
    currentBug(){
      return this.$store.state.currentBug;
    }
  },
  methods:{},
  components:{}
}
</script>


<style scoped>

</style>