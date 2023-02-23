<template>
  <div>
    <b-modal id="modal-itemEdit" title="Edytowanie produktu" hide-footer>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Id posiłku"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="number"
            v-model='editedIndex.mealId'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Id produktu"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            placeholder=""
            v-model='editedIndex.id'
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
            v-model='editedIndex.name'
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
            v-model='editedIndex.carbohydrates'
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
            v-model='editedIndex.protein'
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
            v-model='editedIndex.fat'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-itemEdit')">Zamknij</b-button>
          <b-button class='btn btn-success'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalItemEdit',
  data() {
    return {
      meals: [],
      items: [],
      editedIndex: -1,
      editedItem: {
        foodItemId: 0,
        id: 1,
        name: '',
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
      },

      credentials: {
        mealId: 0,
        id: 1,
        name: '',
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
      }
    }
  }
  ,
  mounted() {
    this.loadMeals(),
    this.loadFoodItems()
  },

  methods: {
    loadMeals() {
      this.$axios.get("/api/meal/get", {
        headers: { Authorization: this.$auth.strategy.token.get() }
      }).then(response => {
        this.meals = response.data
        this.credentials.mealId = response.data.id
        console.log(this.meals)
      }).catch(error => {
        console.log(error)
      })
    },
    loadFoodItems() {
      this.$axios.get("/api/item/get", {
        headers: { Authorization: this.$auth.strategy.token.get() }
      }).then(response => {
        this.credentials.id = response.data.id
        this.credentials.name = response.data.name
        this.credentials.calories = response.data.calories
        this.credentials.carbohydrates = response.data.carbohydrates
        this.credentials.protein = response.data.protein
        this.credentials.fat = response.data.fat
        console.log(this.items)
      }).catch(error => {
        console.log(error)
      })
    },
    edit(index) {
      this.editedItem = this.meals[index]
      console.log(this.editedItem)
      // this.meals.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
