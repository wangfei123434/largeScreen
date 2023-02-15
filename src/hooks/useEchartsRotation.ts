import {reactive, toRefs, Ref, onMounted, onUnmounted, nextTick} from "vue";
import { Res } from "../config/http";
import { Canceler } from "axios";
//返回类型
interface UseReturnType {

}

interface State {
    timerId:number
}

interface UseParams {
    //时长
    ms?:number;
    //是否开始加载
    initLoad?:boolean;
    //轮播的series索引
    seriesIndex?:0,
}

/**
 * echarts 轮播控制
 * @param options
 */
const useEchartsRotation = (chartRef:Ref<any>, options?:UseParams) => {

    const {
        ms=2000,
        initLoad=true,
        seriesIndex=0
    } = Object.assign({},options||{});

    const state = reactive<State>({
        timerId:-1,
    });

    onUnmounted(() => {
        //组件卸载时，清理定时器，防止内存泄露
        clearInterval(state.timerId);
    });

    //开始定时
    const startTimer =()=>{
        if (state.timerId!=-1){
            clearInterval(state.timerId);
        }
        //拿到第一个数据
        const data = chartRef.value?.getOption()?.series[seriesIndex]?.data;
        if (!data){
            setTimeout(()=>{
                startTimer();
            },100)
            return;
        }
        let len = 0;
        state.timerId = setInterval(()=>{
            if(len === data.length){
                len = 0
            }
            nextTick(()=>{
                const dataIndex = len;
                ['highlight','showTip'].map(type=>{
                    chartRef.value?.dispatchAction?.({
                        type,
                        seriesIndex,
                        dataIndex,
                    })
                })
                setTimeout(()=>{
                    chartRef.value?.dispatchAction?.({
                        type: 'downplay',
                        seriesIndex,
                        dataIndex,
                    })
                },ms)
                len ++;
            })
        },ms) as any
    }

    onMounted(()=>{
        if (initLoad){
            startTimer()
        }
    })

    return {
        ...toRefs(state),
        startTimer,
    };
};

export default useEchartsRotation;
