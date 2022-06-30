<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>안뇽 !</h1>
    <h2>라우터 테스트</h2>
    <router-link :to="routerTest">vuex 테스트하러 가기</router-link>
  </div>
</template>
<script  lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      routerTest: "/test",
    };
  },
});
</script>

<style>
</style>