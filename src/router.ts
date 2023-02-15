import { h, defineComponent } from "vue";
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterView
} from "vue-router";

const routerHistory = createWebHistory();

export const asyncRouters: RouteRecordRaw[] = [
  {
    path:'/',
    redirect:'/overview'
  },
  {
    path: "/",
    component: defineComponent({
      setup(props) {
        return () => h(RouterView);
      },
    }),
    children:[
      {
        name: "login",
        path: "/login",
        // @ts-ignore
        component: () => import("/@/views/login/index.vue"),
        meta: {
          name: "登录",
        },
      },
      {
        name: "overview",
        path: "/overview",
        // @ts-ignore
        component: () => import("/@/views/overview/index.vue"),
        meta: {
          name: "总体概览",
        },
      },
      {
        name: "dataAnalysis",
        path: "/dataAnalysis",
        // @ts-ignore
        component: () => import("/@/views/dataAnalysis/index.vue"),
        meta: {
          name: "数据分析",
        },
      },
      {
        name: "talentPersonnel",
        path: "/talentPersonnel",
        // @ts-ignore
        component: () => import("/@/views/talentPersonnel/index.vue"),
        meta: {
          name: "人才人事",
        },
      },
      {
        name: "talentRetrieve",
        path: "/talentRetrieve",
        // @ts-ignore
        component: () => import("/@/views/talentRetrieve/index.vue"),
        meta: {
          name: "人才检索",
        },
      },
      {
        name: "talentRetrieveDetail",
        path: "/talentRetrieveDetail",
        // @ts-ignore
        component: () => import("/@/views/talentRetrieveDetail/index.vue"),
        meta: {
          name: "人才检索详情",
        },
      },
      {
        name: "laborRelations",
        path: "/laborRelations",
        // @ts-ignore
        component: () => import("/@/views/laborRelations/index.vue"),
        meta: {
          name: "劳动关系",
        },
      },
      {
        name: "socialSecurity",
        path: "/socialSecurity",
        // @ts-ignore
        component: () => import("/@/views/socialSecurity/index.vue"),
        meta: {
          name: "社会保障",
        },
      },
      {
        name: "employmentEntrepreneurship",
        path: "/employmentEntrepreneurship",
        // @ts-ignore
        component: () => import("/@/views/employmentEntrepreneurship/index.vue"),
        meta: {
          name: "就业创业",
        },
      },
    ]
  }
];
const router = createRouter({
  history: routerHistory,
  routes: asyncRouters,
});

export default router;