<template>
  <div class="main-box">
    <div class="tp-l">
      <div class="input-box">
        <el-select v-model="inputVal" class="m-2 selsectbox" placeholder="武汉市" size="large" @change="handchangeFun" :popper-append-to-body="false">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
        </el-select>
      </div>
      <div class="content-box sydw-box">
        <div class="content-t">事业单位</div>
        <div class="content-c">
          <div class="c-t">
            <div class="img">
              <img src="/images/talentPersonnel/sydw-img.png" alt="" />
            </div>
            <div class="total-box">
              <div class="name">事业单位</div>
              <div class="num">{{ objData&&objData.unitBusinessUnitCount>0?objData.unitBusinessUnitCount:0 }} <span>家</span></div>
            </div>
          </div>
          <div class="c-m"></div>
          <div class="c-b">
            <div class="c-b-item">
              <div class="t bg1">事业单位岗位</div>
              <div class="n" style="color:#FFC000">{{ objData&&objData.unitBusinessUnitJob>0?objData.unitBusinessUnitJob:0 }} 个</div>
            </div>
            <div class="c-b-item">
              <div class="t bg1">事业单位人员</div>
              <div class="n" style="color:#FFC000">{{ objData&&objData.welfareBusinessUnitPersonnel>0?objData.welfareBusinessUnitPersonnel:0 }} 人</div>
            </div>
            <!-- <div class="c-b-item">
              <div class="t">职称证书</div>
              <div class="n">{{ objData&&objData.unitTitleCertificate>0?objData.unitTitleCertificate:0 }}个</div>
            </div>
            <div class="c-b-item">
              <div class="t">职业等级认定证书</div>
              <div class="n">{{ objData&&objData.unitProfessionalGradeCertificate>0?objData.unitProfessionalGradeCertificate:0 }}个</div>
            </div> -->
          </div>
        </div>
        <div class="bottom-bg"></div>
      </div>
      <div class="content-box zyjnjd-box">
        <div class="content-t">职业技能鉴定指导中心</div>
        <div class="content-c">
          <div class="c-t">
            <div class="img">
              <img src="/images/talentPersonnel/zyjn-img.png" alt="" />
            </div>
            <div class="total-box">
              <div class="name">职业技能鉴定机构</div>
              <div class="num">{{ objData&&objData.skillVocationalSkillAppraisalAgency>0?objData.skillVocationalSkillAppraisalAgency:0 }} <span>家</span></div>
            </div>
          </div>
          <div class="c-m"></div>
          <div class="c-b" style="padding-left:0">
            <div class="c-b-item">
              <div class="t bg2" style="height:32px">职称证书</div>
              <div class="n" style="color:#00FFFE">{{ objData&&objData.skillTitleCertificate>0?objData.skillTitleCertificate:0 }} 本</div>
            </div>
            <div class="c-b-item">
              <div class="t bg1">职业技能等级认定证书</div>
              <div class="n" style="color:#FFC000">{{ objData&&objData.unitProfessionalGradeCertificate>0?objData.unitProfessionalGradeCertificate:0 }} 本</div>
            </div>
            <div class="c-b-item">
              <div class="t">职业技能竞赛报名人数</div>
              <div class="n" style="color:#0186F7">{{ objData&&objData.competitionRegistrationNumber>0?objData.competitionRegistrationNumber:0 }} 人</div>
            </div>
          </div>
        </div>
        <div class="bottom-bg"></div>
      </div>
      <div class="content-box gzfl-box">
        <div class="content-t">工资定级人员</div>
        <div class="content-c">
          <div class="c-t">
            <div class="img">
              <img src="/images/talentPersonnel/gzfl-img.png" alt="" />
            </div>
            <div class="total-box">
              <div class="name">机关事业单位</div>
              <div class="num">{{ objData&&objData.organBusinessUnit>0?objData.organBusinessUnit:0 }} <span>家</span></div>
            </div>
          </div>
          <div class="c-m"></div>
          <div class="c-b">
            <div class="c-b-item">
              <div class="t bg2">事业单位人员</div>
              <div class="n" style="color:#00FFFE">{{ objData&&objData.institutionalStaff>0?objData.institutionalStaff:0 }} 人</div>
            </div>
             <div class="c-b-item">
              <div class="t bg2">政府机关工勤人员</div>
              <div class="n" style="color:#00FFFE">{{ objData&&objData.governmentAgencyWorker>0?objData.governmentAgencyWorker:0 }} 人</div>
            </div>
          </div>
        </div>
        <div class="bottom-bg"></div>
      </div>
    </div>
    <div class="tp-m">
      <centerArea3D v-if="mapData.length > 0" :value="inputVal || '武汉市'" :data="mapData" />
    </div>
    <div class="tp-r">
      <div class="content-box zyjsry-box">
        <div class="content-t">专业技术人员管理处</div>
        <div class="content-c">
          <div class="c-t">
            <div class="img">
              <img src="/images/talentPersonnel/zyjsry-img.png" alt="" />
            </div>
            <div class="total-box">
              <div class="name">职称证书</div>
              <div class="num">{{ objData&&objData.unitTitleCertificate>0?objData.unitTitleCertificate:0 }} <span>万本</span></div>
            </div>
          </div>
          <div class="c-m"></div>
          <div class="c-b">
            <div class="c-b-item">
              <div class="t bg1">初级技术人员</div>
              <div class="n" style="color:#FFC000">{{ objData&&objData.juniorTechnicalStaff>0?objData.juniorTechnicalStaff:0 }} 人</div>
            </div>
            <div class="c-b-item">
              <div class="t bg1">中级技术人员</div>
              <div class="n" style="color:#FFC000">{{ objData&&objData.intermediateTechnicalStaff>0?objData.intermediateTechnicalStaff:0 }} 人</div>
            </div>
            <div class="c-b-item">
              <div class="t">高级技术人员</div>
              <div class="n" style="color:#0186F7">{{ objData&&objData.seniorTechnicalStaff>0?objData.seniorTechnicalStaff:0 }} 人</div>
            </div>
            <div class="c-b-item">
              <div class="t">专业技术人员专家</div>
              <div class="n" style="color:#0186F7">{{ objData&&objData.technologyProfessionalSkillWorker>0?objData.technologyProfessionalSkillWorker:0 }} 人</div>
            </div>
            <!-- <div class="c-b-item">
              <div class="t">继续教育学员</div>
              <div class="n">{{ objData&&objData.continueEducationTrainees>0?objData.continueEducationTrainees:0 }}人</div>
            </div> -->
          </div>
        </div>
        <div class="bottom-bg"></div>
      </div>
      <div class="content-box rsks-box">
        <div class="content-t">人事考试</div>
        <div class="content-c">
          <div class="c-t">
            <div class="img">
              <img src="/images/talentPersonnel/rsks-img.png" alt="" />
            </div>
            <div class="total-box">
              <div class="name">评委会人数</div>
              <div class="num">{{ objData&&objData.juryNumber>0?objData.juryNumber:0 }} <span>人</span></div>
            </div>
          </div>
          <div class="c-m"></div>
          <div class="c-b">
            <div class="c-b-item">
              <div class="t bg2">职称评审参与人数</div>
              <div class="n" style="color:#00FFFF">{{ objData&&objData.reviewTitle>0?objData.reviewTitle:0 }} 人</div>
            </div>
            <div class="c-b-item">
              <div class="t bg1">传统考试报名</div>
              <div class="n" style="color:#FFC000">{{ objData&&objData.traditionalExamRegistration>0?objData.traditionalExamRegistration:0 }} 人</div>
            </div>
          </div>
        </div>
        <div class="bottom-bg"></div>
      </div>
      <div class="content-box zynljs-box">
        <div class="content-t">职业能力建设处</div>
        <div class="content-c">
          <div class="c-m"></div>
          <div class="c-b">
            <div class="c-b-item">
              <div class="t bg2">技工院校</div>
              <div class="n" style="color:#00FFFF">{{ objData&&objData.technicalCollege>0?objData.technicalCollege:0 }}个</div>
            </div>
            <div class="c-b-item">
              <div class="t bg2">培训机构</div>
              <div class="n" style="color:#00FFFF">{{ objData&&objData.abilityMechanicTrainingAgency>0?objData.abilityMechanicTrainingAgency:0 }}个</div>
            </div>
            <div class="c-b-item">
              <div class="t bg1">职业技能专家</div>
              <div class="n" style="color:#FFC000">{{ objData&&objData.professionalSkillSpecialist>0?objData.professionalSkillSpecialist:0 }}人</div>
            </div>
            <div class="c-b-item">
              <div class="t bg1">学生</div>
              <div class="n" style="color:#FFC000">{{ objData&&objData.student>0?objData.student:0 }}人</div>
            </div>
          </div>
        </div>
        <div class="bottom-bg"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import centerArea3D from './components/centerArea3D/index.vue'
