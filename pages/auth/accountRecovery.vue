<template>
  <div class='register'>
    <AlertsAlert/>

    <div class='form-container'>
      <div class='title'>
        <h2>Przywracanie konta</h2>
      </div>
      <form method='post' @submit.prevent='recovery'>
        <div class='text_field'>
          <input id='username' v-model='credentials.username' type='text' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-user" /> Nazwa użytkownika</label>
        </div>
        <div class='text_field'>
          <input id='email' v-model='credentials.email' type='email' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-envelope" /> E-mail</label>
        </div>
        <div class='button-container'>
          <input type='submit' value='Wyślij'>
        </div>
        <div class='account'>
          <h3>Wróć do logowania <router-link :to="{name: 'login'}">Zaloguj się!</router-link></h3>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accountRecovery',
  data() {
    return {
      credentials: {
        username: '',
        email: ''
      }
    }
  },
  methods: {
    async recovery() {
      try {
        await this.$axios.post('/auth/passwordRecovery', this.credentials);
        await this.$router.push({name: 'login'})
        await this.$store.dispatch('store/addAlert', 'Email z hasłem tymczasowym został wysłany na wskazany adres!')
      } catch (error) {
        await this.$store.dispatch('store/addError', 'Błąd!')
        console.log(error)
      }
    },
    removeAlert(payload) {
      this.$store.dispatch('store/removeAlert', payload);
    },
    removeError(payload) {
      this.$store.dispatch('store/removeError', payload);
    },
  }
}
</script>

<style lang="sass">
@import "assets/login.sass"
</style>
