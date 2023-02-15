<template>
  <div class="main-box">
    <div class="box-l">
      <sjdwgx v-if="overviewData" :data="overviewData"/>
      <jkdwgx v-if="overviewData" :data="overviewData"/>
    </div>
    <div class="box-m">
      <sjzl v-if="overviewData" :data="overviewData"/>
      <sjfb v-if="overviewData" :data="overviewData"/>
    </div>
    <div class="box-r">
      <xtsjyyqk v-if="overviewData" :data="overviewData"/>
      <bmsjyyqk v-if="overviewData" :data="overviewData"/>
    </div>
  </div>
</template>
<script lang="ts">
import bmsjyyqk from './components/bmsjyyqk.vue'
import jkdwgx from './components/jkdwgx.vue'
import sjdwgx from './components/sjdwgx.vue'
import sjfb from './components/sjfb.vue'
import sjzl from './components/sjzl.vue'
import xtsjyyqk from './components/xtsjyyqk.vue'
import Chart, { echarts } from '/@/components/chart.vue'
import { defineComponent, nextTick, reactive, ref, toRefs, onMounted } from 'vue'
import http from '/@/config/http'
export default defineComponent({
  components: {
    Chart,
    bmsjyyqk,
    jkdwgx,
    sjdwgx,
    sjfb,
    sjzl,
    xtsjyyqk
  },
  setup() {
    const state = reactive({
      overviewData:null,
      interfaceData:[]
    })
    // 数据总量、数据对外共享、接口对外共享、系统数据应用情况、部门数据应用情况
    const getData = () => {
      http.get('/renshedata/datacount/list').then(({code,data}) => {
        if(code === 200){
          state.overviewData = data.records[0]
        }
      })
    }
    
    onMounted(() => {
      getData()
    })
    return {
      ...toRefs(state),
      getData,
    }
  },
  
})
</script>
<style lang="scss" scoped>
.main-box {
  width: 1838px;
  margin: 30px auto;
  color: #fff;
  display: flex;
}
</style>
