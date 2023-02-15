<template>
  <div class="r4-box">
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
    <div class="content">
      <!-- <vue3-seamless-scroll :list="zdtsphData1" class="seamless-warp" v-if="active==0"> -->
        <div class="list" v-if="active==0">
          <div class="item" v-for="(item, index) in zdtsphData1" :key="index">
            <div class="item-l">
              <span class="span1">NO{{ index + 1 }}</span>
              <span :class="index == 0 || index == 1 || index == 2 ? 'span2 act-bg1' : 'span2 act-bg2'"></span>
            </div>
            <div>{{ item.xmmc }}</div>
          </div>
        </div>
      <!-- </vue3-seamless-scroll> -->
      <!-- <vue3-seamless-scroll :list="zdtsphData2" class="seamless-warp" v-else> -->
        <div class="list" v-else>
          <div class="item" v-for="(item, index) in zdtsphData2" :key="index">
            <div class="item-l">
              <span class="span1">NO{{ index + 1 }}</span>
              <span :class="index == 0 || index == 1 || index == 2 ? 'span2 act-bg1' : 'span2 act-bg2'"></span>
            </div>
            <div>{{ item.qymc }}</div>
          </div>
        </div>
      <!-- </vue3-seamless-scroll> -->
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
      zdtsphData1: props.data.tabs1,
      zdtsphData2: props.data.tabs2,
      active: 0,
      tabs: ['重复投诉项目排行', '重复投诉企业排行']
    })
    const tabsClick = (index: number) => {
      state.active = index
    }
    return {
      ...toRefs(state),
      Vue3SeamlessScroll,
      tabsClick
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal:any) {
        console.log("r4-newVal",newVal)
        this.zdtsphData1 = newVal.tabs1
        this.zdtsphData2 = newVal.tabs2
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.r4-box {
//   margin-top: 20px;
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
  .content {
    .seamless-warp {
      width: 442px;
      height: 230px;
      background: rgba(0, 126, 255, 0.1);
      border-radius: 10px;
      padding: 0 20px;
      overflow: hidden;
    }
    .list {
      width: 442px;
      // height: 230px;
      height: 220px;
      background: rgba(0, 126, 255, 0.1);
      border-radius: 10px;
      // padding: 0 20px;
      padding: 20px;
      overflow: hidden;
      .item {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 25px;
        display: flex;
        .item-l {
          position: relative;
          width: 50px;
          margin-right: 20px;
          span {
            position: absolute;
          }
          .span1 {
            left: 5px;
          }
          .span2 {
            top: 5px;
            width: 50px;
            height: 12px;
            opacity: 0.5;
          }
        }

        .act-bg1 {
          background: #ffa828;
        }
        .act-bg2 {
          background: #2789ff;
        }
      }
    }
  }
}
</style>
