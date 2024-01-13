<template>
  <div class='login'>
    <div class='form-container'>
      <div class='title'>
        <h2>Logowanie</h2>
      </div>
      <AlertsAlert/>
      <form method='post' @submit.prevent='login'>
        <div class='text_field'>
          <input id='login' v-model='credentials.username' type='text' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-user" /> Nazwa użytkownika</label>
        </div>
        <div class='text_field'>
          <input id='password' v-model='credentials.password' type='password' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-lock" /> Hasło</label>
        </div>
        <div class='button-container'>
          <input type='submit' value='Zaloguj się'>
        </div>
        <div class='account'>
          <h3>Nie masz konta? <router-link :to="{name: 'register'}">Zarejestruj się!</router-link></h3>
        </div>
        <div class='account'>
          <h3>Zapomniałeś hasła? <router-link :to="{name: 'accountRecovery'}">Przypomnij</router-link></h3>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  middleware: 'auth',
  auth: 'guest',

  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {data: this.credentials});
        if (this.$auth.user != null) {

        } else console.log("error")
      } catch (error) {
        console.log(error)
        await this.$store.dispatch('store/addError', error.response.data.message)
      }
    },
    changeRoute() {
      this.$router.push({ path: "/register" });
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
