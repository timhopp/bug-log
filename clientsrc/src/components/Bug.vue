<template>
  <div class="Bug row">
    <div class="col-3">
   {{bug.title}}
   </div>
   <div class="col-3">
   {{bug.creatorEmail}}
   </div>
   <div class="col-3">
   {{bug.closed}}
   </div>
   <div class="col-3">
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
  methods:{},
  components:{}
}
</script>


<style scoped>

</style>