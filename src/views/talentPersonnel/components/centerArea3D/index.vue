<template>
  <Chart class="box-center-chart" :init="MapInit"></Chart>
</template>
<script lang="ts">
import Chart, { echarts } from '/@/components/chart.vue'
import MapWuhan from './mapWuhan'
import { defineComponent ,reactive,toRefs} from 'vue'
import http from "/@/config/http";

import wuhanbgIMG from './bg.png'
import donghuxinjishuIMG from './images/donghuxinjishu.png'
import donghushengtailvyouIMG from './images/donghushengtailvyou.png'

import jiangxiaIMG from './images/jiangxia.png'
import hannanIMG from './images/hannan.png'
import caidianIMG from './images/caidian.png'
import hanyangbgIMG from './images/hanyang.png'
import qiaokouIMG from './images/qiaokou.png'
import dongxihuIMG from './images/dongxihu.png'
import jianghanIMG from './images/jianghan.png'
import jianganIMG from './images/jiangan.png'
import wuchangbgIMG from './images/wuchang.png'
import qingshanIMG from './images/qingshan.png'
import hongshanIMG from './images/hongshan.png'
import huangpiIMG from './images/huangpi.png'
import xinzhoubgIMG from './images/xinzhou.png'



const wuhan = [
  { name: '江夏区', value: [50, 20] ,_key_:'420115',src:jiangxiaIMG, districtId: '420115000000' },
  { name: '武汉经开区（汉南区）', value: [25, 25],_key_:'420113',src:hannanIMG, districtId: '420113000000' },
  { name: '蔡甸区', value: [20, 35] ,_key_:'420114',src:caidianIMG , districtId: '420114000000'},
  { name: '汉阳区', value: [38, 40],_key_:'420105',src:hanyangbgIMG, districtId: '420105000000' },
  { name: '硚口区', value: [37, 46.5] ,_key_:'420104',src:qiaokouIMG , districtId: '420104000000'},
  { name: '东西湖区', value: [28, 50],_key_:'420112',src:dongxihuIMG , districtId: '420112000000'},
  { name: '江汉区', value: [40, 47.5],_key_:'420103',src:jianghanIMG, districtId: '420103000000' },
  { name: '江岸区', value: [44, 48] ,_key_:'420102',src:jianganIMG, districtId: '420102000000' },
  { name: '武昌区', value: [46, 42],_key_:'420106',src:wuchangbgIMG, districtId: '420106000000' },
  { name: '青山区', value: [53, 49],_key_:'420106',src:qingshanIMG , districtId: '420107000000'},
  { name: '洪山区', value: [56, 40] ,_key_:'420111',src:hongshanIMG, districtId: '420111000000' },
  { name: '黄陂区', value: [45, 66] ,_key_:'420116',src:huangpiIMG, districtId: '420116000000' },
  { name: '新洲区', value: [75, 60] ,_key_:'420117',src:xinzhoubgIMG, districtId: '420117000000' }
]

let obj:echarts.ECharts;
export default defineComponent({
  components: {
    Chart
  },
  props:['value','data'],
  setup(props) {
    console.log('props--',props.value)
    console.log('map-props--data', props.data)

    const state = reactive({
      cityVal:'',
    });
    state.cityVal = props.value
    const MapInit = (myChart: echarts.ECharts) => {
      obj = myChart
      MapWuhan(myChart,[],conversionData(props.data),wuhanbgIMG)
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
      }, wuhan)
      console.log('arr-----', arr)
      return arr
    }

    const getArrayIndex = (arr: any, obj: any) => {
      let i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return i;
        }
      }
      return i;
    }

    return {
      ...toRefs(state),
      MapInit,
      conversionData,
      getArrayIndex
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newVal) {
        console.log(newVal)
        this.cityVal = newVal
        if(newVal == '武汉市'){
          MapWuhan(obj,[],wuhan,wuhanbgIMG)
        }else {
          let wuhanArr = JSON.parse(JSON.stringify(wuhan))
          let objChild = wuhanArr.filter((item:any) => {return item.name == newVal })[0]
          let index = this.getArrayIndex(wuhanArr,objChild)
          wuhanArr[index].value = [50,50]
          MapWuhan(obj,[],[wuhanArr[index]],objChild.src)
        }
      }
    }
  }
})
</script>
<style lang="scss" scoped>

.box-center-chart {
  flex: 1;
  height: 960px;
}

</style>
