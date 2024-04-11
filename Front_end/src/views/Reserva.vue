<template>
  <v-row>

    <v-col>
    </v-col>

    <v-col cols="8" class="text-center">
      <v-card>
        <v-card-title class="text-center">RESERVA</v-card-title>
        <v-card-text>
          <div>
            <label for="numPeople">Numero de pessoa: {{ numPeople }}</label>
          </div>
          
          <div v-for="person in persons" :key="person.id">
            <h2>encomenda para {{ person.id }}º client</h2>
            <v-text-field v-model="person.name" label="Inserir seu nome" required></v-text-field>
            
            <div class="d-flex align-center justify-center text-center">
              <h3>Cliente sem preferência:</h3>
              <v-checkbox v-model="person.indifferent" label="Sim"></v-checkbox>
            </div>
            
            <div>
              <h3>Pre-Prato</h3>
              <v-radio-group v-model="person.preprato" class="text-center">
                <v-radio value="sopa" :disabled="person.indifferent" required>sopa</v-radio>
                <v-radio value="entrada" :disabled="person.indifferent" required>entrada</v-radio>
                <v-radio value="" :disabled="person.indifferent" required>N</v-radio>
              </v-radio-group>
              <v-textarea v-model="person.PrePratoNote" placeholder="obs" :disabled="person.indifferent"></v-textarea>
            </div>
            
            <div>
              <h3>Prato-Principal</h3>
              <v-radio-group v-model="person.pratoprincipal">
                <v-radio value="carna" :disabled="person.indifferent" required>carna</v-radio>
                <v-radio value="peixe" :disabled="person.indifferent" required>peixe</v-radio>
                <v-radio value="outro" :disabled="person.indifferent" required>N</v-radio>
              </v-radio-group>
              <v-textarea v-model="person.PratoPrincipalNote" placeholder="obs" :disabled="person.indifferent"></v-textarea>
            </div>
            
            <div>
              <h3>Sobremesa</h3>
              <v-radio-group v-model="person.sobremesa">
                <v-radio value="fruta" :disabled="person.indifferent" required>fruta</v-radio>
                <v-radio value="douce" :disabled="person.indifferent" required>douce</v-radio>
                <v-radio value="outro" :disabled="person.indifferent" required>N</v-radio>
              </v-radio-group>
              <v-textarea v-model="person.SobremesaNote" placeholder="obs" :disabled="person.indifferent"></v-textarea>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="askForNumPeople" color="primary">submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col>
    </v-col>

  </v-row>
</template>

<script>
export default {
  name: 'Reserva',
  data() {
    return {
      persons: []
    }
  },
  mounted() {
    this.askForNumPeople();
  },
  methods: {
    askForNumPeople() {
      const numPeople = window.prompt('Por favor, digite o número de pessoas:');
      if (numPeople !== null && !isNaN(numPeople) && numPeople > 0) {
        // If a valid number is entered, update the number of people
        this.updateNumPeople(parseInt(numPeople));
      } else {
        alert('Por favor, insira um número válido de pessoas.');
      }
    },
    updateNumPeople(num) {
      // Update the number of people and reset the persons array
      this.persons = Array.from({ length: num }, (_, index) => ({
        id: index + 1,
        name:'',
        indifferent: false,
        preprato: '',
        PrePratoNote: '',
        pratoprincipal: '',
        PratoPrincipalNote: '',
        sobremesa: '',
        SobremesaNote: ''
      }));
    },
    registerNameOnly() {
      const names = this.persons.map(person => person.name);
      alert('Reserva com sucesso!\nNome de Cliente(s):' + names.join('\n'));
    }
  }
}
</script>