<template>
  <b-modal id="modal-recipeEdit" title="Edytuj przepis" hide-footer>
    <b-form v-if='recipe'>
      <b-form-group
        label="Nazwa przepisu"
      >
        <b-form-input
          type="text"
          v-model='recipe.name'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Opis przepisu"
        description="Opisz tworzony przepis"
      >
        <b-form-textarea
          type="text"
          v-model='recipe.description'
          required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Instrukcja przygotowania"
        description="Napisz instrukcje przygotowania przepisu"
      >
        <b-form-textarea
          type="text"
          v-model='recipe.instruction'
          required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Kalorie"
      >
        <b-form-input
          type="number"
          v-model='recipe.kcal'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Węglowodany"
      >
        <b-form-input
          type="number"
          v-model='recipe.carbohydrates'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Białko"
      >
        <b-form-input
          type="number"
          v-model='recipe.protein'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Tłuszcz"
      >
        <b-form-input
          type="number"
          v-model='recipe.fat'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
      >
        <b-button class='btn btn-danger' @click="$bvModal.hide('modal-recipeEdit')">Zamknij</b-button>
        <b-button class='btn btn-success' @click='updateRecipe' >Zaktualizuj</b-button>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalRecipeEdit',
  props: {
    recipe: {
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    updateRecipe() {
      this.$axios.post("api/recipe/update", this.recipe, {
        headers: { Authorization: this.$auth.strategy.token.get() }
      }).then(response => {
        this.$bvModal.hide('modal-recipeEdit')
      }).catch(error => {

      })
    }
  }
}
</script>

<style scoped>

</style>
