<template>
  <div class="l2-box">
    <div class="title">接口共享服务(条)</div>
    <div class="echarts-box">
      <vue3-seamless-scroll :list="listData" class="seamless-warp">
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
      </vue3-seamless-scroll>
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
        {
          name: '社会保障卡银行信息',
          num: props.data.shbzkyhxx
        },
        {
          name: '不予认定决定书',
          num: props.data.byrdjds
        },
        {
          name: '劳动能力鉴定结论书',
          num: props.data.ldnljdjls
        },
        {
          name: '劳动能力鉴定（确认）申请信息',
          num: props.data.ldnljdsqxx
        },
        {
          name: '单位社会保险参保登记信息',
          num: props.data.dwshbxcbdjxx
        },
        {
          name: '失业保险个人参保状态信息',
          num: props.data.sybxgrcbxxzt
        },
        {
          name: '失业保险单位参保状态信息',
          num: props.data.sybxdwcbztxx
        },
        {
          name: '工伤认定申请不予受理决定书',
          num: props.data.gsrdsqbysljds
        },
        {
          name: '工伤认定申请受理决定书',
          num: props.data.gsrdsqsljds
        },
        {
          name: '流动人员人事档案信息',
          num: props.data.ldryrsdaxx
        },
        {
          name: '认定工伤决定书',
          num: props.data.rdgsjds
        },
        {
          name: '退休人员基本信息',
          num: props.data.txryjbxx
        },
        {
          name: '个人参保信息',
          num: props.data.grcbxx
        },
        {
          name: '工伤保险参保缴费信息',
          num: props.data.gsbxcbjfxx
        },
        {
          name: '失业保险参保缴费信息',
          num: props.data.sybxcbjfxx
        },
        {
          name: '离退休人员待遇信息',
          num: props.data.ltxrydyxx
        },
        {
          name: '工伤保险参保人数信息',
          num: props.data.gsbxcbrsxx
        },
        {
          name: '工伤保险综合信息',
          num: props.data.gsbxzhxx
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
.l2-box {
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
