<template>
  <div class='dashboard'>
    <div class='header-container'>
      <span>Dashboard</span>
    </div>

    <div class='card-container'>
      <div class='card card-weight'>
        <div class='logo'>
          <font-awesome-icon icon="fa-solid fa-house" />
        </div>
        <div class='content'>

        </div>
      </div>
      <div class='card card-goal'></div>
      <div class='card card-kcal'></div>
      <div class='card card-eaten'></div>
    </div>

  </div>
</template>


<!--<div class='chart'>-->
<!--<apexchart type="pie" width='100%' height='100%' :options="pieOptions" :series="pieData"></apexchart>-->
<!--</div>-->

<script>
export default {
  name: 'dashboard',
  data() {
    return {

      // pieData: [30, 50, 70],
      // pieOptions: {
      //   chart: {
      //     type: 'pie'
      //   },
      //   stroke: {
      //     curve: 'smooth'
      //   },
      //   labels: ['Białko', 'Węglowodany', 'Tłuszcze']
      // },
      //
      // radialBarData: [ 70],
      // radialBarOptions: {
      //   chart: {
      //     type: 'radialBar',
      //   },
      // }
    }
  },
}
</script>

<style lang="sass">
@import "assets/dashboard.sass"
</style>
