<template>
    <v-row justify="center">
        <v-col cols="5">
            <v-card class="card">
                <v-card-title class="text-center">
                    <h2>{{ food.food_name }}</h2>
                </v-card-title>
                <v-card-text>
                    <p>Tipo: {{ food.type }}</p>
                    <br>
                    <p>Descrição: {{ food.description }}</p>

                </v-card-text>
                <br>
                <div class="center-button">
                    <v-btn color="#7D0A0A" @click="editFood()">Editar</v-btn>
                    <v-btn @click="$router.go(-1)" color="#7D0A0A" class="text-center">Volta</v-btn>
                </div>
            </v-card>
        </v-col>
    </v-row>

        <!-- dialog -->
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>Edit Food</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field v-model="editedFood.food_name" label="Food Name"></v-text-field>
                    <v-select v-model="editedFood.type" :items="foodTypes" label="Type"></v-select>
                    <v-text-field v-model="editedFood.description" label="Description"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#7D0A0A" text @click="dialog = false">Cancel</v-btn>
                <v-btn color="#7D0A0A" text @click="saveEditedFood">Save</v-btn>
            </v-card-actions>
         </v-card>
    </v-dialog>
    <!-- dialog -->
</template>


<script>
import { useFoodStore } from '@/stores/food';

export default {
    data() {
        return {
            foodStore: useFoodStore(),
            food: null,
            dialog: false,
            foodTypes: ['pre prato', 'prato principal', 'sobremesa'],
            editedFood: {
                food_name: '',
                type: '',
                description: '',
            },
        };
    },

    computed: {
        food() {
            return this.foodStore.getFoodById;
        },
    },

    async created() {
        try {
            const foodId = this.$route.params.id;
            await this.foodStore.fetchFoodById(foodId);
            this.food = this.foodStore.getFoodById;
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    },

    methods: {
        async editFood() {
            this.editedFood = { ...this.food };
            this.dialog = true;
        },
        async saveEditedFood() {
            try {
                const token = sessionStorage.getItem('token');
                const foodId = this.$route.params.id;
                const res = await fetch(`http://localhost:8080/food/${foodId}/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(this.editedFood),
                });
                if (res.status === 200) {
                    alert('Food edited successfully');
                    this.dialog = false;
                    this.food = this.editedFood;
                    window.location.reload();
                } else {
                    alert('Error editing food');
                }
            } catch (error) {
                console.error('Error updating food:', error);
            }
        },

        
    },
};
</script>

<style>
.card{
    background-color: white;
    margin-top: 30px;
    border: 2px solid #7D0A0A;
    border-radius: 10px;
    padding: 20px;
}

.center-button {
    display: flex;
    justify-content: space-around;
    color: #7D0A0A;
  }

</style>