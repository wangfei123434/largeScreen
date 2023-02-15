import {
  reactive,
  onUnmounted,
  toRefs,
  Ref,
  onMounted,
  watch,
  toRef,
} from "vue";
import { Canceler } from "axios";
import http, { Res } from "../config/http";
import qs from "qs";
import { ElMessageBox } from "element-plus";
import { ElMessageBoxOptions } from "element-plus/packages/message-box/src/message-box.type";
import { useRoute, useRouter } from "vue-router";
//请求参数
export type PageRequestParams = {
  pageNum?: number;
  pageSize?: number;
  sortDirection?: string;
  sortField?: string;
};

interface State {
  //分页参数
  pageRequest: PageRequestParams;
  //额外参数
  params: Record<string, any>;
  //额外参数，此参数是一个隐藏参数，不会出现表单和url中
  initParams?: Record<any, any>;
  //删除时候的加载
  deleteLoading: boolean;
  //加载是否完成
  loading: boolean;
  //总条数
  total: number;
  //总页数
  totalPage: number;
  //数据列表
  records: Record<string, any>[];
  //页面大小
  pageSize: number;
  //当前页数
  currentPage: number;
  //选择的记录
  selections: Record<string, any>[];
  //是否展开搜索框
  queryShowAll: boolean;
  //取消请求使用
  cancels: Canceler[];
  url: string;
}

//初始化參數
export type UseTableParams = {
  //url
  url?: string;
  //请求方法
  method?: string;
  //
  parse?: boolean;
  //额外参数,此参数会出现在表单和url query中
  params?: Record<any, any>;
  //额外参数，此参数是一个隐藏参数，不会出现表单和url中
  initParams?: Record<any, any> | (() => Record<any, any>);
  //请求的分页信息
  pageRequest?: PageRequestParams;
  //是否一开始就请求数据
  initLoad: boolean;
  //是否展开搜索框
  queryShowAll: boolean;
  //请求之后回调
  reqAfter: (state: State) => void;
};

//返回类型
interface UseTableReturnType extends State {
  //查询
  doSearch?: (newParams?: Record<string, any>) => Promise<void>;
  //重置表单
  resetQuery?: (newParams?: Record<string, any>) => Promise<void>;
  //多选回调
  handleTableSelectionChange: (rows: Array<any>) => void;
  //pageSize 改变时会触发
  handleCurrentChange: (pageNum: number) => void;
  //	currentPage 改变时会触发
  handleSizeChange: (pageSize: number) => void;
  //用户点击上一页按钮改变当前页后触发
  handlePrevClick: (pageNum: number) => void;
  //用户点击下一页按钮改变当前页后触发
  handleNextClick: (pageNum: number) => void;
  // 切换搜索框展示信息
  changeQueryShow: () => void;
  //通用表格刪除
  deleteWrapper: (
    //请求删除
    requestFunc: (state: deleteRequestFuncParams) => Promise<Res>,
    options?: {
      //是否自动处理通用逻辑
      autoProcessResp: boolean;
      //单个数据删除的行，行中删除
      row?: Ref<Record<any, any>>;
      //消息弹框配置
      messageBoxConfig?: {
        message: string;
        title: string;
        options?: ElMessageBoxOptions;
      };
    }
  ) => Promise<Res>;
}

/**
 * 删除请求参数
 */
