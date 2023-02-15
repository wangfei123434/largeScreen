import * as echarts from 'echarts/core'
import {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
  MapSeriesOption,
  EffectScatterSeriesOption,
  LinesSeriesOption,
  ScatterSeriesOption
} from 'echarts/charts'
import {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponentOption,
  // 数据集组件
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  GeoComponentOption
} from 'echarts/components'
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | MapSeriesOption
  | GeoComponentOption
  | EffectScatterSeriesOption
  | LinesSeriesOption
  | ScatterSeriesOption
>
import wuhanJson from './wuhan.json'
import bgIMG from './bg.png'
export const LoadImg = (src: string, echarts: echarts.ECharts): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    let fullImage = new Image()
    let img = new Image()
    if (echarts) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      canvas.width = echarts.getWidth() * window.devicePixelRatio
      canvas.height = echarts.getHeight() * window.devicePixelRatio
      img.onload = () => {
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          fullImage.src = canvas.toDataURL()
          resolve(fullImage)
        }
      }
    } else {
      img.onload = () => {
        resolve(fullImage)
      }
    }

    img.src = src
  })
}

export default (myChart: echarts.ECharts,data:any[]=[],areaData:any[]) => {
  // const area = [
  //   { name: '江夏区', value: [50, 20] ,_key_:'420115'},
  //   { name: '武汉经开区（汉南区）', value: [25, 25],_key_:'420113' },
  //   { name: '蔡甸区', value: [20, 35] ,_key_:'420114'},
  //   { name: '汉阳区', value: [38, 40],_key_:'420105' },
  //   { name: '硚口区', value: [37, 46.5] ,_key_:'420104'},
  //   { name: '东西湖区', value: [28, 50],_key_:'420112' },
  //   { name: '江汉区', value: [40, 47.5],_key_:'420103' },
  //   { name: '江岸区', value: [44, 48] ,_key_:'420102'},
  //   { name: '武昌区', value: [46, 42],_key_:'420106' },
  //   { name: '青山区', value: [53, 49],_key_:'420106' },
  //   { name: '洪山区', value: [56, 40] ,_key_:'420111'},
  //   { name: '黄陂区', value: [45, 66] ,_key_:'420116'},
  //   { name: '新洲区', value: [75, 60] ,_key_:'420117'}
  // ]
  const area = areaData
  LoadImg(bgIMG, myChart).then((bgIMG) => {
    // echarts.registerMap('wuhan', wuhanJson)
    var option: ECOption = {
      backgroundColor: {
        image: bgIMG,
        repeat: 'no-repeat'
      },
      tooltip: {
        // triggerOn: 'click',
        trigger: 'item',
        appendToBody: true,
        // enterable: true,
        // formatter: '{a} <br/>{b} : {c} ({d}%)',
        formatter: (params: Record<string, any>) => {
          return `<div 
            style="
              width: 216px; 
              height: 37px;  
              background: linear-gradient(to right, #244EFF, transparent); 
              border-radius: 4px;
              font-size: 18px;
              line-height: 37px;
              font-style: italic;
              color: #FFFFFF;
              padding-left: 11px;
            "
          >${params.name}</div>
          <p style="
              margin-top: 17px;
              font-size: 14px;
              font-weight: bold;
              font-style: italic;
              color: #FFFFFF;
              padding-left: 10px;
            ">
            <label style="display:inline-block;width:80px">人口总数</label>
            <span style='margin-left: 68px;color: #FBA747;'>${(Number(params.data.insuredNumber) + Number(params.data.uninsuredNumber)).toFixed(1)}万人</span>
          </p>
          <p style="
              margin-top: 17px;
              font-size: 14px;
              font-weight: bold;
              font-style: italic;
              color: #FFFFFF;
              padding-left: 10px;
            ">
            <label style="display:inline-block;width:80px">参保</label>
            <span style='margin-left: 68px;color: #FBA747;'>${params.data.insuredNumber}万人</span>
          </p>
          <p style="
              margin-top: 17px;
              font-size: 14px;
              font-weight: bold;
              font-style: italic;
              color: #FFFFFF;
              padding-left: 10px;
            ">
            <label style="display:inline-block;width:80px">未参保</label>
            <span style='margin-left: 68px;color: #FBA747;'>${params.data.uninsuredNumber}万人</span>
          </p>
          <p style="
              margin-top: 17px;
              font-size: 14px;
              font-weight: bold;
              font-style: italic;
              color: #FFFFFF;
              padding-left: 10px;
            ">
            <label style="display:inline-block;width:80px">全民参保比例</label>
            <span style='margin-left: 68px;color: #FBA747;'>${(Number(params.data.insuredNumber) / (Number(params.data.insuredNumber) + Number(params.data.uninsuredNumber))*100).toFixed(2)}%</span>
          </p>
          `
        },
        borderColor: '#4BB9FF',
        backgroundColor: 'rgba(0, 32, 118, 0.8)',
        borderRadius: 4,
      },
      grid: {
        left: 0,
        bottom: 0,
        top: 0,
        right: 0
      },
      xAxis: {
        show: false,
        type: 'value',
        position: 'bottom',
        boundaryGap: false,
        data: [0, 100],
        max: 100
      },
      yAxis: {
        show: false,
        type: 'value',
        position: 'left',
        axisLine: {
          // show: false
        },
        data: [0, 100],
        max: 100
      },
      series: [
        //波纹
        {
          type: 'effectScatter',
          silent: true,
          tooltip: {
            // show: false,
          },
          coordinateSystem: 'cartesian2d',
          rippleEffect: {
            color: '#3EF7FF',
            //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 6 //波纹圆环最大限制，值越大波纹越大
          },
          symbol: 'circle',
          showEffectOn: 'render',
          symbolSize: [18, 14],
          itemStyle: {
            color: '#4ABCFF',
            borderColor:'#3EF7FF',
            borderWidth: 2
          },
          data: area
        },
        {
          type: 'scatter',
          coordinateSystem: 'cartesian2d',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#4D8BFE' // 0% 处的颜色
              }, {
                  offset: 1, color: '#3EF7FF' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          symbol: 'rect',
          symbolSize: [2, 100],
          symbolOffset: [0, -50],
          label: {
            show: true,
            position: [0,-20],
            formatter: (params: Record<string, any>) => {
              return params.name
              // return '{a|' + params.data.insuredNumber + '} {b|'+ '万人'  + '}' + '{a|' + '/' + '}' + '{a|' + params.data.uninsuredNumber + '} {b|'+ '万人'  + '}'
            },
            rich: {
              a:{
                fontSize:20
              },
              b:{
                fontSize:12
              }
            },
            color: '#fff',
            fontWeight: 'bold',
            distance: 0,
            backgroundColor: '#112980',
            borderWidth: 2,
            borderColor: '#4D8BFE',
            padding: [10, 10]
          },
          data: area
        },
        // 下面内容
        {
          type: 'scatter',
          coordinateSystem: 'cartesian2d',
          silent: true,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: 'transparent' // 0% 处的颜色
              }, {
                  offset: 1, color: '#3EF7FF' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          symbol: 'rect',
          symbolSize: [18, 46],
          symbolOffset: [0, -23],
          animation: false,
          label: {
            show: true,
            position: 'bottom',
            formatter: (params: Record<string, any>) => params.name,
            color: '#fff',
            fontWeight: 'bold',
            distance: 0,
            // backgroundColor: '#112980',
            // borderWidth: 2,
            // borderColor: '#4D8BFE',
            // padding: [5, 10]
          },
          data: area
        },
      ]
    }
    myChart.setOption(option)
  })
}
