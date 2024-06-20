<template>
  <div>
    <!-- First form -->
    <v-row class="align-center justify-center">
      <v-col cols="8">
        <v-card class="pa-4 card" v-if="!reservationSubmitted">
          <v-card-title class="text-center">Reserva</v-card-title>
          <v-card-text>
            <div>
              <label for="numPeople">Numero de pessoa:</label>
              <v-text-field v-model="numPeople" type="number" required></v-text-field>
            </div>
            <div>
              <label for="selectedDate">Data:</label>
              <v-select v-model="selectedDate" :items="['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira']"></v-select>
            </div>
            <div>
              <label for="selectedTime">Tipo de refeição:</label>
              <v-select v-model="selectedTime" :items="times"></v-select>
            </div>
            <v-btn @click="submitReservation" color="#7D0A0A">Check menu</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Reservation form -->
    <v-row class="align-center justify-center">
      <v-col cols="8">
        <v-card class="pa-4 card" v-if="reservationSubmitted">
          <v-card-title class="text-center">RESERVA</v-card-title>
          <v-card-title class="btns">
            <v-btn v-for="person in persons" :key="person.id" @click="activatePerson(person.id)"
              :color="activePersonIndex === person.id - 1 ? '#7D0A0A' : ''" class="mr-6">{{ person.id }}</v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <div>
              <label>Numero de pessoa: {{ numPeople }}</label>
            </div>
            <v-row v-if="enter && menu" class="align-center justify-center" style="font-size: 18px;">
              <v-col cols="12" md="4">
                <label>Data: {{ selectedDate }}</label>
                <br>
                <label>Horário: {{ selectedTime }}</label>
                <br>
              </v-col>
              <v-col v-for="(menu, index) in menu" :key="index">
                <label>Lugar disponível: {{ menu.maximum_capacity }}</label>
                <br>
                <label v-if="menu.menu_type === 'Almoço'"> 
                  Tempo: {{ menu.lunch_start_time }} - {{ menu.lunch_end_time }}
                </label>

                <label v-if="menu.menu_type === 'Jantar'"> 
                  Tempo: {{ menu.dinner_start_time }} - {{ menu.dinner_end_time }}
                </label>
              </v-col>

            </v-row>
            <hr>
            <br>

            <div v-for="person in persons" :key="person.id">
              <template v-if="activePersonIndex === person.id - 1">
                <template v-if="prePratoMenuItems.length > 0">
                  <v-row class="align-center">
                    <v-col cols="8" class="justify-center">
                      <h2>Order para cliente {{ person.id }}:</h2>
                    </v-col>
                    <v-col cols="4" class="justify-center">
                      <v-text-field v-model="person.name" label="Inserir seu nome" required></v-text-field>
                    </v-col>
                  </v-row>
                  <div class="d-flex align-center justify-center text-center">
                    <v-checkbox v-model="person.indifferent" label="Sem preferência em todos" class="custom-label"></v-checkbox>
                  </div>
                  <hr>
                  <br>
                  <div class="radioGroup">
                    <h3>Pre-Prato</h3>
                    <v-radio-group v-model="person.meals[0].preprato" class="radio-group custom-label">
                      <v-radio v-for="(menuItem, index) in prePratoMenuItems" :key="index"
                        :value="menuItem.food.food_id" :disabled="person.indifferent" required
                        :label="`${menuItem.food.food_name}`" label-position="left"></v-radio>
                      <v-radio :value="''" label="Não quero" label-position="left"></v-radio>
                    </v-radio-group>
                  </div>
                  <div>
                    <v-textarea v-model="person.meals[0].ObsPrePrato" placeholder="Obs para pre-prato"
                      :disabled="person.indifferent" class="mt-4"></v-textarea>
                  </div>
                  <hr>
                  <br>
                </template>
                <template v-else>
                  <p>Entrada deste horaio não disponível agora.</p>
                </template>
                <template v-if="pratoPrincipalMenuItems.length > 0">
                  <div class="radioGroup">
                    <h3>Prato Principal</h3>
                    <v-radio-group v-model="person.meals[0].pratoprincipal" class="radio-group custom-label">
                      <v-radio v-for="(menuItem, index) in pratoPrincipalMenuItems" :key="index"
                        :value="menuItem.food.food_id" :disabled="person.indifferent" required
                        :label="`${menuItem.food.food_name}`" label-position="left"></v-radio>
                      <v-radio :value="''" label="Não quero" label-position="left"></v-radio>
                    </v-radio-group>
                  </div>
                  <div>
                    <v-textarea v-model="person.meals[0].ObsPratoPrincipal" placeholder="Obs para prato principal"
                      :disabled="person.indifferent"></v-textarea>
                  </div>
                  <hr>
                  <br>
                </template>
                <template v-else>
                  <p>Prato Principal deste horario não disponível agora.</p>
                </template>

                <template v-if="sobremesaMenuItems.length > 0">
                  <div class="radioGroup">
                    <h3>Sobremesa</h3>
                    <v-radio-group v-model="person.meals[0].sobremesa" class="radio-group custom-label">
                      <v-radio v-for="(menuItem, index) in sobremesaMenuItems" :key="index"
                        :value="menuItem.food.food_id" :disabled="person.indifferent" required
                        :label="`${menuItem.food.food_name}`" label-position="left"></v-radio>
                      <v-radio :value="''" label="Não quero" label-position="left"></v-radio>
                    </v-radio-group>
                  </div>
                  <div>
                    <v-textarea v-model="person.meals[0].ObsSobremesa" placeholder="Obs para sobremesa"
                      :disabled="person.indifferent"></v-textarea>
                  </div>
                  <hr>
                  <br>
                </template>
                <template v-else>
                  <p>Sobremesa deste norario não disponível agora.</p>
                  <hr>
                  <br>
                </template>
              </template>
            </div>
          </v-card-text>
          <v-card-actions class="justify-center align-center" >
            <v-btn v-if="isReservationAvailable" @click="submit" color="#7D0A0A">Reserva</v-btn>
            <!-- Back to the previous page -->
            <v-btn @click="$router.go(-1)" color="#7D0A0A">Voltar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useMenuStore } from '@/stores/menu';
