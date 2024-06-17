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
                    <strong style="color: #7D0A0A;">Name:</strong> 
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
                    <strong style="color: #7D0A0A;">Email:</strong> 
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
                    <strong style="color: #7D0A0A;">Tel:</strong> 
                    <span @mouseover="showEditarTel = true" @mouseleave="showEditarTel = false">
                      {{ userinfo.user.Tel }}
                      <v-btn v-if="showEditarTel" @click="editarPerfil('Tel')" text>
                        Editar
                      </v-btn>
                    </span>
                  </p>
                </v-col>
                <v-col cols="12">
                  <p><strong style="color: #7D0A0A;">UserType:</strong> {{ userinfo.user.UserType }}</p>
                </v-col>
              </v-row>

            </v-container>
            <br>
            <div class="button">
              <v-row>
                <v-btn @click="editarPassword" color="#7D0A0A" class="text-center">Editar Senha</v-btn>
              </v-row>
              <v-row>
                <v-btn @click="openDialog" color="#7D0A0A" class="text-center">Editar Avatar</v-btn>
              </v-row>
              <v-row>
                <v-btn @click="logout" color="#7D0A0A" class="text-center" >Terminar sessão</v-btn>
              </v-row>
            </div>
            <br>
          </v-card-text>
          <v-card-text v-else>
            loading...
          </v-card-text>
        </v-card>
      </v-col>
        <!-- orders card-->
        <v-col cols="8">
          <v-card class="mt-5" style="height: 300px;">
            <v-card-title class="text-center">Orders</v-card-title>
            <v-card-text style="height: calc(100% - 56px); overflow-y: auto;">
              <v-row class="justify-center">
                <v-col cols="10" class="mt-4">
                  <div v-if="sortedOrders.length === 0">
                    <p>Não há ordens ainda.</p>
                  </div>
                  <v-card v-for="(order, index) in sortedOrders" :key="index" class="order-card" @click="goToOrderDetail(order.order_id)">
                    <div class="orden-content order-content">
                      <div class="order-info">
                        <p><strong style="color: #7D0A0A;">Order ID:</strong> {{ order.order_id }}</p>
                        <p><strong style="color: #7D0A0A;">Order Date:</strong> {{ order.OrderDate }}</p>
                        <p><strong style="color: #7D0A0A;">Horario:</strong> {{ order.Horario }}</p>
                      </div>
                      <p class="order-status" :class="{ 'Done': order.Status === 'done' }">{{ order.Status === 'in_progress' ? 'Em progresso' : 'Done' }}</p>
                      <p class="order-status" :class="{ 'Done': order.Status === 'done' }" v-if="order.isAvaliado==='true'">Avaliado</p>
                      <p class="order-status" v-if="order.isAvaliado !=='true'">Falta Avaliar</p>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        <!-- Avaliação card -->
        <v-card class="mt-5" style="height: 395px;">
          <v-card-title class="text-center title">Minha Avaliação</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: calc(100% - 56px); overflow-y: auto; display: flex; justify-content: center; align-items: center;">
            <v-list v-if="avaliacoes.length === 0">
              <div>Ainda não fizeste nenhuma avaliação.</div>
            </v-list>
            <v-list v-else>
              <v-list-item v-for="(avaliacao, index) in avaliacoes" :key="index">
                <v-divider v-if="index !== 0"></v-divider>
                <v-list-item-content class="text-center">
                  <v-list-item-title>
                    <strong style="color: #7D0A0A;">Serviço:</strong>
                    <v-rating v-model="avaliacao.servicerating" color="#FFD700" background-color="#E0E0E0" readonly></v-rating> 
                  </v-list-item-title>
                  <v-list-item-title>
                    <strong style="color: #7D0A0A;">Temperatura:</strong>
                    <v-rating v-model="avaliacao.temperatureRating" color="#FFD700" background-color="#E0E0E0" readonly></v-rating> 
                  </v-list-item-title>
                  <v-list-item-title>
                    <strong style="color: #7D0A0A;">Luz:</strong>
                    <v-rating v-model="avaliacao.lightRating" color="#FFD700" background-color="#E0E0E0" readonly></v-rating> 
                  </v-list-item-title>

                  <v-list-item-title><strong style="color: #7D0A0A;">Observação:</strong> {{ avaliacao.Observation }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action style="display: flex; justify-content: space-between;">
                  <div class="text-center">
                    <v-btn color="#7D0A0A" @click="goToAvaliacaoDetail(index)" >Mais</v-btn>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="showAvatarDialog" max-width="500px">
    <v-card>
      <v-card-title class="text-center">Change Avatar</v-card-title>
      <v-card-text>
        <v-form>
          <v-file-input
            v-model="avatarFile"
            accept="image/*"
            label="Select Avatar"
            outlined
            dense
          ></v-file-input>
          <v-btn @click="uploadAvatar()" color=" #7D0A0A">Upload</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
import { useOrderStore } from '@/stores/order';
import { useAvaliarStore } from '@/stores/avaliar';

export default {
  data() {
    return {
      userinfo: JSON.parse(sessionStorage.getItem('userInfo')),
      showEditarName: false,
      showEditarEmail: false,
      showEditarTel: false,
      showAvatarDialog: false,
      avatarFile: null,
      orderStore: useOrderStore(),
      avaliarStore: useAvaliarStore(),
      avaliacoes: [], 

      
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
    openDialog(){
      this.showAvatarDialog = true
    },
    goToAvaliacaoDetail(index) {
      this.$router.push({ name: 'avaliacaoDetail', params: { id: this.avaliacoes[index].avaliacao_id }});
    },
    async uploadAvatar() {
      try {
        const token = sessionStorage.getItem('token');
        const formData = new FormData();
        formData.append('newAvatar', this.avatarFile);

       const response = await fetch('http://localhost:8080/user/updateuser', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
         body: formData,
        });
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }


      } catch (error) {
        alert('An error occurred while uploading the avatar.');
        console.error(error);
      }
    },
 
  },
  created() {
    try {
      const storedAvaliacoes = sessionStorage.getItem('Myavaliacoes');
      if (storedAvaliacoes) {
        this.avaliacoes = JSON.parse(storedAvaliacoes);
      }
      this.orderStore.fetchOrders();
      this.avaliarStore.fetchMyAvaliacoes();
    } catch (error) {
      alert(error.message);
    }
  },
  computed: {
    sortedOrders() {
      // slice para copiar, assim nao modar os dados originais
      return this.orderStore.getOrders.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      const today = new Date();
      // calcular diferença entre a data de hoje e a data da ordem e ordenar por ordem crescente
      const diffA = Math.abs(today - dateA);
      const diffB = Math.abs(today - dateB);
      return diffA - diffB;
      });
    }
  }
};
</script>


<style scoped>
.mt-5 {
  margin-top: 20px;
  margin-bottom: 20px;
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

.button{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; 
}
.Done {
  color: green;
}
</style>