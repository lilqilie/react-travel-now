// 加了一个泛型 类型定义

import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux"; 
import { RootState } from "./store";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;