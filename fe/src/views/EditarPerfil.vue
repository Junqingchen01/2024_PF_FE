<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <v-card class="mt-5">
            <v-card-title class="text-center">Editar Perfil</v-card-title>
            <v-card-text>
              <v-container>
                <v-row v-if="field === 'Name'">
                  <v-col cols="12">
                    <v-text-field v-model="editedValue" label="Novo Nome"></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="field === 'Email'">
                  <v-col cols="12">
                    <v-text-field v-model="editedValue" label="Novo Email"></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="field === 'Tel'">
                  <v-col cols="12">
                    <v-text-field v-model="editedValue" label="Novo Telefone"></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="field === 'Password'">
                    <v-col cols="12">
                        <v-text-field v-model="editedValue" label="Nova Senha"></v-text-field>
                    </v-col>
                </v-row>
              </v-container>
              <div class="buttons">
                <v-btn @click="salvar" color="#7D0A0A">Salvar</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
    import { useUserStore } from '@/stores/user';

  export default {
    data() {
      return {
        field: '',
        editedValue: ''
      };
    },
    created() {
      this.field = this.$route.params.field;
    },
    methods: {
      salvar() {
        if(this.field === 'Name') {
          const editedData={
            "NewName": this.editedValue
          };
            useUserStore().editarPerfil(editedData);
        } else if(this.field === 'Email') {
          const editedData={
            "NewEmail": this.editedValue
          };
            useUserStore().editarPerfil(editedData);

        } else if(this.field === 'Tel') {
            const editedData={
                "NewTel": this.editedValue
            };
            useUserStore().editarPerfil(editedData);

        } else if(this.field === 'Password') {
          const editedData={
            "NewPassword": this.editedValue
          };
            useUserStore().editarPerfil(editedData);

        }else if(this.field === 'Avatar') {
          const editedData={
            "NewAvatar": this.editedValue
          };
            useUserStore().editarPerfil(editedData);
        }
        alert('Perfil editado com sucesso! porfavor faça login novamente para ver as alterações!');
        sessionStorage.clear();
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .mt-5 {
    margin-top: 20px;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
  }
  </style>
  