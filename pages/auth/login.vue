<template>
  <div class='login'>
    <div class='form-container'>
      <div class='title'>
        <h2>Logowanie</h2>
      </div>
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
        await this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="sass">
  @import "assets/login.sass"
</style>
