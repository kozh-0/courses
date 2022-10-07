import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel } from '../interfaces/productInterface';


const initialState = { 
    list: [],
    status: 'rating'
 } as { 
    list: ProductModel[];
    status: 'rating' | 'price';
};

export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<ProductModel[]>) => {
            console.log(action.payload);
            
            state.list = action.payload.sort((a,b) => a.initialRating > b.initialRating ? -1 : 1);
            state.status = 'rating';
        },
        sortProductsByRating: (state) => {
            state.list.sort((a,b) => a.initialRating > b.initialRating ? -1 : 1);
            state.status = 'rating';
        },
        sortProductsByPrice: (state) => {
            state.list.sort((a,b) => a.price > b.price ? -1 : 1);
            state.status = 'price';
        },


    },
});


export const { addProducts, sortProductsByRating, sortProductsByPrice } = ProductSlice.actions;

export default ProductSlice.reducer;