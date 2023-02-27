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
          <span @click='isHidden = !isHidden'>{{ meal.name }}</span>
          <b-button @click='add(meal)'><font-awesome-icon icon="fa-solid fa-plus" /></b-button>
        </div>
        <div v-for='(item, index) in meal.foodItems' :key='item.id' class='diet-content' v-bind:class='{"d-none": isHidden}'>
            <div class='item-title-container'>
              <span>{{ item.name }}</span>
              <div class='actions'>
                <b-button class='actionButton' @click='edit(item)' ><font-awesome-icon  icon="fa-solid fa-pen-to-square" /></b-button>
                <b-button class='actionButton' @click='deleteItem(meal.id, item.id)'><font-awesome-icon icon="fa-solid fa-trash" /></b-button>
              </div>
            </div>
            <div class='item-content-container'>
              <span class='item-makro'>Kcal: {{ item.calories }}</span>
              <span class='item-makro'>W: {{ item.carbohydrates }}</span>
              <span class='item-makro'>B: {{ item.protein }}</span>
              <span class='item-makro'>T: {{ item.fat }}</span>
            </div>
        </div>
      </div>

      <b-modal id="modal-itemEdit" v-model='modalItemEdit' title="Edytowanie produktu" hide-footer>
        <b-form>
          <b-form-group
            id="input-group-1"
            label="Id produktu"
            label-for="input-1"
            class='d-none'
          >
            <b-form-input
              id="input-1"
              type="number"
              v-model='editedItem.id'
              disabled
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Podaj nazwę produktu"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="text"
              v-model='editedItem.name'
              placeholder="np. Serek wiejski"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Podaj ilość kalorii w produkcie"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="number"
              v-model='editedItem.calories'
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
              type="number"
              v-model='editedItem.carbohydrates'
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
              type="number"
              v-model='editedItem.protein'
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
              type="number"
              v-model='editedItem.fat'
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id='input-group-2'
          >
            <b-button class='btn btn-danger' @click="$bvModal.hide('modal-itemEdit')">Zamknij</b-button>
            <b-button class='btn btn-success' @click='editItem'>Edytuj</b-button>
          </b-form-group>
        </b-form>
      </b-modal>
      <b-modal id="modal-item" v-model='modalItemAdd' title="Dodawanie produktu" hide-footer>
        <b-form>
          <b-form-group
          id="input-group-1"
          label="Id posiłku"
          label-for="input-1"
          class='d-none'
        >
          <b-form-input
            id="input-1"
            type="number"
            v-model='credentials.mealId'
            disabled
            required
          ></b-form-input>
        </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Podaj nazwę produktu"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="text"
              placeholder="np. Serek wiejski"
              v-model='credentials.name'
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Podaj ilość kalorii w produkcie"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="number"
              v-model='credentials.calories'
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
              type="number"
              v-model='credentials.carbohydrates'
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
              type="number"
              v-model='credentials.protein'
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
              type="number"
              v-model='credentials.fat'
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id='input-group-2'
          >
            <b-button class='btn btn-danger' @click="$bvModal.hide('modal-item')">Zamknij</b-button>
            <b-button class='btn btn-success' @click='addItem'>Dodaj</b-button>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>

    <ModalMealEdit/>
    <ModalMeal/>

  </div>
</template>

<script>
export default {
  name: 'diet',
  data() {
    return {
      modalItemEdit: false,
      modalItemAdd: false,
      isHidden: false,
      meals: [],

      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
      },

      credentials: {
        mealId: 0,
        id: 0,
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
    async editItem() {
      this.$axios.post('api/item/update', this.editedItem,{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.modalItemEdit = false;
        this.loadMeals()
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    async addItem() {
      this.$axios.post('api/item/add', this.credentials, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.modalItemAdd = false
        this.loadMeals()
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    async deleteItem(mealId, itemId) {
      this.$axios.post('api/item/delete', {mealId: mealId, itemId: itemId}, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        location.reload()
        console.log("usunieto")
      }).catch(error => {
        console.log(error.response.data)
      })
    },

    edit(item) {
      this.editedIndex = this.meals.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem)
      this.modalItemEdit = true
    },
    add(meal) {
      this.modalItemAdd = true
      this.editedIndex = this.meals.indexOf(meal)
      this.credentials.mealId = this.editedIndex + 1
      console.log(this.credentials.mealId)
    }
  }
}
</script>

<style lang="sass">
@import "assets/diet.sass"
</style>
