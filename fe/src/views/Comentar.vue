<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" >
        <v-card class="comment-card">
          <v-card-title class="text-center">Leave a Comment</v-card-title>
          <v-card-text>
            <v-select v-model="servicerating" :items="ratings" label="Serviço Classificação" outlined></v-select>
            <v-text-field v-model="serviceObservation" label="Serviço Comentario" outlined></v-text-field>

            <v-select v-model="temperatureRating" :items="ratings" label="Temperatura Classificação" outlined></v-select>
            <v-text-field v-model="temperatureObservation" label="Temperatura Comentario" outlined></v-text-field>

            <v-select v-model="lightRating" :items="ratings" label="Luz Classificação" outlined></v-select>
            <v-text-field v-model="lightObservation" label="Luz  Comentario" outlined></v-text-field>

            <v-divider></v-divider>

            <h3>Foods</h3>
            <v-row v-for="(food, index) in order.clients.reduce((acc, client) => [...acc, ...client.meals.map(meal => meal.food)], [])" :key="index">
              <v-col cols="12" sm="6">
                <v-select v-model="food.quantityRating" :items="ratings" :label="`Quantidade Classificação para ${food.food_name}`" outlined></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="food.comment" :label="`Comentario para ${food.food_name}`" outlined></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="submitComment">Submit</v-btn>
            <v-btn @click="cancelComment">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ratings: ['bom', 'normal', 'mal'],
      servicerating: '',
      temperatureRating: '',
      lightRating: '',
      serviceObservation: '',
      temperatureObservation: '',
      lightObservation: '',
      order: JSON.parse(sessionStorage.getItem('order')) 
    };
  },
  methods: {
    async submitComment() {
      try {
        const token = sessionStorage.getItem('token');
        const comentario = {
          servicerating: this.servicerating,
          temperatureRating: this.temperatureRating,
          lightRating: this.lightRating,
          serviceObservation: this.serviceObservation,
          temperatureObservation: this.temperatureObservation,
          lightObservation: this.lightObservation,
          foods: this.order.clients.reduce((acc, client) => [...acc, ...client.meals.map(meal => ({
            food_id: meal.food_id,
            quantityRating: meal.food.quantityRating,
            content: meal.food.comment
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
          const comentarioResponse = await res.json();
          alert('Comment sent successfully !');
          console.log('Comentario:', comentarioResponse);
          this.$router.push('/orders');
        } else {
          alert('Error sending comment !');
          console.error('Error sending comment:', comentarioResponse);
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      } 
    },
    cancelComment() {
      this.$router.push('/orders'); 
    }
  }
};
</script>


<style scoped>
.comment-card {
  margin-top: 20px;
}
</style>
