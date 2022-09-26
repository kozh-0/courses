import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu/* , MenuItem */ } from '../interfaces/menuInterface';


const initialState = { inner: {} } as { inner: Menu };
// const initialState = [] as MenuItem[];

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        addMenu: (state, action: PayloadAction<Menu>) => {
            state.inner = action.payload;
            // state.inner.list.map(el => el.isOpened = false); 
        },
        changeOpenState: (state, {payload}: PayloadAction<number>) => {
            state.inner.list[payload].isOpened = !state.inner.list[payload].isOpened;
        },


    },
});


export const { addMenu, changeOpenState } = menuSlice.actions;

export default menuSlice.reducer;