<template>
  <div class="main-box">
    <div class="left-box">
      <div class="input-box">
        <div class="input-box-l">
          <el-select
            v-model="inputVal"
            class="m-2 selsectbox"
            placeholder="全民参保"
            size="large"
            @change="handchangeFun"
            :popper-append-to-body="false"
          >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="input-box-r" v-if="!isShow">
          <el-select
            v-model="dateInputVal"
            class="m-2 selsectbox"
            placeholder="周"
            size="large"
            @change="dateHandchangeFun"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in dateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 全民参保 -->
      <div v-if="isShow">
        <div class="standard-box">
          <div class="standard-box-l">对标数据源：</div>
          <div class="standard-box-r">
            <div
              :class="dbIndex === index ? 'item item-active' : 'item'"
              v-for="(item, index) in dbData"
              :key="index"
              @click="dbTabsFun(index)"
            >
              <span class="item-span">
                <span v-if="dbIndex === index"></span>
              </span>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="statistical-box">
          <div class="item">
            <div class="item-l">
              <img src="/images/talentPersonnel/gzfl-img.png" />
            </div>
            <div class="item-r">
              <div class="t">人口总数</div>
              <div class="b">
                <span class="num-span">{{ dataObj && dataObj.totalPopulation ? dataObj.totalPopulation : 0 }}</span>
                <span class="dw-span">万人</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="item-l">
              <img src="/images/talentPersonnel/zyjsry-img.png" />
            </div>
            <div class="item-r">
              <div class="t">当前参保人数</div>
              <div class="b">
                <span class="num-span">{{ dataObj && dataObj.insuredNumber ? dataObj.insuredNumber : 0 }}</span>
                <span class="dw-span">万人</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="item-l">
              <img src="/images/talentPersonnel/zyjsry-img.png" />
            </div>
            <div class="item-r">
              <div class="t">未参保人数(含武汉市外参保)</div>
              <div class="b">
                <span class="num-span num-color">
                  {{ dataObj && dataObj.uninsuredNumber ? dataObj.uninsuredNumber : 0 }}
                </span>
                <span class="dw-span">万人</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="item-l">
              <img src="/images/talentPersonnel/rsks-img.png" />
            </div>
            <div class="item-r">
              <div class="t">全民参保比例(去武汉市外参保人员)</div>
              <div class="b">
                <span class="num-span num-color">{{ dataObj && dataObj.insuredProportion }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 根治欠薪 -->
      <div v-else>
        <qxtotal v-if="qxtotalData" :data="qxtotalData" />
        <dqdbjzs v-if="dqdbjzsData.length > 0" :data="dqdbjzsData" />
        <fksajs v-if="fksajsData.length > 0" :data="fksajsData" />
      </div>
    </div>
    <!-- 全民参保地图 -->
    <div class="map-box" v-if="isShow">
      <centerArea3D v-if="mapData.length > 0" :value="inputVal || '全民参保'" :data="mapData" />
      <div class="map-box-txt">参保/未参保人数分布</div>
    </div>
    <!-- 根治欠薪地图 -->
    <div class="map-box" v-if="!isShow">
      <centerArea3D2 v-if="mapData2.length > 0"  :data="mapData2" />
    </div>
    <div>
      <!-- 全民参保 -->
      <div class="right-box" v-if="isShow">
        <cbwcbtj v-if="right1Data.length > 0" :value="inputVal || '全民参保'" :data="right1Data" />
        <cblxtj v-if="dataObj" :value="inputVal || '全民参保'" :data="dataObj" />
        <!-- <wcbtjqk v-if="dataObj" :value="inputVal || '全民参保'" :data="dataObj"/> -->
      </div>
      <!-- 根治欠薪 -->
      <div class="right-box" v-else>
        <zdtsph v-if="zdtsphData" :data="zdtsphData" />
        <btszd v-if="btszdData" :data="btszdData" />
        <bjzd v-if="bjzdData.length > 0" :data="bjzdData" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Chart, { echarts } from '/@/components/chart.vue'
import { defineComponent, nextTick, reactive, ref, toRefs, onMounted } from 'vue'
import http from '/@/config/http'

import centerArea3D from './components/centerArea3D/index.vue'
import cbwcbtj from './components/right1.vue'
import cblxtj from './components/right2.vue'
import wcbtjqk from './components/right3.vue'

import centerArea3D2 from './components/centerArea3D2/index.vue'
import zdtsph from './components/right4.vue'
import btszd from './components/right5.vue'
import bjzd from './components/right6.vue'
import qxtotal from './components/left1.vue'
import dqdbjzs from './components/left2.vue'
import fksajs from './components/left3.vue'

export default defineComponent({
  components: {
    Chart,
    cbwcbtj,
    cblxtj,
    wcbtjqk,
    centerArea3D,
    centerArea3D2,
    zdtsph,
    btszd,
    bjzd,
    qxtotal,
    dqdbjzs,
    fksajs
  },
  setup() {
    const state = reactive({
      inputVal: '',
      options: [
        {
          value: '全民参保',
          label: '全民参保'
        },
        {
          value: '根治欠薪',
          label: '根治欠薪'
        }
      ],
      dbIndex: 0,
      dbData: ['武汉市常住人口（实有人口）', '武汉市户籍人口'],
      dataObj: null,
      right1Data: [], //参保与未参保统计数据
      mapData: [], //地图参保未参保数据
      isShow: true, //全民参保(true)   根治欠薪(false)
      dateInputVal: 'M',// 周(W)  日(D)  月(M)
      dateOptions: [
        {
          value: 'D',
          label: '日'
        },
        {
          value: 'W',
          label: '周'
        },
        {
          value: 'M',
          label: '月'
        }
      ],
      zdtsphData: {}, //重点投诉排行榜 --  r4
      btszdData: {}, //被投诉重点 -- r5
      bjzdData: [], //报件重点 -- r6
      qxtotalData: {}, //欠薪总数 -- l1
      dqdbjzsData: [], //多渠道报件总数 -- l2
      fksajsData: [], //分科室案件数 -- l3
      mapData2:[]
    })
    const handchangeFun = () => {
      console.log('inputVal---', state.inputVal)
      if (state.inputVal == '全民参保') {
        state.isShow = true
      } else {
        getGZQXALLdata(state.dateInputVal)
      }
    }
    const dbTabsFun = (dataSource: number) => {
      state.dbIndex = dataSource
      getData(dataSource + 1)
    }
    const getData = (dataSource: number) => {
      http.get('/renshedata/allpeopleinsurance/list?dataSource=' + dataSource).then(({ code, data }) => {
        if (code === 200) {
          state.dataObj = data.records[0]
          if (data.records.length > 0) {
            getRight1Data(data.records[0].id)
            getMapData(data.records[0].id)
          }
        }
      })
    }
    const getRight1Data = (insuredId: number) => {
      http.get('/renshedata/insureduninsuredstatistics/list?insuredId=' + insuredId).then(({ code, data }) => {
        if (code === 200) {
          state.right1Data = data.records
        }
      })
    }

    const getMapData = (id: string) => {
      let obj = {
        insuredId: id,
        size: 15
      }
      http.get('/renshedata/districtstatistics/list?', obj).then(({ code, data }) => {
        if (code === 200) {
          state.mapData = data.records
        }
      })
    }

    // 根治欠薪相关
    const dateHandchangeFun = () => {
      console.log('dateInputVal', state.dateInputVal)
      getGZQXALLdata(state.dateInputVal)
      localStorage.setItem("sj",state.dateInputVal)
    }
    const getGZQXALLdata = (mydate: string) => {
      let obj = {
        sj: mydate
      }
      http.get('/renshedata/apiController/AllData', obj).then(({ code, data }) => {
        if (code === 200) {
          console.log('根治欠薪数据', data)
          state.zdtsphData = {
            tabs1: data.gzqxCftsxmph,
            tabs2: data.gzqxCftsqyph 
          }
          state.btszdData = {
            tabs1: data.gzqxBtszdxm,
            tabs2: data.gzqxBtszdqy
          }
          state.bjzdData = [data.gzqxBjzdrq, data.gzqxBjzdhy, data.gzqxGpgjz]
          state.qxtotalData = {
            // list: data.dpzbQxbjs
            list: data.dpzbQxbjsListDay,
            yxjs:data.yxjs,
            qxzbjs:data.qxzbjs
          }
          state.dqdbjzsData = data.dpzbQxdly
          state.fksajsData = data.dpzbKsbj
          state.mapData2 = data.dpzbQhbj

          state.isShow = false
        }
      })
    }

    onMounted(() => {
      getData(1)
    })

    return {
      ...toRefs(state),
      handchangeFun,
      dbTabsFun,
      getData,
      getRight1Data,
      getMapData,
      getGZQXALLdata,
      dateHandchangeFun
    }
  }
})
</script>
<style lang="scss" scoped>
.main-box {
  width: 1810px;
  margin: 20px auto;
  color: #fff;
  display: flex;
  .left-box {
    .input-box {
      width: 425px;
      height: 48px;
      margin-bottom: 20px;
      display: flex;
      .input-box-l {
        width: 70%;
      }
      .input-box-r {
        width: 30%;
      }
    }
    .standard-box {
      display: flex;
      font-size: 16px;
      margin-bottom: 30px;
      .standard-box-l {
        margin-right: 20px;
      }
      .standard-box-r {
        color: #04c1fb;
        .item {
          margin-bottom: 12px;
          cursor: pointer;
          .item-span {
            display: inline-block;
            width: 20px;
            margin-right: 10px;
            > span {
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-bottom: 10px solid #008fd4;
              transform: rotate(90deg);
            }
          }
        }
        .item-active {
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #08e2f7 0.1220703125%, #009aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .statistical-box {
      width: 425px;
      background: rgba(0, 126, 255, 0.1);
      border-radius: 10px;
      .item {
        display: flex;
        padding: 20px 0 20px 10px;
        .item-l {
        }
        .item-r {
          margin-left: 10px;
          .t {
            font-size: 18px;
            margin: 20px 0;
          }
          .b {
            color: #009aff;
            .num-span {
              font-size: 48px;
              font-weight: bold;
              display: inline-block;
              // width: 165px;
              // min-width: 236px;
            }
            .num-color {
              font-size: 48px;
              font-family: YouSheBiaoTiHei;
              font-weight: 400;
              color: #e2fbff;
              background: linear-gradient(0deg, #fcffa3 0.1220703125%, #ff4800 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
      }
      .line {
        width: 423px;
        height: 2px;
        background: url('/images/dataAnalysis/line.png') no-repeat;
      }
    }
  }
  .map-box {
    width: 1060px;
    position: relative;
    .map-box-txt {
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 36px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #e2fbff;
      text-shadow: 0px -6px 9px rgba(0, 0, 0, 0.35);
    }
  }
}

::v-deep .select-trigger {
  width: 425px;
  height: 48px;
}

::v-deep .el-input__inner {
  height: 48px;
  background: rgba(3, 181, 252, 0.12);
  border: 1px solid #1f90ff;
  border-radius: 6px;
  font-size: 26px;
  font-family: YouSheBiaoTiHei;
}

::v-deep .el-icon {
  display: inherit;
}
::v-deep .el-input__icon svg {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #008fd4;
}

::v-deep .el-input__suffix {
  right: 25px;
}

::v-deep .el-select-dropdown__wrap {
  max-height: 500px;
  background: #00161f;
  color: #fff;
}

::v-deep .el-select-dropdown__empty {
  background: #00161f;
  color: #fff;
}

::v-deep .el-select-dropdown__item {
  // color: #fff;
  font-size: 24px;
}

.input-box-l ::v-deep .el-input {
  width: 65%;
}
.input-box-l ::v-deep .el-input__inner {
  width: 100%;
}

.input-box-r ::v-deep .el-input {
  width: 30%;
}
</style>
