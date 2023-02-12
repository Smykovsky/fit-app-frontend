<template>
  <div class='login'>
    <div class='form-container'>
      <div class='title'>
        <h2>Logowanie</h2>
      </div>
      <form method='post'>
        <div class='text_field'>
          <input type='text' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-user" /> Nazwa użytkownika</label>
        </div>
        <div class='text_field'>
          <input type='password' required>
          <span></span>
          <label><font-awesome-icon icon="fa-solid fa-lock" /> Hasło</label>
        </div>
        <div class='btn'>
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
  auth: 'guest'
}
</script>

<style lang="sass">
  @import "assets/login.sass"
</style>
