<template>
  <div class='recipes-container'>
    <div class='header-container'>
      <span><font-awesome-icon icon="fa-solid fa-utensils" /> Przepisy</span>
    </div>
    <div class='content-container'>
      <div @click='showRecipe(recipe.id)' v-for='recipe in recipes' :key='recipe.id' class='cards-container'>
        <div class='card-img'>
          <img v-if='recipe.photoUrl' :src='getImagePath(recipe.photoUrl)'>
        </div>
        <div class='card-name'>
          <span>{{ recipe.name }}</span>
        </div>
        <div class='add'>
          <b-button>+</b-button>
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
      }).catch(error => {
        console.log(error);
      })
    },
    showRecipe(id) {
      this.$router.push(`/recipe/${id}`);
      console.log(id)
    },
    getImagePath(imageName) {
      return require(`@/static/images/${imageName}`);
    }
  }
}
</script>

<style lang="sass">
@import "assets/recipe.sass"
</style>
