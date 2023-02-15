<template>
  <div class="m1-box">
    <div class="total-box">
      <div class="txt">总量</div>
      <div class="num">{{ switchFn((totalNum).toString())}}条</div>
    </div>
    <div class="data-item item1">
      <div class="item-t">自建业务系统</div>
      <div class="item-num" v-if="objData.selfServiceSystemData>0">{{ objData.selfServiceSystemData }}万条</div>
      <div class="item-num" v-else>{{ objData.selfServiceSystemData }}条</div>
    </div>
    <div class="data-item item2">
      <div class="item-t">社会数据</div>
      <div class="item-num" v-if="objData.socialDataVolume>0">{{ objData.socialDataVolume }}万条</div>
      <div class="item-num" v-else>{{ objData.socialDataVolume }}条</div>
    </div>
    <div class="data-item item3">
      <div class="item-t">省集中回流数据</div>
      <div class="item-num" v-if="objData.systemConcentratedBackflowData>0">{{ objData.systemConcentratedBackflowData }}亿条</div>
      <div class="item-num" v-else>{{ objData.systemConcentratedBackflowData }}条</div>
    </div>
    <div class="data-item item4">
      <div class="item-t">部门共享数据</div>
      <div class="item-num" v-if="objData.otherGovernmentDepartmentsData>0">{{ objData.otherGovernmentDepartmentsData }}万条</div>
      <div class="item-num" v-else>{{ objData.otherGovernmentDepartmentsData }}万条</div>
    </div>
  </div>
</template>
<script lang="ts">
import Chart, { echarts } from '/@/components/chart.vue'
import { defineComponent, nextTick, onBeforeUnmount, onMounted, onUnmounted, reactive, ref, toRefs, } from 'vue'

let timer:any = null

export default defineComponent({
  components: {
    Chart
  },
  props: ['data'],
  setup(props) {
    console.log('props--数据总量', props.data)
    const state = reactive({
      objData: props.data,
      totalNum: 0,
    })

    // 转成钱的格式
    const switchFn = (str:string) => {
      return str.split("").reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
      })
    }

    // 生成区间的随机数  totalMin ~ totalMax
    const getRandNum = (min:number, max:number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const getNum = () => {
      timer = setInterval(() => {
        console.log('ss')
        // state.totalNum = getRandNum(props.data.totalMin,props.data.totalMax)
        state.totalNum = props.data.totalMin += getRandNum(1,10)
        if(state.totalNum == props.data.totalMax){
          clearInterval(timer)
        }
      },1000)
    }

    onMounted(() => {
      getNum()
    })

    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      ...toRefs(state),
      switchFn,
      getRandNum,
      getNum
    }
  }
})
</script>
<style lang="scss" scoped>
.m1-box {
  width: 954px;
  height: 617px;
  margin: 0 auto;
  background: url('/images/overview/m1-bg.png') no-repeat;
  // background-size: contain;
  background-size: 100% 100%;
  background-position-y: 60px;
  position: relative;
  .total-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
    .txt {
      font-size: 39px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #e1eaf3;
      // text-align: center;
      width: 120px;
      margin: 0 auto;
      text-shadow: 0px 0px 30px #006CFF;
    }
    .num {
      // width: 442px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      font-size: 56px;
      background: url('/images/overview/m1-toatl-bg.png') no-repeat;
      background-size: contain;
      margin-top: 15px;
      color: #018BFF;
      font-weight: bold;
    }
  }
  .data-item {
    // width: 208px;
    min-width: 208px;
    height: 102px;
    border-radius: 10px;
    text-align: center;
    position: absolute;
    background: url('/images/overview/m1-item-bg.png') no-repeat;
    background-size: 100% 100%;
    padding-top: 8px;
    .item-t {
      font-size: 20px;
      font-family: Alibaba PuHuiTi;
      font-weight: bold;
      color: #ffffff;
      margin: 10px 0;
    }
    .item-num {
      font-size: 35px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #2EFDFB;
      padding: 0 20px;
    }
  }
  .item1 {
    top: 166px;
    left: 35px;
  }
  .item2 {
    top: 166px;
    right: 60px;
  }
  .item3 {
    top: 378px;
    left: 150px;
  }
  .item4 {
    top: 378px;
    right: 175px;
  }
}
</style>
