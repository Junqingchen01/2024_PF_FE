import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        menus: [],
        menu: [],
        menubyid: [],
        menuItems: [], 
        todaymenu: [],

        prepratos: [],
        pratoprincipal: [],
        sobremesas: [],
    }),
    getters: {
        getMenus: (state) => state.menus,
        getMenu: (state) => state.menu,
        getMenuItems: (state) => state.menuItems, 
        getTodayMenu: (state) => state.todaymenu,

        getPrePratos: (state) => state.prepratos,
        getPratoPrincipal: (state) => state.pratoprincipal,
        getSobremesas: (state) => state.sobremesas,
        getMenuById: (state) => state.menubyid,
    },
    actions: {
        async fetchMenus() {
            try {
                const token = sessionStorage.getItem('token');
                const res = await fetch(`http://localhost:8080/menu`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 200) {
                    const data = await res.json();
                    this.menus = data.data;
                    sessionStorage.setItem('menus', JSON.stringify(data.data));
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error getting menus:', error);
                return false;
            }
        },

        async fetchMenu(type_day, menu_type) {
            try {
                const token = sessionStorage.getItem('token');
                const res = await fetch(`http://localhost:8080/menu/${type_day}/${menu_type}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 200) {
                    const data = await res.json();
                    this.menu = data.data;
                    sessionStorage.setItem('thisMenu', JSON.stringify(this.menu));
                    
                    this.prepratos = [];
                    this.pratoprincipal = [];
                    this.sobremesas = [];
                    
                    this.menu[0].menuItems.forEach(item => {
                        switch (item.food.type) {
                            case 'pre prato':
                                this.prepratos.push(item);
                                break;
                            case 'prato principal':
                                this.pratoprincipal.push(item);
                                break;
                            case 'sobremesa':
                                this.sobremesas.push(item);
                                break;
                            default:
                                break;
                        }
                    });
                    
                    sessionStorage.setItem('prepratos', JSON.stringify(this.prepratos));
                    sessionStorage.setItem('pratoprincipal', JSON.stringify(this.pratoprincipal));
                    sessionStorage.setItem('sobremesas', JSON.stringify(this.sobremesas));

                    
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error getting menu:', error);
                return false;
            }
        },

        async afterOrder(formattedOrder,type_day, menu_type) {
            try {
                const token = sessionStorage.getItem('token');
                const res = await fetch(`http://localhost:8080/menu/${type_day}/${menu_type}/updateMenuItemAfterOrder`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formattedOrder),
                });
                if (res.status === 200) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error updating menu:', error);
                return false;
            }
        },

        async fetchMenuById(id) {
            try {
                const token = sessionStorage.getItem('token');
                const res = await fetch(`http://localhost:8080/menu/menuid/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 200) {
                    const data = await res.json();
                    this.menubyid = data.data;
                    sessionStorage.setItem('thisMenu', JSON.stringify(this.menubyid));
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error getting menu:', error);
                return false;
            }
        },


        async updateMenuTime(id, NewTime) {
            try {
                const token = sessionStorage.getItem('token');
                const res = await fetch(`http://localhost:8080/menu/menuid/${id}/updateMenuTime`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(NewTime),
                });
                if (res.status === 200) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error updating menu:', error);
                return false;
            }
        },

        async fetchTodayMenu() {
            try {
                const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                console.log(today);
                const res = await fetch(`http://localhost:8080/menu/${today}`, {
                    method: 'GET',
                    headers: {
                    },
                });
                if (res.status === 200) {
                    const data = await res.json();
                    this.todaymenu = data.data;
                    console.log(this.todaymenu);
                    sessionStorage.setItem('todaymenu', JSON.stringify(data.data));
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error getting menus:', error);
                return false;
            }
        }
    },
});
