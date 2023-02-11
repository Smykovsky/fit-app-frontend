<template>
  <div class='app'>
    <Navbar/>
    <div class='routes-container'>
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  // middleware: ['auth'],
  components: { Navbar }
}
</script>

<style scoped>

</style>
