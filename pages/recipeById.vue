<template>
  <div class='recipe-container'>
    <div class='recipe-card'>
      <div class='recipe-img'>
        <img v-if="recipe && recipe.photoUrl" :src='recipe.photoUrl' alt="Opis obrazka">
      </div>
      <div class='recipe-data'>
        <div class='recipe-header'>
          <span v-if='recipe && recipe.name'>{{ recipe.name }}</span>
        </div>
        <div class='recipe-info'>
          <div class='recipe-menu'>
            <nav>
              <ul>
                <li :class="{'active': isActiveTab === 'tab1'}" @click="menuDescription" >Opis przepisu</li>
                <li :class="{'active': isActiveTab === 'tab2'}" @click="menuInstruction" >Instrukcja</li>
                <li :class="{'active': isActiveTab === 'tab3'}" @click="menuMacro" >Makro składniki</li>
              </ul>
            </nav>
            <div v-if='description'  class='menu-description'>
              <span v-if='recipe'>{{ recipe.description }}</span>
            </div>
            <div v-if='instruction' class='menu-instruction'>
              <span v-if='recipe'>{{ recipe.instruction }}</span>
            </div>
            <div v-if='macro' class='menu-macro'>
              <ul>
                <li>Kalorie:  {{ recipe.kcal }}</li>
                <li>Węglowodany: {{ recipe.carbohydrates }}</li>
                <li>Białko: {{ recipe.protein }}</li>
                <li>Tłuszcz: {{ recipe.fat }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      isActiveTab: 'tab1',
      recipe: null,
      description: true,
      instruction: false,
      macro: false,
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
    },

    menuDescription() {
      this.instruction = false
      this.macro = false
      this.description = true
      this.isActiveTab = "tab1"

    },
    menuInstruction() {
      this.description = false
      this.macro = false
      this.instruction = true
      this.isActiveTab = "tab2"
    },
    menuMacro() {
      this.description = false
      this.instruction = false
      this.macro = true
      this.isActiveTab = "tab3"
    }
  }
}
</script>

<style lang="sass">
@import "assets/recipeById.sass"
</style>
