<template>
  <div class="r6-box">
    <div class="title">
      <div
        :class="active == index ? 't-active' : ''"
        v-for="(item, index) in tabs"
        :key="index"
        @click="tabsClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="content">
      <div class="echarts-box">
        <v-chart class="chart" :option="option" ref="chartRef" />
      </div>
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
    console.log('r6data', props.data)
    const state = reactive({
      btszdData: props.data,
      active: 0,
      tabs: ['报件重点人群', '报件重点行业', '高频关键字'],
      listX: props.data[0].map((item: any) => {
        return item.rqlx
      }),
      colorList: ['#39B3FF', '#47E0E0', '#7891D9', '#83D978', '#C7A530'],
      defaultData: [],
      option: {},
      aaa:"tabs1"
    })
    const tabsClick = (index: number) => {
      state.active = index
      // if (index == 0) {
      //   state.btszdData = state.btszdData[0].map((item: any) => {
      //     return item.bjs
      //   })
      //   state.listX = state.btszdData[0].map((item: any) => {
      //     return item.rqlx
      //   })
      // } else if (index == 1) {
      //   state.btszdData = state.btszdData[1].map((item: any) => {
      //     return item.bjs
      //   })
      //   state.listX = state.btszdData[1].map((item: any) => {
      //     return item.hymc
      //   })
      // } else {
      //   state.btszdData = state.btszdData[2].map((item: any) => {
      //     return item.xh
      //   })
      //   state.listX = state.btszdData[2].map((item: any) => {
      //     return item.gpgjc
      //   })
      // }
      initEcharts(index)
    }

    // const option = ref(null)
    const initEcharts = (index:number) => {
      state.option = {
        legend: {
          data: [],
          icon: 'circle',
          bottom: 10,
          textStyle: {
            color: '#ffffff'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params: any) {
            return (
              params[0].name +
              '<br/>' +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              // params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' <br/>'
              params[0].seriesName +
              ' : ' +
              params[0].value
            )
          }
        },
        backgroundColor: 'rgba(1, 154, 255, 0.1)',
        xAxis: {
          type: 'value',
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: true
            },
            data: state.btszdData[index].map((item:any) => {
              return item.hymc
            })
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '12'
              },
              formatter: function (value: any) {
                //   return value + ' %'
                return value
              }
            },
            data: state.btszdData[index].map((item:any) => {
              return item.bjs
            })
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: (params: any) => {
                  return state.colorList[params.dataIndex]
                }
              }
            },
            barWidth: 20,
            data: state.btszdData[index].map((item:any) => {
              return item.bjs
            })
          }
        ]
      }
    }
    initEcharts(0)
    const chartRef = ref()
    //轮播高亮
    useEchartsRotation(chartRef)
    return {
      ...toRefs(state),
      Vue3SeamlessScroll,
      tabsClick,
      // option,
      chartRef,
      initEcharts
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        this.btszdData = newVal
        this.initEcharts(this.active)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.r6-box {
  margin-top: 20px;
  .title {
    width: 442px;
    height: 49px;
    background: url('/images/dataAnalysis/t-bg.png') no-repeat;
    display: flex;
    padding-left: 50px;
    div {
      height: 40px;
      line-height: 35px;
      cursor: pointer;
      margin-right: 12px;
      font-size: 20px;
      font-weight: bold;
    }
    .t-active {
      color: #019aff;
      border-bottom: 2px solid #019aff;
    }
  }
  .content {
    .echarts-box {
      width: 442px;
      height: 300px;
      background: rgba(0, 126, 255, 0.1);
      border-radius: 10px;
    }
  }
}
</style>
