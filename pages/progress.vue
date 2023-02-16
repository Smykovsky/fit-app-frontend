<template>
  <div class='progres-container'>
    <div class='title'>
      <span>Historia wagi</span>
      <div class='meal-add'>
        <b-button class='btn btn-success' v-b-modal.modal-progres>Nowa waga</b-button>
      </div>
    </div>

    <div class='container'>
        <bar-chart
          :chart-data='progressBar'
          :height='225'
          :chart-options='barOptions'
        />
    </div>

    <b-modal id="modal-progres" title="Wprowadź nową wagę" hide-footer>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Podaj nową wagę"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-progres')">Zamknij</b-button>
          <b-button class='btn btn-success'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
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
        plugins: {
          legend: {
            display: false
          }
        },
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
