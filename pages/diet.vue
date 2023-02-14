<template>
  <div class='diet-container'>
    <div class='title'>
      <span>Twój dzień</span><br>
      <div class='meal-add'>
        <button class='meal-btn'>Dodaj posiłek</button>
      </div>
    </div>
    <div class='card-container'>
      <div class='diet-card'>
        <div class='meal-title'>
          <h2>ŚNIADANIE</h2>
          <div class='meal-add'>
            <button class='add-btn'>+</button>
          </div>
        </div>
        <div class='diet-content'>
            <div class='item-title'>
              <span></span>
            </div>
            <div class='item-content'>
              <span class='item-makro'>Kcal: </span>
              <span class='item-makro'>W: </span>
              <span class='item-makro'>B: </span>
              <span class='item-makro'>T: </span>
            </div>
        </div>
      </div>

    </div>
    <div class='diet-progress'>
      progres
    </div>
  </div>
</template>

<script>
export default {
  name: 'diet',
  data() {
    return {
    }
  }
}
</script>

<style lang="sass">
@import "assets/diet.sass"
</style>
