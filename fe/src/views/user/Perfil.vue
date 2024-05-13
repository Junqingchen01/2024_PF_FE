<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card class="mt-5">
          <v-card-title class="text-center">Perfil</v-card-title>
          <v-card-text v-if="userinfo">
            <v-container>
              <v-row justify="center">
                <v-avatar size="300">
                    <img :src="userinfo.user.Avatar" alt="Avatar">
                </v-avatar>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <p><strong>Name:</strong> {{ userinfo.user.Name }}</p>
                </v-col>
                <v-col cols="12">
                  <p><strong>Email:</strong> {{ userinfo.user.Email }}</p>
                </v-col>
                <v-col cols="12">
                  <p><strong>Tel:</strong> {{ userinfo.user.Tel }}</p>
                </v-col>
                <v-col cols="12">
                  <p><strong>UserType:</strong> {{ userinfo.user.UserType }}</p>
                </v-col>
              </v-row>

            </v-container>
          </v-card-text>
          <v-card-text v-else>
            loading...
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      userinfo: JSON.parse(sessionStorage.getItem('userInfo')),
    };
  },

};
</script>

<style scoped>
.mt-5 {
  margin-top: 20px;
}
</style>
