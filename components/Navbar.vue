<template>
  <div class='nav-container' v-bind:class="{active: $store.getters['store/getMenuIsActive']}">
    <nav>
      <ul>
        <li class='logo'>
          <div class='bar'>
            <font-awesome-icon icon="fa-solid fa-bars" v-on:click="store.commit('store/setMenuIsActive')" />
          </div>

          <span>{{username}}</span>
        </li>
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'dashboard'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-gauge" />
          <span class='nav-item'>Dashboard</span>
        </router-link></li>
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'diet'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-utensils" />
          <span class='nav-item'>Moje posiłki</span>
        </router-link></li>
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'shoppingList'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-list-check" />
          <span class='nav-item'>Lista zakupów</span>
        </router-link></li>
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'progress'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-weight-scale" />
          <span class='nav-item'>Mój progres</span>
        </router-link></li>
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'recipes'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-utensils" />
          <span class='nav-item'>Przepisy</span>
        </router-link></li>
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'contact'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-phone" />
          <span class='nav-item'>Kontakt</span>
        </router-link></li>
        <li class='dashboard-li' v-b-modal.modal-user><a class="text-decoration-none">
          <font-awesome-icon class='icon' icon="fa-solid fa-user" />
          <span v-if='isPersonalized == false' class='nav-item'>Personalizuj profil</span>
          <span v-else class='nav-item'>Edytuj profil</span>
        </a></li>
        <li class='dashboard-li' v-b-modal.modal-newPassword><a class="text-decoration-none">
          <font-awesome-icon class='icon' icon="fa-solid fa-key" />
          <span class='nav-item'>Zmień hasło</span>
        </a></li>
        <li @click='logout'  class='dashboard-li'><a class="text-decoration-none">
          <font-awesome-icon style='color: white' class='icon' icon="fa-solid fa-right-from-bracket" />
          <span class='nav-item'>Wyloguj się</span>
        </a></li>
        <li v-if='isAdmin' class='dashboard-li admin'><router-link class="text-decoration-none" :to="{name: 'admin'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-user" />
          <span class='nav-item'>Panel Administracyjny</span>
        </router-link></li>
      </ul>
    </nav>
    <ModalsModalPersonalize/>
    <ModalsModalChangePassword/>
  </div>

</template>

<script>

export default {
  name: 'Navbar',
  data() {
    return {
      isPersonalized: false,
      isAdmin: false,
      username: '',
      store: this.$store,
      isClassActive: false
    }
  },
  mounted() {
    this.checkAdminStatus(),
    this.isUserPersonalized();
    this.loadUsername()
  },
  created() {
    this.isUserPersonalized()
    this.checkAdminStatus()
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout('local');
        await this.$router.push({name: 'login'});
        await localStorage.removeItem("username")
      } catch (error) {
        console.log(error)
      }
    },
    checkAdminStatus() {
      const bool = this.$auth.user.roles.includes("admin");
      console.log(this.$auth.user.roles.includes("admin"))
      this.isAdmin = bool
      console.log(bool)
    },
    isUserPersonalized() {
      if (this.$auth.user.height == null || this.$auth.user.weight == null || this.$auth.user.age == null || this.$auth.user.gender == null) {
        this.isPersonalized = false
      } else {
        this.isPersonalized = true
      }
    },
    loadUsername() {
      this.username = localStorage.getItem("username")
    }
  }
}
</script>

<style lang="sass">
@import "assets/nav.sass"
</style>
