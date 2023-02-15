<template>
  <Chart class="box-center-chart" :init="MapInit"></Chart>
</template>
<script lang="ts">
import Chart, { echarts } from '/@/components/chart.vue'
import MapWuhan from './mapWuhan'
// import MapWuhan3d from './mapWuhan3d'
import { defineComponent, reactive, toRefs, ref } from 'vue'
import http from '/@/config/http'
import {useEchartsRotation} from "/@/hooks";

const areaArr = [
  { name: '江夏区', value: [50, 20], _key_: '420115', districtId: '420115000000' },
  { name: '武汉经开区（汉南区）', value: [25, 25], _key_: '420113', districtId: '420113000000' },
  { name: '蔡甸区', value: [20, 35], _key_: '420114', districtId: '420114000000' },
  { name: '汉阳区', value: [38, 40], _key_: '420105', districtId: '420105000000' },
  { name: '硚口区', value: [37, 46.5], _key_: '420104', districtId: '420104000000' },
  { name: '东西湖区', value: [28, 50], _key_: '420112', districtId: '420112000000' },
  { name: '江汉区', value: [40, 47.5], _key_: '420103', districtId: '420103000000' },
  { name: '江岸区', value: [44, 48], _key_: '420102', districtId: '420102000000' },
  { name: '武昌区', value: [46, 42], _key_: '420106', districtId: '420106000000' },
  { name: '青山区', value: [53, 49], _key_: '420106', districtId: '420107000000' },
  { name: '洪山区', value: [56, 40], _key_: '420111', districtId: '420111000000' },
  { name: '黄陂区', value: [45, 66], _key_: '420116', districtId: '420116000000' },
  { name: '新洲区', value: [75, 60], _key_: '420117', districtId: '420117000000' }
]

let obj: echarts.ECharts
export default defineComponent({
  components: {
    Chart
  },
  props: ['value', 'data'],
  setup(props) {
    console.log('map-props--value', props.value)
    console.log('map-props--data', props.data)

    const state = reactive({
      // arrData: arr
    })
    const MapInit = (myChart: echarts.ECharts) => {
      obj = myChart
      MapWuhan(myChart, [], conversionData(props.data))
    }

    const conversionData = (paramsArr:any) => {
      // 根据districtId匹配  合并对象
      let arr = paramsArr.reduce((pre: any, cur: any) => {
        let target = pre.find((ee: any) => ee.districtId == cur.districtId)
        if (target) {
          Object.assign(target, cur)
        } else {
          pre.push(cur)
        }
        return pre
      }, areaArr)

      // let arr = areaArr.map((item:any,i:number) => {
      //   let ids = paramsArr.map((item:any) => item.districtId)
      //   return ids.includes(item.districtId)?{
      //     ...item,
      //     ...paramsArr[paramsArr.findIndex((item1:any) => item1.districtId == item.districtId)]
      //   }:item
      // })

      console.log('arr-----', arr)
      return arr
    }

    const chartRef = ref();
    //轮播高亮
    useEchartsRotation(chartRef);

    return {
      ...toRefs(state),
      MapInit,
      conversionData
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        console.log('map-data', newVal)
        MapWuhan(obj, [], this.conversionData(newVal))
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.box-center-chart {
  width: 850px;
  margin: 0 auto;
  flex: 1;
  height: 960px;
}
</style>
