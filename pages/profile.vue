<template>
  <div class='profile'>
    <div class='profile-container'>
      <div class='title profile-header'>
        <span>Profil użytkownika</span>
      </div>
      <div class='profile-body'>
        <div class='user-data'>
          <div class='data'>
            <span class='data-item'>Nazwa użytkownika: </span>
            <span class='data-item'>E-mail: </span>
            <span class='data-item'>Wiek: </span>
          </div>
        </div>
        <div class='user-details'>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile'
}
</script>

<style lang="sass">
@import "assets/profile.sass"
</style>
