<template>
  <div class='diet-container'>
    <div class='header-container'>
      <span> <font-awesome-icon class='icon' icon="fa-solid fa-utensils" /> Twój dzień</span>
      <div class='meal-add'>
        <b-button class='meal-btn btn btn-success' v-b-modal.modal-meal>Dodaj posiłek</b-button>
      </div>
    </div>

    <div class='card-container'>
      <div class='diet-card'>
        <div class='meal-title-container'>
          <span @click='isHidden = !isHidden'>Śniadanie</span>
          <b-button class='add-btn rounded-sm btn btn-success' v-b-modal.modal-item>+</b-button>
        </div>
        <div class='diet-content' v-bind:class='{"d-none": isHidden}'>
            <div class='item-title-container'>
              <span>Serek wiejski</span>
            </div>
            <div class='item-content-container'>
              <span class='item-makro'>Kcal: </span>
              <span class='item-makro'>W: </span>
              <span class='item-makro'>B: </span>
              <span class='item-makro'>T: </span>
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
      isHidden: false
    }
  }
}
</script>

<style lang="sass">
@import "assets/diet.sass"
</style>
