<template>
    <v-row justify="center">
      <v-col cols="5">
        <v-card v-if="avaliacao" class="avaliacao-card">
          <v-card-title class="text-center">
            <div>
              <h2>Avaliação Detalhes</h2>
            </div>
            <div>ID da Avaliação: {{ avaliacao.avaliacao_id }}</div>
            <div>ID do Pedido: {{ avaliacao.order_id }}</div>
            <div>Data de Criação: {{ new Date(avaliacao.createdAt).toLocaleDateString() }}</div>
          </v-card-title>
          <v-card-text class="text-center">
            <p>Classificações:</p>
            <ul class="avaliacao-ratings">
              <li>Classificação do Serviço: {{ avaliacao.servicerating }}</li>
              <li>Classificação da Temperatura: {{ avaliacao.temperatureRating }}</li>
              <li>Classificação da Luz: {{ avaliacao.lightRating }}</li>
            </ul>
            <p>Observação: {{ avaliacao.Observation }}</p>
            <p>Classificação de Comidas:</p>
            <ul class="avaliacao-foods">
              <li v-for="(food, index) in avaliacao.avaliacaoFoods" :key="index">
                Comida ID: {{ food.food_id }} 
                <br>- Classificação de Quantidade: {{ food.quantityRating }}
              </li>
            </ul>
            <br>
            <div class="center-button">
              <v-btn @click="$router.go(-1)" color="#7D0A0A" class="text-center">Volta</v-btn>
            </div>
          </v-card-text>
        </v-card>
        <v-alert v-else type="error">Dados de avaliação não disponíveis.</v-alert>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { useAvaliarStore } from '@/stores/avaliar';
  
  export default defineComponent({
    name: 'AvaliacaoDetail',
    props: {
      menuData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        Store: useAvaliarStore(),
        avaliacao: null,
      };
    },
    async created() {
      try {
        const id = this.$route.params.id;
        await this.Store.fetchAvaliacaoByid(id);
        this.avaliacao = this.Store.getAvaliacaoId;
      } catch (error) {
        console.error('Error fetching avaliacao:', error);
      }
    },
  });
  </script>
  
  <style scoped>
  .avaliacao-card {
    background-color: white;
    margin-top: 30px;
    border: 2px solid #7D0A0A;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .avaliacao-card .text-center {
    margin-bottom: 20px;
    color: #333;
  }
  
  .avaliacao-ratings,
  .avaliacao-foods {
    list-style-type: none;
    padding: 0;
    margin: 10px 0;
  }
  
  .avaliacao-ratings li,
  .avaliacao-foods li {
    margin: 10px 0;
    color: #7D0A0A;
    font-size: 16px;
  }
  
  .avaliacao-ratings li::before,
  .avaliacao-foods li::before {
    content: '•';
    color: #7D0A0A;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
  
  .center-button {
    display: flex;
    justify-content: center;
  }
  
  .center-button .v-btn {
    color: white;
    background-color: #7D0A0A;
    font-weight: bold;
  }
  </style>
  