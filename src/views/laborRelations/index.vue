<template>
  <div class="main-box">劳动关系</div>
</template>
<script lang="ts">
import Chart, { echarts } from '/@/components/chart.vue'
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
export default defineComponent({
  components: {
    Chart
  },
  setup() {
    const state = reactive({})
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>
.main-box {
  color: #fff;
  width: 1810px;
  margin: 20px auto;
}
</style>
