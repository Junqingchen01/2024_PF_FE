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
                    </div>
                    
                    <div v-else-if="menu.menu_type === 'Jantar'">
                      <h3>{{ menu.menu_type }}</h3>
                      <div>Tempo: {{ menu.dinner_start_time }} - {{ menu.dinner_end_time }}</div>
                    </div>

                    <ul>
                      <li>Lugar disponival: {{  menu.maximum_capacity }}</li>
                      <li v-if="menu.menuItems.length === 0">Comida de neste tempo Nao disponivel</li>
                      <li v-else v-for="(item, i) in menu.menuItems" :key="i">{{ item.food.food_name }} (Quantidade: {{ item.quantity }})</li>
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
        <v-card class="reviews-card">
          <v-card-title>All Reviews</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(review, index) in reviews" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ review.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ review.content }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
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
      reviews: [],
      today: new Date().toLocaleDateString('pt-PT', { weekday: 'long' }).toLowerCase(),
      menuStore: useMenuStore(),
      avaliarStore: useAvaliarStore(),
    };
  },
  created() {
    this.menuStore.fetchTodayMenu();
    this.avaliarStore.fetchAll();
  },
  
  computed: {
    currentPhoto() {
      return this.photos[this.currentIndex];
    },
    todayMenu() {
      return this.menuStore.getTodayMenu;
    },
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

.reviews-card {
  background-color: white;
  padding: 20px;
  border: 2px solid #7d0a0a;
  border-radius: 10px;
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
</style>
