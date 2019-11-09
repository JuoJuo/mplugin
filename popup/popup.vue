<template>
<div>
  <div>
    <input type="text" v-model="headerKey">
    <input type="text">
  </div>
</div>
</template>

<script>
  export default {
    data(){
      return {
        headerKey: 'popup.vue',
      }
    }
  }
</script>

<style scoped>

</style>
