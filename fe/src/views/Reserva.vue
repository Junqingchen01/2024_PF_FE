<template>
  <v-row v-if="enter">
    <v-col>
    </v-col>
    <v-col cols="8" class="text-center">
      <v-card class="pa-4 card">
        <v-card-title class="text-center">RESERVA</v-card-title>
        <v-card-text>
          <div>
            <label for="numPeople">Numero de pessoa: {{ numPeople }}</label>
          </div>
          <v-row  v-if="enter && menu" class="align-center justify-center">
            <v-col cols="12" md="4" >
              <label>Data: {{ selectedDate }}</label>
              <br>
              <label>Horario: {{ selectedTime }}</label>
              <br>
            </v-col>
            <v-col v-for="(menu, index) in menu" :key="index">
              <label>Lugar disponivel: {{ menu.maximum_capacity }}</label>
            </v-col>
          </v-row>
          <hr>
          <br>
          
          <div v-for="person in persons" :key="person.id">
            <v-row class="align-center">
              <v-col cols="12" md="6" class="justify-center"> 
                <h2>order para client {{person.id}}:</h2>
              </v-col>
              <v-col cols="12" md="6" class="justify-center"> 
                <v-text-field v-model="person.name" label="Inserir seu nome" required></v-text-field>
              </v-col>
            </v-row>
            
            <div class="d-flex align-center justify-center text-center">
              <v-checkbox v-model="person.indifferent" label="Sem preferência em todos" class="custom-label"></v-checkbox>
            </div>
            <hr>
            <br>

            <template v-if="prePratoMenuItems.length > 0">
              <div class="radioGroup">
                <h3>Pre-Prato</h3>
                <v-radio-group v-model="person.meals[0].preprato" class="radio-group custom-label">
                  <v-radio :value="''" label="Não quero" label-position="left"></v-radio>
                  <v-radio v-for="(menuItem, index) in prePratoMenuItems" :key="index" :value="menuItem.food.food_name" :disabled="person.indifferent" required :label="`${menuItem.food.food_name} (Disponivel: ${menuItem.quantity})`" label-position="left"></v-radio>
                </v-radio-group>
              </div>
              <div>
                <v-textarea v-model="person.meals[0].ObsPrePrato" placeholder="obs para pre-prato" :disabled="person.indifferent" class="mt-4"></v-textarea>
              </div>
              <hr>
              <br>
            </template>
            <template v-else>
              <p>Não disponível agora.</p>
            </template>

            <template v-if="pratoPrincipalMenuItems.length > 0">
              <div class="radioGroup">
                <h3>Prato-Principal</h3>
                <v-radio-group v-model="person.meals[0].pratoprincipal" class="radio-group custom-label">
                  <v-radio :value="''" label="Não quero" label-position="left"></v-radio>
                  <v-radio v-for="(menuItem, index) in pratoPrincipalMenuItems" :key="index" :value="menuItem.food.food_name" :disabled="person.indifferent" required :label="`${menuItem.food.food_name} (Disponivel: ${menuItem.quantity})`" label-position="left"></v-radio>
                </v-radio-group>
              </div>
              <div>
                <v-textarea v-model="person.meals[0].ObsPratoPrincipal" placeholder="obs para prato principal" :disabled="person.indifferent"></v-textarea>
              </div>
              <hr>
              <br>
            </template>
            <template v-else>
              <p>Não disponível agora.</p>
            </template>

            <template v-if="sobremesaMenuItems.length > 0">
              <div class="radioGroup">
                <h3>Sobremesa</h3>
                <v-radio-group v-model="person.meals[0].sobremesa" class="radio-group custom-label"> 
                  <v-radio :value="''" label="Não quero" label-position="left"></v-radio>
                  <v-radio v-for="(menuItem, index) in sobremesaMenuItems" :key="index" :value="menuItem.food.food_name" :disabled="person.indifferent" required :label="`${menuItem.food.food_name} (Disponivel: ${menuItem.quantity})`" label-position="left"></v-radio>
                </v-radio-group>
              </div>
              <div>
                <v-textarea v-model="person.meals[0].ObsSobremesa" placeholder="obs para sobremesa" :disabled="person.indifferent"></v-textarea>
              </div>
              <hr>
              <br>
            </template>
            <template v-else>
              <p>Não disponível agora.</p>
            </template>
          </div>
        </v-card-text>
        <v-card-actions class="justifu-center  align-center">
            <v-btn @click="submit" color="#7D0A0A">Reserva</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col>
    </v-col>

  </v-row>

  <v-row v-else>
    <v-col cols="12" class="text-center" style="margin-top: 50px;">
      <v-btn @click="askForNumPeople" color="#7D0A0A">Iniciar reserva agora</v-btn>
    </v-col>
  </v-row>
