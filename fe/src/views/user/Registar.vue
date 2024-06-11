<template>
    <v-row style="margin-top: 30px;">
      <v-col>
        <h1>Registrar Nova Conta</h1>
      </v-col>
    </v-row>
    <v-row class="container justify-space-evenly">
      <v-col cols="10" md="4">
        <div class="register">
          <h1>Register</h1>
          <form @submit.prevent="handleRegister">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required />
            <button type="submit">Register</button>
          </form>
          <br />
          <h5 @click="navigateToLogin">Já tem uma conta? Faça login</h5>
        </div>
      </v-col>
    </v-row>
  </template>

<script>
import { useUserStore } from '@/stores/user';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      userStore: useUserStore(),
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('As senhas não correspondem');
        return;
      }

      const registerURL = 'http://localhost:8080/user/register';
      try {
        const response = await fetch(registerURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name: this.username,
            Email: this.email,
            Password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }

        const data = await response.json();
        alert('Registrado com sucesso');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error:', error);
        alert('Ocorreu um erro ao registrar');
      }
    },
    navigateToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>


<style scoped>
.container {
  margin: 20px;
  display: flex;
  align-items: center;
  justify-self: center;
}

.register {
  max-width: 600px;
  padding: 20px;
  border: 5px solid #7d0a0a;
  border-radius: 30px;
  background-color: #e6ba50;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #7d0a0a;
}

h5 {
  text-align: center;
  color: #7d0a0a;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
  color: #7d0a0a;
  size: 10px;
}

input {
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #7d0a0a;
  border-radius: 30px;
}

button {
  padding: 10px;
  background-color: #7d0a0a;
  color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

button:hover {
  background-color: #5a0707;
}
</style>
