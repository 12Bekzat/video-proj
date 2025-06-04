<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';

</script>

<template>
  <Header v-if="!$route.path.includes('login')"/>
  <div class="main" v-if="!$route.path.includes('login')">
    <RouterView />
  </div>
  <RouterView v-else/>
</template>
