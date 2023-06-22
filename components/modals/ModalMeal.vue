<template>
<div>

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
