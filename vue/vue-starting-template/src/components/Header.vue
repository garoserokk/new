<template>
  <div id="Header">
    <h1>header</h1>
    <Search></Search>
    <Navigation></Navigation>
  </div>
</template>

<script>
  import Navigation from "./Navigation";
  import Search from "./Serch.vue";
export default {
  components:{
    Navigation,
    Search,
  }
}
</script>

<style scoped>

</style>
