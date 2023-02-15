<template>
  <div class='progres-container'>
    <div class='title'>
      <span>Historia wagi</span>
      <div class='meal-add'>
        <b-button class='btn btn-success' v-b-modal.modal-meal>Dodaj posiłek</b-button>
      </div>
    </div>

    <div class='container'>
        <bar-chart
          :chart-data='progressBar'
          :height='225'
          :chart-options='barOptions'
        />
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress',
  data() {
    return {
      progressBar: {
        labels: ['2023-01-01', '2023-01-07', '2023-01-14', '2023-01-21', '2023-01-28', '2023-02-04', '2023-02-011' ],
        datasets: [
          {
            datalabels: {
              formatter: (value) => {
                return value + ' kg'
              }
            },
            label: "Nowa waga",
            data: ['100', '97', '92', '95', '88', '90', '84' ],
            backgroundColor: 'lightblue'
          }
        ]
      },
      barOptions: {
        responsive: true,
        barThickness: 50,
        hoverOffset: 4,
        margin: 4
      }
    }
  },
}
</script>

<style lang="sass">
@import "assets/progress.sass"
</style>
