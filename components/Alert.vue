<template>
  <div class='alerts-container'>
    <div class='alerts' v-for="alert in $store.getters['store/getAlerts']" data-aos='flip-left' data-aos-delay='300'>
      <div class='icon'>
        <img src='../static/icon-ok.png'>
      </div>
      <div class="closeMessage" @click="removeAlert(alert)">
        <font-awesome-icon icon="fa-solid fa-x"/>
      </div>
      <div class='message'>
        <div class='title'>Udało się!</div>
        <span>{{alert}}</span>
      </div>
    </div>

    <div class='errors' v-for="alert in $store.getters['store/getErrors']" data-aos='flip-left' data-aos-delay='300'>
      <div class='icon'>
        <img src='../static/icon-fail.png'>
      </div>
      <div class="closeMessage" @click="removeError(alert)">
        <font-awesome-icon icon="fa-solid fa-x"/>
      </div>
      <div class='message'>
        <div class='title'>Błąd</div>
        <span>{{alert}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
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
@import "assets/alert.sass"
</style>
