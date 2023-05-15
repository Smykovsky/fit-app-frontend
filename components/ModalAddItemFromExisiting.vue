<template>
  <b-modal id="modal-addFromExisting" title='Dodawanie produktu z przepisu' hide-footer>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Wybierz przepis"
        label-for="input-1"
      >
        <b-form-select v-model='selected'  value-field='id' @change='updateInputs'>
          <b-form-select-option v-for='item in items' :value='item.id'>{{ item.name }}</b-form-select-option>
        </b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Ilość kalorii"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model='kcal'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Ilość węglowodanów"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model='carbohydrates'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Ilość białka"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model='protein'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Ilość tłuszczy"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model='fat'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id='input-group-2'
      >
        <b-button class='btn btn-danger' @click="$bvModal.hide('modal-addFromExisting')">Zamknij</b-button>
        <b-button class='btn btn-success' @click='addItem'>Dodaj</b-button>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalAddItemFromExisiting',
  data() {
    return {
      items: [],
      options: [],
      selected: null,
      name: '',
      description: '',
      instruction: '',
      kcal: null,
      carbohydrates: null,
      protein: null,
      fat: null
    }
  },

  mounted() {
    this.loadRecipes();
  },

  methods: {
    loadRecipes() {
      this.$axios.get("/api/recipe/get", {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.items = response.data
      }).catch(error => {
        console.log(error);
      })
    },
   updateInputs() {
     this.$axios.get(`/api/recipe/get/${this.selected}`, {
       headers: {Authorization: this.$auth.strategy.token.get()}
     }).then(response => {
       const item = response.data;
       this.name = item.name;
       this.kcal = item.kcal;
       this.carbohydrates = item.carbohydrates;
       this.protein = item.protein;
       this.fat = item.fat;
       console.log(this.credentials)
     });
   },
    async addItem() {
      this.$axios.post('api/item/add', this.credentials, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.modalItemAdd = false
        this.credentials = {};
        this.loadMeals()
      }).catch(error => {
        console.log(error.response.data)
      })
    },
  }
}
</script>

<style scoped>

</style>
