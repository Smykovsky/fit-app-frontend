<template>
  <div class='recipes-container'>
    <div class='header-container'>
      <span><font-awesome-icon icon="fa-solid fa-utensils" /> Przepisy</span>
      <div class='recipe-add'>
        <b-button class='btn btn-success' v-b-modal.modal-newRecipe>Nowy przepis</b-button>
      </div>
    </div>
    <input class='search' v-model='searchText' type="text" placeholder="Wyszukaj przepis...">
    <div class='content-container' ref='content'>
      <div v-if='!searchText' v-for='recipe in currentRecipes' :key='recipe.id' class='cards-container'>
        <div @click='showRecipe(recipe.id)' class='card-img'>
          <img v-if='recipe.photoUrl' :src='getImagePath(recipe.photoUrl)'>
        </div>
        <div class='card-name'>
          <span>{{ recipe.name }}</span>
        </div>
        <div class='add'>
          <font-awesome-icon @click='bindRecipe(recipe)' icon="fa-solid fa-plus" />
        </div>
      </div>

      <div v-if='searchText' v-for='recipe in filteredRecipes' :key='recipe.id' class='cards-container'>
        <div @click='showRecipe(recipe.id)' class='card-img'>
          <img v-if='recipe.photoUrl' :src='getImagePath(recipe.photoUrl)'>
          <img v-else src='/static/no-image.jpg'>
        </div>
        <div class='card-name'>
          <span>{{ recipe.name }}</span>
        </div>
        <div class='add'>
          <b-button>+</b-button>
        </div>
      </div>
      <div class='pagination'>
        <font-awesome-icon @click="previousPage" :disabled="currentPage === 1" icon="fa-solid fa-caret-left" />
        <span>{{ currentPage }}</span>
        <font-awesome-icon @click="nextPage" :disabled="currentPage === totalPages" icon="fa-solid fa-caret-right" />
      </div>
    </div>



    <ModalsModalNewRecipe/>

    <b-modal id="modal-addRecipeToMeal" hide-footer>
      <b-form>
        <b-form-group
          v-if='meals.length >= 1'
          label="Do którego posiłku chcesz dodać przepis?"
        >
          <b-form-select v-model='selected' @change='updateInput' value-field='id'>
            <b-form-select-option v-for='meal in meals' :key='meal.id' :value='meal.id'>{{ meal.name }}</b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group v-else>
          <span style='color: red'>Najpierw musisz stworzyć posiłek!</span>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-addRecipeToMeal')">Zamknij</b-button>
          <b-button @click='addRecipe' :disabled='meals.length <= 0' class='btn btn-success'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'recipe',
  data() {
    return {
      recipes: [],
      meals: [],
      recipesPerPage: 12,
      currentPage: 1,
      isAdmin: false,
      searchText: '',
      recipeToAdd: {
        mealId: 0,
        name: '',
        calories: '',
        carbohydrates: null,
        protein: null,
        fat: null
      },
      selected: null
    }
  },

  created() {
    this.loadRecipes(),
    this.loadMeals()
  },

  mounted() {
    this.loadRecipes(),
    this.loadMeals()
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
      const start = (this.currentPage - 1) * this.recipesPerPage;
      const end = start + this.recipesPerPage;
      return this.recipes.filter(recipe => recipe.name.toLocaleLowerCase().includes(text))
    }
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
    loadMeals() {
      this.$axios.get("/api/meal/get", {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.meals = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    async bindRecipe(recipe) {
      this.recipeToAdd.name = recipe.name
      this.recipeToAdd.calories = recipe.kcal
      this.recipeToAdd.carbohydrates = recipe.carbohydrates
      this.recipeToAdd.protein = recipe.protein
      this.recipeToAdd.fat = recipe.fat
      this.$bvModal.show("modal-addRecipeToMeal")
      console.log(this.recipeToAdd)
    },
    addRecipe() {
      this.$axios.post('/api/item/add', this.recipeToAdd, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$bvModal.hide("modal-addRecipeToMeal")
        this.$router.push('/diet')
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    updateInput() {
      this.recipeToAdd.mealId = this.selected
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
