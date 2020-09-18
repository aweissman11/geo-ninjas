<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  background-color: #ddd;
}
</style>
