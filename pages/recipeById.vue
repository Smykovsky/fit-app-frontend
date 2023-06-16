<template>
  <div>
    <h1>{{ id }}</h1>
  </div>
</template>

<script>
export default {
  name: 'recipeById',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipe: null,
    }
  },
  created() {
    this.getRecipeById(this.id)
  },
  methods: {
    getRecipeById(id) {
      this.$axios.get(`/api/recipe/get/${id}`, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.recipe = response.data
        console.log(this.recipe)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
