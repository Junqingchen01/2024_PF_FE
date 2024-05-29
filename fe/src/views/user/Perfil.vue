<template>
  <v-container>
    <v-row>
      <!-- perfil card-->
      <v-col cols="4">
        <v-card class="mt-5">
          <v-card-title class="text-center">Perfil</v-card-title>
          <v-card-text v-if="userinfo">
            <v-container>
              <v-row justify="center">
                <v-col cols="12">
                  <v-avatar size="300">
                    <img :src="userinfo.user.Avatar" alt="Avatar">
                  </v-avatar>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <p>
                    <strong>Name:</strong> 
                    <span @mouseover="showEditarName = true" @mouseleave="showEditarName = false">
                      {{ userinfo.user.Name }}
                      <v-btn v-if="showEditarName" @click="editarPerfil('Name')" text>
                        Editar
                      </v-btn>
                    </span>
                  </p>
                </v-col>
                <v-col cols="12">
                  <p>
                    <strong>Email:</strong> 
                    <span @mouseover="showEditarEmail = true" @mouseleave="showEditarEmail = false">
                      {{ userinfo.user.Email }}
                      <v-btn v-if="showEditarEmail" @click="editarPerfil('Email')" text>
                        Editar
                      </v-btn>
                    </span>
                  </p>
                </v-col>
                <v-col cols="12">
                  <p>
                    <strong>Tel:</strong> 
                    <span @mouseover="showEditarTel = true" @mouseleave="showEditarTel = false">
                      {{ userinfo.user.Tel }}
                      <v-btn v-if="showEditarTel" @click="editarPerfil('Tel')" text>
                        Editar
                      </v-btn>
                    </span>
                  </p>
                </v-col>
                <v-col cols="12">
                  <p><strong>UserType:</strong> {{ userinfo.user.UserType }}</p>
                </v-col>
              </v-row>

            </v-container>
            <div class="buttons">
              <v-btn @click="editarPassword" color="#7D0A0A">Editar Senha</v-btn>
              <v-btn @click="logout" color="#7D0A0A">Terminar sessão</v-btn>
            </div>

          </v-card-text>
          <v-card-text v-else>
            loading...
          </v-card-text>
        </v-card>
      </v-col>
      <!-- orders card-->
      <v-col cols="8">
        <v-card class="mt-5">
          <v-card-title class="text-center">Orders</v-card-title>
          <v-card-text>
            <v-row class="justify-center">
              <v-col cols="10" class="mt-4">
                <v-card v-for="(order, index) in sortedOrders" 
                :key="index" class="order-card"
                 @click="goToOrderDetail(order.order_id)" 
                 >
                  <div class="orden-content order-content">
                    <div class="order-info">
                      <p><strong>Order Date:</strong> {{ order.OrderDate }}</p>
                      <p><strong>Time:</strong> {{ order.Horario }}</p>
                      <p><strong>Number of People:</strong> {{ order.number_people }}</p>
                    </div>
                    <p class="order-status" :class="{ 'Done': order.Status === 'done' }">{{ order.Status === 'in_progress' ? 'Em progresso' : order.Status }}</p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useOrderStore } from '@/stores/order';

export default {
  data() {
    return {
      userinfo: JSON.parse(sessionStorage.getItem('userInfo')),
      showEditarName: false,
      showEditarEmail: false,
      showEditarTel: false,
      orderStore: useOrderStore(),
    };
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push('/login');
    },
    editarPassword() {
      this.$router.push({ name: 'editarPerfil', params: { field: 'Password' } });
    },
    editarPerfil(field) {
      this.$router.push({ name: 'editarPerfil', params: { field: field } });
    },
    goToOrderDetail(id) {
      this.$router.push({ name: 'Order', params: { id } });
    },
  },
  created() {
    try {
      this.orderStore.fetchOrders();
    } catch (error) {
      alert(error.message);
    }
  },

  computed: {
    sortedOrders() {
      return this.orderStore.getOrders.slice().sort((a, b) => {
        if (a.Status === 'in_progress' && b.Status !== 'in_progress') {
          return -1;
        } else if (a.Status !== 'in_progress' && b.Status === 'in_progress') {
          return 1;
        } else {
          // Keep the original order if both are in_progress or neither is
          return 0;
        }
      });
    }
  }
};
</script>

<style scoped>
.mt-5 {
  margin-top: 20px;
}
.order-card {
  margin-bottom: 20px;
}

.orden-item {
  margin-top: 20px;
  border: 2px solid #7D0A0A;
  background-color: white;
  padding: 10px;
  border-radius: 30px; 
  height: auto; 
  overflow: hidden;
}

.order-content {
  display: flex;
  justify-content: space-between;
  margin: auto 20px;
}

.order-info {
  color: #7D0A0A;
}

.order-status {
  color: #7D0A0A;
  font-weight: bold;
  font-size: 20px;
  margin: auto 0;
}

.cancel-button {
  margin: auto 0;
}

/* Style for in-progress status */
.Done {
  color: green;
}
</style>
