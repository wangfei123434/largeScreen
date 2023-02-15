<template>
  <div class="l2-box">
    <div class="title"></div>
    <div class="echarts-box">
      <v-chart class="chart" :option="option" ref="chartRef" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import VChart from 'vue-echarts'
import {useEchartsRotation} from "/@/hooks";
import * as echarts from 'echarts/core'
import http from '/@/config/http'
import { number } from 'echarts';


export default defineComponent({
  components: {
    VChart
  },
  props: ['data'],
  setup(props) {
    console.log('props--接口对外共享', props.data)
    const state = reactive({
      xAxisData:props.data.map((item:any) => { return item.month + '月'}),
      echartsData:{
        seriesData1:props.data.map((item:any) => { return item.cityBigDataPlatform }),
        seriesData2:props.data.map((item:any) => { return item.wuhanOpenPlatform }),
        seriesData3:props.data.map((item:any) => { return item.otherChannels })
      },
    })

    const option = ref({
      color: ['#00FFE4', '#45C2FF', '#F0B945'],
      title: {
        // text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['市大数据能力平台', '武汉市开放平台', '其他渠道'],
        icon: 'color', //图例为方的
        itemWidth: 16, //图例宽度
        itemHeight: 4, //图例高度
        top: '5%', //图例上下居中
        left: '10%', //图例距离左的距离
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: state.xAxisData,
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#2B7BD6'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: 14,
          textStyle: {
            color: '#A3C0DF' //Y轴文字颜色
          },
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#2b7bd6'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#2B7BD6'
          }
        },
        axisLabel: {
          fontSize: 14,
          textStyle: {
            color: '#A3C0DF' //Y轴文字颜色
          },
        }
      },
      series: [
        {
          name: '市大数据能力平台',
          type: 'line',
          stack: 'Total',
          data: state.echartsData.seriesData1,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(14,81,251,0.2)'
              },
              {
                offset: 1,
                color: 'rgba(176,2,123,0.01)'
              }
            ])
          }
        },
        {
          name: '武汉市开放平台',
          type: 'line',
          stack: 'Total',
          data: state.echartsData.seriesData2,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(94,230,255,0.2)'
              },
              {
                offset: 1,
                color: 'rgba(69,194,255,0.4)'
              }
            ])
          }
        },
        {
          name: '其他渠道',
          type: 'line',
          stack: 'Total',
          data: state.echartsData.seriesData3,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(255,113,18,0.25)'
              },
              {
                offset: 1,
                color: 'rgba(255,255,255,0.5)'
              }
            ])
          }
        }
      ]
    })
 
    const chartRef = ref();
    //轮播高亮
    useEchartsRotation(chartRef);

    return {
      ...toRefs(state),
      option,
      chartRef
    }
  }
})
</script>
<style lang="scss" scoped>
.l2-box {
  margin-top: 30px;
  .title {
    width: 442px;
    height: 49px;
    background: url('/images/overview/l2-title.png') no-repeat;
  }
  .echarts-box {
    width: 425px;
    height: 396px;
    margin: 0 auto;
    background: rgba(0, 102, 255, 0.1);
    border-radius: 10px;
  }
}
</style>
