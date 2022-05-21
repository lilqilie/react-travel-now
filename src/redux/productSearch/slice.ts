import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
interface ProductSearchState{
    loading: boolean;
    error: string | null;
    data: any;
    pagination:any;
}

const initialState: ProductSearchState = {
    loading: true,
    error:null,
    data: null,
    pagination:null
}

export const searchProduct = createAsyncThunk(
    // 第一个命名， 第二个是action
    'productSearch/searchProduct',
    async(paramaters:{
        keywords:string,
        nextPage: number | string,
        pageSize: number | string,
    }, thunkAPI)=>{
        let url=`http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`
        if (paramaters.keywords){
            url += `&keyword=${paramaters.keywords}`
        }
        const response = await axios.get(url);
        return {data:response.data,
            // 把字符串转换成js对象
            pagination: JSON.parse(response.headers["x-pagination"]) 
        }
        // setProduct(data);
        // setLoading(false);
     
        // setError(error.message);
        // setLoading(false);
       
        

    })


export const ProductSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    reducers:{
    
        },

    extraReducers:{
            [searchProduct.pending.type]:(state)=>{
            state.loading = true;
        },
        [searchProduct.fulfilled.type]:(state, action)=>{
            state.data = action.payload.data
            state.pagination = action.payload.pagination
            state.loading = false
            state.error = null
        },
        [searchProduct.rejected.type]:(state, action: PayloadAction<string | null>)=>{
            // const ddd = action.payload;
            state.loading = false;
            state.error = action.payload;
    }
    }
})