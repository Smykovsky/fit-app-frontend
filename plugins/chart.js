import Vue from "vue";
import { Doughnut } from "vue-chartjs/legacy";
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
);

Vue.component("doughnut-chart", {
  extends: Doughnut,
});