</template>




<script>
import { useMenuStore } from '@/stores/menu'; 

export default {
  name: 'Reserva',
  data() {
    return {
      menuStore: useMenuStore(),
      enter: false,
      numPeople: null,
      selectedDate: null,
      selectedTime: null,
      datas:['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'],
      times: ['Almoço', 'Jantar'],
      persons: [],
      orders: [], 
      prePratoMenuItems: [],
      pratoPrincipalMenuItems: [],
      sobremesaMenuItems: [],
    }
  },
  methods: {
    async askForNumPeople() {
      const numPeople = window.prompt('Por favor, digite o número de pessoas:');
      if (numPeople !== null && !isNaN(numPeople) && numPeople > 0) {
        this.numPeople = parseInt(numPeople);
        await this.fetchMenu();
      } else {
        alert('Número Inválido ! Clicar botton baixo para reiniciar.');
      }
    },
    async fetchMenu() {
      try {
        const dayMap = {
          'Segunda-feira': 'monday',
          'Terça-feira': 'tuesday',
          'Quarta-feira': 'wednesday',
          'Quinta-feira': 'thursday',
          'Sexta-feira': 'friday'
        };
        
        const ask_type_day = window.prompt('Por favor, digite o dia (Segunda-feira, Terça-feira, Quarta-feira, Quinta-feira, Sexta-feira):');
        const menu_type = window.prompt('Por favor, digite o tipo de menu (Almoço, Jantar):');
        this.enter = true;
        const type_day = dayMap[ask_type_day];
        if (!type_day) {
          alert('Dia inválido! Por favor, escolha entre Segunda-feira, Terça-feira, Quarta-feira, Quinta-feira ou Sexta-feira.');
          return false;
        }

        await this.menuStore.fetchMenu(type_day, menu_type);

        this.selectedDate = ask_type_day;
        this.selectedTime = menu_type;

        this.prePratoMenuItems = this.menuStore.getPrePratos;
        this.pratoPrincipalMenuItems = this.menuStore.getPratoPrincipal;
        this.sobremesaMenuItems = this.menuStore.getSobremesas;

        this.persons = Array.from({ length: this.numPeople }, (_, index) => ({
          id: index + 1,
          name:'',
          indifferent: false,
          meals: [{
            preprato: '',
            ObsPrePrato: '',
            pratoprincipal: '',
            ObsPratoPrincipal: '',
            sobremesa: '',
            ObsSobremesa: ''
          }]
        }));

        return true;
      } catch (error) {
        console.error('Error getting menu:', error);
        return false;
      }
    },

    submit() {
      const order = {
        number_people: this.numPeople,
        OrderDate: this.selectedDate,
        Horario: this.selectedTime,
        contents: this.persons
      };
      this.orders.push(order);
      alert('Order Info:\n' + JSON.stringify(order));
      console.log('Order Info:', order);
    }
  },
  computed: {
    menu() {
      return this.menuStore.getMenu;
    },
  },
  created() {
    try {
      this.menuStore.fetchMenus();
    } catch (error) {
      alert(error.message);
    }
  }
}

</script>

<style scoped>
.card {
  background-color: white;
  margin-top: 20px;
}
.radioGroup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.custom-label {
  color: #7D0A0A;
}
</style>
