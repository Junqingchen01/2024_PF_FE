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
          <div>
            <label v-if="menu.menu_type === 'Almoço'"> 
              Tempo: {{ menu.lunch_start_time }} - {{ menu.lunch_end_time }}
            </label>
            <label v-if="menu.menu_type === 'Jantar'"> 
              Tempo: {{ menu.dinner_start_time }} - {{ menu.dinner_end_time }}
            </label>
          </div>
        </v-card-title>
        <v-card-text class="text-center">
          <p>Comidas:</p>
          <ul class="menu-item">
            <template v-for="(foodType, typeIndex) in ['pre prato', 'prato principal', 'sobremesa']" :key="typeIndex">
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
            <v-btn v-if="isAdmin" color="#7D0A0A" @click="opendialog">Editar menu</v-btn>
          </div>
        </v-card-text>
      </v-card>
      <v-alert v-else type="error">Menu data is not available.</v-alert>
    </v-col>
  </v-row>

  <v-dialog v-model="editDialog" max-width="800px">
    <v-card>
      <v-card-title class="text-center">Editar Menu</v-card-title>
      <v-card-text>
        <!-- Informações do Menu -->
        <div class="text-center">
          <h3>Informações do Menu</h3>
          <div>{{ menu.menu_type }}</div>
          <div>Lugar disponivel: {{ menu.maximum_capacity }}</div>
        </div>

        <!-- Time Selection -->
        <div v-if="menu.menu_type === 'Jantar'">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="menu.dinner_start_time" label="Hora de início do jantar" type="time"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="menu.dinner_end_time" label="Hora de fim do jantar" type="time"></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div v-else-if="menu.menu_type === 'Almoço'">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="menu.lunch_start_time" label="Hora de início do almoço" type="time"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="menu.lunch_end_time" label="Hora de fim do almoço" type="time"></v-text-field>
            </v-col>
          </v-row>
        </div>

        <!-- Comidas -->
        <div>
          <h3 class="text-center">Comidas</h3>
          <br>
          <v-row v-for="(menuItem, index) in menuItems" :key="index">
            <v-col cols="3">
              <v-select v-model="menuItem.type" :items="foodType" label="Tipo de Comida"@change="clearFoodName(menuItem)"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select v-if="menuItem.type === 'pre prato'" v-model="menuItem.food_name" :items="PrepratoFoods" label="Comida"></v-select>
              <v-select v-if="menuItem.type === 'prato principal'" v-model="menuItem.food_name" :items="PratoPFoods" label="Comida"></v-select>
              <v-select v-if="menuItem.type === 'sobremesa'" v-model="menuItem.food_name" :items="SobremesaFoods" label="Comida"></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="menuItem.quantity" label="Quantidade"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn icon @click="removeMenuItem(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <br>
          <div class="buttons">
            <v-btn color="#7D0A0A" @click="addMenuItem" class="text-center">Adicionar mais comida</v-btn>
            <v-btn color="#7D0A0A" @click="saveEditedMenu">Salvar</v-btn>
            <v-btn color="#7D0A0A" @click="cancelEdit">Cancelar</v-btn>
          </div>
          <br>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { useFoodStore } from '@/stores/food';

export default defineComponent({
  name: 'MenuDetail',
  props: {
    menuData: {
      type: Object,
      required: true
    }
  },
  data() {
    const allFoods = sessionStorage.getItem('Allfoods');
    const parsedFoods = allFoods ? JSON.parse(allFoods) : [];
    const foodNames = parsedFoods.map(food => food.food_name);
    
    const PrepratoFoods = parsedFoods.filter(food => food.type === 'pre prato').map(food => food.food_name);
    const PratoPFoods = parsedFoods.filter(food => food.type === 'prato principal').map(food => food.food_name);
    const SobremesaFoods = parsedFoods.filter(food => food.type === 'sobremesa').map(food => food.food_name);
    
    return {
      menuStore: useMenuStore(),
      foodStore: useFoodStore(),
      menu: null,
      foods: foodNames,
      PrepratoFoods: PrepratoFoods,
      PratoPFoods: PratoPFoods,
      SobremesaFoods: SobremesaFoods,
      foodType: ['pre prato', 'prato principal', 'sobremesa'],
      isAdmin: JSON.parse(sessionStorage.getItem('isAdmin')),
      editDialog: false,
      menuItems: [],
    };
  },
  async created() {
    try {
      const menuId = this.$route.params.id;
      await this.menuStore.fetchMenuById(menuId);
      this.foodStore.fetchFoods;
      this.menu = this.menuStore.getMenuById;
      this.menuItems = this.menu.menuItems.map(item => ({
        food_name: item.food.food_name,
        food_id: item.food.food_id, 
        type: item.food.type,
        quantity: item.quantity,
      }));
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  },
  methods: {
    opendialog() {
      this.editDialog = true;
    },
    addMenuItem() {
      this.menuItems.push({ food_name: null, type: 'pre prato', quantity: '' });
    },
    removeMenuItem(index) {
      this.menuItems.splice(index, 1);
    },
    clearFoodName(menuItem) {
      menuItem.food_name = '';
    },
    async saveEditedMenu() {
      try {
        const updatedMenuItems = [];
        const allfoods = JSON.parse(sessionStorage.getItem('Allfoods'));
        for (const menuItem of this.menuItems) {
          const food = allfoods.find(f => f.food_name === menuItem.food_name);
          if (food) {
            updatedMenuItems.push({
              food_id: food.food_id,
              quantity: menuItem.quantity
            });
          } else {
            console.error('Food not found:', menuItem.food_name);
            return;
          }
        }
        const token = sessionStorage.getItem('token');
        const menuId = this.$route.params.id;
        const response = await fetch(`http://localhost:8080/menu/${menuId}/createMenuItem`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },  
          body: JSON.stringify({
            menuItems: [...updatedMenuItems]
          }),
        });

        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }

        const menuUpdateData = {};
        if (this.menu.menu_type === 'Jantar') {
          menuUpdateData.dinner_start_time = this.menu.dinner_start_time;
          menuUpdateData.dinner_end_time = this.menu.dinner_end_time;
        } else if (this.menu.menu_type === 'Almoço') {
          menuUpdateData.lunch_start_time = this.menu.lunch_start_time;
          menuUpdateData.lunch_end_time = this.menu.lunch_end_time;
        }

        const menuTimesResponse = await fetch(`http://localhost:8080/menu/menuid/${menuId}/updateMenuTime`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          body: JSON.stringify(menuUpdateData),
        });

        if (!menuTimesResponse.ok) {
          throw new Error('Failed to update menu times, status = ' + menuTimesResponse.status);
        }

        alert('Menu atualizado com sucesso');
        this.editDialog = false;
        window.location.reload();

      } catch (error) {
        alert('Erro ao atualizar menu');
        console.error('Erro em atualizar menu', error);
      }
    },
    cancelEdit() {
      this.editDialog = false;
    },
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
    justify-content: space-around;
  }

  .buttons{
    display: flex;
    justify-content: space-around;
  }
</style>
