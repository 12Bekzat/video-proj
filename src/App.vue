<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <Header v-if="!$route.path.includes('login')"/>
  <div class="main" v-if="!$route.path.includes('login')">
    <RouterView />
  </div>
  <RouterView v-else/>
  <Footer v-if="!$route.path.includes('login')"/>
</template>
