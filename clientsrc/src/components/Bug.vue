<template>
  <div class="Bug row" @click="viewBug(bug.id)">
    <div class="col-3 bg-white border">
   {{bug.title}}
   </div>
   <div class="col-3 bg-white border">
   {{bug.name}}
   </div>
   <div class="col-3 bg-white border">
   {{bug.closed}}
   </div>
   <div class="col-3 bg-white border">
   {{bug.updatedAt}}
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