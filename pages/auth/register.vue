<template>
  <div class='register'>
    <div class='form-container'>
      <div class='title'>
        <h2>Rejestracja</h2>
      </div>
      <form method='post'>
        <div class='text_field'>
          <input type='text' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-user" /> Nazwa użytkownika</label>
        </div>
        <div class='text_field'>
          <input type='text' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-envelope" /> E-mail</label>
        </div>
        <div class='text_field'>
          <input type='password' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-lock" /> Hasło</label>
        </div>
        <div class='text_field'>
          <input type='password' required>
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
  name: 'register'
}
</script>

<style lang="sass">
@import "assets/login.sass"
</style>

