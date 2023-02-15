<template>
  <div class="l2-box">
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
    console.log('r5', props.data)
    const state = reactive({
      dqdbjzsData: props.data,
      active: 0,
      tabs: ['多渠道报件总数']
    })
    const tabsClick = (index: number) => {
      state.active = index
    }

    const option = ref({
      animation: true,
      color: ['#00FFFF', '#355DFF', '#FFFFFF', '#FFD500', '#27BCFF'],
      tooltip: {
        show: true,
        formatter: function (params: any) {
          return params.name + params.value
        }
      },
      grid: {
        left: '5%',
        right: '10%',
        bottom: '5%',
        top: '30%',
        containLabel: true
      },
      legend: {
        itemWidth: 10, //图例宽度
        itemHeight: 10, //图例高度
        top: '25%', //图例上下居中
        left: '53%', //图例距离左的距离
        orient: 'vertical', //垂直显示
        textStyle: {
          color: '#fff',
          rich: {
            a: {},
            b: {
              color: '#27BCFF',
              padding: [0, 0, 0, 20]
            }
          }
        },
        formatter: function (name: any) {
          let str = ''
          for (let i = 0; i < option.value.series[0].data.length; i++) {
            if (option.value.series[0].data[i].name == name) {
              str = '{a|' + name + '} {b|' + option.value.series[0].data[i].value + '}'
            }
          }
          return str
        },
        rich: {
          a: {
            color: '#27BCFF',
            fontSize: '30px',
            padding: [50, 10, 10, 10]
          },
          b: {
            fontSize: '15px',
            color: '#fff'
          }
        }
      },
      series: [
        {
          type: 'pie',
          center: ['25%', '50%'],
          radius: ['80%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            // borderColor: '#fff',
            borderWidth: 50
          },
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
              formatter: (params: any) => {
                return '{a|' + params.value + '}\n{b|' + params.name + '}'
              },
              rich: {
                a: {
                  color: '#27BCFF',
                  fontSize: '30px',
                  padding: [10, 10, 10, 10]
                },
                b: {
                  fontSize: '15px',
                  color: '#fff'
                }
              }
            }
          },
          data: state.dqdbjzsData.map((item: any) => {
            return {
              value: item.zs,
              name: item.sjly
            }
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
      tabsClick,
      option,
      chartRef
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        this.option.series[0].data = newVal.map((item: any) => {
          return {
            value: item.zs,
            name: item.sjly
          }
        })
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.l2-box {
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
      margin-right: 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .t-active {
      color: #019aff;
      border-bottom: 2px solid #019aff;
    }
  }
  .echarts-box {
    width: 430px;
    height: 240px;
    margin: 0 auto;
    background: rgba(0, 102, 255, 0.1);
    border-radius: 10px;
  }
}
</style>
