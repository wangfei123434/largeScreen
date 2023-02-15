import { createApp } from "vue";
import App from "./App.vue";

import './style/element-variables.scss'
import "dayjs/locale/zh-cn";
import 'echarts'
import ECharts from 'vue-echarts';
// @ts-ignore
import SvgIcon from '/@/components/SvgIcon.vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import installer from 'element-plus'

import router from "./router";
import store from "./store/index";
import directives from './directives'
const app = createApp(App);

app.use(installer,{
    locale
})
app.use(directives)
app.component('v-chart', ECharts)
app.component('svg-icon', SvgIcon);
app.use(router);
app.use(store);
app.mount("#app");
