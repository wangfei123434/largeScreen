<template>
  <div class="main-box">
    <div class="box1" v-if="searchIsShow && !detailIsShow">
      <input type="text" v-model="searchVal" placeholder="请输入身份证号全名或者单位名称搜索" />
      <div class="btn-box" @click="searchFun">搜 索</div>
    </div>
    <div class="box2" v-if="!searchIsShow && !detailIsShow">
      <div class="search-box">
        <input type="text" v-model="searchVal" placeholder="请输入身份证号全名或者单位名称搜索" />
        <div class="btn-box" @click="searchFun">搜 索</div>
      </div>
      <div class="bg-box">
        <div class="txt1">搜索结果</div>
        <div class="txt2">已为你查询到{{ totalNum }}条结果</div>
      </div>
      <div class="c-box">
        <div class="table-box" v-if="listData.length > 0">
          <div class="item" v-for="(item, index) in listData" :key="index" @click="goDetail(item)">
            <div class="name">{{ item.chineseName }}</div>
            <div class="sex">
              <div class="lable">性别：</div>
              <div class="txt">{{ item.gender }}</div>
            </div>
            <div class="user-id">
              <div class="lable">身份证号码：</div>
              <div class="txt">{{ item.idCard }}</div>
            </div>
            <div class="address">
              <div class="lable">单位名称：</div>
              <div class="txt">{{ item.workUnit }}</div>
            </div>
            <div class="goDetail-btn">查看详情 ></div>
          </div>
        </div>
        <div class="pagination-box" v-if="listData.length > 0">
          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, prev, pager, next, jumper"
            :total="totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
        <!-- 占位图 -->
        <div class="zw-box" v-if="listData.length == 0">
          <img src="/images/talentRetrieve/zw-img.png" />
          <div>未查询到相关内容</div>
        </div>
      </div>
    </div>
    <div class="box3" v-if="detailIsShow">
      <div class="goback" @click="goBackFun"><span></span>返回</div>
      <div class="box3-t">
        <div class="t1">
          <div class="name">{{ detailData.chineseName }}</div>
          <div class="sex">
            <div class="lable">性别：</div>
            <div class="txt">{{ detailData.gender }}</div>
          </div>
          <div class="user-id">
            <div class="lable">身份证号码：</div>
            <div class="txt">{{ detailData.idCard }}</div>
          </div>
          <div class="address">
            <div class="lable">单位名称：</div>
            <div class="txt">{{ detailData.workUnit }}</div>
          </div>
          <img class="info-img" v-if="txImgUrl" :src="txImgUrl" />
        </div>
        <div class="t2">
          <div class="t2-c">
            <div class="t2-c-item">
              <div>
                <span>社保卡号：</span>
                <span>{{ sbObj && sbObj.socialCard }}</span>
              </div>
              <div>
                <span>参保状态：</span>
                <span>{{ sbObj && sbObj.personnelInsuredStatus }}</span>
              </div>
              <div>
                <span>参加工作日期：</span>
                <span>{{ sbObj && sbObj.attendWorkDate }}</span>
              </div>
              <div>
                <span>首次参保年份：</span>
                <span>{{ sbObj && sbObj.firstYearInsured }}</span>
              </div>
            </div>
            <div class="t2-c-item">
              <div>
                <span>离退休状态：</span>
                <span>{{ sbObj && sbObj.retirementCategory }}</span>
              </div>
              <div>
                <span>参保所属机构：</span>
                <span>{{ sbObj && sbObj.insuredOrgan }}</span>
              </div>
              <div>
                <span>人员类型：</span>
                <span>{{ sbObj && sbObj.personnelType }}</span>
              </div>
              <div>
                <span>人员类别：</span>
                <span>{{ sbObj && sbObj.personnelCategory }}</span>
              </div>
            </div>
            <div class="t2-c-item">
              <div>
                <span>退休待遇开始年月：</span>
                <span>{{ sbObj && sbObj.retirementBenefitsYearMonth }}</span>
              </div>
              <div>
                <span>国家职业资格等级(技能人员等级)：</span>
                <span>{{ sbObj && sbObj.vocationalQualificationLevel }}</span>
              </div>
              <div>
                <span>政治面貌：</span>
                <span>{{ sbObj && sbObj.politicsStatus }}</span>
              </div>
              <div>
                <span>人员身份：</span>
                <span>{{ sbObj && sbObj.personnelIdentity }}</span>
              </div>
            </div>
            <!-- <div class="t2-c-item">
              <div>
                <span>社保欠费区间：</span>
                <span>{{ sbObj && sbObj.socialSecurityArrearsRange }}</span>
              </div>
              <div>
                <span>失业保险个人缴费：</span>
                <span>{{ sbObj && sbObj.unemploymentInsurancePersonalPayment }}</span>
              </div>
            </div> -->
          </div>
        </div>
        <div class="t3">社保信息</div>
        <div class="t4">最近一次登录社保系统时间：{{ sbObj && sbObj.recentlyLogin }}</div>
      </div>
      <div class="box3-b">
        <div class="tabs-box">
          <div class="img">
            <img src="/images/talentRetrieve/l-btn.png" />
          </div>
          <div class="ul">
            <div
              :class="tabsActive === index ? 'tabs-item tabs-active' : 'tabs-item'"
              v-for="(item, index) in tabsList"
              :key="index"
              @click="tabsClickFun(index)"
            >
              {{ item }}
            </div>
          </div>
          <div class="img r-img">
            <img src="/images/talentRetrieve/l-btn.png" />
          </div>
        </div>
        <div class="tabs-c">
          <di class="tabs-c-box" v-if="tabsActive === 0">
            <div class="c-box-child">
              <div>
                <span>姓名：</span>
                <span>{{ jbObj.chineseName }}</span>
              </div>
              <!-- <div>
                <span>姓名(拼音)：</span>
                <span>{{ jbObj.pinyinName }}</span>
              </div>
              <div>
                <span>姓名(外文)：</span>
                <span>{{ jbObj.foreignName }}</span>
              </div> -->
              <div>
                <span>性别：</span>
                <span>{{ jbObj.gender }}</span>
              </div>
              <div>
                <span>国籍：</span>
                <span>{{ jbObj.nationality }}</span>
              </div>
              <div>
                <span>民族：</span>
                <span>{{ jbObj.national }}</span>
              </div>
              <div>
                <span>出生日期：</span>
                <span>{{ jbObj.birthday }}</span>
              </div>
              <div>
                <span>政治面貌：</span>
                <span>{{ jbObj.politicalStatus }}</span>
              </div>
              <div>
                <span>证件类型：</span>
                <!-- <span>{{ jbObj.certificateType }}</span> -->
                <span>身份证</span>
              </div>
              <div>
                <span>证件号码：</span>
                <span>{{ jbObj.idCard }}</span>
              </div>
              <div>
                <span>联系电话：</span>
                <span>{{ jbObj.phoneNumber }}</span>
              </div>
              <div>
                <span>电子邮件：</span>
                <span>{{ jbObj.email }}</span>
              </div>
            </div>
            <div class="c-box-child">
              <div>
                <span>户籍地址：</span>
                <span>{{ jbObj.residenceAddress }}</span>
              </div>
              <div>
                <span>现居地址：</span>
                <span>{{ jbObj.currentAddress }}</span>
              </div>
              <!-- <div>
                <span>迁入类型：</span>
                <span>{{ jbObj.moveInType }}</span>
              </div>
              <div>
                <span>迁入时间：</span>
                <span>{{ jbObj.moveInDate }}</span>
              </div>
              <div>
                <span>迁来地址：</span>
                <span>{{ jbObj.moveInAddress }}</span>
              </div> -->
              <div>
                <span>婚姻状态：</span>
                <span>{{ jbObj.maritalStatus }}</span>
              </div>
            </div>
            <div class="c-box-child">
              <div>
                <span>毕业院校：</span>
                <span>{{ jbObj.graduateSchool }}</span>
              </div>
              <div>
                <span>毕业时间：</span>
                <span>{{ jbObj.graduateDate }}</span>
              </div>
              <!-- <div>
                <span>毕业证号：</span>
                <span>{{ jbObj.graduateCard }}</span>
              </div> -->
              <div>
                <span>专业：</span>
                <span>{{ jbObj.professional }}</span>
              </div>
              <div>
                <span>学位：</span>
                <span>{{ jbObj.degree }}</span>
              </div>
              <!-- <div>
                <span>学位证号：</span>
                <span>{{ jbObj.degreeCard }}</span>
              </div> -->
              <div>
                <span>学历：</span>
                <span>{{ jbObj.education }}</span>
              </div>
              <div>
                <span>技术职称：</span>
                <span>{{ jbObj.technicalTitles }}</span>
              </div>
              <div>
                <span>职称级别：</span>
                <span>{{ jbObj.titleLevel }}</span>
              </div>
            </div>
          </di>
          <div class="tabs-c-box" v-if="tabsActive === 1">
            <div class="tabs-c-box-content">
              <!-- <div class="t">
                <span>海外教育经历：</span>
                <span>{{ jbObj.isForeignEducation === 1 ? '有' : '无' }}</span>
              </div> -->
              <div class="c">
                <div class="tabs-c-box-content-item" v-for="(item, index) in jyData" :key="index">
                  <div>
                    <span>开始时间：</span>
                    <span>{{ item.startDate }}</span>
                  </div>
                  <div>
                    <span>结束时间：</span>
                    <span>{{ item.endDate }}</span>
                  </div>
                  <!-- <div>
                    <span>国家：</span>
                    <span>{{ item.country }}</span>
                  </div> -->
                  <div>
                    <span>院校：</span>
                    <span>{{ item.school }}</span>
                  </div>
                  <div>
                    <span>专业：</span>
                    <span>{{ item.profession }}</span>
                  </div>
                  <div>
                    <span>学位：</span>
                    <span>{{ item.degree }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tabs-c-box" v-if="tabsActive === 2">
            <div class="tabs-c-box-content">
              <!-- <div class="t">
                <span>海外工作经历：</span>
                <span>{{ jbObj.isForeignWork === 1 ? '有' : '无' }}</span>
              </div> -->
              <div class="c">
                <div class="tabs-c-box-content-item" v-for="(item, index) in gzData" :key="index">
                  <div>
                    <span>开始时间：</span>
                    <span>{{ item.startDate }}</span>
                  </div>
                  <div>
                    <span>结束时间：</span>
                    <span>{{ item.endDate }}</span>
                  </div>
                  <div>
                    <span>国家：</span>
                    <span>{{ item.country }}</span>
                  </div>
                  <div>
                    <span>单位：</span>
                    <span>{{ item.unit }}</span>
                  </div>
                  <div>
                    <span>职务：</span>
                    <span>{{ item.position }}</span>
                  </div>
                  <div>
                    <span>备注(兼职请备注)：</span>
                    <span>{{ item.remark }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tabs-c-box" v-if="tabsActive === 3">
            <div class="tabs-c-box-content">
              <div class="c">
                <div class="tabs-c-box-content-item" v-for="(item, index) in zcjnData" :key="index">
                  <div>
                    <span>证书编号：</span>
                    <span>{{ item.certificateNumber }}</span>
                  </div>
                  <div>
                    <span>专业名称(工种)：</span>
                    <span>{{ item.professionalTitle }}</span>
                  </div>
                  <div>
                    <span>职称名称：</span>
                    <span>{{ item.jobTitle }}</span>
                  </div>
                  <div>
                    <span>职称级别：</span>
                    <span>{{ item.level }}</span>
                  </div>
                  <div>
                    <span>发证日期：</span>
                    <span>{{ item.issueCertificateDate }}</span>
                  </div>
                   <div>
                    <span>评审组织：</span>
                    <span>{{ item.reviewOrganization }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Chart, { echarts } from '/@/components/chart.vue'
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import http from '/@/config/http'

export default defineComponent({
  components: {
    Chart
  },
  setup() {
    const state = reactive({
      searchIsShow: true,
      detailIsShow: false,
      searchVal: '',
      currentPage: 1,
      pageSize: 6,
      totalNum: 0,
      tabsActive: 0,
      tabsList: ['基本信息', '教育信息', '工作信息', '职称技能信息'],
      detailId: '', //详情id
      listData: [], //列表
      detailData: null, //详情个人信息
      sbObj: null, //详情社保信息
      jbObj: null, //基本信息
      jyData:[],//教育信息
      gzData:[],//工作信息
      zcjnData:[],//职称技能信息
      txImgUrl:''
    })
    const searchFun = () => {
      console.log('searchVal--', state.searchVal)
      state.searchIsShow = false
      state.currentPage = 1
      document.getElementsByClassName('page-wrapper')[0].style.backgroundImage = 'none'
      getData()
    }
    const handleSizeChange = () => {}
    const handleCurrentChange = () => {
      getData()
    }
    const goDetail = (item: any) => {
      state.detailData = item
      state.jbObj = state.listData.filter((obj: any) => {
        return obj.id == item.id
      })[0]
      state.detailIsShow = true
      state.detailId = item.id
      getDetailSB(item.id)
      getInfoUrl(item.idNumber)
    }
    const goBackFun = () => {
      state.tabsActive = 0
      state.detailIsShow = false
      state.sbObj = null
      state.jyData = []
      state.gzData = []
      state.zcjnData = []
      state.txImgUrl = ''
    }
    const tabsClickFun = (index: number) => {
      state.tabsActive = index
      if (index === 1) {
        getDetailJY(state.detailId)
      }else if(index === 2){
        getDetailGZ(state.detailId)
      }else if(index === 3){
        getDetailGZJN(state.detailId)
      }
    }
    // 获取列表信息
    const getData = () => {
      const params = {
        nameIdNumberOrWorkUnit: state.searchVal,
        size: state.pageSize,
        current: state.currentPage
      }
      http.get('/renshedata/talentinformation/page', params).then(({ code, data }) => {
        if (code === 200) {
          state.listData = data.records
          state.totalNum = data.total
        }
      })
    }
    // 获取社保信息
    const getDetailSB = (id: string) => {
      http.get('/renshedata/socialsecurityinformation/page?talentId=' + id).then(({ code, data }) => {
        if (code === 200) {
          state.sbObj = data.records[0]
        }
      })
    }
    // 新增获取头像
    const getInfoUrl = (sbAccount:string) => {
      http.post(`/renshedata/qrcodes/getScrzService?sbAccount=${sbAccount}`,{},{}).then(({ code, data }) => {
        console.log("图片URl",data.data);
        if(code == 200){
          state.txImgUrl = 'data:image/png;base64,' + data.data
        }
      })
    }
    // 获取教育信息
    const getDetailJY = (id: string) => {
      http.get('/renshedata/educationinformation/list?talentId=' + id).then(({ code, data }) => {
        if (code === 200) {
          state.jyData = data.records
        }
      })
    }
    // 获取工作信息
    const getDetailGZ = (id: string) => {
      http.get('/renshedata/workinformation/list?talentId=' + id).then(({ code, data }) => {
        if (code === 200) {
          state.gzData = data.records
        }
      })
    }
    // 获取职称技能信息
    const getDetailGZJN = (id: string) => {
      http.get('/renshedata/titleskillinformation/list?talentId=' + id).then(({ code, data }) => {
        if (code === 200) {
          state.zcjnData = data.records
        }
      })
    }


    return {
      ...toRefs(state),
      searchFun,
      handleSizeChange,
      handleCurrentChange,
      goDetail,
      goBackFun,
      getData,
      tabsClickFun,
      getDetailJY,
      getDetailGZ,
      getDetailGZJN,
      getInfoUrl
    }
  }
})
</script>
<style lang="scss" scoped>
.main-box {
  color: #fff;
  margin: 0 auto;
  .box1 {
    margin-top: 280px;
    width: 1320px;
    height: 178px;
    background: url('/images/talentRetrieve/input-big-bg.png') no-repeat;
    position: relative;
    > input {
      width: 800px;
      height: 68px;
      position: absolute;
      top: 52px;
      left: 200px;
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
    }
    .btn-box {
      width: 187px;
      height: 67px;
      line-height: 67px;
      text-align: center;
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      position: absolute;
      top: 52px;
      right: 0px;
      cursor: pointer;
    }
  }
  .box2 {
    width: 1800px;
    margin: 0 auto;
    .search-box {
      width: 950px;
      height: 134px;
      margin: 0 auto;
      background: url('/images/talentRetrieve/input-small-bg.png') no-repeat;
      position: relative;
      > input {
        width: 600px;
        height: 50px;
        position: absolute;
        top: 39px;
        left: 130px;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
      }
      .btn-box {
        width: 135px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 21px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
        position: absolute;
        top: 39px;
        right: 0px;
        cursor: pointer;
      }
    }
    .bg-box {
      width: 1800px;
      margin: 0 auto;
      height: 114px;
      background: url('/images/talentRetrieve/line-bg.png') no-repeat;
      display: flex;
      justify-content: space-between;
      padding: 0 33px;
      > div {
        padding-top: 80px;
      }
      .txt1 {
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
      }
      .txt2 {
        color: #fff;
        font-size: 14px;
      }
    }
    .c-box {
      width: 1800px;
      margin: 0 auto;
      height: 667px;
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0px 0px 10px 0px #000000;
      border-radius: 10px;
      padding: 20px 25px;
      .table-box {
        display: flex;
        flex-wrap: wrap;
        height: 532px;
        .item {
          width: 557px;
          height: 246px;
          background: #001330;
          border: 4px solid #00a5f9;
          box-shadow: 0px 0px 16px 0px rgba(0, 218, 255, 0.66);
          border-radius: 10px;
          margin: 10px 12px;
          padding: 0 35px;
          cursor: pointer;
          background: url('/images/talentRetrieve/item-bg.png') no-repeat;
          background-size: contain;
          > div {
            font-size: 18px;
            font-weight: bold;
            display: flex;
            margin-top: 23px;
            .lable {
              width: 120px;
              opacity: 0.6;
            }
            .txt {
              width: 360px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .name {
            font-size: 24px;
          }
          .goDetail-btn {
            font-size: 20px;
            font-weight: bold;
            color: #00c3dd;
            text-align: right;
            display: block;
          }
        }
      }
      .pagination-box {
        margin: 60px 0 0 1140px;
      }
      .zw-box {
        width: 156px;
        font-size: 16px;
        color: #fff;
        margin: 200px auto;
        > div {
          text-align: center;
        }
      }
    }
  }
  .box3 {
    width: 1800px;
    margin: 50px auto 0 auto;
    .goback {
      width: 96px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background: rgba(36, 175, 255, 0.12);
      border: 1px solid #0033f0;
      border-radius: 6px;
      cursor: pointer;
      margin-bottom: 30px;
      >span{
        transform: rotate(225deg);
        width: 9px;
        height: 9px;
        border-top: 2px solid #867f7a;
        border-right: 2px solid #867f7a;
        margin-right: 15px;
        border-color: #fff;
      }
    }
    .box3-t {
      position: relative;
      height: 230px;
      .t1 {
        width: 550px;
        height: 200px;
        background: linear-gradient(135deg, #136bff, #24afff);
        border-radius: 8px;
        position: absolute;
        left: 25px;
        background: url('/images/talentRetrieve/detail-bg.png') no-repeat;
        background-size: contain;
        z-index: 2;
        padding: 0 35px;
        > div {
          font-size: 18px;
          font-weight: bold;
          display: flex;
          margin-top: 23px;
          .lable {
            width: 120px;
            opacity: 0.6;
          }
          .txt {
            width: 360px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .info-img{
          width: 100px;
          height: 100px;
          border: 1px solid #fff;
          position: absolute;
          top: 0;
          right: 0;
        }
        .name {
          font-size: 24px;
        }
        .goDetail-btn {
          font-size: 20px;
          font-weight: bold;
          color: #00c3dd;
          text-align: right;
          display: block;
        }
      }
      .t2 {
        width: 100%;
        height: 179px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px 10px 0px 0px;
        position: absolute;
        top: 50px;
        padding: 35px;
        .t2-c {
          margin-left: 637px;
          display: flex;
          .t2-c-item {
            // width: 250px;
            margin-right: 50px;
            > div {
              margin-bottom: 15px;
              font-size: 14px;
              span {
                margin-right: 5px;
              }
            }
          }
        }
      }
      .t3 {
        height: 25px;
        background: url('/images/talentRetrieve/bg-icon.png') no-repeat;
        position: absolute;
        left: 647px;
        padding-left: 20px;
        font-size: 20px;
        text-shadow: 0px 4px 10px rgba(20, 67, 75, 0.66);
        font-weight: bold;
        top: 15px;
      }
      .t4 {
        font-size: 14px;
        color: #fff;
        opacity: 0.6;
        position: absolute;
        right: 50px;
        top: 20px;
      }
    }
    .box3-b {
      width: 100%;
      height: 558px;
      background: rgba(0, 126, 255, 0.1);
      border-radius: 10px;
      margin-top: 20px;
      padding: 24px;
      .tabs-box {
        border-bottom: 1px solid #136bff;
        display: flex;
        .img {
          width: 30px;
          height: 30px;
          > img {
            width: 100%;
          }
        }
        .r-img {
          transform: rotate(180deg);
        }
        .ul {
          width: 1690px;
          display: flex;
          padding-bottom: 10px;
          .tabs-item {
            line-height: 30px;
            font-size: 18px;
            color: #fff;
            opacity: 0.4;
            margin: 0 20px;
            padding-left: 20px;
            cursor: pointer;
          }
          .tabs-active {
            font-size: 20px;
            font-weight: bold;
            opacity: 1;
            background: url('/images/talentRetrieve/bg-icon.png') no-repeat;
            background-size: contain;
            background-position-y: 10px;
          }
        }
      }
      .tabs-c {
        font-size: 14px;
        padding: 38px 50px;
        .tabs-c-box {
          display: flex;
          .c-box-child {
            width: 450px;
            > div {
              margin-bottom: 20px;
            }
          }
          .tabs-c-box-content {
            height: 438px;
            overflow-y: scroll;
            .c {
              display: flex;
              flex-wrap: wrap;
              .tabs-c-box-content-item {
                border: 1px solid #ccc;
                margin: 20px 30px 0px 0;
                width: 500px;
                padding: 20px 20px 0 20px;
                > div {
                  margin-bottom: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fff;
}
</style>
