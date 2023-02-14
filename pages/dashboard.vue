<template>
  <div class='dashboard'>
    <div class='kcal-container'>
      <div class='title'>
        <span>Licznik kalorii</span>
      </div>

      <div class='chart-container'>
        <doughnut-chart
          :chart-data="kcalChart"
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
          id="my-chart-id"
          :chart-data="makroChart"
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
            display: true,
            backgroundColor: '#ccc',
            borderRadius: 50,
            font: {
              color: 'red',
              weight: 'bold',
              size: 14
            },
          },
          data: [45, 55, 48],
          backgroundColor: ['#4D9DE0', '#E15554', '#E0E04C'],
        }],
      }
    }
  },
}
</script>

<style lang="sass">
@import "assets/dashboard.sass"
</style>
