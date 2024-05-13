// store/user.js

import { defineStore } from 'pinia';
import * as api from '../api/api.js';

const API_URL = 'http://localhost:8080';

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
  },
});
