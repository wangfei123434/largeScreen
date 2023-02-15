<template>
  <DefaultLayout/>
</template>

<script lang="ts">
import DefaultLayout from './layout/DefaultLayout.vue'
import { defineComponent } from "vue";
export default defineComponent({
  components:{
    DefaultLayout
  }
});
</script>
<style lang="scss">
@import "style/common.css";

.customNode {
  background: radial-gradient(circle, #2471FF, #0018FF);
  box-shadow: 0px 6px 18px 0px rgba(41, 83, 255, 0.85);
  color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  display: flex;
  white-space: wrap;
  align-items: center;
  justify-content: center;
  .nodeText {
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 20px;
    padding: 10px;
  }
  .nodeCount {
    margin-top: 10px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    font-style: italic;
    color: #FBA747;
    position: absolute;
    //height: 55px;
    top: -40px;
  }
  &.level1{
    background: radial-gradient(circle, #91C0FF, #83C3FF);
  }
  &.level2{
    background: radial-gradient(circle, #5E92FF, #588AFF);
  }
  &.level3{
    background: radial-gradient(circle, #2471FF, #0018FF);
  }
}
.customBaseNode {
  background: linear-gradient(135deg, #244EFF, #1B0ECD);
  box-shadow: 0px 1px 10px 1px rgba(7, 12, 31, 0.39);
  color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 30px;
  box-sizing: border-box;
  text-align: center;
  .nodeText {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(1, 1, 1, 0.6));
    box-shadow: 0px 0px 2px 0px #000000;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    line-height: 1.3;
    padding: 20px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #FFFFFF;
        display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
