<template>
  <div class='recipes-container'>
    <div class='header-container'>
      <span><font-awesome-icon icon="fa-solid fa-utensils" /> Przepisy</span>
    </div>
    <div class='content-container'>
      <div v-for='recipe in recipes' class='cards-container'>
        <div class='card-header'>
          <span>{{ recipe.name }}</span>
        </div>
        <div class='card-content'>
          <div class='description'>
            <span>{{ recipe.description }}</span>
          </div>
          <div class='instruction'>
            <span>{{ recipe.instruction }}</span>
          </div>

          <div class='macro'>
            <div class='count'>
              <span>Kcal</span>
              <span>{{ recipe.kcal }}</span>
            </div>
            <div class='count'>
              <span>Węglowodany</span>
              <span>{{ recipe.carbohydrates }}</span>
            </div>
            <div class='count'>
              <span>Białko</span>
              <span>{{ recipe.protein }}</span>
            </div>
            <div class='count'>
              <span>Tłuszcze</span>
              <span>{{ recipe.fat }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recipe',
  data() {
    return {
      recipes: [],
    }
  },

  created() {
    this.loadRecipes();
  },

  mounted() {
    this.loadRecipes();
  },

  methods: {
    loadRecipes() {
      this.$axios.get("/api/recipe/get", {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.recipes = response.data
        console.log(this.recipes)
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="sass">
@import "assets/recipe.sass"
</style>
