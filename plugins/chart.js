import Vue from "vue";
import { Doughnut } from "vue-chartjs/legacy";
import { Pie } from 'vue-chartjs/legacy'
import { Bar } from 'vue-chartjs/legacy'
import ChartDataLabels from 'chartjs-plugin-datalabels';


import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, ArcElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  ChartDataLabels
);

Vue.component("doughnut-chart", {
  extends: Doughnut,
});

Vue.component("pie-chart", {
  extends: Pie,
});

Vue.component('bar-chart', {
  extends: Bar,
})
