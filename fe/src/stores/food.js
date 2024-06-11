import {defineStore} from 'pinia';

export const useFoodStore = defineStore('food',{
    state: () => ({
        foods: [],
        food: '',
        foodbyid: [],

    }),
    getters: {
        getFoods: (state) => state.foods,
        getFood: (state) => state.food,
        getFoodById: (state) => state.foodbyid,
    },
    actions:{
        async fetchFoods(){
            try{
                const res = await fetch('http://localhost:8080/food/',{
                    method: 'GET',
                });
                if(res.status === 200){
                    const data = await res.json();
                    this.foods = data.data;
                    sessionStorage.setItem('Allfoods', JSON.stringify(data.data));
                    return true;
                }else{
                    return false;
                }
            }catch(error){
                console.error('Error getting foods:', error);
                return false;
            }
        },
        async fetchFoodById(id){
            try{
                const res = await fetch('http://localhost:8080/food/'+id,{
                    method: 'GET',
                });
                if(res.status === 200){
                    const data = await res.json();
                    this.foodbyid = data.data;
                    sessionStorage.setItem('thisfood', JSON.stringify(data.data));
                    return true;
                }else{
                    return false;
                }
            }catch(error){
                console.error('Error getting food:', error);
                return false;
            }
        },

        async createFood(Newfood){
            try{
                const token = sessionStorage.getItem('token');
                const res = await fetch('http://localhost:8080/food/create',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(Newfood),
                });
                if(res.status === 200){
                    return true;
                }else{
                    return false;
                }
            }catch(error){
                console.error('Error creating food:', error);
                return false;
            }
        },
    }
});