<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="2">
        <v-btn @click="switchContent('menus')" class="tab-btn" :class="{ active: activeTab === 'menus' }">Menus</v-btn>
        <br>
        <v-btn @click="switchContent('comidas')" class="tab-btn" :class="{ active: activeTab === 'comidas' }">Comidas</v-btn>
        <br>
        <v-btn @click="switchContent('horarios')" class="tab-btn" :class="{ active: activeTab === 'horarios' }">Horarios</v-btn>
        <br>
        <v-btn @click="switchContent('comentarios')" class="tab-btn" :class="{ active: activeTab === 'comentarios' }">Comentarios</v-btn>
        <br>

      </v-col>

      <v-col cols="9">
        <v-row justify="center">
          <v-col v-if="activeTab === 'menus'" v-for="(menu, index) in menus" :key="index" cols="4">
            <v-card class="menu-card">
              <v-card-title class="menu-card-title">
                <div>
                  <v-card-title v-if="menu.weekday.type_day === 'monday'" > Segunda-feira </v-card-title>
                  <v-card-title v-if="menu.weekday.type_day === 'tuesday'" > Terca-feira </v-card-title>
                  <v-card-title v-if="menu.weekday.type_day === 'wednesday'" > Quarta-feira </v-card-title>
                  <v-card-title v-if="menu.weekday.type_day === 'thursday'" > Quinta-feira </v-card-title>
                  <v-card-title v-if="menu.weekday.type_day === 'friday'" > Sexta-feira </v-card-title>
                </div>
              </v-card-title>
              <v-card-text class="menu-card-text">
                <p>Horario: {{ menu.menu_type }}</p>
                <p>Lugar disponivel {{ menu.maximum_capacity }}</p>
                <br>
                <p>Comidas:</p>
                <ul class="menu-item-list">
                  <li v-for="(menuItem, itemIndex) in menu.menuItems" :key="itemIndex" class="menu-item">
                    {{ menuItem.food.type }}
                    <br>
                    {{ menuItem.food.food_name }} (Quantidade: {{ menuItem.quantity }})
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- COMIDAS -->
          <v-col v-if="activeTab === 'comidas'">

          </v-col>
          <!-- COMENTARIOS -->
          <v-col v-if="activeTab === 'comentarios'">
            
          </v-col>
          <!-- HORARIOS -->
          <v-col v-if="activeTab === 'horarios'">

          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>

import { useMenuStore } from '@/stores/menu'; 

export default {
  data() {
    return {
      activeTab: 'menus',
      menuStore: useMenuStore(),
    };
  },
  created() {
    try {
      this.menuStore.fetchMenus();
    } catch (error) {
      alert(error.message);
    }
  },
  computed: {
    menus() {
      return this.menuStore.getMenus;
    },
  },
  methods: {
    switchContent(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
.tab-btn {
  margin-bottom: 10px;
  background-color: #7D0A0A !important;
  color: white !important;
}

.tab-btn.active {
  background-color: #4CAF50 !important; 
}

.menu-card {
  margin-top: 20px;
  border: 2px solid #7D0A0A;
  background-color: white;
  padding: 10px;
  border-radius: 30px; 
  height: auto; 
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin : 0px;
}

.menu-card-title {
  display: flex;
  justify-content: center;
  
}

.menu-card-text {
  text-align: center;
}

.menu-item-list {
  list-style: none;
  padding: 0;
}

.menu-item {
  margin-bottom: 5px;
}
</style>
