<template>
  <div class="Comment bg-white border">
    <div class="row">
    <h5 class="col-7">{{comment.creatorEmail}}-{{comment.content}}</h5>
    <button type="button" class="m-2 col-2 btn btn-info" @click="setCurrentComment(comment.id)" data-toggle="modal" data-target="#editCommentModal">Edit</button>
   <button class="m-2  col-2 btn btn-warning" @click="deleteComment(comment.id)">Delete</button>  
    </div>

  </div>
</template>


<script>
export default {
  name: 'Comment',
  props: ["comment"],
  data(){
    return {}
  },
  computed:{},
  methods:{
    deleteComment(commentId){
      this.$store.dispatch("deleteComment", commentId)
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