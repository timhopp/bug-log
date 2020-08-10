<template>
  <div class="Comment bg-success rounded p-1 text-white">
    <div class="row align-items-center">
    <h5 class="col-7">{{comment.creatorEmail}}:&nbsp; {{comment.content}}</h5>
    <button type="button" class="m-2 col-2 btn btn-info" @click="setCurrentComment(comment.id)" data-toggle="modal" data-target="#editCommentModal">Edit</button>
   <button class="m-2  col-2 btn btn-warning" @click="deleteComment(comment.id)">Delete</button>  
    </div>

  </div>
</template>


<script>
import swal from "sweetalert2"
export default {
  name: 'Comment',
  props: ["comment"],
  data(){
    return {}
  },
  computed:{},
  methods:{
    deleteComment(commentId){
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
         this.$store.dispatch("deleteComment", commentId)
       
        swal.fire(
          'Completed!',
          'Your comment is deleted. ',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swal.fire(
          'Cancelled',
          'Your comment lives on!',
          'error'
        )
      }
    })
    },
    setCurrentComment(commentId){
      this.$store.dispatch("setCurrentComment", commentId)
    }
  },
  components:{
    
  }
}
</script>


<style scoped>

</style>