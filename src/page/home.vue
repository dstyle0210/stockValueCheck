<!-- src/views/Home.vue -->
<template>
  <section>
    <table>
      <thead>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </thead>
    </table>
    <h1>안뇽 !</h1>
    <h2>라우터 테스트</h2>
    <router-link :to="routerTest">vuex 테스트하러 가기</router-link>
  </section>
</template>
<script  lang="ts">
import { defineComponent } from "vue";
// https://api.finance.naver.com/siseJson.naver?symbol=035420&requestType=1&startTime=20220825&endTime=20220825&timeframe=day


console.log("home");
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