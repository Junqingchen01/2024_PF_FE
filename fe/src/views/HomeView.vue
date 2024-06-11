<template>
  <div>
    <!-- Centered Section 1: Image Slider and Menu -->
    <v-row class="centered-section">
      <v-col cols="10">
        <v-row>
          <!-- Image Slider -->
          <v-col cols="8">
            <div class="photo-slider">
              <transition name="fade">
                <img :key="currentPhoto" :src="currentPhoto" alt="Photo" />
              </transition>
            </div>
          </v-col>
          
          <!-- Menu Section -->
            <v-col cols="4" class="menu-section">
              <v-card class="menu-card">
                <v-card-title>Menu de {{  today }}</v-card-title>
                <v-card-text v-if="todayMenu && todayMenu.length > 0">
                  <template v-for="(menu, index) in todayMenu">
                    <div v-if="menu.menu_type === 'Almoço'">
                      <h3>{{ menu.menu_type }}</h3>
                      <div>Tempo: {{ menu.lunch_start_time }} - {{ menu.lunch_end_time }}</div>
                      <br>
                    </div>
                    
                    <div v-else-if="menu.menu_type === 'Jantar'">
                      <h3>{{ menu.menu_type }}</h3>
                      <div>Tempo: {{ menu.dinner_start_time }} - {{ menu.dinner_end_time }}</div>
                      <br>
                    </div>

                    <ul>
                      <li>Lugar disponival: {{  menu.maximum_capacity }}</li>
                      <li v-if="menu.menuItems.length === 0">Comida de neste tempo Nao disponivel</li>
                      <li v-else v-for="(item, i) in menu.menuItems" :key="i">{{ item.food.food_name }} (Quantidade: {{ item.quantity }})</li>
                      <br>
                    </ul>
                    
                  </template>
                </v-card-text>
                <v-card-text v-else>
                  <p>No menu available for today.</p>
                </v-card-text>
              </v-card>
            </v-col>


        </v-row>
      </v-col>
    </v-row>

    <!-- Section 2: All Reviews -->
    <v-row class="reviews-section">
      <v-col cols="10">
        <!-- Average Ratings Card -->
        <v-card class="average-rating-card">
          <v-card-title>Classificações médias</v-card-title>
          <v-card-text>
            <div class="rating-group">
              <div>Service: <v-rating v-model="averageServiceRating" readonly></v-rating></div>
              <div>Temperature: <v-rating v-model="averageTemperatureRating" readonly></v-rating></div>
              <div>Light: <v-rating v-model="averageLightRating" readonly></v-rating></div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Individual Reviews -->
        <template v-for="(avaliacao, index) in avaliacoes" :key="index" class="text-center">
          <v-card class="reviews-card text-center" style="width:600px" >
            <v-card-title>Review {{ index + 1 }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>User: {{ avaliacao.UserID }}</v-list-item-title>
                    <v-list-item-title>Classificação Serviço:</v-list-item-title>
                    <v-rating v-model="avaliacao.servicerating" readonly></v-rating>
                    <v-list-item-title>Classificação Temperatura:</v-list-item-title>
                    <v-rating v-model="avaliacao.temperatureRating" readonly></v-rating>
                    <v-list-item-title>Classificação Luz:</v-list-item-title>
                    <v-rating v-model="avaliacao.lightRating" readonly></v-rating>
                    <v-list-item-title>Observação de client: {{ avaliacao.Observation }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>  
          </v-card>
        </template>
      </v-col>
    </v-row>

    <!-- Section 3: Footer -->
    <v-footer class="footbar">
      <v-col cols="12" class="text-center">
        <p>&copy; 2024 Restaurante ESHT. All rights reserved.</p>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import chefImage from '@/assets/img/CHEFS.jpg';
import escolaImage from '@/assets/img/ESCOLA.jpg';
import premioImage from '@/assets/img/PREMIO.jpg';
import { useMenuStore } from '@/stores/menu';
import { useAvaliarStore } from '@/stores/avaliar';

export default {
  data() {
    return {
      photos: [chefImage, escolaImage, premioImage],
      currentIndex: 0,
      todayMenu: [],
      today: new Date().toLocaleDateString('pt-PT', { weekday: 'long' }).toLowerCase(),
      menuStore: useMenuStore(),
      avaliarStore: useAvaliarStore(),
    };
  },
  created() {
    this.menuStore.fetchTodayMenu();
    this.avaliarStore.fetchAll();
    this.reflashed = JSON.parse(sessionStorage.getItem('reflashed')) === true;
    if (!this.reflashed) {
      window.location.reload();
      sessionStorage.setItem('reflashed', true);
    }    
  },  
  computed: {
    currentPhoto() {
      return this.photos[this.currentIndex];
    },
    todayMenu() {
      return this.menuStore.getTodayMenu;
    },
    avaliacoes() {
      return this.avaliarStore.getAvaliacoes;
    },
    averageServiceRating() {
      // aval é neste elemento, sum é o valor acumulado, 0 é o valor inicial do sum
      const total = this.avaliacoes.reduce((sum, aval) => sum + aval.servicerating, 0);
      // para evitar resultado diss fica em NaN
      return (total / this.avaliacoes.length) || 0;
    },
    averageTemperatureRating() {
      const total = this.avaliacoes.reduce((sum, aval) => sum + aval.temperatureRating, 0);
      return (total / this.avaliacoes.length) || 0;
    },
    averageLightRating() {
      const total = this.avaliacoes.reduce((sum, aval) => sum + aval.lightRating, 0);
      return (total / this.avaliacoes.length) || 0;
    }
  },
  methods: {
    
  },
  mounted() {
    
  },
};
</script>

<style scoped>
.centered-section {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.photo-slider {
  width: 100%;
  margin-right: 20px;
  border-radius: 15px;
}

.photo-slider img {
  width: 100%;
  height: 500px;
  display: block;
  margin: 0 auto;
  border-radius: 15px;
}

.menu-section {
  margin-top: 20px;
}

.menu-card {
  background-color: white;
  padding: 20px;
  border: 2px solid #7d0a0a;
  border-radius: 10px;
  margin-left: auto; /* Automatic margin to align with image */
}

.reviews-section {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.average-rating-card {
  background-color: white;
  padding: 20px;
  border: 2px solid #7d0a0a;
  border-radius: 10px;
  margin-bottom: 20px;
}

.reviews-card {
  background-color: white;
  padding: 20px;
  border: 2px solid #7d0a0a;
  border-radius: 10px;
  margin-bottom: 20px;
}

.footbar {
  margin-top: 40px;
  background-color: #7d0a0a;
  color: white;
  padding: 20px 0;
}

.footbar p {
  margin: 0;
}

.rating-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
