import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu } from '../interfaces/menuInterface';


const initialState = { inner: {} } as { inner: Menu };

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        addMenu: (state, action: PayloadAction<Menu>) => {
            state.inner = action.payload;
        },


    },
});


export const { addMenu } = menuSlice.actions;

export default menuSlice.reducer;