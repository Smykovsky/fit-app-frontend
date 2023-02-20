<template>
  <div class='progres'>
    <div class='progres-container'>
      <div class='title-container'>
        <span>Historia wagi</span>
        <div class='meal-add'>
          <b-button class='btn btn-success' v-b-modal.modal-progres>Nowa waga</b-button>
        </div>
      </div>

      <div class='chart-container'>
        <div class='chart'>
          <apexchart width="100%" height="100%" type="line" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
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
      series : [{
        name: 'Progres',
        data: [10, 40, 50, 60, 100, 120]
      }],
      chartOptions: {
        chart: {
          type: 'line',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['2023-01-01', '2023-01-15', '2023-02-01', '2023-02-06', '2023-02-14', '2023-02-20']
        }
      }
    }
  },
}
</script>

<style lang="sass">
@import "assets/progress.sass"
</style>
