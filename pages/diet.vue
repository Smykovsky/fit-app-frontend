<template>
  <div class='diet-container'>
    <div class='title-container'>
      <span>Twój dzień</span><br>
      <div class='meal-add'>
        <b-button class='meal-btn btn btn-success' v-b-modal.modal-meal>Dodaj posiłek</b-button>
      </div>
      <div>
      </div>
    </div>

    <div class='card-container'>
      <div class='diet-card'>
        <div class='meal-title-container'>
          <h2>Śniadanie</h2>
          <div class='meal-add'>
            <b-button class='add-btn rounded-sm btn btn-success' v-b-modal.modal-item>+</b-button>
          </div>
        </div>
        <div class='diet-content'>
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


    <b-modal id="modal-meal" title="Dodawanie posiłku" hide-footer>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Podaj nazwę jedzenia"
          label-for="input-1"
          description="Posiłek zostanie dodany do listy"
        >
          <b-form-input
            id="input-1"
            type="text"
            placeholder="np. Śniadanie"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
        id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-meal')">Zamknij</b-button>
          <b-button class='btn btn-success'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id="modal-item" title="Dodawanie produktu" hide-footer>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Podaj nazwę produktu"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            placeholder="np. Serek wiejski"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Podaj ilość węglowodanów w produkcie"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Podaj ilość białka w produkcie"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Podaj ilość tłuszczów w produkcie"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-item')">Zamknij</b-button>
          <b-button class='btn btn-success'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>

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
