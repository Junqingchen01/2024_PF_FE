<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="2">
        <v-btn @click="switchContent('menus')" class="tab-btn" :class="{ active: activeTab === 'menus' }">Menus</v-btn>
        <br>
        <v-btn @click="switchContent('comidas')" class="tab-btn" :class="{ active: activeTab === 'comidas' }">Comidas</v-btn>
        <br>
        <v-btn @click="switchContent('avaliacao')" class="tab-btn" :class="{ active: activeTab === 'avaliacao' }">Avaliações</v-btn>
        <br>
        <v-btn @click="switchContent('orders')" class="tab-btn" :class="{ active: activeTab === 'orders' }">Orders</v-btn>
      </v-col>

      <v-col cols="9">
        <v-row justify="center">
          <!-- MENUS -->
          <v-col v-if="activeTab === 'menus'">
            <v-table class="table">
              <thead>
                <tr style="font-style: bold; font-size: large">
                  <th class="text-center">Dia da Semana</th>
                  <th class="text-center">Horario</th>
                  <th class="text-center">Lugar Disponivel</th>
                  <th class="text-center">Comidas</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(menu, index) in sortedMenus" :key="index" class="text-center">
                  <td>
                    <span v-if="menu.weekday.type_day === 'monday'">Segunda-feira</span>
                    <span v-if="menu.weekday.type_day === 'tuesday'">Terca-feira</span>
                    <span v-if="menu.weekday.type_day === 'wednesday'">Quarta-feira</span>
                    <span v-if="menu.weekday.type_day === 'thursday'">Quinta-feira</span>
                    <span v-if="menu.weekday.type_day === 'friday'">Sexta-feira</span>
                  </td>
                  <td>{{ menu.menu_type }}</td>
                  <td>{{ menu.maximum_capacity }}</td>
                  <td>
                    <ul class="menu-item-list">
                      <template v-for="(foodType, typeIndex) in ['pre prato', 'prato principal', 'sobremesa']">
                        <template v-if="typeIndex === 0 || foodType !== ['pre prato', 'prato principal', 'sobremesa'][typeIndex - 1]">
                          <h3>{{ foodType }}</h3>
                        </template>
                        <template v-if="menu.menuItems.filter(item => item.food.type === foodType).length > 0">
                          <li v-for="(menuItem, itemIndex) in menu.menuItems.filter(item => item.food.type === foodType)" :key="itemIndex">
                            <span>{{ menuItem.food.food_name }} (Quantidade: {{ menuItem.quantity }})</span>
                          </li>
                        </template>
                        <template v-else>
                          <li>Não definido</li>
                        </template>
                      </template>
                    </ul>
                  </td>
                  <td>
                    <v-btn color="#7D0A0A" @click="goToMenuDetail(menu.menu_id)">Detalhes</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>

          <!-- COMIDAS -->
          <v-col v-if="activeTab === 'comidas'">
            <br>
            <v-select
              v-model="selectedType"
              :items="foodTypes"
              label="Select a food type"
              clearable> </v-select>
              <div class="text-center">
              <v-btn @click="adicionarComida()" color="#7D0A0A"> Criar Novo Comida</v-btn>
            </div>
              <br>
            <v-table class="table">
              <thead>
                <tr style="font-style: bold; font-size: large">
                  <th class="text-center">Nome</th>
                  <th class="text-center">Tipo de comida</th>
                  <th class="text-center">Descrição</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(food, index) in filteredFoods" :key="index" class="text-center">
                  <td>{{ food.food_name }}</td>
                  <td>{{ food.type }}</td>
                  <td>{{ food.description }}</td>
                  <td>
                    <v-btn color="#7D0A0A" @click="goToFoodDetail(food.food_id)">Detalhes</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <br>
          </v-col>

          <!-- AVALIACAO -->
          <v-col v-if="activeTab === 'avaliacao'">
            <v-table class="table">
              <thead>
                <tr style="font-style: bold; font-size: large">
                  <th class="text-center">ID da Avaliação</th>
                  <th class="text-center">ID do Pedido</th>
                  <th class="text-center">Classificação do Serviço</th>
                  <th class="text-center">Classificação da Temperatura</th>
                  <th class="text-center">Classificação da Luz</th>
                  <th class="text-center">Observação</th>
                  <th class="text-center">Data de Criação</th>
                  <th class="text-center">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(avaliacao, index) in avaliacoes" :key="index" class="text-center">
                  <td>{{ avaliacao.avaliacao_id }}</td>
                  <td>{{ avaliacao.order_id }}</td>
                  <td>{{ avaliacao.servicerating }}</td>
                  <td>{{ avaliacao.temperatureRating }}</td>
                  <td>{{ avaliacao.lightRating }}</td>
                  <td>{{ avaliacao.Observation }}</td>
                  <td>{{ new Date(avaliacao.createdAt).toLocaleDateString() }}</td>
                  <td>
                    <v-btn color="#7D0A0A" @click="goToAvaliacaoDetail(avaliacao.avaliacao_id)">Detalhes</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>

          <!-- HORARIOS -->
          <v-col v-if="activeTab === 'horarios'">
            <!-- Your horarios content here -->
          </v-col>

          <!-- ORDERS -->
          <v-col v-if="activeTab === 'orders'">
            <br>
            <div class="text-center">
              <v-btn @click="PesquisaOrder()" color="#7D0A0A">Pesquisa pelo ID</v-btn>
            </div>
            <br>
            <v-table class="table">
              <thead>
                <tr style="font-style: bold; font-size: large">
                  <th class="text-center">Order ID</th>
                  <th class="text-center">Número de Pessoas</th>
                  <th class="text-center">Data do Pedido</th>
                  <th class="text-center">Horario</th>
                  <th class="text-center">Avaliação Ativada</th>
                  <th class="text-center">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in sortedOrders" :key="index" class="text-center">
                  <td>{{ order.order_id }}</td>
                  <td>{{ order.number_people }}</td>
                  <td>{{ order.OrderDate }}</td>
                  <td>{{ order.Horario }}</td>
                  <td v-if="order.avaliar === 'true'">Ativado</td>
                  <td v-else>Inativado</td>
                  <td>
                    <v-btn color="#7D0A0A" @click="goToOrderDetail(order.order_id)">Detalhes</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <!--criar comida dialog -->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>adicionar comida</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="Newfood.food_name" label="Nome de Comida"></v-text-field>
          <v-select
            v-model="Newfood.type"
            :items="['pre prato', 'sobremesa', 'prato principal']"
            label="Tipo de Comida"
          ></v-select>
          <v-text-field v-model="Newfood.description" label="Descrição sobre Comida"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#7D0A0A" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="#7D0A0A" text @click="adicionar()">Adicionar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- dialog -->
