<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-card class="order-card">
        <v-btn @click="$router.go(-1)" color="#7D0A0A">Voltar</v-btn>
        <v-card-title class="text-center">
          <div>{{ order.number_people }} Pessoas</div>
          <div>{{ order.OrderDate }} - {{ order.Horario }}</div>
          <div>Status: {{ order.status }}</div>
          <div>Dia: {{ formattedOrderDate }}</div>
          <div v-if="order.isAvaliado === 'true'">Neste pedido já foi avaliado</div>
        </v-card-title>
        <v-card-text>
          <div v-for="(client, clientIndex) in order.clients" :key="clientIndex" class="client-section">
            <h3>{{ client.name }}</h3>
            <p v-if="client.indifferent" style="color: #7D0A0A;">*Cliente {{ client.name }} está indiferente em pratos*</p>
            <ul>
              <li v-for="(meal, mealIndex) in client.meals" :key="mealIndex" class="meal-item">
                {{ meal.food.food_name }} ({{ meal.food.type }}) - {{ meal.observation || 'Sem observações' }}
              </li>
            </ul>
          </div>
          <div class="buttons">
            <v-btn v-if="order.status === 'done' && !isAdmin" @click="cancelOrder()" color="#7D0A0A">Cancelar</v-btn>
            <v-btn v-if="order.avaliar === 'true' && !isAdmin && order.isAvaliado !== 'true'" @click="Comentar(order.order_id)" color="#7D0A0A">Avaliar</v-btn>
            <v-btn v-if="isAdmin && order.avaliar !== 'true'" @click="ativar()" color="red">Ativar avaliação</v-btn>
          </div>
          <div v-if="order.avaliar !== 'true'" style="display: flex; justify-content: center; margin-top: 10px;">
            <div v-if="isAdmin">
              Ativar permissão de avaliação para que o cliente possa avaliar
            </div>
            <div v-else>
              Admin ainda não permitiu avaliar este pedido
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
      formattedOrderDate: ''
    };
  },
  async created() {
    try {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      const orderId = this.$route.params.id;
      await this.orderStore.fetchOrder(orderId);
      this.order = this.orderStore.getOrder;
      this.formattedOrderDate = this.calculateOrderDate(this.order.createdAt, this.order.OrderDate);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
    console.log('Order:', this.order);
  },
  methods: {
    calculateOrderDate(createdAtStr, orderDateStr) {
      const createdAt = new Date(createdAtStr);
      const orderDateDay = this.getDayFromOrderDate(orderDateStr);
      const currentDay = createdAt.getDay();
      const daysDifference = (orderDateDay - currentDay + 7) % 7;
      const calculatedOrderDate = new Date(createdAt);
      calculatedOrderDate.setDate(createdAt.getDate() + daysDifference);
      return calculatedOrderDate.toLocaleDateString();
    },
    getDayFromOrderDate(orderDateStr) {
      const dayMap = {
        'Domingo': 0,
        'Segunda-feira': 1,
        'Terça-feira': 2,
        'Quarta-feira': 3,
        'Quinta-feira': 4,
        'Sexta-feira': 5,
        'Sábado': 6
      };
      return dayMap[orderDateStr];
    },
    async cancelOrder() {
      const res = prompt('Insira "sim" para cancelar a ordem.');
      if (res === null) return;
      if (res.toLowerCase() === 'sim') {
        await this.orderStore.cancelOrder(this.order.order_id);
        this.$router.go(-1);
      }
    },
    Comentar(id) {
      this.$router.push({ name: 'comentar', params: { id } });
    },
    async ativar() {
      await this.orderStore.AtivarAvaliacao(this.order.order_id);
      alert('Avaliação ativada com sucesso!');
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
