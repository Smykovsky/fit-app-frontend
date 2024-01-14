<template>
  <div class='diet-container'>
    <div class='header-container'>
      <span> <font-awesome-icon class='icon' icon="fa-solid fa-utensils" /> Twój dzień</span>
      <div class='meal-add'>
        <b-button class='meal-btn btn btn-success' v-if='currentDate == dateObject.pickedDate' v-b-modal.modal-meal>+</b-button>
      </div>
      <div class="calendar-icon">
        <span><font-awesome-icon @click="$bvModal.show('modal-calendar')" icon="fa-solid fa-calendar" /></span>
      </div>
    </div>

    <b-modal id="modal-calendar" title="Kalendarz" hide-footer>
        <b-calendar class='calendar' block :hide-header="true" v-model="dateObject.pickedDate" @context="handleDayClick" :date-format-options="{day: '2-digit', month: 'numeric', year: 'numeric'}" locale="pl"></b-calendar>
    </b-modal>

    <div class='card-container'>

      <div v-for='meal in meals' :items='meals' :key='meal.id' class='diet-card'>
        <div class='minimalize' v-if='isHidden'>
          <font-awesome-icon @click='isHidden = !isHidden' :icon="['fas', 'caret-down']" />
        </div>
        <div class='minimalize' v-if='!isHidden'>
          <font-awesome-icon @click='isHidden = !isHidden' :icon="['fas', 'window-minimize']" />
        </div>

        <div class='meal-title-container'>
          <span>{{ meal.name }}</span>
          <b-button class='btn-add' @click='add(meal)'>+</b-button>
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
      <b-modal id="modal-item" v-model='modalItemAdd' title="Dodawanie produktu" hide-header hide-footer>
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
            v-model='newItem.mealId'
            disabled
            required
          ></b-form-input>
        </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Nazwa produktu"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="text"
              placeholder="np. Serek wiejski"
              v-model='newItem.name'
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Kalorie"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="number"
              v-model='newItem.calories'
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Węglowodany"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="number"
              v-model='newItem.carbohydrates'
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Białko"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="number"
              v-model='newItem.protein'
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Tłuszcze"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="number"
              v-model='newItem.fat'
              required
            ></b-form-input>
          </b-form-group><hr>
          <b-form-group
            id="input-group-2"
            label="Załaduj dane z przepisu"
            label-for="input-1"
          >
            <b-form-select v-model='selected' value-field='id' @change='updateInputs'>
              <b-form-select-option v-for='item in recipes' :key='item.id' :value='item.id'>{{ item.name }}</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group
            id='input-group-1'
          >
            <b-button class='btn btn-danger' @click="$bvModal.hide('modal-item')">Zamknij</b-button>
            <b-button class='btn btn-success' @click='addItem'>Dodaj</b-button>
          </b-form-group>
        </b-form>
      </b-modal>

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
              v-model='newMeal.name'
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id='input-group-2'
          >
            <b-button class='btn btn-danger' @click="$bvModal.hide('modal-meal')">Zamknij</b-button>
            <b-button @click='addMeal' class='btn btn-success'>Dodaj</b-button>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>

    <ModalMealEdit/>

  </div>
</template>

<script>
import ModalMealEdit from '@/components/modals/ModalMealEdit.vue'

export default {
  name: 'diet',
  components: { ModalMealEdit },
  data() {
    return {
      dateObject: {
        id: 0,
        pickedDate: ''
      },
      currentDate: null,
      newMeal: {
        name: ''
      },
      items: [],
      selected: null,
      recipes: [
        {
          name: '',
          description: '',
          kcal: null,
          carbohydrates: null,
          protein: null,
          fat: null,
        }
      ],
      modalItemEdit: false,
      modalItemAdd: false,
      isHidden: false,
      meals: [],
      editedIndex: null,
      editedItem: {
        id: 0,
        name: '',
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
      },
      newItem: {
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

  beforeMount() {
    this.loadCurrentDateAndPickedDate()
  },

  mounted() {
    this.loadMeals(),
    this.loadFoodItems(),
    this.loadRecipes(),
    this.loadCurrentDateAndPickedDate()
  },

  methods: {
    async handleDayClick() {
      console.log(this.dateObject.pickedDate)
      this.$axios.get(`/api/meal/getByDate/${this.dateObject.pickedDate}`, {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.meals = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    loadMeals() {
      this.$axios.get("/api/meal/get", {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.meals = response.data
        console.log(this.dateObject.pickedDate + "picked")
        console.log(this.currentDate + "current")
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
      this.$axios.post('/api/item/update', this.editedItem,{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.modalItemEdit = false;
        this.handleDayClick()
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    addMeal() {
      this.$axios.post('/api/meal/add', this.newMeal, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$bvModal.hide('modal-meal');
        this.newMeal.name = "";
        this.loadMeals()
      }).catch(error => {
        console.log(error)
      })
    },
    async addItem() {
      this.$axios.post('/api/item/add', this.newItem, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.modalItemAdd = false
        this.newItem = {};
        this.handleDayClick()
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    async deleteItem(mealId, itemId) {
      this.$axios.post('/api/item/delete', {mealId: mealId, itemId: itemId}, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.handleDayClick()
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    loadRecipes() {
      this.$axios.get("/api/recipe/get", {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.recipes = response.data
      }).catch(error => {
        console.log(error);
      })
    },
    updateInputs() {
      this.$axios.get(`/api/recipe/get/${this.selected}`, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        const item = response.data;
        this.newItem.name = item.name;
        this.newItem.calories = item.kcal;
        this.newItem.carbohydrates = item.carbohydrates;
        this.newItem.protein = item.protein;
        this.newItem.fat = item.fat;
      });
    },

    edit(item) {
      this.editedItem = Object.assign({}, item)
      this.modalItemEdit = true
    },
    add(meal) {
      this.modalItemAdd = true
      this.newItem.mealId = meal.id
    },
    loadCurrentDateAndPickedDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0')
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = today.getFullYear()

      this.currentDate = `${year}-${month}-${day}`

      if (this.dateObject.pickedDate == null) {
        this.dateObject.pickedDate= this.currentDate
      }

      this.dateObject.pickedDate= `${year}-${month}-${day}`
    },

  }
}
</script>

<style lang="sass">
@import "assets/diet.sass"
</style>
