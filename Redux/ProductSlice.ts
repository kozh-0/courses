import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel, ReviewModel } from '../interfaces/productInterface';

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
        addReview: (state, action: PayloadAction<IaddReview>) => {
            state.list.find(el => el._id === action.payload.productId)?.reviews.push(action.payload.review);
        },
    },
});


export const { addProducts, sortProductsByRating, sortProductsByPrice, addReview } = ProductSlice.actions;

export default ProductSlice.reducer;


interface IaddReview {
    productId: string;
    review: ReviewModel;
}