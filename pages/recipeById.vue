<template>
  <div class='recipe-container'>
    <div class='recipe-card'>
      <div class='recipe-img'>
        <img v-if="recipe && recipe.photoUrl" :src='getImagePath(recipe.photoUrl)' alt="Opis obrazka">
        <div v-else>
          <font-awesome-icon v-b-modal.modal-file style='font-size: 50px' icon="fa-solid fa-image" />
          <span>Dodaj zdjęcie</span>
        </div>
      </div>
      <div class='recipe-data'>
        <div class='recipe-header'>
          <span v-if='recipe && recipe.name'>{{ recipe.name }}</span>
          <br>
          <font-awesome-icon v-b-modal.modal-recipeEdit v-if='isMod' style='font-size: 25px' icon="fa-solid fa-pen" />
          <font-awesome-icon v-if='isMod' @click='deleteRecipeById' style='font-size: 25px' icon="fa-solid fa-trash" />
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

    <ModalRecipeEdit :recipe='this.recipe'/>

    <b-modal id="modal-file" title="Wprowadź nową wagę" hide-footer>
      <b-form>
        <b-form-group
          label="Wybierz obraz, kóry chcesz dodać!"
        >
          <b-form-file
            v-model='file'
            required
          ></b-form-file>
        </b-form-group>
        <b-form-group
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-file')">Zamknij</b-button>
          <b-button class='btn btn-success' @click='addImage(id)'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>

  </div>
</template>

<script>
import ModalRecipeEdit from '@/components/modals/ModalRecipeEdit.vue'

export default {
  name: 'recipeById',
  components: { ModalRecipeEdit },
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
      file: null,
      formData: null,
      isMod: false
    }
  },
  created() {
    this.getRecipeById(this.id)
  },
  mounted() {
    this.checkModStatus()
  },
  methods: {
    getRecipeById(id) {
      this.$axios.get(`/api/recipe/get/${id}`, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.recipe = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    deleteRecipeById() {
      this.$axios.post('/api/recipe/delete', {id: this.id}, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$router.push("/recipes")
      }).catch(error => {

      })
    },
    addImage(id) {
      this.formData = new FormData()
      this.formData.append('photoUrl', this.file)
      this.$axios.post(`/api/recipe/image/${id}`, this.formData, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.recipe = response.data
        console.log(this.file)
        this.$bvModal.hide("modal-file")
        this.getRecipeById(id)
        location.reload()
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
    },
    getImagePath(imageName) {
      return require(`@/static/images/${imageName}`);
    },
    checkModStatus() {
      const userRoles = this.$auth.user.roles.map(item => item.name)
      const bool = userRoles.includes("mod")
      this.isMod = bool
    }
  }
}
</script>

<style lang="sass">
@import "assets/recipeById.sass"
</style>
