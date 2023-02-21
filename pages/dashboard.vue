<template>
  <div class='dashboard-container'>
    <div class='header-container'>
      <span>Dashboard</span>
      <div class='personalize'>
        <font-awesome-icon v-b-modal.modal-user icon="fa-solid fa-user" />
      </div>
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
            <span>887</span>
          </div>
        </div>
      </div>
      <div class='card card-calendar'>
        <div class='icon'>
          <font-awesome-icon class='ikona' icon="fa-solid fa-calendar-days" />
          <i class="fa-solid fa-user"></i>
        </div>
        <div class='content'>
          <span>Dzisiaj:</span>
          <div class='equal'>
            <span>20 luty 2023r</span>
          </div>
        </div>
      </div>
    </div>

    <div class='charts-container'>
      <div class='donut-container'>
        <div class='chart'>
          <apexchart type="radialBar" width='100%' height='100%' :options="radialBarOptions" :series="radialBarData"></apexchart>
        </div>
      </div>

      <div class='pie-container'>
        <div class='chart'>
          <apexchart type="pie" width='100%' height='100%' :options="pieOptions" :series="pieData"></apexchart>
        </div>
      </div>
    </div>

    <ModalPersonalize/>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data() {
    return {
      selectedGender: null,
      goal: null,

      pieData: [30, 50, 70],
      pieOptions: {
        chart: {
          type: 'pie'
        },
        dataLabels: {
          formatter: function(value) {
            return Math.round(value, 2) + 'g'
          }
        },
        stroke: {
          curve: 'smooth'
        },
        labels: ['Białko', 'Węglowodany', 'Tłuszcze'],

      },

      radialBarData: [70],
      radialBarOptions: {
        chart: {
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "80%"
            },
            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '20px'
              },
              value: {
                color: '#111',
                fontSize: '40px',
                show: true
              }
            }
          }
        },
        labels: ['Zjedzone kalorie: '],
      },
    }
  },
}
</script>

<style lang="sass">
@import "assets/dashboard.sass"
</style>
