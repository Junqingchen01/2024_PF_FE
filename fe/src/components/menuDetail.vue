<template>
  <v-row justify="center">
    <v-col cols="5">
      <v-card v-if="menu" class="menu-card">
        <v-card-title class="text-center">
          <div>
            <v-card-title v-if="menu.weekday.type_day === 'monday'"> Segunda-feira </v-card-title>
            <v-card-title v-if="menu.weekday.type_day === 'tuesday'"> Terca-feira </v-card-title>
            <v-card-title v-if="menu.weekday.type_day === 'wednesday'"> Quarta-feira </v-card-title>
            <v-card-title v-if="menu.weekday.type_day === 'thursday'"> Quinta-feira </v-card-title>
            <v-card-title v-if="menu.weekday.type_day === 'friday'"> Sexta-feira </v-card-title>
          </div>

          <div>{{ menu.menu_type }}</div>
          <div>Lugar disponivel: {{ menu.maximum_capacity }}</div>
        </v-card-title>
        <v-card-text class="text-center">
          <p>Comidas:</p>
          <ul class="menu-item">
            <template v-for="(foodType, typeIndex) in ['pre prato', 'prato principal', 'sobremesa']">
              <template v-if="typeIndex === 0 || foodType !== ['pre prato', 'prato principal', 'sobremesa'][typeIndex - 1]">
                <h3>{{ foodType }}</h3>
              </template>
              <p v-for="(menuItem, itemIndex) in menu.menuItems.filter(item => item.food.type === foodType)" :key="itemIndex">
                <span>{{ menuItem.food.food_name }} (Quantidade: {{ menuItem.quantity }})</span>
              </p>
              <br>
            </template>
          </ul>
          <br>
          <div class="center-button">
            <v-btn @click="$router.push('/dashboard')" color="#7D0A0A" class="text-center">Volta</v-btn>
          </div>
        </v-card-text>
      </v-card>
      <v-alert v-else type="error">Menu data is not available.</v-alert>
    </v-col>
  </v-row>
</template>


<script>
  import { defineComponent } from 'vue';
  import { useMenuStore } from '@/stores/menu';
  
  export default defineComponent({
    name: 'MenuDetail',
    props: {
      menuData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        menuStore: useMenuStore(),
        menu: null,
      };
    },
    async created() {
      try {
        const menuId = this.$route.params.id;
        await this.menuStore.fetchMenuById(menuId);        
        this.menu = this.menuStore.getMenuById;
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    },
  });
</script>
  
<style scoped>
  .menu-card {
    background-color: white;
    margin-top: 30px;
    border: 2px solid #7D0A0A;
    border-radius: 10px;
    padding: 20px;
  }
  
  .menu-item {
    margin-bottom: 10px;
    color: #7D0A0A;
    font-size: 15px;
  }
  
  .center-button {
    display: flex;
    justify-content: center;
  }
  </style>