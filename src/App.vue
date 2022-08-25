<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import style from "./assets/css/reset.css"; // 추가
</script>

<template>
  <header>DS.Stock</header>
  <main>
    <router-view />
  </main>
  <footer>Copyright Dstyle0210</footer>
</template>


<style lang="scss">
@import "./assets/scss/layout.scss";
</style>
