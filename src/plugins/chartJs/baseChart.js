import {Chart, registerables} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);
Chart.register(zoomPlugin);
Chart.register(ChartDataLabels);

export function generateChart(chartId, chartType) {
  return {
    render(h) {
      return h(
        'div',{ style: this.styles }, [
          h(
            'canvas', {
              id: this.chartId,
              height: this.height,
              width: this.width,
              ref: 'canvas',
            },
          ),
        ],
      );
      /**
       *  jsx 버전 - eslint 에러 떠서 render function 사용함.
       *  jsx 사용하고 싶으면 eslint 옵션에서 jsx 에러 뜨는 부분 disable 처리하고 쓰세요~
       */
      // return (
      //   <div
      //     style={this.styles}
      //   >
      //     <canvas
      //       id={this.chartId}
      //       height={this.height}
      //       width={this.width}
      //       ref='canvas'
      //     />
      //   </div>
      // )
    },
    props: {
      chartId: {
        default: chartId,
        type: String,
      },
      height: {
        type: Number,
      },
      width: {
        type: Number,
      },
      styles: {
        type: Object,
        default: () => ({
          height: '100%',
        }),
      },
      // 차트 데이터
      data: {
        type: Object,
        default: null,
        required: true,
      },
      // 차트 옵션
      options: {
        type: Object,
        default: null,
        required: true,
      },
      // 등록할 추가 플러그인
      plugins: {
        type: Array,
        default() {
          return [];
        },
      },
    },

    data() {
      return {
        _chart: null,
        _plugins: this.plugins,
      };
    },
    watch: {
      data: {
        deep: true,
        handler(val) {
          this.updateChart({ data: val });
        },
      },
    },
    mounted() {
      this.renderChart(this.data, this.options);
    },
    beforeDestroy() {
      if (this.$data._chart) {
        this.$data._chart.destroy();
        this.$refs.canvas.removeEventListener('dblclick', this.resetZoom);
        this.$data._chart = null;
      }
    },
    methods: {
      updateChart({data = null, options = null}) {
        if (data) this.$data._chart.data = data;
        if (options) this.$data._chart.options = options;
        if (data || options) this.$data._chart.update();
      },
      addPlugin(plugin) {
        this.$data._plugins.push(plugin);
      },
      generateLegend() {
        if (this.$data._chart) {
          return this.$data._chart.el.generateLegend();
        }
      },
      resetZoom() {
        this.$data._chart.resetZoom();
      },
      // 차트 생성 부
      renderChart(data, options) {
        if (this.$data._chart) this.$data._chart.destroy();
        if (!this.$refs.canvas) throw new Error('Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components');
        this.$data._chart = new Chart(
          this.$refs.canvas.getContext('2d'), {
            type: chartType,
            data,
            options,
            plugins: this.$data._plugins,
          },
        );

        this.$data._chart.update();
        this.$refs.canvas.addEventListener('dblclick', this.resetZoom);
      },
    },
  };
}

/**
 * 기본 chart.js에서 등록 가능한 모차트 generateChart 함수를 통해 등록 가능.
 * wordcloud 차트와 같은 user library는 해당 문서 참고하여 추가할 것.
 */
const Bar = generateChart('bar-chart', 'bar');
const Doughnut = generateChart('doughnut-chart', 'doughnut');
const Line = generateChart('line-chart', 'line');
const Pie = generateChart('pie-chart', 'pie');

export { Bar, Doughnut, Line, Pie }

export default {
  Bar,
  Doughnut,
  Line,
  Pie,
};
