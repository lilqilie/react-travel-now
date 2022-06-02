import {applyMiddleware } from 'redux';
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import {ProductDetailSlice} from './productDetail/slice'
import { combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { ProductSearchSlice } from './productSearch/slice';
import { userSlice } from './user/slice';
import { shoppingCartSlice } from './shoppingCart/slice';
import { orderSlice } from './order/slice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
}

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: ProductDetailSlice.reducer,
    productSearch: ProductSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart:shoppingCartSlice.reducer,
    order:orderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
  devTools: true,
});
// 包装
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export default { store, persistor };