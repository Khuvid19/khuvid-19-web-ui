import Vue from 'vue';

import { Pie, Line, Bar, Doughnut } from './baseChart';

const registerComponent = function (name, baseChart) {
  Vue.component(name, {...baseChart});
};

registerComponent('BarChart', Bar);
registerComponent('DoughnutChart', Doughnut);
registerComponent('LineChart', Line);
registerComponent('PieChart', Pie);