import Chart, { echarts } from '/@/components/chart.vue'
import { defineComponent, nextTick, reactive, ref, toRefs,onMounted } from 'vue'
import http from '/@/config/http'

export default defineComponent({
  components: {
    Chart,
    centerArea3D
  },
  setup() {
    const state = reactive({
      inputVal: '',
      objData:null,
      options: [
        {
          value: '420100000000',
          label: '武汉市'
        },
        {
          value: '420115000000',
          label: '江夏区'
        },
        {
          value: '420113000000',
          label: '武汉经开区（汉南区）'
        },
        {
          value: '420114000000',
          label: '蔡甸区'
        },
        {
          value: '420105000000',
          label: '汉阳区'
        },
        {
          value: '420104000000',
          label: '硚口区'
        },
        {
          value: '420112000000',
          label: '东西湖区'
        },
        {
          value: '420103000000',
          label: '江汉区'
        },
        {
          value: '420102000000',
          label: '江岸区'
        },
        {
          value: '420106000000',
          label: '武昌区'
        },
        {
          value: '420107000000',
          label: '青山区'
        },
        {
          value: '420111000000',
          label: '洪山区'
        },
        {
          value: '420116000000',
          label: '黄陂区'
        },
        {
          value: '420117000000',
          label: '新洲区'
        }
      ],
      mapData:[]
    })
    const handchangeFun = () => {
      console.log('inputVal---', state.inputVal)
      let id = state.options.filter((item:any) => { return item.label == state.inputVal})[0].value
      console.log("ididid",id)
      getData(id)
    }
    const getData = (id:string) => {
      http.get('/renshedata/talentpersonneldetail/list?districtId=' + id).then(({code,data}) => {
        if(code === 200){
          console.log("区划id查数据=",data)
          state.objData = data.records[0]
        }
      })
    }
    const getMapData = () => {
      let obj = {
        size:20
      }
      http.get('/renshedata/talentpersonneldetail/list?',obj).then(({code,data}) => {
        if(code === 200){
          state.mapData = data.records.map((item:any) => {
            return {
              districtId:item.districtId,
              unitBusinessUnitCount:item.unitBusinessUnitCount,
              unitBusinessUnitJob:item.unitBusinessUnitJob,
              welfareBusinessUnitPersonnel:item.welfareBusinessUnitPersonnel
            }
          })
          console.log("人才人事地图数据",data.records)
        }
      })
    }
    onMounted(() => {
      getData('420100000000')
      getMapData()
    })
    return {
      ...toRefs(state),
      handchangeFun,
      getData
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
  .tp-l,.tp-r {
    .input-box {
      width: 425px;
      height: 48px;
      margin-bottom: 30px;
    }
    .content-box {
      .content-t {
        width: 425px;
        height: 49px;
        background: url('/images/overview/l1-title.png') no-repeat;
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 42px;
        margin: 0 auto;
        padding-left: 35px;
      }
      .content-c {
        width: 425px;
        border-radius: 10px;
        background: rgba(0, 126, 255, 0.1);
        padding: 20px 15px;
        .c-t{
          display: flex;
          .img{
            width: 140px;
            height: 120px;
            >img{
              width: 100%;
            }
          }
          .total-box{
            margin-left: 10px;
            .name{
              font-size: 18px;
              color: #fff;
              margin: 25px 0 16px 0;
            }
            .num{
              color: #0095ff;
              font-size: 48px;
              >span{
                font-size: 18px;
              }
            }
          }
        }
        .c-m{
          
        }
        .c-b{
          display: flex;
          flex-wrap: wrap;
          margin-top: 5px;
          font-size: 16px;
          padding-left: 20px;
          .c-b-item{
            width: 50%;
            margin-top: 25px;
            .t{
              padding-left: 20px;
              background: url("/images/talentPersonnel/bg-icon.png") no-repeat;
            }
            .n{
              margin-top: 10px;
              padding-left: 20px;
            }
          }
        }
      }
    }
    .sydw-box {
      .content-t{
        // background: url("/images/talentPersonnel/sydw-t-bg.png") no-repeat;
      }
      .content-c {
        height: 250px;
      }
    }
    .zyjnjd-box {
      margin: 19px 0;
      .content-t{
        // background: url("/images/talentPersonnel/zyjn-t-bg.png") no-repeat;
      }
      .content-c {
        height: 242px;
        .c-b{
          .c-b-item{
            width: 33.3333%;
          }
        }
      }
    }
    .gzfl-box {
      .content-t{
        // background: url("/images/talentPersonnel/gzfl-t-bg.png") no-repeat;
      }
      .content-c {
        height: 215px;
        padding: 10px 14px;
      }
    }
    .zyjsry-box {
      .content-t{
        // background: url("/images/talentPersonnel/zyjsry-t-bg.png") no-repeat;
      }
      .content-c {
        height: 320px;
      }
    }
    .rsks-box {
      margin: 35px 0;
      .content-t{
        // background: url("/images/talentPersonnel/rsks-t-bg.png") no-repeat;
      }
      .content-c {
        height: 240px;
        .c-b{
          .c-b-item{
            width: 50%;
          }
        }
      }
    }
    .zynljs-box {
      .content-t{
        // background: url("/images/talentPersonnel/zynljs-t-bg.png") no-repeat;
      }
      .content-c {
        height: 193px;
      }
    }
  }
  .tp-m{
    width: 940px;
    padding: 0 20px;
  }
}

.content-box {
  position: relative;
  .bottom-bg{
    width: 100%;
    height: 8px;
    background: url('/images/overview/bottom-bg.png') no-repeat;
    background-size: contain;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

.bg1{
  background: url("/images/talentPersonnel/bg1.png") no-repeat !important;
}
.bg2{
  background: url("/images/talentPersonnel/bg2.png") no-repeat !important;
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

::v-deep .el-select-dropdown__wrap{
  max-height: 500px;
  background: #00161f;
  color: #fff;
}

::v-deep .el-select-dropdown__empty{
  background: #00161f;
  color: #fff;
}

::v-deep .el-select-dropdown__item{
  // color: #fff;
  font-size: 24px;
}

</style>
