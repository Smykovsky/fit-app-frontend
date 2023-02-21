<template>
  <div class='register'>
    <div class='form-container'>
      <div class='title'>
        <h2>Rejestracja</h2>
      </div>
      <form method='post' @submit.prevent='register'>
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
        <div class='text_field'>
          <input id='password' v-model='credentials.password' type='password' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-lock" /> Hasło</label>
        </div>
        <div class='text_field'>
          <input id='password_confirmed' v-model='credentials.password_confirmed' type='password' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-lock" /> Powtórz hasło</label>
        </div>
        <div class='button-container'>
          <input type='submit' value='Zarejestruj się'>
        </div>
        <div class='account'>
          <h3>Masz już konto? <router-link :to="{name: 'login'}">Zaloguj się!</router-link></h3>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  middleware: 'auth',
  auth: 'guest',

  data() {
    return {
      credentials: {
        email: null,
        username: null,
        password: null,
        password_confirmed: null
      }
    }
  },

  methods: {
    async register() {
      try {
        await this.$axios.post('/auth/register', this.credentials);
        await this.$router.push({name: 'login'})
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

