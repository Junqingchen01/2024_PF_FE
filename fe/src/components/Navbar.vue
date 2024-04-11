<template>
    <nav>
        <v-toolbar class="custom-toolbar" v-if="islogin">
            <v-toolbar-title>
                <v-btn text to="/">Home</v-btn>
                <v-btn text to="/reserva">Reserva</v-btn>
                <v-btn text to="/horarios">Horarios</v-btn>
                <v-btn text to="/dashboard" v-if="isAdmin">Dashboard</v-btn>
            </v-toolbar-title>
            <v-spacer>
            </v-spacer>
                <v-btn text to="/orders">Orders</v-btn>
                
                <v-btn icon>
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
      islogin: true,
      isAdmin: true,
      mdiAccount: mdiAccount
    }
  }
};
</script>

<style>
.custom-toolbar {
    background-color: #EAD196 !important;
}

.custom-toolbar .v-btn {
  color: #7D0A0A; 
}

</style>
