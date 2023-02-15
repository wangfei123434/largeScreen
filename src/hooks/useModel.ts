import { reactive, toRefs, Ref, watch, toRef, ref, onUnmounted } from "vue";
import { Res } from "../config/http";
import { ElFormItemContext } from "element-plus/packages/form/src/token";
import { Canceler } from "axios";
//初始化參數
//export type UseParams = {};
//返回类型
interface UseReturnType {
  //表单
  form: Ref<Record<string, any>>;
  //当前行记录
  row: Ref<any>;
  //是否显示
  dialogVisible: Ref<boolean>;
  /**
   * 打开弹框
   * @param row 当前打开弹框的数据
   * @param callback 关闭后的回调
   */
  open: (row: any, callback?: (state: State) => any) => void;
  /**
   * 关闭弹框
   * @param callback 关闭后的回调
   */
  close: (callback?: (state: State) => any) => void;
  /**
   * 提交时候的loading
   */
  submitLoading: Ref<boolean>;
  /**
   * 查询时候的loading
   */
  selectLoading: Ref<boolean>;
  /**
   * 查询包装
   * @param requestFunc 发送http请求函数
   * @param autoProcessResp 是否自动处理参数
   */
  selectWrapper: (
    requestFunc: (state: State) => Promise<any>,
    autoProcessResp?: boolean
  ) => Promise<Res>;

  /**
   * 提交包装
   * @param requestFunc 发送http请求函数
   * @param autoProcessResp 是否自动处理响应参数
   */
  submitWrapper: (
    requestFunc: (state: State) => Promise<any>,
    autoProcessResp?: boolean
  ) => Promise<Res>;

  /**
   * 表单实例
   */
  modelFormRef: Ref<ElFormItemContext>;

  /**
   * 校验Form表单
   * @param form form对象，可以不传，不传则默认使用本hook的modelFormRef
   */
  validateForm: (form?: Ref<any>) => Promise<any>;
}

interface State {
  form: Record<string, any>;
  row: Record<string, any> | null | undefined;
  dialogVisible: boolean;
  selectLoading: boolean;
  submitLoading: boolean;
  cancels: Canceler[];
}

interface UseParams {
  /**
   * 弹框切换的回调
   * @param dialogVisible 当前弹框的可显值
   */
  switchCallback?: (state: State) => void;
}

/**
 * @param resp
 */
const isSuccess = (resp: Res) => {
  if (!resp) {
    return false;
  }
  return resp.code == 0 || resp.code == 200;
};
/**
 * 弹框HOOK
 */
const useModel = (options: UseParams = {}): UseReturnType => {
  const { switchCallback } = options;

  const state = reactive<State>({
    form: {},
    row: {},
    dialogVisible: false,
    selectLoading: false,
    submitLoading: false,
    cancels: [],
  });

  onUnmounted(() => {
    cancelRequest()
  });

  const cancelRequest = () => {
    state.cancels.forEach((cancel) => cancel());
    state.cancels = [];
  }

  /**
   * 表单ref
   */
  const modelFormRef = ref();

  /**
   * 打开弹框
   * @param row 当前打开弹框的数据
   * @param callback 关闭后的回调
   */
  const open = (row: any, callback?: (...params: any[]) => any) => {
    if (row) {
      state.row = { ...row };
      state.form = { ...row };
    } else {
      state.row = null;
      state.form = {};
    }
    state.dialogVisible = true;
    typeof callback === "function" && callback();
  };

  /**
   * 监听弹框的改变，并传入回调函数
   */
  watch(
    toRef(state, "dialogVisible"),
    async (value, oldValue) => {
      if (oldValue == undefined) {
        return;
      }
      if (!value) {
        cancelRequest()
      }
      typeof switchCallback === "function" && (await switchCallback(state));
    },
    {
      immediate: true,
    }
  );

  /**
   * 关闭弹框
   * @param callback 关闭后的回调
   */
  const close = (callback?: (...params: any[]) => any) => {
    state.dialogVisible = false;
    typeof callback === "function" && callback();
  };

  /**
   * 查询包装
   * @param requestFunc 发送http请求函数
   * @param autoProcessResp 是否自动处理参数
   */
  const selectWrapper = (
    requestFunc: (state: State) => Promise<Res>,
    autoProcessResp?: boolean
  ) => {
    if (autoProcessResp == undefined) {
      autoProcessResp = true;
    }
    return new Promise(async (resolve, reject) => {
      try {
        state.selectLoading = true;
        if (typeof requestFunc == "function") {
          const resp = await requestFunc(state);
          const resultResp = { ...(resp || {}), success: isSuccess(resp) };
          resolve(resultResp);
          //是否自动处理响应参数
          if (autoProcessResp && resultResp.success) {
            state.form = { ...resp.data };
            state.row = { ...resp.data };
          }
        }
      } catch (e) {
        reject(e);
      } finally {
        state.selectLoading = false;
      }
    });
  };

  /**
   * 提交包装
   * @param requestFunc 发送http请求函数
   * @param autoProcessResp 是否自动处理响应参数
   */
  const submitWrapper = (
    requestFunc: (state: State) => Promise<Res>,
    autoProcessResp?: boolean
  ) => {
    if (autoProcessResp == undefined) {
      autoProcessResp = true;
    }
    return new Promise(async (resolve, reject) => {
      try {
        state.submitLoading = true;
        if (typeof requestFunc == "function") {
          const resp = await requestFunc(state);
          const resultResp = { ...(resp || {}), success: isSuccess(resp) };
          resolve(resultResp);
          //是否自动处理响应参数
          if (autoProcessResp && resultResp.success) {
            close();
          }
        }
      } catch (e) {
        reject(e);
      } finally {
        state.submitLoading = false;
      }
    });
  };

  /**
   * 校验表单
   * @param form form对象，可以不传，不传则默认使用本hook的modelFormRef
   */
  const validateForm = (form?: Ref<any>) => {
    return new Promise((resolve, reject) => {
      try {
        let validateFunc = null;
        if (form) {
          validateFunc = form.value.validate;
        } else {
          validateFunc = modelFormRef.value.validate;
        }
        validateFunc((valid: any) => {
          if (valid) {
            // @ts-ignore
            resolve();
          } else {
            setTimeout(() => {
              const isError = document.getElementsByClassName('is-error')
              isError[0].querySelector('input').focus()
            }, 100)
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  return <UseReturnType>{
    ...toRefs(state),
    open,
    close,
    selectWrapper,
    submitWrapper,
    modelFormRef,
    validateForm,
  };
};

export default useModel;
