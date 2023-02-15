<template>
  <div class="page-wrapper" ref="pageWrapperRef">
    <div class="header">
      <div class="nav-bar" v-if="token">
        <div class="nav-bar-l">
          <router-link to="/overview" active-class="active">
            <span>总览</span>
          </router-link>
          <router-link to="/talentPersonnel" active-class="active">
            <span>人才人事</span>
          </router-link>
          <!-- <router-link to="/socialSecurity" active-class="active">
            <span>社会保障</span>
          </router-link>
          <router-link to="/laborRelations" active-class="active">
            <span>劳动关系</span>
          </router-link> -->
          <div class="nav-item-box" style="margin:0 50px 0 30px" @click="clickFun">社会保障</div>
          <div class="nav-item-box" @click="clickFun">劳动关系</div>
        </div>
        <div class="nav-bar-r">
          <!-- <router-link to="/employmentEntrepreneurship" active-class="active">
            <span>就业创业</span>
          </router-link> -->
          <div class="nav-item-box" @click="clickFun" style="margin-right:20px">就业创业</div>
          <router-link to="/talentRetrieve" active-class="active">
            <span>人才检索</span>
          </router-link>
          <router-link to="/dataAnalysis" active-class="active">
            <span>数据分析</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { CSSProperties, defineComponent, reactive, ref, toRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'


const bgStyleMap: [key: string, value: CSSProperties] = {
  //总览页面背景
  overview: {
    backgroundImage: 'url("/images/bg.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundColor: 'black'
  },
  //默认
  _default_: {
    backgroundImage: 'none',
    backgroundColor: 'black'
  }
};
['dataAnalysis', 'talentPersonnel',  'talentRetrieveDetail','employmentEntrepreneurship','socialSecurity','laborRelations',].forEach((item) => {
  bgStyleMap[item] = {
    backgroundImage: 'url("/images/bg.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundColor: 'black'
  }
});

['talentRetrieve'].forEach((item) => {
  bgStyleMap[item] = {
    backgroundImage: 'url("/images/talentRetrieve-bg.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundColor: 'black'
  }
})

export default defineComponent({
  setup() {
    const route = useRoute()

    const pageWrapperRef = ref()

    watch(toRef(route, 'path'), () => {
      Object.assign(pageWrapperRef.value.style, bgStyleMap[route.name] || bgStyleMap._default_)
      // console.log(232323,route.query.loginStatus)
      if(route.name == 'overview' && route.query.loginStatus){
        if(location.href.indexOf("#reloaded")==-1){
          location.href=location.href+"#reloaded";
          location.reload();
        }
      }
    })

    const clickFun = () => {
      ElMessage({
        message: '努力建设中...',
        type: 'warning',
        offset:20,
        duration:1000
      })
    }

    const token = sessionStorage.getItem("token")

    return {
      pageWrapperRef,
      clickFun,
      token
    }
  }
})
</script>
<style lang="scss" scoped>
.page-wrapper {
  //background-image: url("/images/bg.png");
  //background-repeat: no-repeat;
  //background-size: 100% 100%;
  background-color: black;
  flex: 1;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 90px;
    background-image: url('/images/header-logo.png');
    background-size: 100% 100%;
    .nav-bar {
      font-style: italic;
      height: 100%;
      align-items: center;
      display: flex;
      justify-content: space-between;
      color: white;
      padding: 0 27px 0 27px;
      > div {
      display: flex;
      margin-top: 20px;
        > a {
          text-align: center;
          align-items: center;
          display: flex;
          font-size: 24px;
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          margin: 0 10px;
          span{
            padding: 0 20px;
          }
          &.active,
          &:hover {
            position: relative;
            &:after {
              height: 60px;
              position: absolute;
              width: 100%;
              background-image: url('/images/header-nav-active.png');
              background-size: 100% 100%;
              content: '';
              left: 50%;
              top: -10px;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }
  .content {
    height: 1020px;
    display: flex;
    position: relative;
    // &::after {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    //   content: '';
    //   border: 1px white solid;
    // }
  }
}


.nav-item-box{
  font-size: 24px;
  cursor: pointer;
}
</style>
