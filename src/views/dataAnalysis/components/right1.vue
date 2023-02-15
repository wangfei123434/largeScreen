<template>
  <div class="r1-box">
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


export default defineComponent({
  components: {
    VChart
  },
  props:['value','data'],
  setup(props) {
    console.log('r1-props--value',props.value)
    console.log('r1-props--data',props.data)
    const state = reactive({
      echartsData:props.data
    })
    const option = ref({
      color: ['#00FFE4', '#0040df'],
      title: {
        // text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        // data: ['参保人员','未参保人员'],
        data: ['参保人员'],
        icon: 'color', //图例为方的
        itemWidth: 12, //图例宽度
        itemHeight: 12, //图例高度
        top: '5%', //图例上下居中
        left: '75%', //图例距离左的距离
        orient: 'vertical',  //垂直显示
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        left: '10%',
        right: '5%',
        bottom: '5%',
        top: '30%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: state.echartsData.map((item:any) => { return item.quarter }),
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#002c91'
          }
        },
        axisLabel: {
          fontSize: 14,
          margin: 14,
          textStyle: {
            color: '#A3C0DF' //X轴文字颜色
          },
          interval:0,  
          rotate:20
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#002c91'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#000'
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
          name: '参保人员',
          type: 'line',
          stack: 'Total',
          data: state.echartsData.map((item:any) => { return item.insuredNumber }),
        },
        // {
        //   name: '未参保人员',
        //   type: 'line',
        //   stack: 'Total',
        //   data: state.echartsData.map((item:any) => { return item.uninsuredNumber }),
        // },
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
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        console.log('r1---data',newVal)
        this.option.xAxis.data = newVal.map((item:any) => { return item.quarter })
        this.option.series[0].data = newVal.map((item:any) => { return item.insuredNumber })
        // this.option.series[1].data = newVal.map((item:any) => { return item.uninsuredNumber })
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.r1-box {
  margin-top: 30px;
  .title {
    width: 442px;
    height: 49px;
    background: url('/images/dataAnalysis/r1-t.png') no-repeat;
  }
  .echarts-box {
    width: 425px;
    height: 240px;
    margin: 0 auto;
    background: rgba(0, 102, 255, 0.1);
    border-radius: 10px;
  }
}
</style>
