<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/Board">Board</router-link>
      <router-link to="/todo">Todo</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>