<template>
  <div>
    <b-modal id="modal-mealEdit" title="Edytowanie posiłku" hide-footer>
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
            v-model='editedItem.name'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-mealEdit')">Zamknij</b-button>
          <b-button class='btn btn-success'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalMealEdit',

  data() {
    return {
      meals: [],

      editedIndex: -1,
      editedItem: {
        name: ''
      },
    }
  },

  mounted() {
    this.loadMeals();
  },
  created() {
    this.loadMeals();
  },

  methods: {
    editItem (index) {
      this.editedItem = this.meals[index];
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.meals[this.editedIndex], this.editedItem)
      } else {
        this.meals.push(this.editedItem)
      }
      this.close()
    },
    loadMeals() {
      this.$axios.get("/api/meal/get", {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.meals = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>

</style>
