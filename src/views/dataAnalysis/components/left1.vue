<template>
  <div class="l1-box">
    <div class="title">
      <div>
        欠薪总报件数:
        <!-- <span>{{sumFun(yAxis1.map((item) => {
            return item.zs
          }))}}</span> -->
        <span>{{qxzbjs}}</span>
      </div>
      <div>
        当期有效报件数:
        <!-- <span>{{sumFun(yAxis2.map((item) => {
            return item.zs
          }))}}</span> -->
        <span>{{yxjs}}</span>
      </div>
    </div>
    <div class="echarts-box">
      <v-chart class="chart" :option="option" ref="chartRef" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import VChart from 'vue-echarts'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

import { useEchartsRotation } from '/@/hooks'
import * as echarts from 'echarts/core'

export default defineComponent({
  components: {
    VChart,
    Vue3SeamlessScroll
  },
  props: ['value', 'data'],
  setup(props) {
    console.log('l1', props.data)
    const state = reactive({
      // qxtotalData: props.data.list,
      yAxis1:props.data.list.filter((item:any) => {
        return item.lx == "欠薪报件数"
      }).slice(-7),
      yAxis2:props.data.list.filter((item:any) => {
        return item.lx == '有效件数'
      }).slice(-7),
      yxjs:props.data.yxjs,
      qxzbjs:props.data.qxzbjs
    })
    console.log("888888",state.yAxis1)
    console.log("999999",state.yAxis2)
   
    const sumFun = (arr:any) => {
      return eval(arr.join("+"));
    }

    const option = ref({
      color: ['#00FFE4', '#0040df'],
      title: {
        // text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['有效件数', '欠薪报件数'],
        icon: 'color', //图例为方的
        itemWidth: 30, //图例宽度
        itemHeight: 5, //图例高度
        top: '5%', //图例上下居中
        left: '30%', //图例距离左的距离
        orient: 'horizontal', //垂直显示
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
        data: state.yAxis2.map((item: any) => {
          return item.rksj.split(" ")[0]
        }),
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
          interval: 0,
          rotate: 35
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
          }
        }
      },
      series: [
        {
          name: '有效件数',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
            color:'white'
          },
          data: state.yAxis2.map((item: any) => {
            return item.zs
          })
        },
        {
          name: '欠薪报件数',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
            color:'white'
          },
          data: state.yAxis1.map((item: any) => {
            return item.zs
          })
        }
      ]
    })

    const chartRef = ref()
    //轮播高亮
    useEchartsRotation(chartRef)
    return {
      ...toRefs(state),
      Vue3SeamlessScroll,
      option,
      chartRef,
      sumFun
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        console.log("newval",newVal)
        this.yAxis1 = newVal.list.filter((item:any) => {
          return item.lx == "欠薪报件数"
        }).slice(-7)
        this.yAxis2 = newVal.list.filter((item:any) => {
          return item.lx == "有效件数"
        }).slice(-7)
        this.option.series[0].data = newVal.list.filter((item:any) => {
          return item.lx == "欠薪报件数"
        }).map((item:any) => {
          return item.zs
        }).slice(-7)
        this.option.series[1].data = newVal.list.filter((item:any) => {
          return item.lx == "有效件数"
        }).map((item:any) => {
          return item.zs
        }).slice(-7)
        this.option.xAxis.data = newVal.list.filter((item:any) => {
          return item.lx == "欠薪报件数"
        }).map((item:any) => {
          return item.rksj.split(" ")[0]
        }).slice(-7)
        this.yxjs = newVal.yxjs
        this.qxzbjs = newVal.qxzbjs
        useEchartsRotation(this.chartRef)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.l1-box {
  margin-top: 10px;
  .title {
    width: 442px;
    height: 40px;
    background: rgba(1, 94, 255, 0.2);
    border-radius: 6px;
    margin-bottom: 20px;
    color: #fff;
    display: flex;
    div {
      line-height: 40px;
      font-size: 16px;
      margin-left: 20px;
      span {
        padding-left: 10px;
        color: #009aff;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .echarts-box {
    width: 442px;
    height: 250px;
    background: rgba(0, 126, 255, 0.1);
    border-radius: 10px;
  }
}
</style>
