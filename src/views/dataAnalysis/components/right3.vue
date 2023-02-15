<template>
  <div class="r3-box">
    <div class="title"></div>
    <div class="echarts-box">
      <v-chart class="chart" :option="option" ref="chartRef" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import VChart from 'vue-echarts'
import { useEchartsRotation } from '/@/hooks'
import * as echarts from 'echarts/core'

const colorList = ['#39B3FF', '#47E0E0', '#7891D9', '#83D978', '#C7A530', '#FF8439']

let colorList2 = ['#27beff', '#ffd500', '#355dff', '#00ffff', '#8956FF']
let fontSizeList = [40, 30, 25, 20]
let canDraggable = false

export default defineComponent({
  components: {
    VChart
  },
  props: ['value', 'data'],
  setup(props) {
    console.log('r3-props--value', props.value)
    console.log('r3-props--data', props.data)
    const state = reactive({
      echartsData: [
        props.data.otherProvince,
        props.data.selfEmployed,
        props.data.notEmployed,
        props.data.haveCommercialInsurance,
        props.data.otherReason
      ],
      // 词云
      echartsData2: [
        {
          name: '个体户',
          value: props.data.selfEmployed
        },
        {
          name: '未就业',
          value: props.data.notEmployed
        },
        {
          name: '有商业保险',
          value: props.data.haveCommercialInsurance
        },
        {
          name: '其他原因',
          value: props.data.otherReason
        }
      ]
    })

    // 词云

    // 处理数组 设置字体大小
    const compare = (property: string, desc: boolean) => {
      return (a: any, b: any) => {
        var value1 = a[property]
        var value2 = b[property]
        if (desc == true) {
          // 升序排列
          return value1 - value2
        } else {
          // 降序排列
          return value2 - value1
        }
      }
    }

    const option = {
      backgroundColor: '#010e21',
      color: ['#27beff', '#ffd500', '#355dff', '#00ffff', '#8956FF'],
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          return params.name + ':' + ' ' + params.value
        }
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          zlevel: 1,
          force: {
            repulsion: 200,
            edgeLength: 10
          },
          label: {
            show: true,
            color: 'auto',
            fontSize: 14
          },
          data: state.echartsData2.sort(compare('value', false)).map((item: any, index: number) => {
            return {
              ...item,
              draggable: canDraggable,
              label: {
                color: colorList2[index],
                fontSize: fontSizeList[index]
              }
            }
          })
        }
      ]
    }

    // const option = ref({
    //   legend: {
    //     icon: 'circle',
    //     bottom: 10,
    //     textStyle: {
    //       color: '#ffffff'
    //     }
    //   },
    //   grid: {
    //     left: '5%',
    //     right: '5%',
    //     bottom: '5%',
    //     top: '10%',
    //     containLabel: true
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'shadow'
    //     },
    //     formatter: function (params: any) {
    //       return (
    //         params[0].name +
    //         '<br/>' +
    //         "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
    //         // params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' <br/>'
    //         params[0].seriesName +
    //         ' : ' +
    //         params[0].value
    //       )
    //     }
    //   },
    //   xAxis: {
    //     type: 'value',
    //     axisLine: {
    //       show: true
    //     },
    //     splitLine: {
    //       show: true,
    //       lineStyle: {
    //         color: '#002c91'
    //       }
    //     },
    //     axisTick: {
    //       show: false
    //     },
    //   },
    //   yAxis: [
    //     {
    //       type: 'category',
    //       inverse: true,
    //       axisLabel: {
    //         show: true,
    //         textStyle: {
    //           color: '#fff'
    //         }
    //       },
    //       splitLine: {
    //         show: false
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       axisLine: {
    //         show: true
    //       },
    //       data: ['外省市参保', '个体户', '未就业', '有商业保险', '其他个人原因']
    //     },
    //     {
    //       type: 'category',
    //       inverse: true,
    //       axisTick: 'none',
    //       axisLine: 'none',
    //       show: true,
    //       axisLabel: {
    //         textStyle: {
    //           color: '#ffffff',
    //           fontSize: '12'
    //         },
    //         formatter: function (value: any) {
    //           return ' '
    //         }
    //       },
    //       data: state.echartsData
    //     }
    //   ],
    //   series: [
    //     {
    //       name: '',
    //       type: 'bar',
    //       zlevel: 1,
    //       itemStyle: {
    //         normal: {
    //           barBorderRadius: 0,
    //           color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    //             {
    //               offset: 0,
    //               color: 'rgb(0,105,200,1)'
    //             },
    //             {
    //               offset: 1,
    //               color: 'rgb(0,105,200,.1)'
    //             }
    //           ])
    //           // color: (params: any) => {
    //           //   return colorList[params.dataIndex]
    //           // }
    //         }
    //       },
    //       barWidth: 20,
    //       data: state.echartsData
    //     }
    //   ]
    // })

    const chartRef = ref()
    //轮播高亮
    useEchartsRotation(chartRef)

    return {
      ...toRefs(state),
      option,
      chartRef,
      compare
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        console.log('r3---data', newVal)
        // let arr = [
        //   newVal.otherProvince,
        //   newVal.selfEmployed,
        //   newVal.notEmployed,
        //   newVal.haveCommercialInsurance,
        //   newVal.otherReason
        // ]
        // this.option.yAxis[1].data = arr
        // this.option.series[0].data = arr

        //词云
        let arr2 = [
          {
            name: '个体户',
            value: newVal.selfEmployed
          },
          {
            name: '未就业',
            value: newVal.notEmployed
          },
          {
            name: '有商业保险',
            value: newVal.haveCommercialInsurance
          },
          {
            name: '其他原因',
            value: newVal.otherReason
          }
        ]
        this.option = {
          backgroundColor: '#010e21',
          color: ['#27beff', '#ffd500', '#355dff', '#00ffff', '#8956FF'],
          tooltip: {
            trigger: 'item',
            formatter: function (params: any) {
              return params.name + ':' + ' ' + params.value
            }
          },
          series: [
            {
              type: 'graph',
              layout: 'force',
              zlevel: 1,
              force: {
                repulsion: 200,
                edgeLength: 10
              },
              label: {
                show: true,
                color: 'auto',
                fontSize: 14
              },
              data: arr2.sort(this.compare('value', false)).map((item: any, index: number) => {
                return {
                  ...item,
                  draggable: canDraggable,
                  label: {
                    color: colorList2[index],
                    fontSize: fontSizeList[index]
                  }
                }
              })
            }
          ]
        }
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.r3-box {
  .title {
    width: 442px;
    height: 49px;
    background: url('/images/dataAnalysis/r3-t.png') no-repeat;
  }
  .echarts-box {
    width: 425px;
    height: 250px;
    margin: 0 auto;
    background: rgba(0, 102, 255, 0.1);
    border-radius: 10px;
  }
}
</style>
