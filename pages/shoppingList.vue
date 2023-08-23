<template>
  <div class='list-container'>
    <div class='list-header'>
      <span> <font-awesome-icon icon="fa-solid fa-list-check" /> Lista zakupów</span>
    </div>
    <div class='list-content'>
      <div class='list-actions'>
        <b-button @click='$bvModal.show("modal-shoppingItem")' class='btn btn-success'>+</b-button>
        <b-button @click='$bvModal.show("modal-confirmation")' class='btn btn-danger'>Wyczyść listę</b-button>
      </div>
      <div class='list' v-if='sortedList' v-for='item in sortedList' :key='item.id'>
        <div class='list-item' v-bind:class="{active: item.status === 'CHECKED'}" data-aos='fade-up' data-aos-delay='1' data-aos-anchor-placement="bottom-bottom">
          <font-awesome-icon @click="changeStatus(item.id)" v-if='item.status === "UNCHECKED"' icon="fa-solid fa-square" />
          <font-awesome-icon @click="changeStatus(item.id)" v-else icon="fa-solid fa-square-check" />
          <span>{{ item.name }}</span>
          <span class='item-action'><font-awesome-icon @click='deleteItem(item.id)' icon="fa-solid fa-trash" /></span>
        </div>
      </div>
    </div>

    <b-modal id="modal-shoppingItem" title="Dodaj produkt" hide-footer>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Podaj nazwę jedzenia"
          label-for="input-1"
          description="Produkt zostanie dodany do listy zakupów"
        >
          <b-form-input
            id="input-1"
            type="text"
            v-model='newItem.name'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-shoppingItem')">Zamknij</b-button>
          <b-button @click='addItem' class='btn btn-success'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id='modal-confirmation' hide-header hide-footer>
      <span class='d-flex justify-content-center'>Czy napewno chcesz wyczyścić listę zakupów?</span>
      <div class='d-flex justify-content-center'>
        <b-button class='btn btn-danger m-1' @click="$bvModal.hide('modal-confirmation')">Anuluj</b-button>
        <b-button @click='clearList' class='btn btn-success m-1'>Wyczyść</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "shoppingList",
  data() {
    return {
      shoppingList: [],
      newItem: {
        name: ''
      }
    }
  },
  mounted() {
    this.loadList()
  },
  created() {
    this.loadList()
  },
  computed: {
    sortedList() {
      return this.shoppingList.sort((a, b) => {
        if (a.status === 'CHECKED' && b.status === 'UNCHECKED') {
          return -1;
        } else if (a.status === 'UNCHECKED' && b.status === 'CHECKED') {
          return 1;
        } else {
          return 0;
        }
      });
    }
  },
  methods: {
    loadList() {
      this.$axios.get("/api/shoppingItem/get", {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.shoppingList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    changeStatus(id) {
      this.$axios.post(`/api/shoppingItem/set/status/${id}`, {},{
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.loadList()
      }).catch(error => {

      })
    },
    addItem() {
      this.$axios.post("/api/shoppingItem/add", this.newItem, {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$bvModal.hide("modal-shoppingItem")
        this.newItem.name = ''
        this.loadList()
      }).catch(error => {

      })
    },
    deleteItem(id) {
      this.$axios.post(`/api/shoppingItem/delete/${id}`, {}, {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.loadList()
      }).catch(error => {

      })
    },
    clearList() {
      this.$axios.post("/api/shoppingItem/delete/all", {}, {
        headers: { Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.loadList()
        this.$bvModal.hide("modal-confirmation")
      }).catch(error => {

      })
    }
  }

}
</script>

<style lang="sass">
@import "assets/shoppingList.sass"
</style>
