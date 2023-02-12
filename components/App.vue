<template>
  <div class='app'>
    <Navbar/>
    <div class='routes-container'>
      <nuxt/>
    </div>
    <Footbar/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footbar from '@/components/Footbar.vue'

export default {
  // middleware: ['auth'],
  components: { Navbar, Footbar }
}
</script>

<style lang="sass">
@import "assets/app.sass"
</style>
