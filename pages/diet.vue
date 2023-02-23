<template>
  <div class='diet-container'>
    <div class='header-container'>
      <span> <font-awesome-icon class='icon' icon="fa-solid fa-utensils" /> Twój dzień</span>
      <div class='meal-add'>
        <b-button class='meal-btn btn btn-success' v-b-modal.modal-meal>Dodaj posiłek</b-button>
      </div>
    </div>

    <div class='card-container'>
      <div v-for='meal in meals' :items='meals' :key='meal.id' class='diet-card'>
        <div class='meal-title-container'>
          <span @click='isHidden = !isHidden'>{{ meal.name }} / id: {{ meal.id }}</span>
          <b-button class='add-btn rounded-sm btn btn-success' v-b-modal.modal-item>+</b-button>
        </div>
        <div v-for='item in meal.foodItems' :key='item.id' class='diet-content' v-bind:class='{"d-none": isHidden}'>
            <div class='item-title-container'>
              <b-button><font-awesome-icon icon="fa-solid fa-trash" /></b-button>
              <span>{{ item.name }}, id: {{ item.id }}</span>
              <b-button v-b-modal.modal-itemEdit><font-awesome-icon icon="fa-solid fa-pen-to-square" /></b-button>
            </div>
            <div class='item-content-container'>
              <span class='item-makro'>Kcal: {{ item.calories }}</span>
              <span class='item-makro'>W: {{ item.carbohydrates }}</span>
              <span class='item-makro'>B: {{ item.protein }}</span>
              <span class='item-makro'>T: {{ item.fat }}</span>
            </div>
          {{meal.foodItems[0].id}}
        </div>
      </div>

    </div>


    <ModalMealEdit/>
    <ModalItemEdit/>
    <ModalMeal/>
    <ModalItem/>

  </div>
</template>

<script>
export default {
  name: 'diet',
  data() {
    return {
      isHidden: false,
      meals: [],

      credentials: {
        foodItemId: 0,
        id: 1,
        name: '',
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
      }
    }
  },

  mounted() {
    this.loadMeals(),
    this.loadFoodItems()
  },

  methods: {
    loadMeals() {
      this.$axios.get("/api/meal/get", {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.meals = response.data
        console.log(this.meals)
      }).catch(error => {
        console.log(error)
      })
    },
    loadFoodItems() {
      this.$axios.get("/api/item/get", {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.items = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="sass">
@import "assets/diet.sass"
</style>
