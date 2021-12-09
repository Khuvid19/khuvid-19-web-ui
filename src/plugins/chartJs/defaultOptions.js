const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {},
  plugins: {},
};

const defaultPlugins = {
  legend: {
    display: false,
  },
  title: {
    display: true,
  },
  tooltip: {
    enabled: true,
  },
  /* 상시 표시 dataLabel 옵션 - chartjs datalabel library */
  datalabels: {
    display: false,
  },
  /* 줌 활성화 여부 - chartjs zoom library */
  // zoom: {
  //   zoom: {
  //     drag: {
  //       enabled: true,
  //     },
  //     mode: 'x',
  //   },
  //   pan: {
  //     enabled: true,
  //     mode: 'x',
  //     modifierKey: 'alt',
  //   },
  // },
};

export default {
  ...defaultOptions,
  plugins: { ...defaultPlugins },
};

export { defaultPlugins, defaultOptions };
