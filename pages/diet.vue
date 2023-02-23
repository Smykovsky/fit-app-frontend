<template>
  <div class='diet-container'>
    <div class='header-container'>
      <span> <font-awesome-icon class='icon' icon="fa-solid fa-utensils" /> Twój dzień</span>
      <div class='meal-add'>
        <b-button class='meal-btn btn btn-success' v-b-modal.modal-meal>Dodaj posiłek</b-button>
      </div>
    </div>

    <div class='card-container'>
      <div v-for='meal in meals' :key='meal.id' class='diet-card'>
        <div class='meal-title-container'>
          <span @click='isHidden = !isHidden'>{{ meal.name }}</span>
          <b-button class='add-btn rounded-sm btn btn-success' v-b-modal.modal-item>+</b-button>
        </div>
        <div v-for='item in meal.foodItems' :key='item.id' class='diet-content' v-bind:class='{"d-none": isHidden}'>
            <div class='item-title-container'>
              <span>{{ item.name }}</span>
            </div>
            <div class='item-content-container'>
              <span class='item-makro'>Kcal: {{ item.calories }}</span>
              <span class='item-makro'>W: {{ item.carbohydrates }}</span>
              <span class='item-makro'>B: {{ item.protein }}</span>
              <span class='item-makro'>T: {{ item.fat }}</span>
            </div>
        </div>
      </div>

    </div>

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
      }).catch(error => {
        console.log(error)
      })
    },
    loadFoodItems() {
      this.$axios.get("/api/item/get", {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.items = response.data
        console.log(this.items)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="sass">
@import "assets/diet.sass"
</style>
