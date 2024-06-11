import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => ({
    user: '',
    orders: [],
    order: '',
    allOrders: [],
  }),
  getters: {
    getUser: (state) => state.user,
    getOrders: (state) => state.orders,
    getOrder: (state) => state.order,
    getAllOrders: (state) => state.allOrders,
  },
  actions: {
    async fetchOrders() {
      try {
        const token = sessionStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/order/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          this.user = data.user;
          this.orders = data.orders;
          sessionStorage.setItem('user', JSON.stringify(data.user));
          sessionStorage.setItem('orders', JSON.stringify(data.orders));
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error getting orders:', error);
        return false;
      }
    },

    async fetchOrder(id) {
      try {
        const token = sessionStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/order/orderid/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          this.order = data;
          sessionStorage.setItem('order', JSON.stringify(data));
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error getting order:', error);
        return false;
      } 
    },

    async cancelOrder(id) {
      try {
        const token = sessionStorage.getItem('token');
        const order = {
          status: "Canceled"
        };
        const res = await fetch(`http://localhost:8080/order/orderid/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(order),
        });
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error canceling order:', error);
        return false;
      }
    },
    
    async criarOrder(orderData) {
      try {
        const token = sessionStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/order/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });
    
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error creating order:', error);
        return false;
      }
    },

    async GetAll() {
      try {
        const token = sessionStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/order/all`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          this.allOrders = data;
          sessionStorage.setItem('allOrders', JSON.stringify(data));
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error getting orders:', error);
        return false;
      }
    },
    
    async AtivarAvaliacao(id) {
      try {
        const token = sessionStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/order/orderid/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avaliar: 'true',
          }),
        });
    
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error updating order:', error);
        return false;
      }
    }
    
  },
});
