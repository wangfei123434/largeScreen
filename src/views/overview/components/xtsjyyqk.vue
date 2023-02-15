<template>
  <div class="r1-box">
    <div class="title">数据归集效能(条)</div>
    <div class="echarts-box">
      <v-chart class="chart" :option="option" ref="chartRef" />
      <div class="bottom-bg"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import VChart from 'vue-echarts'
import {useEchartsRotation} from "/@/hooks";
import * as echarts from 'echarts/core'


export default defineComponent({
  components: {
    VChart
  },
  props: ['data'],
  setup(props) {
    console.log('props--系统数据应用情况', props.data)
    const state = reactive({
      rchartsData:[props.data.sdsjpt, props.data.provinceBigDataPlatform, props.data.gjythpt]
    })
    const option = ref({
      tooltip: {},
      // backgroundColor: '#0f375f',
      animation: true,
      grid: {
        top: '15%',
        left: '20%',
        right: '5%',
        bottom: '15%', //也可设置left和right设置距离来控制图表的大小
      },
      xAxis: {
        data: ['市大数据平台', '省大数据平台', '国家一体化平台'],
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle: {
            color: '#11417a'
          }
        },
        axisTick: {
          show: false //隐藏X轴刻度
        },
        axisLabel: {
          show: true,
          margin: 14,
          fontSize: 14,
          textStyle: {
            color: '#A3C0DF' //X轴文字颜色
          },
          nterval:0,  
          rotate:10
        }
      },
      yAxis: [
        {
          type: 'value',
          gridIndex: 0,
          // min: 0,//Y轴刻度最小值
          // max: 100,//Y轴刻度最大值
          // interval: 10,//Y轴刻度间隔值
          // splitNumber: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#113763',
              width: 1
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#11417a'
            }
          },
          axisLabel: {
            show: true,
            margin: 14,
            fontSize: 14,
            textStyle: {
              color: '#A3C0DF' //X轴文字颜色
            }
          }
        }
      ],
      series: [
        {
          // 值
          // name: '系统数据应用情况',
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(45,248,246,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,120,250,1)'
                }
              ])
            },
          },
          data: state.rchartsData,
          z: 10,
          zlevel: 2,
          symbolRepeat: 'fixed',
          label: {
            show: true,
            position: 'top',
            distance: 10,
            fontSize: 16,
            fontFamily: 'DIN',
            color: '#FFC64D',//柱子顶部文字颜色
            zlevel: 4,
            z: 10,
            formatter: '{c}'
          }
        },
        {
          // 值分隔
          type: 'pictorialBar',
          itemStyle: {
            normal: {
              color: '#0F375F'
            }
          },
          symbolRepeat: 'fixed',
          symbolMargin: 3,
          symbol: 'rect',
          symbolClip: true,
          symbolSize: [30, 3],
          symbolPosition: 'start',
          symbolOffset: [0, -1],
          // symbolBoundingData: this.total,
          data: state.rchartsData,
          width: 25,
          z: 0,
          zlevel: 3
        },
        {
          // 背景分隔
          type: 'pictorialBar',
          itemStyle: {
            normal: {
              color: '#0F375F'
            }
          },
          symbolRepeat: 'fixed',
          symbolMargin: 3,
          symbol: 'rect',
          symbolClip: true,
          symbolSize: [30, 3],
          symbolPosition: 'start',
          symbolOffset: [0, -1],
          // symbolBoundingData: this.total,
          data: [Math.max.apply(null, state.rchartsData), Math.max.apply(null, state.rchartsData), Math.max.apply(null, state.rchartsData)],//此处应该选Y轴的最大值
          width: 25,
          z: 0,
          zlevel: 1
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
.r1-box {
  .title {
    width: 442px;
    height: 49px;
    background: url('/images/overview/l1-title.png') no-repeat;
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 42px;
    margin: 0 auto;
    padding-left: 35px;
  }
  .echarts-box {
    width: 425px;
    height: 396px;
    background: rgba(0, 102, 255, 0.1);
    border-radius: 10px;
    position: relative;
    .bottom-bg{
      width: 100%;
      height: 8px;
      background: url('/images/overview/bottom-bg.png') no-repeat;
      background-size: contain;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
