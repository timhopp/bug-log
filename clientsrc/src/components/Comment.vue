<template>
  <div class="Comment bg-white border">
    <div class="row">
    <h5 class="col-7">{{comment.creatorEmail}}-{{comment.content}}</h5>
    <button type="button" class="m-2 col-2 btn btn-info" data-toggle="modal" data-target="#editCommentModal">Edit</button>
   <button class="m-2  col-2 btn btn-warning" @click="deleteBug(currentBug.id)">Delete</button>  
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
  methods:{},
  components:{}
}
</script>


<style scoped>

</style>