</template>

<script>
import { useMenuStore } from '@/stores/menu';
import { useFoodStore } from '@/stores/food';
import { useAvaliarStore } from '@/stores/avaliar';
import { useOrderStore } from '@/stores/order';

export default {
  data() {
    return {
      activeTab: sessionStorage.getItem('activeTab') || 'menus', 
      menuStore: useMenuStore(),
      foodStore: useFoodStore(),
      avaliarStore: useAvaliarStore(),
      orderStore:useOrderStore(),
      foods: [],
      orders: [],
      selectedType: 'Tudos',
      Newfood: {
        food_name: '',
        type: '',
        description: '',
      },
      dialog: false,
    };
  },
  created() {
    try {
      this.foodStore.fetchFoods();
      this.menuStore.fetchMenus();
      this.avaliarStore.fetchAll();
      this.orderStore.GetAll().then(() => {
        this.orders = this.orderStore.getAllOrders;
      });
    } catch (error) {
      alert(error.message);
    }
  },
  computed: {
    menus() {
      return this.menuStore.getMenus;
    },
    sortedMenus() {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      return this.menus.slice().sort((a, b) => (a.weekday.type_day === today ? -1 : 1));
    },
    foodTypes() {
      return ['Tudos', 'pre prato', 'sobremesa', 'prato principal'];
    },
    filteredFoods() {
      if (this.selectedType && this.selectedType !== 'Tudos') {
        return this.foodStore.getFoods.filter(food => food.type === this.selectedType);
      } else {
        return this.foodStore.getFoods;
      }
    },
    sortedOrders() {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      return this.orders.slice().sort((a, b) => {
        if (a.OrderDate === today && b.OrderDate !== today) {
          return -1;
        } else if (a.OrderDate !== today && b.OrderDate === today) {
          return 1; 
        } else {
          return 0;
        }
      });
    },
    avaliacoes() {
      return this.avaliarStore.getAvaliacoes;
    }
  },
  methods: {
    switchContent(tab) {
      this.activeTab = tab;
      sessionStorage.setItem('activeTab', tab);
    },
    goToMenuDetail(id) {
      this.$router.push({ name: 'menuDetail', params: { id } });
    },
    goToFoodDetail(id) {
      this.$router.push({ name: 'foodDetail', params: { id } });
    },
    goToAvaliacaoDetail(id) {
      this.$router.push({ name: 'avaliacaoDetail', params: { id } });
    },
    goToOrderDetail(id) {
      this.$router.push({ name: 'Order', params: { id } });
    },
    async adicionarComida() {
      this.dialog = true;
    },
    async adicionar() {
      try {
        await this.foodStore.createFood(this.Newfood);
        alert('Comida adicionada com sucesso');
        this.dialog = false;
        window.location.reload();
        this.Newfood = {
          food_name: '',
          type: '',
          description: '',
        };
      } catch (error) {
        alert(error.message);
      }
    },

    PesquisaOrder(){
      const id = prompt('Insira o ID do Pedido');
      if (id === null) return;
      this.$router.push({ name: 'Order', params: { id } });
    }
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
  margin: 0px;
}

.table {
  border: 2px solid #7D0A0A;
  background-color: white;
  border-radius: 30px; 
  margin: 0px;
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
