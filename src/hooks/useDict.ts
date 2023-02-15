import { reactive, toRefs, Ref } from "vue";
import { useStore } from "vuex";
import http from "../config/http";
//初始化參數
export type UseParams = {
  //url
  url?: string;
  //请求方法
  method?: string;
  //字典类型
  dictType?: string[] | string;
  //
  fieldLabel: string;
  //
  fieldValue: string;
};
//返回类型
interface UseReturnType {
  //请求字典
  fetchDict: (dictType: string, flush?: boolean) => Promise<any>;
}

const useDict = (options?: UseParams): UseReturnType => {
  const initParams=(options||{} as UseParams);
  const {
    url = "/dsj-usermanage/dict/querybytype",
    method = "post",
    fieldLabel = "",
    fieldValue = "",
  } = initParams;

  let dictType = initParams.dictType;
  if (typeof dictType == "string") {
    dictType = [dictType];
  }

  const vuex = useStore();

  const state = vuex.state;

  /**
   * 请求字典
   * @param dictType 字典类型
   * @param flush 是否刷新缓存里面的数据
   */
  const fetchDict = async (dictType: string, flush = false) => {
    if (state.dict[dictType] && !flush) {
      return [state.dict[dictType + "_MAP"], state.dict[dictType]];
    }
    try {
      const httpInstance = method == "post" ? http.post : http.get;
      const rUrl = url+(url.includes('?')?'&':'?')+'type='+dictType
      const res = await httpInstance(rUrl );
      if (res && res.data) {
        const list = res.data.list || res.data || [];
        const dictMap = dictToMap(list);
        //缓存到vuex里面
        vuex.commit("saveDict", { type: dictType, data: list });
        vuex.commit("saveDict", { type: dictType + "_MAP", data: dictMap });
        return [dictMap, list];
      }
    } catch (e) {
    } finally {
    }
    return [{}, []];
  };

  /**
   * 字典list转成map
   * @param dictList
   */
  const dictToMap = (dictList: any[]) => {
    const dictMap: any = {};
    dictList.map((item) => {
      dictMap[String(fieldValue ? item[fieldValue] : item.value)] = fieldLabel
        ? item[fieldLabel]
        : item.label;
    });
    return dictMap;
  };

  return {
    fetchDict,
  };
};

export default useDict;
