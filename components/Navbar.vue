<template>
  <div class='nav-container'>
    <nav>
      <ul>
        <li><a class='logo'>
          <img src='/logo.jpg' alt=''>
        </a></li>

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
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'help'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-circle-question" />
          <span class='nav-item'>Potrzebujesz pomocy?</span>
        </router-link></li>
        <li class='dashboard-li'><router-link class="text-decoration-none" :to="{name: 'contact'}">
          <font-awesome-icon class='icon' icon="fa-solid fa-phone" />
          <span class='nav-item'>Kontakt</span>
        </router-link></li>
        <li @click='logout'  class='dashboard-li'><a class="text-decoration-none">
          <font-awesome-icon class='icon' icon="fa-solid fa-right-from-bracket" />
          <span class='nav-item'>Wyloguj się</span>
        </a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',

  methods: {
    async logout() {
      try {
        await this.$auth.logout('local');
        await this.$router.push({name: 'login'});
      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>

<style lang="sass">
@import "assets/nav.sass"
</style>