interface deleteRequestFuncParams extends State {
  //删除的行
  delRows: Record<any, any>;
  //取消请求用
  cancels: Canceler[];
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

const useTable = (useTableParams: UseTableParams): UseTableReturnType => {
  const {
    url,
    method,
    params = {},
    initParams,
    pageRequest,
    parse,
    initLoad = true,
    queryShowAll = true,
    reqAfter,
  } = useTableParams;
  //状态
  const state = reactive<State>({
    //分页参数
    pageRequest: {
      pageNum: 1,
      pageSize: 10,
      sortDirection: "",
      sortField: "",
      ...pageRequest,
    },
    //额外参数,此参数会出现在表单和url query中
    params,
    //删除时候的加载
    deleteLoading: false,
    //加载是否完成
    loading: false,
    //总条数
    total: 0,
    //总页数
    totalPage: 0,
    //数据列表
    records: [],
    //页面大小
    pageSize: 0,
    //当前页数
    currentPage: 0,
    //选择的记录
    selections: Array(0),
    //是否展开搜索框
    queryShowAll: queryShowAll,
    cancels: [],
    url
  });

  //初始化参数
  const getInitParams = () => {
    if (typeof initParams === 'object') {
      return initParams;
    } else if (typeof initParams === 'function') {
      return initParams()
    }
    return {};
  }


  //合并参数
  state.params = Object.assign(state.params, getInitParams());

  onUnmounted(() => {
    state.cancels.forEach((cancel) => cancel());
    state.cancels = [];
  });

  //搜索
  const doSearch = async (newParams?: Record<string, any>) => {
    const httpInstance = method == "get" ? http.get : http.post;
    const params = {
      ...state.params,
      pageRequest: state.pageRequest,
      ...newParams,
    };
    state.loading = true;
    try {
      const res = await httpInstance(
        state.url + (parse ? "?" + qs.stringify(params) : ""),
        !parse ? params : {},
        {
          aborts: state.cancels,
        }
      );
      state.records = res.rows || res.data.records || res.data || [];
      state.total = res.data.total || res.total || 0;
      state.totalPage = res.data.pages || res.pages || 0;
      state.currentPage = res.data.current || res.current || 0;
      state.pageSize = res.data.size || res.size || 10;
    } finally {
      state.loading = false;
    }
    (await reqAfter) && reqAfter(state);
  };

  //重置表单
  const resetQuery = async (newParams?: Record<string, any>) => {
    state.params = {
      ...(getInitParams()),
      ...(newParams || {}),
    }
    state.pageRequest.pageNum = 1;
    state.pageRequest.pageSize = 10;
  };

  /**
   * 删除包装
   * @param requestFunc 发送http请求函数
   * @param options 是否自动处理响应参数
   */
  const deleteWrapper = (
    //请求删除
    requestFunc: (state: deleteRequestFuncParams) => Promise<Res>,
    options?: {
      //是否自动处理通用逻辑
      autoProcessResp: boolean;
      //单个数据删除的行，单个删除
      row?: Ref<Record<any, any>>;
      //消息弹框配置
      messageBoxConfig?: {
        message: string;
        title: string;
        options?: ElMessageBoxOptions;
      };
    }
  ): Promise<Res> => {
    //是否自动处理通用逻辑，默认为true
    let autoProcessResp = options?.autoProcessResp;
    if (autoProcessResp == undefined) {
      autoProcessResp = true;
    }
    const row = options?.row;
    const messageBoxConfig = options?.messageBoxConfig;
    //待删除的行
    const selections: Record<any, any> = [];
    if (row) {
      selections.push(row.value);
    } else {
      selections.push(...state.selections);
      if (selections.length == 0) {
        return Promise.resolve({} as any);
      }
    }
    return new Promise(async (resolve, reject) => {
      try {
        await ElMessageBox.confirm(
          messageBoxConfig?.message ||
          (row?.value ? "是否删除此条记录?" : "是否删除选择的记录?"),
          messageBoxConfig?.title || "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            ...(messageBoxConfig?.options || {}),
          }
        );
        if (typeof requestFunc == "function") {
          if (row?.value) {
            // @ts-ignore
            row.value.loading = true;
          } else {
            state.deleteLoading = true;
          }
          const resp = await requestFunc({ ...state, delRows: selections });
          const resultResp = { ...(resp || {}), success: isSuccess(resp) };
          resolve(resultResp);
          //是否自动处理响应参数
          if (autoProcessResp && resultResp.success) {
            //删除原来选择的行
            if (row?.value) {
              const rowIndex = state.selections.findIndex((item) => item.id);
              if (rowIndex != -1) {
                state.selections.splice(rowIndex, 1);
              }
            } else {
              state.selections = [];
            }
            await doSearch();
          }
        }
      } catch (e) {
        reject(e);
      } finally {
        if (row?.value) {
          // @ts-ignore
          row.value.loading = false;
        } else {
          state.deleteLoading = false;
        }
      }
    });
  };

  //选择回调
  const handleTableSelectionChange = (rows: any[]) => {
    state.selections = rows;
  };

  //currentPage 改变时会触发
  const handleCurrentChange = (pageNum: number) => {
    state.pageRequest.pageNum = pageNum;
  };

  //currentPage 改变时会触发
  const handleSizeChange = (pageSize: number) => {
    state.pageRequest.pageSize = pageSize;
  };

  //	用户点击上一页按钮改变当前页后触发
  const handlePrevClick = (pageNum: number) => {
    state.pageRequest.pageSize = pageNum - 1;
  };

  //用户点击下一页按钮改变当前页后触发
  const handleNextClick = (pageNum: number) => {
    state.pageRequest.pageSize = pageNum + 1;
  };

  //是否在一开始就加载数据
  if (initLoad) {
    onMounted(async () => {
      await doSearch();
    });
  }

  //监听搜索值的变化
  watch(
    [
      toRef(state.pageRequest, "pageSize"),
      toRef(state.pageRequest, "pageNum"),
      toRef(state, "params"),
    ],
    async ([a, a1, a2], [b, b1, b2]) => {
      //避免与初始化加载冲突
      if (b == undefined && b1 == undefined && b2 == undefined) {
        return;
      }
      //toSearchPage()
      await doSearch();
    },
    {
      immediate: true,
    }
  );

  //  切换搜索框展示信息
  const changeQueryShow = () => {
    state.queryShowAll = !state.queryShowAll;
  };

  // @ts-ignore
  return {
    ...toRefs(state),
    resetQuery,
    doSearch,
    changeQueryShow,
    handleTableSelectionChange,
    handleCurrentChange,
    handleSizeChange,
    handlePrevClick,
    handleNextClick,
    deleteWrapper,
    url
  };
};

/**
 * 处理url查询参数，根据enableProcessQueryInPath查看是否需要列表通过url记录查询的值
 * @param state
 * @param options
 */
const processQueryPath = (
  state: State,
  options: {
    enableProcessQueryInPath: boolean;
    doSearch: Function;
  }
) => {
  if (!options?.enableProcessQueryInPath) {
    return {};
  }

  const doSearch = options?.doSearch;

  const route = useRoute();
  const router = useRouter();

  const initQueryParams = () => {
    state.params = {
      ...route.query,
    };
    state.queryShowAll = !!route.query.queryShowAll;
  };

  //监听路由查询值的变化
  watch(
    [toRef(route, "query")],
    async (a, b) => {
      //避免与初始化加载冲突
      if (b == undefined) {
        return;
      }
      await doSearch();
    },
    {
      immediate: true,
    }
  );

  const toSearchPage = () => {
    router.replace({
      path: route.fullPath,
      query: {
        ...state.params,
        ...state.pageRequest,
        queryShowAll: String(state.queryShowAll),
      },
    });
  };

  initQueryParams();

  return {
    toSearchPage,
  };
};

export default useTable;
