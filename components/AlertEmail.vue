<template>
  <div class='emailAlert-container'>
    <div class='emailAlert' v-for="alert in $store.getters['store/getAlerts']" data-aos='flip-left' data-aos-delay='300'>
      <span>{{ alert }}</span>
    </div >

    <div class='emailError' v-for="alert in $store.getters['store/getErrors']" data-aos='flip-left' data-aos-delay='300'>
      <span>{{ alert }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AlertEmail'
}
</script>

<style lang="sass">
@import "assets/alertEmail.sass"
</style>
