import * as echarts from 'echarts/core'
import 'echarts-gl';
import {  Scatter3DChart, Bar3DChart } from 'echarts-gl/charts'
import { Geo3DComponent } from 'echarts-gl/components'
echarts.use([Geo3DComponent, Scatter3DChart, Bar3DChart])
import wuhanJson from './wuhan.json'
import bgIMG from './area_bg.png'
import lightIMG from './light.png'
import { LoadImg } from './mapWuhan'
const jwd = [114.298572, 30.584355]
const deg = -1
const rotate = ([x, y]) => {
  const [centerX, centerY] = jwd
  //绕z轴旋转
  const x1 = (x - centerX) * Math.cos(deg) - (y - centerY) * Math.sin(deg) + centerX
  const y1 = (x - centerX) * Math.sin(deg) + (y - centerY) * Math.cos(deg) + centerY
  //绕x轴旋转
  // const y2 =  (x - centerX) * Math.sin(deg) + (y - centerY) * Math.cos(deg) + centerY;
  return [x1, y1]
}
export default (myChart) => {
  const area = []
  let features = wuhanJson.features.map((item, i) => {
    if (item.properties.centroid) {
      // 区的坐标收集
      let sub = item.properties.centroid
      area.push({
        name: item.properties.name,
        value: rotate(sub)
        // code: item.properties.adcode
      })
    }
    let Coordinates = item.geometry.coordinates.map((son, i) => {
      return son[0].map(rotate)
    })
    return {
      type: 'Feature',
      properties: item.properties,
      geometry: {
        coordinates: [Coordinates],
        type: 'MultiPolygon'
      }
    }
  })
  let finalgeoJson = {
    type: 'FeatureCollection',
    features: features
  }
  echarts.registerMap('wuhan', finalgeoJson)
  var canvas = document.createElement('canvas')
  console.log(myChart.getWidth(), myChart.getHeight())
  var bgChart = echarts.init(canvas, null, {
    width: myChart.getWidth(),
    height: myChart.getHeight()
  })
  LoadImg(bgIMG, myChart)
    .then((img) => {
      bgChart.setOption({
        geo: {
          map: 'wuhan',
          layoutCenter: ['50%', '50%'], //地图位置
          top: 0,
          bottom: 4,
          left: 0,
          right: 14,
          roam: false,
          itemStyle: {
            borderColor: '#00FFFF',
            borderWidth: 3,
            color: {
              image: img,
              repeat: 'no-repeat'
            },
            areaColor: {
              image: img,
              repeat: 'no-repeat'
            },
            shadowColor: 'rgba(0, 255, 255, 0.7)',
            shadowBlur: 5
          }
        },
        series: [
          //波纹
          {
            type: 'effectScatter',
            tooltip: {
              // show: false,
            },
            coordinateSystem: 'geo',
            zlevel: 1,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: 'stroke', //波纹绘制方式 stroke, fill
              number: 3,
              scale: 10 //波纹圆环最大限制，值越大波纹越大
            },
            symbol: 'circle',
            showEffectOn: 'render',
            symbolSize: [10, 5],
            itemStyle: {
              color: '#00FFFF'
            },
            data: area
          }
        ]
      })
      return Promise.resolve()
    })
    .then((lightImg) => {
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        geo3D: {
          map: 'wuhan',
          layoutCenter: ['50%', '50%'], //地图位置
          layoutSize: '100%',
          instancing: true,
          regionHeight: 5,
          boxHeight: 20,
          viewControl: {
            minBeta:  -360,
            maxBeta: 360
            // rotateSensitivity: 0,
            // zoomSensitivity: 0,
            // distance: 100
          },
          shading: `color`,
          colorMaterial: {
            detailTexture: bgChart,
            textureTiling: 1
          },

          itemStyle: {
            borderColor: '#00FFFF',
            borderWidth: 3,
            color: '#5a8dce'
            // areaColor: {
            //   image: img,
            //   repeat: 'no-repeat'
            // }
          },
          emphasis: {
            label: {
              color: '#fff',
              show: false
            }
          },
          select: {
            label: {
              show: false
            }
          }
        },
        series: [
          // {
          //   type: "map3D",
          //   map: 'wuhan',
          //   aspectScale: 0.85,
          //   layoutCenter: ['50%', '50%'], //地图位置
          //   layoutSize: '100%',
          //   regionHeight: 5,
          //   viewControl: {
          //     // rotateSensitivity: 0,
          //     // zoomSensitivity: 0,
          //     distance: 100
          //   },
          //   shading: 'realistic',
          //   realisticMaterial: {
          //     detailTexture: bgIMG
          //   },
          //   itemStyle: {
          //     borderColor: '#00FFFF',
          //     borderWidth: 4,
          //     // areaColor: {
          //     //   image: img,
          //     //   repeat: 'no-repeat'
          //     // }
          //   },
          //   emphasis: {
          //     label: {
          //       color: '#fff',
          //       show: false
          //     },
          //   },
          //   select: {
          //     label: {
          //       show: false
          //     },
          //   }

          // },
          {
            type: 'bar3D',
            coordinateSystem: 'geo3D',
            minHeight: 10,
            bevelSize: 1,
            bevelSmoothness: 20,
            barSize: 0.4,
            data: area.map((item) => ({ name: item.name, value: item.value.concat(10) })),
            shading: 'lambert',
            silent: true,
            label: {
              show: true,
              distance: 0,
              formatter: (params) => params.name,
              color: '#000',
              textStyle: {
                color: '#fff',
                borderColor: '#4D8BFE',
                fontSize: 16,
                borderWidth: 2,
                padding: [5, 20],
                backgroundColor: '#2247A9'
              }
            }
          },
          {
            type: 'scatter3D',
            name: 'label',
            coordinateSystem: 'geo3D',
            symbol: 'rect',
            symbolSize: [100, 96, 50],
            itemStyle: {
              // color: '#000'
            },
            data: area.map((item) => {
              return {
                name: item.name,
                value: item.value.concat(10)
                // symbolSize: 60
              }
            })
          }
          // {
          //   type: 'scatter3D',
          //   name: 'label',
          //   coordinateSystem: 'geo3D',
          //   zlevel: 10,
          //   symbol: 'rect',
          //   symbolSize: [2, 150],
          //   itemStyle: {
          //     // color: '#000'
          //   },
          //   emphasis: {
          //     // itemStyle: {
          //     //   color: '#fff'
          //     // }
          //   },
          //   label: {
          //     show: true,
          //     position: 'top',
          //     formatter: (params) => params.name,
          //     color: '#000',
          //     distance: -10,
          //     textStyle: {
          //       color: '#fff',
          //       borderColor: '#4D8BFE',
          //       borderWidth: 2,
          //       fontWeight: 'bold',
          //       padding: [5, 20],
          //       backgroundColor: '#2247A9'
          //     }
          //   },
          //   animation: true,
          //   data: area
          // }
        ]
      }
      myChart.setOption(option)
    })
  // return console.log('bg', bgChart)
}
