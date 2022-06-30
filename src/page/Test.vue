<!-- src/views/Test.vue -->
<template>
  <div>
    <h2>{{ rootStateData }}</h2>
    <button @click="setRoot">Set Root Data</button>
    <h2>{{ moduleAData }}</h2>
    <button @click="setModuleA">Set ModuleA Data</button>
    <h2>{{ moduleBData }}</h2>
    <button @click="setModuleB">Set ModuleB Data</button>
    <button @click="setModuleB2">Set ModuleB Data2</button>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
const { state, dispatch } = useStore();

// 밀어넣기
const rootStateData = computed(() => state.data);
const moduleAData = computed(() => state.moduleA.data);
const moduleBData = computed(() => state.moduleB.data);

// 설정하기
const setRoot = () => dispatch("setRootData", "testRoot"); //RootState
const setModuleA = () => dispatch("moduleA/setRootData", "testModuleA2"); //ModuleState
const setModuleB = () => dispatch("moduleB/setRootData", "testModuleB3"); //ModuleState
const setModuleB2 = () => dispatch("moduleB/setRootData", "testModuleB2"); //ModuleState2
</script>

<style>
</style>