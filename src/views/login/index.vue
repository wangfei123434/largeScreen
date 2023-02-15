<template>
  <div class="main-box">
    <div class="title">欢迎登录</div>
    <div class="input-box">
      <img class="icon" src="/images/zh.svg" alt="" />
      <input type="text" v-model="userVal" placeholder="请输入您的账号" />
    </div>
    <div class="input-box">
      <img class="icon" src="/images/pwd.svg" alt="" />
      <input type="password" v-model="passwordVal" placeholder="请输入您的密码" />
    </div>
    <div class="input-box">
      <img class="icon" src="/images/yzm.svg" alt="" />
      <input type="text" v-model="capchaVal" placeholder="请输入验证码" />
      <img class="capcha" :src="captchaImg" @click="getCaptcha" />
    </div>
    <div class="btn-box" @click="submitFun">登录</div>
  </div>
</template>
<script lang="ts">
import Chart, { echarts } from '/@/components/chart.vue'
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import http from '/@/config/http'
import md5 from 'js-md5'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  components: {
    Chart
  },
  setup() {
    let router = useRouter()
    const state = reactive({
      captchaImg: '',
      userVal: '',
      passwordVal: '',
      capchaVal: '',
      key: ''
    })
    const getCaptcha = () => {
      http.get(`/renshedata/oauth/captcha`, {}, {}).then(({ key, image }) => {
        state.captchaImg = image
        state.key = key
      })
    }
    getCaptcha()

    const submitFun = () => {
      const { userVal, passwordVal, capchaVal, key } = state
      if (!userVal) {
        ElMessage({ type: 'warning', message: '请输入用户名' })
        return
      }
      if (!passwordVal) {
        ElMessage({ type: 'warning', message: '请输入密码' })
        return
      }
      if (!capchaVal) {
        ElMessage({ type: 'warning', message: '请输入验证码' })
        return
      }
      const headers = {
        CaptchaKey: key,
        CaptchaCode: capchaVal,
        Authorization: 'Basic cnNkc2o6cnNkc2pfc2VjcmV0'
      }
      http
        .post(
          `/renshedata/oauth/token?username=${userVal}&password=${md5(
            passwordVal
          )}&grant_type=captcha&tenant_id=000000`,
          {},
          headers
        )
        .then((res) => {
          console.log('res---', res)
          // localStorage.setItem('token', res.access_token)
          sessionStorage.setItem('token', res.access_token)
          setTimeout(() => {
            router.push({
              path: '/overview',
              query: {
                loginStatus: 'true'
              }
            })
          },500)
        })
        .catch((error) => {
          console.log('err---', error)
          ElMessage({ type: 'error', message: error })
          getCaptcha()
        })
    }

    return {
      ...toRefs(state),
      getCaptcha,
      submitFun
    }
  }
})
</script>
<style lang="scss" scoped>
.main-box {
  width: 800px;
  height: 500px;
  margin: 100px auto;
  color: #fff;
  .title {
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
    width: 100%;
    text-align: center;
    margin-bottom: 50px;
  }
  .input-box {
    width: 600px;
    height: 50px;
    border: 1px solid #ccc;
    margin: 30px auto;
    border-radius: 5px;
    .icon {
      vertical-align: middle !important;
      margin: 0 20px;
    }
    input {
      color: #fff;
      height: 40px;
      margin-top: 5px;
    }
    .capcha {
      float: right;
    }
  }
  .btn-box {
    width: 600px;
    height: 60px;
    background: #3471f6;
    color: #fff;
    text-align: center;
    line-height: 60px;
    border-radius: 5px;
    margin: 50px auto;
    cursor: pointer;
    font-size: 25px;
  }
}
</style>
