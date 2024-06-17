// store/user.js

import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    user: {},
    userinfo: {},
    userToken: '',
  }),
  getters: {
    getUser: (state) => state.user,
    getUserinfo: (state) => state.userinfo,
    getUsers: (state) => state.users,
    getUserToken: (state) => state.userToken,
  },
  actions: {
    async login({ NameOrEmail, Password }) {
      try {
        const res = await fetch(`http://localhost:8080/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ NameOrEmail, Password }),
        });
        if (res.status === 200) {
          const userLogado = await res.json();
          this.userinfo = userLogado;
          this.userToken = userLogado.token;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error logging in:', error);
        return false;
      }
    },

    async editarPerfil(editedData) {
      try {
          const token = sessionStorage.getItem('token');
          const res = await fetch(`http://localhost:8080/user/updateuser`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(editedData),
          });
          if (res.status === 200) {
              alert('Perfil editado com sucesso');
              return true;
          } else {
              return false;
          }
      } catch (error) {
          console.error('Error updating profile:', error);
          return false;
      }
  },

  async getUserById(id){
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const user = await res.json();
        this.user = user;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return false;
    }
  }
  
  },
});
