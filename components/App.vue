<template>
  <div class='app'>
    <Navbar/>
    <Main/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Main from '@/components/Main.vue'

export default {
  middleware: ['auth'],
  components: { Navbar, Main }
}
</script>

<style lang="sass">
@import "assets/app.sass"
</style>
