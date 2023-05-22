<template>
  <div class='dashboard-container'>
    <div class='header-container'>
      <span> <font-awesome-icon icon="fa-solid fa-gauge" /> Dashboard</span>
      <div class='personalize'>
        <span><font-awesome-icon v-b-modal.modal-user icon="fa-solid fa-user" /></span>
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
            <span>{{this.userDetails.weight}}</span>
          </div>
        </div>
      </div>
      <div class='card card-goal'>
        <div class='icon'>
          <font-awesome-icon icon="fa-solid fa-check" />
        </div>
        <div class='content'>
          <span>Aktualny cel:</span>
          <div class='equal'>
            <span>{{this.userDetails.goal}}</span>
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
            <span>{{this.userDetails.caloriesIntakeGoal}}</span>
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
            <span>{{this.userDetails.caloriesEaten}}</span>
          </div>
        </div>
      </div>
      <div class='card card-calendar'>
        <div class='icon'>
          <font-awesome-icon class='ikona' icon="fa-solid fa-calendar-days" />
        </div>
        <div class='content'>
          <span>Dzisiaj:</span>
          <div class='equal'>
            <span>{{this.userDetails.today}}</span>
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
  mounted() {
    this.loadStats()
  },

  created() {
    this.loadStats()
  },

  methods: {
    async loadStats() {
      this.$axios.get('/api/user/data', {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.userDetails = response.data;
        this.pieData = [response.data.proteins, response.data.carbohydrates, response.data.fats];
        this.radialBarData = [this.caloriesToPercent(response.data.caloriesIntakeGoal, response.data.caloriesEaten)];
        console.log(this.radialBarData)
        console.log(this.pieData)
        console.log(this.userDetails)
      }).catch(error => {
        console.log(error)
      })
    },

    caloriesToPercent(max, now) {
      return Math.round((now * 100) / max, 2);
    }
  },

  data() {
    return {
      max: 200,
      userDetails: [],
      pieData: [],
      pieOptions: {
        chart: {
          type: 'pie'
        },
        dataLabels: {
          formatter: function(value) {
            return Math.round(value, 2) + '%'
          }
        },
        stroke: {
          curve: 'smooth'
        },
        labels: ['Białko', 'Węglowodany', 'Tłuszcze'],
      },

      radialBarData: [],
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
              show: true,
              name: {
                color: '#888',
                fontSize: '20px'
              },
              value: {
                color: '#111',
                fontSize: '34px',
                show: true
              },
              total: {
                show: true,
                label: 'Zjedzone kalorie: ',
                fontSize: '25px',
              }
            }
          }
        },
      },
    }
  },
}
</script>

<style lang="sass">
@import "assets/dashboard.sass"
</style>
