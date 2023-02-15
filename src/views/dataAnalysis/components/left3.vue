<template>
  <div class="l3-box">
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
const colors = ['#ddcf00', '#0012ff', '#0090ff']
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
      tabs: ['分科室案件数']
    })
    const tabsClick = (index: number) => {
      state.active = index
    }

    const option = ref({
      tooltip: {
        show: true,
        formatter: function (params: any) {
          return params.name + params.value
        }
      },
      legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 14,
        top: '30%', //图例上下居中
        left: '60%', //图例距离左的距离
         orient: 'vertical', //垂直显示
        formatter: function (name: any) {
          let str = ''
          for (let i = 0; i < option.value.series[0].data.length; i++) {
            if (option.value.series[0].data[i].name == name) {
              str = '{a|' + name + '} {b|' + option.value.series[0].data[i].value + '}'
            }
          }
          return str
        },
        textStyle: {
          color: '#fff',
          rich: {
            a: {
                padding: [0, 0, 0, 20]
            },
            b: {
              color: '#27BCFF',
              padding: [0, 0, 0, 20]
            }
          }
        },
      },
      series: [
        {
          type: 'funnel',
          color: colors,
          left: '0%',
          top: 60,
          bottom: 60,
          width: '60%',
          min: 0,
          max: 40,
          minSize: '0%',
          maxSize: '50%',
          sort: 'ascending',
          gap: 0,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: state.dqdbjzsData.map((item:any) => {
            return {
              value: item.zs,
              name: item.ks
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
            name: item.ks
          }
        })
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.l3-box {
  margin-top: 10px;
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
    width: 440px;
    height: 220px;
    margin: 0 auto;
    background: rgba(0, 102, 255, 0.1);
    border-radius: 10px;
  }
}
</style>
