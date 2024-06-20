<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card class="comment-card">
          <v-card-title class="text-center title">Comentar order</v-card-title>
          <v-card-title class="text-center title">Order Information:</v-card-title>
          <v-card-text class="text-center title">
            <div>{{ order.number_people }} People</div>
            <div>{{ order.OrderDate }} - {{order.Horario}}</div>
            <div>Status: {{ order.status }}</div>
            <div v-for="(client, clientIndex) in order.clients" :key="clientIndex" class="client-section">
              <h3>{{ client.name }}</h3>
              <p v-if="client.indifferent" class="indifferent-text"> *Client {{ client.name }} is indifferent in regards*</p>
              <ul>
                <p v-for="(meal, mealIndex) in client.meals" :key="mealIndex" class="meal-item">
                  {{ meal.food.food_name }} ({{ meal.food.type }}) - {{ meal.observation || 'No observations' }}
                </p>
              </ul>
            </div>
          </v-card-text>
          <v-card-text class="text-center">
            <v-divider></v-divider>
            <h2>Sobre Restaurante</h2>
            <br>
            <v-row>
              <v-col cols="12">
                <p>Service Rating:</p>
              </v-col>
              <v-col cols="12">
                <v-rating v-model="servicerating" color="#FFD700" background-color="#E0E0E0"></v-rating>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p>Temperature Rating:</p>
              </v-col>
              <v-col cols="12">
                <v-rating v-model="temperatureRating" color="#FFD700" background-color="#E0E0E0"></v-rating>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p>Lighting Rating:</p>
              </v-col>
              <v-col cols="12">
                <v-rating v-model="lightRating" color="#FFD700" background-color="#E0E0E0"></v-rating>
              </v-col>
              <v-divider></v-divider>

            </v-row>
            <br>
            <h2>Sobre Foods</h2>
            <br>
            <v-row v-for="(food, index) in order.clients.reduce((acc, client) => [...acc, ...client.meals.map(meal => meal.food)], [])" 
              :key="index"
              style="display: flex; justify-content: center;align-items: center;"
              class="text-center">
              <v-col>
                <p>{{ food.food_name }}</p>
                <v-rating v-model="food.quantityRating" color="#FFD700" background-color="#E0E0E0"></v-rating>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <v-divider></v-divider>
            <br>
            <h2>FeedBack ou Comentario</h2>
            <v-col>
              <v-text-field v-model="Observation" label="Comment about the restaurant environment"></v-text-field>
            </v-col>
          </v-card-text>
          <v-card-actions class="justifu-center  align-center">
            <v-btn @click="submitComment" color="#7D0A0A">Submit</v-btn>
            <v-btn @click="cancelComment" color="red">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useOrderStore } from '../stores/order';

export default {
  data() {
    return {
      ratings: ['good', 'normal', 'bad'],
      servicerating: '',
      temperatureRating: '',
      lightRating: '',
      serviceObservation: '',
      temperatureObservation: '',
      lightObservation: '',
      order: JSON.parse(sessionStorage.getItem('order')) ,
      orderStore: useOrderStore(),

    };
  },
  created() {
    // if(this.order.isAvaliado === 'true') {
    //   this.$router.go(-1);
    //   alert('Erro ! ja fizest avaliação sobre neste order !');
      
    // }
  },
  methods: {
    async submitComment() {
      try {
        const token = sessionStorage.getItem('token');
        const comentario = {
          servicerating: this.servicerating,
          temperatureRating: this.temperatureRating,
          lightRating: this.lightRating,
          Observation: this.Observation,
          foods: this.order.clients.reduce((acc, client) => [...acc, ...client.meals.map(meal => ({
            food_id: meal.food_id,
            quantityRating: meal.food.quantityRating,
          }))], [])
          
        };
        const res = await fetch(`http://localhost:8080/avaliacao/${this.order.order_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(comentario)
        });
        if (res.status === 201) {
          await this.orderStore.SetisAvaliado(this.order.order_id);
          alert('avaliação entrega com sucesso !');

          this.$router.push('/perfil');
        } else {
          alert('Erro ! ja fizest avaliação sobre neste order !');
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      } 
    },
    cancelComment() {
      this.$router.push('/perfil'); 
    }
  }
};
</script>

<style scoped>
.comment-card {
  margin-top: 20px;
}

.title {
  color: #7D0A0A;
}

.indifferent-text {
  color: #7D0A0A;
}

.meal-item {
  color: #333;
}

</style>
