<template>
    <v-app light>
    <Navbar/>
    <v-main class="mian">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';


export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => ({
    
  }),
}
</script>

<style>
.mian {
  background-color: #EAD196;
}
</style>
