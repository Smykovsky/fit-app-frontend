<template>
  <div class='app'>
    <div class='content'>
      <Navbar/>
      <Main/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footbar from '@/components/Footbar.vue'
import Main from '@/components/Main.vue'

export default {
  middleware: ['auth'],
  components: { Navbar, Footbar, Main }
}
</script>

<style lang="sass">
@import "assets/app.sass"
</style>
