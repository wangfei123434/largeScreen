<template>
  <div ref="dom"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts/core';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  LineChart,
  MapChart,
  EffectScatterChart,
  LinesChart,
  ScatterChart,
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  TooltipComponent,
  GeoComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型

export { echarts };

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  GeoComponent,
  BarChart,
  LineChart,
  MapChart,
  LinesChart,
  EffectScatterChart,
  ScatterChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);



// 接下来的使用就跟之前一样，初始化图表，设置配置项

export default defineComponent({
  props: {
    init: {
      type: Function,
      default: () => null
    },
  },
  setup(props, { emit }) {
    const { init } = props;
    const dom = ref<HTMLElement>();
    var myChart: echarts.ECharts;
    onMounted(() => {
      if(dom.value){
        myChart = echarts.init(dom.value);
        init(myChart)
      }
    });
    onUnmounted(() => {
      if(myChart){
        myChart.dispose();
      }
    })
    return {
      dom,
    }
  },
})
</script>
