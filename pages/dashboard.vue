<template>
  <div class='dashboard'>
    <div class='kcal-container'>
      <div class='title'>
        <span>Licznik kalorii</span>
      </div>

      <div class='chart-container'>
        <doughnut-chart
          :chart-data="kcalChart"
          :chart-options='doughnutOptions'
          class='chart'
        />
      </div>
    </div>

    <div class='makro-container'>
      <div class='title'>
        <span>Licznik makroskładników</span>
      </div>
      <div class='chart-container'>
        <pie-chart
          :chart-data="makroChart"
          :chart-options='pieOptions'
          class='chart'
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      kcalChart: {
        datasets: [{
          label: 'kcal',
          backgroundColor: ["#5283ff", '#F0F0F0'],
          data: [35, 65],
          datalabels: {
            formatter: (value) => {
              return value + '%'
            },
            color: 'black',
            font: {
              size: 14,
            }
          }
        }],
      },
      makroChart: {
        labels: ['Węglowodany', 'Białka', 'Tłuszcze'],
        datasets: [{
          datalabels: {
            formatter: (value) => {
              return value + 'g'
            },
            font: {
              color: 'red',
              weight: 'bold',
              size: 14
            },
          },
          data: [45, 55, 48],
          backgroundColor: ['#4D9DE0', '#E15554', '#E0E04C'],
        }],
      },
      doughnutOptions: {
        responsive: true,
        offset: 8,
        spacing: 4,
        hoverOffset: 10,
        hoverBorderWidth: 1,
        maintainAspectRatio: true
      },
      pieOptions: {
        responsive: true,
        hoverOffset: 10,
        spacing: 2
      }
    }
  },
}
</script>

<style lang="sass">
@import "assets/dashboard.sass"
</style>
