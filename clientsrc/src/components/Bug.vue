<template>
<div >
  <div v-show="!bug.closed" class="Bug row" @click="viewBug(bug.id)">
    <div class="col-3 bg-secondary text-white border">
   <h5>{{bug.title}}</h5>
   </div>
   <div class="col-3 bg-secondary text-white border">
   <h5>{{bug.name}}</h5>
   </div>
    <div v-show="!bug.closed" class="col-3 bg-secondary text-white border">
   <h5>Open</h5>
   </div>
   <div class="col-3 bg-secondary text-white border">
   <h5>{{bug.updatedAt}}</h5>
   </div>
  </div>
    <div v-show="bug.closed" class="Bug row bg-secondary text-warning strikethrough" @click="viewBug(bug.id)">
    <div class="col-3  border">
   <h5>{{bug.title}}</h5>
   </div>
   <div class="col-3 border">
   <h5>{{bug.name}}</h5>
   </div>
    <div class="col-3 border">
  <h5>Closed</h5>
   </div>
   <div class="col-3 border">
  <h5> {{bug.updatedAt}} </h5>
   </div>
  </div>
  </div>
</template>


<script>
export default {
  name: 'Bug',
  props: ["bug"],
  data(){
    return {}
  },
  computed:{},
  methods:{
    viewBug(id){
      this.$router.push({name: 'Bug', params: { bugId: id } })
    }
  },
  components:{}
}
</script>


<style scoped>

</style>