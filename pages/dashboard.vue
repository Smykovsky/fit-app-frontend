<template>
  <div class='dashboard'>
    <div class='header-container'>
      <span>Dashboard</span>
    </div>

    <div class='card-container'>
      <div class='card card-weight'>
        <div class='icon'>
          <font-awesome-icon icon="fa-solid fa-weight-hanging" />
        </div>
        <div class='content'>
          <span>Aktualna waga:</span>
          <div class='equal'>
            <span>90</span>
          </div>
        </div>
      </div>
      <div class='card card-goal'>
        <div class='icon'>
          <font-awesome-icon icon="fa-solid fa-check" />
        </div>
        <div class='content'>
          <span>Twój aktualny cel:</span>
          <div class='equal'>
            <span>Masa mięśniowa</span>
          </div>
        </div>
      </div>
      <div class='card card-kcal'>
        <div class='icon'>
          <font-awesome-icon icon="fa-solid fa-cookie" />
        </div>
        <div class='content'>
          <span>Wymagane kalorie: </span>
          <div class='equal'>
            <span>1000</span>
          </div>
        </div>
      </div>
      <div class='card card-eaten'>
        <div class='icon'>
          <font-awesome-icon icon="fa-solid fa-cookie-bite" />
        </div>
        <div class='content'>
          <span>Zjedzone kalorie:</span>
          <div class='equal'>
            <span>1000</span>
          </div>
        </div>
      </div>
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
