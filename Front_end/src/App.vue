<template>
  <v-app>
    <topbar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import topbar from './components/topbar.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    topbar
  }
}
</script>
