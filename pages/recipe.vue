<template>
  <div class='recipes-container'>
    <div class='header-container'>
      <span><font-awesome-icon icon="fa-solid fa-utensils" /> Przepisy</span>
      <div class='recipe-add'>
        <b-button v-if='isAdmin' class='btn btn-success' v-b-modal.modal-newRecipe>Nowy przepis</b-button>
      </div>
    </div>
    <input class='search' v-model='searchText' type="text" placeholder="Wyszukaj przepis...">
    <div class='content-container' ref='content'>
      <div v-if='filteredRecipes.length == 0' @click='showRecipe(recipe.id)' v-for='recipe in currentRecipes' :key='recipe.id' class='cards-container'>
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
      <div v-if='filteredRecipes' @click='showRecipe(recipe.id)' v-for='recipe in filteredRecipes' :key='recipe.id' class='cards-container'>
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
    <ModalsModalNewRecipe/>
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
      isAdmin: false,
      searchText: '',
    }
  },

  created() {
    this.loadRecipes();
  },

  mounted() {
    this.loadRecipes(),
    this.checkAdminStatus()
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
    filteredRecipes() {
      const text = this.searchText.toLocaleLowerCase().trim();
      return this.recipes.filter(recipe => recipe.name.toLocaleLowerCase().includes(text))
    }
  },

  methods: {
    loadRecipes() {
      this.$axios.get("/api/recipe/get", {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.recipes = response.data
        console.log(this.$store.getters['store/getIsAdmin'])
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
    },
    checkAdminStatus() {
      const userRoles = this.$auth.user.roles.map(item => item.name)
      const bool = userRoles.includes("admin")
      this.isAdmin = bool
    }
  }
}
</script>

<style lang="sass">
@import "assets/recipe.sass"
</style>
