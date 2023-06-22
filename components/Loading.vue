<template>
  <div class="loading" v-if='loading'>
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  beforeCreate() {
    this.loading = true;
  },
  mounted() {
    this.loading = false;
  },
  data: () => ({
    loading: true
  }),
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid lightblue;
  border-top-color: dodgerblue;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
