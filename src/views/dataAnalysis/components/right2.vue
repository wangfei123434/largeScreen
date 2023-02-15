<template>
  <div class="r2-box">
    <div class="title"></div>
    <div class="echarts-box">
      <v-chart class="chart" :option="option" ref="chartRef" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs,watch } from 'vue'
import VChart from 'vue-echarts'
import { useEchartsRotation } from '/@/hooks'
import * as echarts from 'echarts/core'
import { color } from 'echarts'

export default defineComponent({
  components: {
    VChart
  },
  props: ['value', 'data'],
  setup(props) {
    console.log('r2-props--value', props.value)
    console.log('r2-props--data', props.data)
    const state = reactive({
      echartsData: [
        { value: parseFloat(props.data.provincialOrgansInsured), name: '省直机关参保' },
        { value: parseFloat(props.data.businessUnitInsured), name: '机关事业单位参保' },
        { value: parseFloat(props.data.enterpriseEmployeeInsured), name: '企业职工参保' },
        { value: parseFloat(props.data.cityRuralInsured), name: '城乡居民参保' },
        { value: parseFloat(props.data.otherInsured), name: '其他参保' }
      ]
    })

    const option = ref({
      animation: true,
      color: ['#00FFFF', '#355DFF', '#FFFFFF', '#FFD500', '#27BCFF'],
      tooltip: {
        show: true,
        formatter: function (params: any) {
          return params.name + params.value + '%'
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
              str = '{a|' + name + '} {b|' + option.value.series[0].data[i].value + '%' + '}'
            }
          }
          return str
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
                return '{a|' + params.value + '%' + '}\n{b|' + params.name + '}'
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
          data: state.echartsData
        }
      ]
    })

    const chartRef = ref()
    //轮播高亮
    useEchartsRotation(chartRef)

    // watch(
    //   () => props.data,
    //   (newVal:any) => {
    //     console.log('r2---data', newVal)
    //   }
    // )

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
        console.log('r2---data', newVal)
        // this.echartsData = [
        //   { value: parseFloat(newVal.provincialOrgansInsured), name: '省直机关参保' },
        //   { value: parseFloat(newVal.businessUnitInsured), name: '机关事业单位参保' },
        //   { value: parseFloat(newVal.enterpriseEmployeeInsured), name: '企业职工参保' },
        //   { value: parseFloat(newVal.cityRuralInsured), name: '城乡居民参保' },
        //   { value: parseFloat(newVal.otherInsured), name: '其他参保' }
        // ]
        let arr = [
          { value: parseFloat(newVal.provincialOrgansInsured), name: '省直机关参保' },
          { value: parseFloat(newVal.businessUnitInsured), name: '机关事业单位参保' },
          { value: parseFloat(newVal.enterpriseEmployeeInsured), name: '企业职工参保' },
          { value: parseFloat(newVal.cityRuralInsured), name: '城乡居民参保' },
          { value: parseFloat(newVal.otherInsured), name: '其他参保' }
        ]
        this.option.series[0].data = arr
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.r2-box {
  // margin: 20px 0;
  margin: 100px 0;
  .title {
    width: 442px;
    height: 49px;
    background: url('/images/dataAnalysis/r2-t.png') no-repeat;
  }
  .echarts-box {
    width: 425px;
    height: 240px;
    margin: 0 auto;
    background: rgba(0, 102, 255, 0.1);
    border-radius: 10px;
  }
}

.span-color {
  color: red;
}
</style>
