<template>
  <div class='recipes-container'>
    <div class='header-container'>
      <span><font-awesome-icon icon="fa-solid fa-utensils" /> Przepisy</span>
    </div>
    <div class='content-container' ref='content'>
      <div @click='showRecipe(recipe.id)' v-for='recipe in currentRecipes' :key='recipe.id' class='cards-container'>
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
    <div class='pagination'>
      <font-awesome-icon @click="previousPage" :disabled="currentPage === 1" icon="fa-solid fa-caret-left" />
      <span>{{ currentPage }}</span>
      <font-awesome-icon @click="nextPage" :disabled="currentPage === totalPages" icon="fa-solid fa-caret-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'recipe',
  data() {
    return {
      recipes: [],
      recipesPerPage: 12,
      currentPage: 1,
    }
  },

  created() {
    this.loadRecipes();
  },

  mounted() {
    this.loadRecipes();
  },

  computed: {
    totalPages() {
      return Math.ceil(this.recipes.length / this.recipesPerPage);
    },
    currentRecipes() {
      const start = (this.currentPage - 1) * this.recipesPerPage;
      const end = start + this.recipesPerPage;
      return this.recipes.slice(start, end);
    },
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
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scroll()
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scroll()
      }
    },
    scroll() {
      this.$refs.content.scrollTop = 0;
      window.scrollTo({
        top: 0,
        "behavior": "smooth"
      })
    }
  }
}
</script>

<style lang="sass">
@import "assets/recipe.sass"
</style>
