<template>
  <div class="r5-box">
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
      <div class="list">
        <div class="list-title">
          <div class="div-l">{{active==0?'项目名称':'企业名称'}}</div>
          <div class="div-r">关联区域</div>
        </div>
        <!-- <vue3-seamless-scroll :list="btszdData1" class="seamless-warp" v-if="active==0"> -->
          <div class="seamless-warp" v-if="active==0">
            <div class="item" v-for="(item, index) in btszdData1" :key="index">
              <div class="div-l">{{ item.xmmc }}</div>
              <div class="div-r">{{ item.qy }}</div>
            </div>
          </div>
        <!-- </vue3-seamless-scroll> -->
        <!-- <vue3-seamless-scroll :list="btszdData2" class="seamless-warp" v-else> -->
          <div class="seamless-warp" v-else>
            <div class="item" v-for="(item, index) in btszdData2" :key="index">
              <div class="div-l">{{ item.qymc }}</div>
              <div class="div-r">{{ item.qy }}</div>
            </div>
          </div>
        <!-- </vue3-seamless-scroll> -->
      </div>
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
    console.log('r5data', props.data)
    const state = reactive({
      btszdData1: props.data.tabs1,
      btszdData2: props.data.tabs2,
      active: 0,
      tabs: ['被投诉重点项目', '被投诉重点企业']
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
      handler(newVal) {
        console.log("r5-newVal",newVal)
        this.btszdData1 = newVal.tabs1
        this.btszdData2 = newVal.tabs2
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.r5-box {
  margin-top: 20px;
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
      height: 220px;
      background: rgba(0, 126, 255, 0.1);
      border-radius: 0 0 10px 10px;
      // padding: 0 20px;
      padding:20px;
      overflow: hidden;
    }
    .list {
      .list-title {
        background: rgba(0, 23, 95, 0.6);
        opacity: 0.8;
        padding: 0 20px;
      }
      .list-title,
      .item {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .div-l {
          padding: 10px 0;
          padding-left: 10px;
        }
        .div-r {
          padding: 10px 0;
          // padding-right: 80px;
          padding-right: 30px;
        }
      }
      .item {
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
