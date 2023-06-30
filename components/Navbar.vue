<template>
  <div class='nav-container'>
    <nav>
      <ul>
        <li><a class='logo'>
          <img src='/logo.jpg' alt=''>
        </a></li><hr>
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'dashboard'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-gauge" />
          <span class='nav-item'>Dashboard</span>
        </router-link></li>
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'diet'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-utensils" />
          <span class='nav-item'>Mój plan</span>
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
          <span class='nav-item'>Personalizuj profil</span>
        </a></li>
        <li class='dashboard-li' v-b-modal.modal-newPassword><a class="text-decoration-none">
          <font-awesome-icon class='icon' icon="fa-solid fa-key" />
          <span class='nav-item'>Zmień hasło</span>
        </a></li>
        <li @click='logout'  class='dashboard-li'><a class="text-decoration-none">
          <font-awesome-icon style='color: white' class='icon' icon="fa-solid fa-right-from-bracket" />
          <span class='nav-item'>Wyloguj się</span>
        </a></li>
        <li v-if='isAdmin' class='dashboard-li admin'><router-link class="text-decoration-none" :to="{name: 'adminBoard'}">
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
      isAdmin: false
    }
  },
  mounted() {
    this.checkAdminStatus()
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout('local');
        await this.$router.push({name: 'login'});
      } catch (error) {
        console.log(error)
      }
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
@import "assets/nav.sass"
</style>
