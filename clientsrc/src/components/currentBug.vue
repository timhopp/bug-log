<template>
  <div class="currentBug container bg-secondary mt-5">
    <div class="row">
   <h1 class="col-7 text-white">{{currentBug.title}} </h1>
   <button v-show="!currentBug.closed"  type="button" class="m-2 col-2 btn btn-info" data-toggle="modal" data-target="#editBugModal">Edit</button>
   <button v-show="!currentBug.closed" class="m-2  col-2 btn btn-warning" @click="closeBug(currentBug.id)">Close</button> 
   <div v-show="currentBug.closed" class="m-2 ml-5 col-2  btn btn-primary" >Bug Already Closed</div> 
   </div>
  <h5 class="text-white">{{currentBug.name}}</h5>
  <p class="text-white"> {{currentBug.description}}</p>
  <h5 class="text-white p-1"> Comments </h5>
    <comment
   v-for="commentItem in comments"
   :comment="commentItem"
   :key="commentItem.id"
   
    ></comment>

  <button type="button" class="btn btn-warning mr-5 mb-2 mt-2" data-toggle="modal" data-target="#commentModal">
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


<form @submit.prevent="bugToEdit(editBug)">
<div class="modal fade" id="editBugModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Bug</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         Your Name
        <div class="input-group mb-3">
         
  <input type="text" class="form-control" placeholder="enter your Name..." v-model="editBug.name">
</div>
Title
<div class="input-group mb-3">
         
  <input type="text" class="form-control" placeholder="enter Title..." v-model="editBug.title">
</div>
Description
<div class="input-group">
  
  <input type="text" class="form-control" placeholder="enter description..." v-model="editBug.description">
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save Edits</button>
      </div>
    </div>
  </div>
</div>
</form>

  <form @submit.prevent="commentToEdit(editComment)" class="modal fade" id="editCommentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Comment</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
Comment
<div class="input-group mb-3">
         
  <input type="text" class="form-control" placeholder="enter Comment..." v-model="editComment.content">
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Edit Comment</button>
      </div>
    </div>
  </div>
</form>


  </div>


  
</template>


<script>
import Comment from "../components/Comment"
import swal from "sweetalert2"
export default {
  name: 'currentBug',
  props: ["comment", "commentItem"],
  data(){
    return {
      newComment: {},
      editBug: {},
      editComment: {},
    }
  },
  mounted() {
     this.$store.dispatch("setCurrentBug", this.$route.params.bugId)
  },
  computed:{
    currentBug(){
      return this.$store.state.currentBug;
    },
    comments(){
      return this.$store.state.notes;
    }
  },
  methods:{
    addComment(newComment){
      this.$store.dispatch("addComment", {
        content: this.newComment.comment,
        bugId: this.$route.params.bugId,
        creatorEmail: this.$store.state.profile.email
      })
        $("#commentModal").modal("hide");
    },
    bugToEdit(editBug){
      this.$store.dispatch('editBug', {
        title: this.editBug.title,
        description: this.editBug.description,
        name: this.editBug.name,
        bugId: this.$route.params.bugId
      })
      $("#editBugModal").modal("hide");
    },
    // deleteBug(bugId){
    //   this.$store.dispatch('deleteBug', bugId)
    //  this.$router.push({ name: "Home", path: "/" });
    //  this.$store.dispatch('getAllBugs')
    // },
    closeBug(Id){
    swal.fire({
      title: 'Are you sure?',
      text: "Once completed it cannot be undone",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, complete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
          this.$store.dispatch('editBug', {
        bugId: Id, 
        closed: true, 
      })
       this.$router.push({ name: "Home", path: "/" });
        swal.fire(
          'Completed!',
          'Your bug is completed. ',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swal.fire(
          'Cancelled',
          'Your bug lives on!',
          'error'
        )
      }
    })
    },
     
    commentToEdit(editComment){
      this.$store.dispatch('editComment', {
        content: this.editComment.content, 
        bugId: this.$route.params.bugId,
        //*How to access comment ID for this function? 
        id: this.$store.state.currentComment.id
      })
    },
   
  },
  components:{
    Comment,
  }
}
</script>


<style scoped>

</style>