import { useOrderStore } from '@/stores/order';

export default {
  name: 'Reserva',
  data() {
    return {
      menuStore: useMenuStore(),
      orderStore: useOrderStore(),

      enter: false,
      numPeople: null,
      selectedDate: null,
      selectedTime: null,
      reservationSubmitted: false,
      times: ['Almoço', 'Jantar'],
      persons: [],
      prePratoMenuItems: [],
      pratoPrincipalMenuItems: [],
      sobremesaMenuItems: [],
      activePersonIndex: null
    };
  },
  methods: {
    activatePerson(personIndex) {
      this.activePersonIndex = personIndex - 1;
    },
    async submitReservation() {
      if (!this.numPeople || !this.selectedDate || !this.selectedTime) {
        alert('Por favor, preencha todos os campos!');
        return;
      }
      const success = await this.fetchMenu();
      if (success) {
        this.reservationSubmitted = true;
        this.activePersonIndex = 0;
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

        const ask_type_day = this.selectedDate;
        const menu_type = this.selectedTime;
        this.enter = true;
        const type_day = dayMap[ask_type_day];

        await this.menuStore.fetchMenu(type_day, menu_type);

        this.selectedDate = ask_type_day;
        this.selectedTime = menu_type;
        this.prePratoMenuItems = this.menuStore.getPrePratos;
        this.pratoPrincipalMenuItems = this.menuStore.getPratoPrincipal;
        this.sobremesaMenuItems = this.menuStore.getSobremesas;

        const maximumCapacity = Math.min(...this.menuStore.getMenu.map(item => item.maximum_capacity));
        if (this.numPeople > maximumCapacity) {
          alert(`O número de pessoas excede a capacidade máxima disponível de ${maximumCapacity}.`);
          return false;
        }

        this.persons = Array.from({ length: this.numPeople }, (_, index) => ({
          id: index + 1,
          name: '',
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
        console.error('Erro ao buscar o menu:', error);
        return false;
      }
    },
    submit() {
      const now = new Date();
      const selectedMenu = this.selectedTime === 'Almoço' ? this.menuStore.getMenu[0].lunch_start_time : this.menuStore.getMenu[0].dinner_start_time;

      const dayMap = {
        'Domingo': 0,
        'Segunda-feira': 1,
        'Terça-feira': 2,
        'Quarta-feira': 3,
        'Quinta-feira': 4,
        'Sexta-feira': 5,
        'Sábado': 6
      };
      
      const today = now.getDay();
      const selectedDay = dayMap[this.selectedDate];

      // tempo agora e tempo seleciona
      const currentTime = now.getHours() * 60 + now.getMinutes();
      // tempo de menu selecionado
      const [hours, minutes] = selectedMenu.split(':').map(Number);
      const menuStartTime = hours * 60 + minutes;

      // Verificar se a reserva é para o mesmo dia e menos de uma hora antes da hora de início da refeição
      if (today === selectedDay && currentTime > menuStartTime - 60) {
        alert(`Não é possível reservar no mesmo dia e menos de uma hora antes do início do ${this.selectedTime === 'Almoço' ? 'almoço' : 'jantar'}.`);
      return;
    }

    // Verificar se a reserva é para um dia futuro ou se hoje é fim de semana
     if (today === selectedDay && currentTime < menuStartTime - 60 || today < selectedDay  || today === 6 || today == 0) {
      const orderData = {
        number_people: this.numPeople,
        OrderDate: this.selectedDate,
        Horario: this.selectedTime,

        contents: this.persons.map(person => ({
          name: person.name,
          indifferent: person.indifferent,
          meals: []
          // concat mudar dados selecionado  para objeto
            .concat(person.meals[0].preprato ? [{
              food_id: person.meals[0].preprato,
              observation: person.meals[0].ObsPrePrato || 'Sem observação'
            }] : [])
            .concat(person.meals[0].pratoprincipal ? [{
              food_id: person.meals[0].pratoprincipal,
              observation: person.meals[0].ObsPratoPrincipal || 'Sem observação'
            }] : [])
            .concat(person.meals[0].sobremesa ? [{
              food_id: person.meals[0].sobremesa,
              observation: person.meals[0].ObsSobremesa || 'Sem observação'
            }] : [])
        }))
      };

      const orderedItems = {};
      orderData.contents.forEach(person => {
        person.meals.forEach(meal => {
          if (meal.food_id) {
            orderedItems[meal.food_id] = (orderedItems[meal.food_id] || 0) + 1;
          }
        });
      });

      const formattedOrder = {
        numberOfPeople: orderData.number_people,
        orderedItems: Object.keys(orderedItems).map(food_id => ({
          food_id: parseInt(food_id),
          quantity: orderedItems[food_id]
        }))
      };

      const newDate = {
        'Segunda-feira': 'Monday',
        'Terça-feira': 'Tuesday',
        'Quarta-feira': 'Wednesday',
        'Quinta-feira': 'Thursday',
        'Sexta-feira': 'Friday'
      }[this.selectedDate];
      this.menuStore.afterOrder(formattedOrder, newDate, this.selectedTime);
      this.orderStore.criarOrder(orderData);
      console.log(orderData);
      alert('Reserva feita com sucesso!');
      this.$router.push('/perfil');
    }else{
      alert('Erro! Não possivel de reserva para dia anterior !')
    }
    }
  },
  computed: {
    menu() {
      return this.menuStore.getMenu;
    },
    isReservationAvailable() {
      return this.prePratoMenuItems.length > 0 || this.pratoPrincipalMenuItems.length > 0 || this.sobremesaMenuItems.length > 0;
    }
  },
  created() {
    try {
      this.menuStore.fetchMenus();
    } catch (error) {
      alert(error.message);
    }
  }
};
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
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  
  
}
</style>
