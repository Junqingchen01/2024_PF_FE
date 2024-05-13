<template>
      <nav v-if="isLogin">
          <v-toolbar class="custom-toolbar">
              <v-toolbar-title>
                  <v-btn text to="/">Home</v-btn>
                  <v-btn text to="/reserva">Reserva</v-btn>
                  <v-btn text to="/horarios">Horarios</v-btn>
                  <v-btn text to="/dashboard" v-if="isAdmin">Dashboard</v-btn>
              </v-toolbar-title>
              <v-spacer>
              </v-spacer>
                  <v-btn text to="/orders">Orders</v-btn>
                  
                  <v-btn icon text to="/perfil">
                      <v-icon>mdi-account</v-icon>
                  </v-btn>
                  
          </v-toolbar>
      </nav>
</template>

<script>
import { mdiAccount } from '@mdi/js';

export default {
  data() {
    return {
      isAdmin: false,
      mdiAccount: mdiAccount,
      isLogin: false,
      userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
    }
  },
  created() {
    this.isLogin = JSON.parse(sessionStorage.getItem('isLogin'));
    this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
  },
};
</script>

<style>
.custom-toolbar {
    background-color: #E6BA50!important;
}

.custom-toolbar .v-btn {
  color: #7D0A0A; 
}

</style>
