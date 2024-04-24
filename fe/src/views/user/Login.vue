<template>
        <v-row style="margin-top: 30px;">
            <v-col>
                <h1>Restaurante ESHT</h1>
            </v-col>
        </v-row>
        <v-row class="container justify-space-evenly">
            <v-col cols="9">
                    <div class="photo-slider">
                        <transition name="fade" >
                        <img :key="currentPhoto" :src="currentPhoto" alt="Photo" />
                        </transition>
                    </div>
            </v-col>
            <v-col cols="3">    
                    <div class="login ">
                        <h1>Login</h1>
                        <form @submit.prevent="login">
                        <label for="username">Username:</label>
                        <input type="text" id="username" v-model="username" required>
                        <label for="password">Password:</label>
                        <input type="password" id="password" v-model="password" required>
                        <button type="submit">Login</button>
                        <br>
                        <h5 @click="this.$router('/')">Esquece password ?</h5>
                        <h5 @click="this.$router('/')">Registar novo conta.</h5>
                        </form>
                    </div>
            </v-col>
        </v-row>
  </template>
  
  <script>
  import chefImage from '@/assets/img/CHEFS.jpg';
  import escolaImage from '@/assets/img/ESCOLA.jpg';
  import premioImage from '@/assets/img/PREMIO.jpg';

  export default {
    data() {
      return {
        photos: [
            chefImage,
            escolaImage,
            premioImage
          
        ],
        currentIndex: 0,
        username: '',
        password: ''
      };
    },
    computed: {
      currentPhoto() {
        return this.photos[this.currentIndex];
      },
    },
    methods: {
      login() {
        if (this.username === 'admin' && this.password === 'admin') {
          localStorage.setItem('isLogin', true);
          this.$router.push('/');
        } else {
          alert('Invalid credentials');
        }
      }
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
    margin: 20px ; 
    margin-right: 100px;
    display: flex;
    align-items: center;
    justify-self: center;
  }
  
  .photo-slider {
    width:1200px;
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
    border: 5px solid #7D0A0A;
    border-radius: 30px;
    background-color: #E6BA50;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #7D0A0A;
  }

  h5 {
    text-align: center;
    color: #7D0A0A;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 10px;
    color: #7D0A0A;
    size: 10px;
  }
  
  input {
    padding: 10px;
    margin-bottom: 20px;
    border: 2px solid #7D0A0A;
    border-radius: 30px;

  }
  
  button {
    padding: 10px;
    background-color: #7D0A0A;
    color: #fff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
  }
  </style>
  