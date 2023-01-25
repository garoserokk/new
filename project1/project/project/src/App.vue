<template>
  <header>
    <button v-if="toggle" @click="onToggle">login</button>
    <button v-if="!toggle" @click="onToggle">logout</button>
  </header>
  <input type="text" v-model="search" />
  <button class="btn btn-primary" @click="login">click</button>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const toggle = ref(true);

    const search = ref("");

    const login = () => {
      console.log(search.value);
    };

    const onToggle = () => {
      toggle.value = !toggle.value;
    };

    return {
      search,
      login,
      toggle,
      onToggle
    };
  },
};
</script>

<style></style>
