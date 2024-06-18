<template>
  <v-row style="margin-top: 30px;">
    <v-col>
      <h1>Restaurante ESHT</h1>
    </v-col>
  </v-row>
  <v-row class="container justify-space-evenly">
    <v-col cols="9">
      <div class="photo-slider">
        <transition name="fade">
          <img :key="currentPhoto" :src="currentPhoto" alt="Photo" />
        </transition>
      </div>
    </v-col>
    <v-col cols="3">
      <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
          <button type="submit">Login</button>
          <br />
          <h5 @click="navigateToRegister">Registrar nova conta.</h5>
        </form>
      </div>
    </v-col>
  </v-row>
</template>

  
<script>
import chefImage from '@/assets/img/CHEFS.jpg';
import escolaImage from '@/assets/img/ESCOLA.jpg';
import premioImage from '@/assets/img/PREMIO.jpg';
import { useUserStore } from '@/stores/user';

export default {
  data() {
    return {
      photos: [chefImage, escolaImage, premioImage],
      currentIndex: 0,
      username: '',
      password: '',
      userStore: useUserStore(),
    };
  },
  created() {
    this.reflashed = JSON.parse(sessionStorage.getItem('reflashed')) === false;
    if (!this.reflashed) {
      window.location.reload();
      sessionStorage.setItem('reflashed', false);
    }  
  },
  computed: {
    currentPhoto() {
      return this.photos[this.currentIndex];
    },
  },
  methods: {
    async handleLogin() {
      const loginURL = 'http://localhost:8080/login';
      try {
        const response = await fetch(loginURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            NameOrEmail: this.username,
            Password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }

        const data = await response.json();
        sessionStorage.setItem('isLogin', true);
        sessionStorage.setItem('userInfo', JSON.stringify(data));
        sessionStorage.setItem('token', data.token);

        const userType = data.user.UserType;
        sessionStorage.setItem('isAdmin', userType === 'admin');

        this.$router.push('/');
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in');
      }
    },

    navigateToRegister() {
      this.$router.push('/registar');
    },
  },
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    }, 3000);
  },
};
</script>
<style scoped>
.container {
  margin: 20px;
  margin-right: 100px;
  display: flex;
  align-items: center;
  justify-self: center;
}

.photo-slider {
  width: 1200px;
  margin-right: 20px;
  border-radius: 30px;
}

.photo-slider img {
  max-width: 100%;
  height: 500px;
  display: block;
  margin: 0 auto;
  border-radius: 30px;
}

.login {
  max-width: 400px;
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

  