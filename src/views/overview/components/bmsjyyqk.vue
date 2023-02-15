<template>
  <div class="r2-box">
    <div class="title">部门数据应用情况(条)</div>
    <div class="echarts-box">
      <!-- <vue3-seamless-scroll :list="listData" class="seamless-warp"> -->
        <div class="seamless-warp">
        <div class="seamless-item" v-for="(item,index) in listData" :key="index">
          <div class="item-t">
            <span class="num-span" :style="index == 0 || index == 1 || index == 2 ? 'color:#FFBD3E':'color:#0066FF'">NO.{{ index+1 }}</span>
            <span class="name-span">{{ item.name }}</span>
          </div>
          <div class="item-b">
            <div class="item-b-l">
              <div :class="index==0||index==1?'bg1':index==2||index==3?'bg2':index==4||index==5?'bg3':'bg-box'" :style="item.num == 0? 'width:0':`width:${(item.num/listData[0].num)*100}%`"></div>
            </div>
            <div class="item-b-r">{{ item.num }}</div>
          </div>
        </div>
        </div>
      <!-- </vue3-seamless-scroll> -->
      <div class="bottom-bg"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Chart, { echarts } from '/@/components/chart.vue'
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
export default defineComponent({
  components: {
    Chart,
    Vue3SeamlessScroll
  },
  props: ['data'],
  setup(props) {
    console.log('props--部门数据应用情况', props.data)
    const state = reactive({
      listData: [
        // {
        //   name: '市商务局',
        //   num: props.data.businessBureau
        // },
        // {
        //   name: '市统计局',
        //   num: props.data.statisticsBureau
        // },
        {
          name: '市民政局',
          num: props.data.civilAffairsBureau
        },
        // {
        //   name: '市城管委',
        //   num: props.data.urbanManagementBureau
        // },
        // {
        //   name: '市房管局',
        //   num: props.data.houseManagementBureau
        // },
        // {
        //   name: '市税务局',
        //   num: props.data.taxBureau
        // },
        {
          name: '市公安局',
          num: props.data.cityPoliceDepartment
        },
        {
          name: '市场监督管理局',
          num: props.data.marketSupervisionAdministration
        },
        {
          name: '市残疾人联合会',
          num: props.data.disabledPeopleFederation
        },
      ]
    })

    const compare = (property:any) => {
      return function(a:any,b:any){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    }

    state.listData.sort(compare('num'))

    return {
      ...toRefs(state),
      Vue3SeamlessScroll,
      compare
    }
  }
})
</script>
<style lang="scss" scoped>
.r2-box {
  margin-top: 50px;
  .title {
    width: 442px;
    height: 49px;
    background: url('/images/overview/l1-title.png') no-repeat;
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 42px;
    margin: 0 auto;
    padding-left: 35px;
  }
  .echarts-box {
    width: 425px;
    height: 396px;
    background: rgba(0, 102, 255, 0.1);
    border-radius: 10px;
    position: relative;
    .seamless-warp {
      height: 375px;
      overflow: hidden;
      padding: 27px 22px;
      .seamless-item{
        margin-bottom: 20px;
        .item-t{
          margin-bottom: 10px;
          .num-span{
            font-size: 16px;
            margin-right: 10px;
          }
          .name-span{
            font-size: 14px;
            color: #fff;
          }
        }
        .item-b{
          display: flex;
          .item-b-l{
            width: 341px;
            height: 14px;
            margin-right: 20px;
            .bg-box{
              height: 100%;
              background: linear-gradient(90deg, #000E21, #00CCFF);
            }
            .bg1{
              height: 100%;
              background: linear-gradient(90deg, #000E21, #F9BF0D);
            }
            .bg2{
              height: 100%;
              background: linear-gradient(90deg, #000E21, #018BFF);
            }
            .bg3{
              height: 100%;
              background: linear-gradient(90deg, #000F22, #2EFDFB);
            }
          }
          .item-b-r{
            font-size: 16px;
            color: #0080FF;
          }
        }
      }
    }
    .bottom-bg{
      width: 100%;
      height: 8px;
      background: url('/images/overview/bottom-bg.png') no-repeat;
      background-size: contain;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
