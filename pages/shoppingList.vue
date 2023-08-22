<template>
  <div class='list-container'>
    <div class='list-header'>
      <span> <font-awesome-icon icon="fa-solid fa-list-check" /> Lista zakupów</span>
    </div>
    <div class='list-content'>
      <div v-for='item in shoppingList'>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shoppingList",
  data() {
    return {
      shoppingList: [],
    }
  },
  mounted() {
    this.loadList()
  },
  created() {
    this.loadList()
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
    }
  }
}
</script>

<style lang="sass">
@import "assets/shoppingList.sass"
</style>
