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
          <v-row class="align-center justify-center">
            <v-col cols="12" md="4" >
              <v-select v-model="selectedDate" :items="datas" label="Data" color="primary"></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select v-model="selectedTime" :items="times" label="Horario" color="primary"></v-select>
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
            <div class="radioGroup">
              <h3>Pre-Prato</h3>
              <v-radio-group v-model="person.preprato" class="radio-group custom-label" >
                <v-radio value="sopa" :disabled="person.indifferent" required label="sopa" label-position="left"></v-radio>
                <v-radio value="entrada" :disabled="person.indifferent" required label="entrada" label-position="left"></v-radio>
                <v-radio value="naoquero" :disabled="person.indifferent" required label="Não quero" label-position="left"></v-radio>
                <v-radio value="outro" :disabled="person.indifferent" required label="Sem preferência" label-position="left"></v-radio>
              </v-radio-group>
            </div>
            <div>
              <v-textarea v-model="person.ObsPrePrato" placeholder="obs para pre-prato" :disabled="person.indifferent" class="mt-4"></v-textarea>
            </div>



            <hr>
            <br>
            <div class="radioGroup">
              <h3>Prato-Principal</h3>
              <v-radio-group v-model="person.pratoprincipal" class="radio-group custom-label">
                <v-radio value="carna" :disabled="person.indifferent" required label="carna" label-position="left"></v-radio>
                <v-radio value="peixe" :disabled="person.indifferent" required label="Peixe" label-position="left"></v-radio>
                <v-radio value="naoquero" :disabled="person.indifferent" required label="Não quer" label-position="left"> </v-radio>
                <v-radio value="outro" :disabled="person.indifferent" required label="Sem preferência" label-position="left"></v-radio>
              </v-radio-group>
            </div>
            <div>
              <v-textarea v-model="person.ObsPratoPrincipal" placeholder="obs para prato principal" :disabled="person.indifferent"></v-textarea>
            </div>
            <hr>
            <br>


            <div class="radioGroup">
              <h3>Sobremesa</h3>
              <v-radio-group v-model="person.sobremesa" class="radio-group custom-label"> 
                <v-radio value="fruta" :disabled="person.indifferent" required label="Fruta" label-position="left"></v-radio>
                <v-radio value="douce" :disabled="person.indifferent" required label="Douce" label-position="left"></v-radio>
                <v-radio value="naoquero" :disabled="person.indifferent" required label="Não quer" label-position="left"></v-radio>
                <v-radio value="outro" :disabled="person.indifferent" required label="Sem preferência" label-position="left"></v-radio>
              </v-radio-group>
            </div>
            <div>
              <v-textarea v-model="person.ObsSobremesa" placeholder="obs para sobremesa" :disabled="person.indifferent"></v-textarea>
            </div>
            <hr>
            <br>
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
export default {
  name: 'Reserva',
  data() {
    return {
      enter: false,
      numPeople: null,
      selectedDate: null,
      selectedTime: null,
      datas:['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'],
      times: ['Almoco', 'Jantar'],
      persons: [{
        name: '',
        indifferent: false,
        meals: [{
          preprato: '',
          ObsPrePrato: '',
          pratoprincipal: '',
          ObsPratoPrincipal: '',
          sobremesa: '',
          ObsSobremesa: ''
        }],
      }],
      orders: []
    }
  },
  created() {
    this.askForNumPeople();
  },
  methods: {
    askForNumPeople() {
      const numPeople = window.prompt('Por favor, digite o número de pessoas:');
      if (numPeople !== null && !isNaN(numPeople) && numPeople > 0) {
        this.numPeople = parseInt(numPeople);
        this.updateNumPeople();
        this.enter = true;
      } else {
        alert('Número Inválido ! Clicar botton baixo para reiniciar.');
      }
    },
    updateNumPeople() {
      // Update the number of people and reset the persons array
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
    },
    submit() {
      const order = {
        Numero_de_pessoa: this.numPeople,
        Data: this.selectedDate,
        Tempo: this.selectedTime,
        Informações: this.persons
      };
      this.orders.push(order);
      alert('Order Info:\n' + JSON.stringify(order));
      console.log('Order Info:', order);
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
