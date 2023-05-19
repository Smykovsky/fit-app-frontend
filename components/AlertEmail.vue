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
import alert from './Alert.vue'

export default {
  name: 'AlertEmail',
  computed: {
    alert() {
      return alert
    }
  },
  methods: {
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
@import "assets/alertEmail.sass"
</style>
