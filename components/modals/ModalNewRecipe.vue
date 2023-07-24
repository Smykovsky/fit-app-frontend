<template>
  <b-modal id="modal-newRecipe" title="Dodaj przepis" hide-footer>
    <b-form>
      <b-form-group
        label="Nazwa przepisu"
      >
        <b-form-input
          type="text"
          v-model='newRecipe.name'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Opisz przepisu"
        description="Opisz tworzony przepis"
      >
        <b-form-textarea
          type="text"
          v-model='newRecipe.description'
          required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Instrukcja przygotowania"
        description="Napisz instrukcje przygotowania przepisu"
      >
        <b-form-textarea
          type="text"
          v-model='newRecipe.instruction'
          required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Kalorie"
      >
        <b-form-input
          type="number"
          v-model='newRecipe.kcal'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Węglowodany"
      >
        <b-form-input
          type="number"
          v-model='newRecipe.carbohydrates'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Białko"
      >
        <b-form-input
          type="number"
          v-model='newRecipe.protein'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Tłuszcz"
      >
        <b-form-input
          type="number"
          v-model='newRecipe.fat'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
      >
        <b-button class='btn btn-danger' @click="$bvModal.hide('modal-newRecipe')">Zamknij</b-button>
        <b-button class='btn btn-success' @click='addRecipe'>Dodaj</b-button>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalNewRecipe',
  data() {
    return {
      newRecipe: {
        name: '',
        instruction: '',
        description: '',
        kcal: null,
        carbohydrates: null,
        protein: null,
        fat: null
      }
    }
  },
  methods: {
    addRecipe() {
      this.$axios.post("/api/recipe/add", this.newRecipe, {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$bvModal.hide("modal-newRecipe")
        location.reload()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
