<template>
  <v-row justify="center">
  <v-col cols="6">
    <v-card class="order-card">
      <!-- volta a pagina aterior-->
      <v-btn @click="$router.go(-1)" color="#7D0A0A">Volta</v-btn>
      <v-card-title class="text-center">
        <div>{{ order.number_people }} Pessoas</div>
        <div>{{ order.OrderDate }} - {{order.Horario}}</div>
        <div>Status: {{ order.status }}</div>
      </v-card-title>
      <v-card-text>
        <div v-for="(client, clientIndex) in order.clients" :key="clientIndex" class="client-section">
          <h3>{{ client.name }}</h3>

          <p v-if="client.indifferent" style="color: #7D0A0A;"> *Client {{ client.name }} esta indifferent em paratos*</p>
          <ul>
            <li v-for="(meal, mealIndex) in client.meals" :key="mealIndex" class="meal-item">
              {{ meal.food.food_name }} ({{ meal.food.type }}) - {{ meal.observation || 'No observations' }}
            </li>
          </ul>

        </div>
        <div class="buttons">
          <v-btn v-if="order.status === 'done' " @click="cancelOrder()" color="#7D0A0A">Cancelar</v-btn>
          <v-btn v-if="order.avaliar === 'true' " @click="Comentar(order.order_id)" color="#7D0A0A">Avaliar</v-btn>
          <v-btn v-if="isAdmin" @click="ativar()" color="red">Ativar avaliação</v-btn>
        </div>
        <div v-if="order.avaliar !== 'true'" style="display: flex ;justify-content: center; margin-top: 10px;">
            <div v-if="isAdmin">
              Ativar permisao de avaliação para cliente podem avaliar
            </div>
            <div v-else>
              Admin ainda nao permite te avaliar neste pedido
            </div>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
import { defineComponent } from 'vue';
import { useOrderStore } from '../stores/order';

export default defineComponent({
  name: 'OrderDT',
  data() {
    return {
      orderStore: useOrderStore(),
      user: '',
      order: '',
      isAdmin: sessionStorage.getItem('isAdmin') === 'true',
    };
  },
  async created() {
    try {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      const orderId = this.$route.params.id; 
      await this.orderStore.fetchOrder(orderId);
      this.order = this.orderStore.getOrder;

    } catch (error) {
      console.error('Error fetching order:', error);
    }
    console.log('Order:', this.order);
  },
  methods: {
    async cancelOrder() {
      const res = prompt('Inserir "sim" para cancelar orden.');
      if (res === null) return;
      if (res.toLowerCase() === 'sim') {
        await this.orderStore.cancelOrder(this.order.order_id);
        this.$router.push('/orders');
      }
    },
    Comentar(id){
      this.$router.push({ name: 'comentar', params: { id } });
    },
    async ativar(){
      await this.orderStore.AtivarAvaliacao(this.order.order_id);
      alert('Avaliacao ativada com sucesso !');
    }
  }
});
</script>


<style scoped>
.order-card {
  background-color: white;
  margin-top: 20px;
  border: 2px solid #7D0A0A;
  border-radius: 10px;
  padding: 20px;
}

.client-section {
  margin-bottom: 20px;
}

.meal-item {
  list-style-type: none;
  color: #7D0A0A;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
