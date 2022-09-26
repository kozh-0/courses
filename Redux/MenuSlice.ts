import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu, MenuItem } from '../interfaces/menuInterface';


const initialState = { inner: {} } as { inner: Menu };
// const initialState = [] as MenuItem[];

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        addMenu: (state, action: PayloadAction<Menu>) => {
            state.inner = action.payload;
        },
        changeOpenState: (state, action: PayloadAction<any>) => {
            state.inner.list.map(el => el.isOpened = false); 

            state.inner.list.map(m => {
                if (m.pages.map(p => p.alias).includes(action.payload)) {
					m.isOpened = true;
				}
                return m;
            });
            
        },


    },
});


export const { addMenu, changeOpenState } = menuSlice.actions;

export default menuSlice.reducer;