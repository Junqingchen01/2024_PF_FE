<template>
  <v-row class="justify-center">
    <v-col cols="10" class="mt-4">
      <div v-for="(order, index) in orders" :key="index" class="orden-item order-item"  @click="goToOrderDetail(order.order_id)">
        <div class="orden-content order-content">
          <div class="order-info">
            <p><strong>Order Date:</strong> {{ order.OrderDate }}</p>
            <p><strong>Time:</strong> {{ order.Horario }}</p>
            <p><strong>Number of People:</strong> {{ order.number_people }}</p>
          </div>
          <p class="order-status" :class="{ 'Done': order.Status === 'Done' }"> {{ order.Status === 'in_progress' ? 'Em progresso' : order.Status }}</p>
          <div v-if="order.Status === 'in_progress'" class="cancel-button">
            <v-btn @click="cancelOrder(index)" color="red">Cancelar</v-btn>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from 'vue';
import { useOrderStore } from '../stores/order';

export default defineComponent({
  name: 'Orders',

  data() {
    return {
      orderStore: useOrderStore(),
    };
  },

  methods: {
    cancelOrder(index) {
      const res = prompt('Inserir "sim" para cancelar orden.');
      if (res === null) return;
      if (res.toLowerCase() === 'sim') {
        this.orders[index].status = 'cancelado';
      }
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
    orders() {
      return this.orderStore.getOrders;
    }
  }
});
</script>

<style scoped>
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
