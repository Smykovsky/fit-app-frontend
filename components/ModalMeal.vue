<template>
<div>
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
</template>

<script>
export default {
  name: 'ModalMeal',
  data() {
    return {
      newMeal: {
        name: ''
      }
    }
  },

  methods: {
    addMeal() {
      this.$axios.post('/api/meal/add', this.newMeal, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$bvModal.hide('modal-meal');
        location.reload()
      }).catch(error => {
        console.log(error)
      })
    },
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
  }
}
</script>

<style scoped>

</style>
