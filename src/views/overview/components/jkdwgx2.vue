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
      echartsData:[props.data.interfaceCityBigDataPlatform,props.data.interfaceWuhanOpenPlatform,props.data.interfaceOtherChannels]
    })

    const offsetX = 20
    const offsetY = 10
    // 绘制左侧面
    const CubeLeft = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: function (ctx, shape) {
        // 会canvas的应该都能看得懂，shape是从custom传入的
        const xAxisPoint = shape.xAxisPoint
        // console.log(shape);
        const c0 = [shape.x, shape.y]
        const c1 = [shape.x - offsetX, shape.y - offsetY]
        const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY]
        const c3 = [xAxisPoint[0], xAxisPoint[1]]
        ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
      }
    })
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: function (ctx, shape) {
        const xAxisPoint = shape.xAxisPoint
        const c1 = [shape.x, shape.y]
        const c2 = [xAxisPoint[0], xAxisPoint[1]]
        const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY]
        const c4 = [shape.x + offsetX, shape.y - offsetY]
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
      }
    })
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: function (ctx, shape) {
        const c1 = [shape.x, shape.y]
        const c2 = [shape.x + offsetX, shape.y - offsetY] //右点
        const c3 = [shape.x, shape.y - offsetX]
        const c4 = [shape.x - offsetX, shape.y - offsetY]
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
      }
    })
    // 注册三个面图形
    echarts.graphic.registerShape('CubeLeft', CubeLeft)
    echarts.graphic.registerShape('CubeRight', CubeRight)
    echarts.graphic.registerShape('CubeTop', CubeTop)

    const option = ref({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params:any, ticket:any, callback:any) {
          const item = params[1]
          return item.name + ' : ' + item.value
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        top: '20%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['市大数据能力平台', '武汉市开放平台', '其他渠道'],
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: '#2B7BD6'
          },
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: 14,
          margin: 14,
          textStyle: {
            color: '#A3C0DF' //X轴文字颜色
          },
          interval:0,  
          // rotate:0 
        }
      },
      yAxis: {
        type: 'value',
        // min: 0,//Y轴刻度最小值
        // max: 2000,//Y轴刻度最大值
        // interval: 500,//Y轴刻度间隔值
        // splitNumber: 4,
        axisLine: {
          show: false,
          lineStyle: {
            width: 2,
            color: '#2B7BD6'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#153D7D'
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
        // boundaryGap: ['20%', '20%'],
      },
      series: [
        {
          type: 'custom',
          renderItem: (params:any, api:any) => {
            const location = api.coord([api.value(0), api.value(1)])
            return {
              type: 'group',
              children: [
                {
                  type: 'CubeLeft',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(51,137,235,.5)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(51,137,235,.1)'
                      }
                    ])
                  }
                },
                {
                  type: 'CubeRight',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#28A2CE'
                      },
                      {
                        offset: 1,
                        color: '#1A57B7'
                      }
                    ])
                  }
                },
                {
                  type: 'CubeTop',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#43C4F1'
                      },
                      {
                        offset: 1,
                        color: '#28A2CE'
                      }
                    ])
                  },
                },
              ]
            }
          },
          data: state.echartsData
        },
        {
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: (e:any) => {
                return e.value
                /*console.log(e)
                        switch (e.name) {
                            case '1001':
                                return e.value;
                            case '1002':
                                return VALUE[1];
                            case '1003':
                                return VALUE[2];
                        }*/
              },
              fontSize: 16,
              color: '#43C4F1',
              offset: [0, -25]
            }
          },
          itemStyle: {
            color: 'transparent'
          },
          tooltip: {},
          data: state.echartsData
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
  margin-top: 50px;
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
