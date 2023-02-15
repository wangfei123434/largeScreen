<template>
  <div class="m2-box">
    <div class="title">数据分布</div>
    <div class="echarts-box">
      <div class="tabs-box">
        <div
          :class="tabsIndex === index ? 'tabs-item item-active' : 'tabs-item'"
          v-for="(item, index) in tabsList"
          :key="index"
          @click="tabsFun(index)"
        >
          <div class="txt">{{ item }}</div>
          <img v-if="tabsIndex === index" src="/images/overview/m2-nav-active.png" />
        </div>
      </div>
      <div class="data-box" v-if="tabsIndex == 0">
        <div class="data-item" v-for="(item, index) in tabsData" :key="index" :style="`background:url(${item.src})`">
          <div class="num">
            {{ item.num }}
            <span style="font-size: 20px">{{ item.dw }}</span>
          </div>
          <div class="txt">{{ item.txt }}</div>
        </div>
      </div>
      <div class="data-box" v-if="tabsIndex == 1">
        <div class="data-item" v-for="(item, index) in tabsData2" :key="index" :style="`background:url(${item.src})`">
          <div class="num">
            {{ item.num }}
            <span style="font-size: 20px">{{ item.dw }}</span>
          </div>
          <div class="txt">{{ item.txt }}</div>
        </div>
      </div>
      <div class="data-box" v-if="tabsIndex == 3">
        <div class="data-item" v-for="(item, index) in tabsData4" :key="index" :style="`background:url(${item.src})`">
          <div class="num">
            {{ item.num }}
            <span style="font-size: 20px">{{ item.dw }}</span>
          </div>
          <div class="txt">{{ item.txt }}</div>
        </div>
      </div>
      <div class="bottom-bg"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Chart, { echarts } from '/@/components/chart.vue'
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import http from '/@/config/http'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    Chart
  },
  props: ['data'],
  setup(props) {
    console.log('props--数据分布', props.data)
    const state = reactive({
      tabsList: ['人才人事数据', '社会保障数据', '劳动关系数据', '就业创业数据'],
      tabsData: [
        { num: '', dw: '家', src: '/images/overview/m2-c-1.png', txt: '事业单位信息' },
        { num: '', dw: '万人', src: '/images/overview/m2-c-2.png', txt: '事业单位人数' },
        { num: '', dw: '万本', src: '/images/overview/m2-c-3.png', txt: '职称证书' },
        { num: '', dw: '万本', src: '/images/overview/m2-c-4.png', txt: '职业资格及职业技能等级认定证书' },
        { num: '', dw: '万人', src: '/images/overview/m2-c-4.png', txt: '技工院校在读人数' }
      ],
      tabsData2: [
        { num: '', dw: '万人', src: '/images/overview/m2-c-1.png', txt: '企业职工养老' },
        { num: '', dw: '万人', src: '/images/overview/m2-c-2.png', txt: '城乡居民养老' },
        { num: '', dw: '万人', src: '/images/overview/m2-c-3.png', txt: '机关事业单位养老' },
        { num: '', dw: '万人', src: '/images/overview/m2-c-4.png', txt: '失业参保' },
        { num: '', dw: '万人', src: '/images/overview/m2-c-4.png', txt: '工伤参保' }
      ],
      tabsData4: [
        { num: '', dw: '万人', src: '/images/overview/m2-c-1.png', txt: '市内就业人员' },
        { num: '', dw: '万人', src: '/images/overview/m2-c-2.png', txt: '就业创业证申领人员' },
        { num: '', dw: '万人', src: '/images/overview/m2-c-3.png', txt: '失业登记人员' },
        { num: '', dw: '万人', src: '/images/overview/m2-c-4.png', txt: '就业困难人员' },
        { num: '', dw: '万个', src: '/images/overview/m2-c-4.png', txt: '就业单位数量' }
      ],
      tabsIndex: 0
    })
    http.get('/renshedata/talentpersonneltotal/list').then(({ code, data }) => {
      if (code === 200) {
        state.tabsData[0].num = data.records[0].businessUnit > 0 ? data.records[0].businessUnit : 0
        state.tabsData[1].num = data.records[0].businessUnitPeople > 0 ? data.records[0].businessUnitPeople : 0
        state.tabsData[2].num = data.records[0].vocationalCertificate > 0 ? data.records[0].vocationalCertificate : 0
        state.tabsData[3].num =
          data.records[0].vocationalQualificationLevelCertificate > 0
            ? data.records[0].vocationalQualificationLevelCertificate
            : 0
        state.tabsData[4].num =
          data.records[0].technicalCollegeStudentNumber > 0 ? data.records[0].technicalCollegeStudentNumber : 0

        state.tabsData2[0].num =
          data.records[0].enterpriseEmployeePension > 0 ? data.records[0].enterpriseEmployeePension : 0
        state.tabsData2[1].num = data.records[0].cityVillagePension > 0 ? data.records[0].cityVillagePension : 0
        state.tabsData2[2].num = data.records[0].businessUnitPension > 0 ? data.records[0].businessUnitPension : 0
        state.tabsData2[3].num = data.records[0].unemploymentInsurance > 0 ? data.records[0].unemploymentInsurance : 0
        state.tabsData2[4].num = data.records[0].businessInsurance > 0 ? data.records[0].businessInsurance : 0

        state.tabsData4[0].num = data.records[0].cityEmployee > 0 ? data.records[0].cityEmployee : 0
        state.tabsData4[1].num = data.records[0].employmentCertificate > 0 ? data.records[0].employmentCertificate : 0
        state.tabsData4[2].num =
          data.records[0].unemploymentRegistration > 0 ? data.records[0].unemploymentRegistration : 0
        state.tabsData4[3].num = data.records[0].employmentDifficulties > 0 ? data.records[0].employmentDifficulties : 0
        state.tabsData4[4].num = data.records[0].employmentUnit > 0 ? data.records[0].employmentUnit : 0
      }
    })
    const tabsFun = (index: number) => {
      if (index == 0 || index == 1 || index == 3) {
        state.tabsIndex = index
      } else {
        ElMessage({
          message: '努力建设中...',
          type: 'warning',
          offset: 500,
          duration: 1000
        })
      }
    }
    return {
      ...toRefs(state),
      tabsFun
    }
  }
})
</script>
<style lang="scss" scoped>
.m2-box {
  margin-top: 50px;
  .title {
    width: 909px;
    height: 49px;
    background: url('/images/overview/m2-title.png') no-repeat;
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 42px;
    margin: 0 auto;
    padding-left: 35px;
  }
  .echarts-box {
    width: 890px;
    height: 224px;
    margin-left: 23px;
    background: rgba(0, 102, 255, 0.1);
    border-radius: 10px;
    padding: 20px 40px;
    position: relative;
    .tabs-box {
      display: flex;
      .tabs-item {
        font-size: 18px;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #ffffff;
        line-height: 50px;
        margin-right: 40px;
        cursor: pointer;
        > img {
          width: 76px;
          height: 16px;
          margin-left: 16px;
          margin-top: 5px;
        }
      }
      .item-active {
        font-size: 20px;
        font-weight: bold;
        color: #00FFFD;
      }
    }
    .data-box {
      display: flex;
      .data-item {
        width: 140px;
        height: 120px;
        margin-right: 24px;
        .num {
          text-align: center;
          font-size: 30px;
          color: #ffc64d;
          font-weight: bold;
        }
        .txt {
          font-size: 14px;
          text-align: center;
          margin-top: 55px;
          line-height: 20px;
        }
      }
    }
    .bottom-bg{
      width: 100%;
      height: 8px;
      background: url('/images/overview/m2-bottom-bg.png') no-repeat;
      background-size: contain;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
