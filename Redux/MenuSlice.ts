import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu,/* , MenuItem */ PageItem} from '../interfaces/menuInterface';


const initialState = { inner: {}, autocomplete: [{}] } as { inner: Menu, autocomplete: PageItem[] };
// const initialState = [] as MenuItem[];

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        addMenu: (state, action: PayloadAction<Menu>) => {
            try {
                state.inner = action.payload;
                state.autocomplete = action.payload.list.flatMap(el => el.pages);
            } catch (err) {
                // console.error(err);
            }
            // state.inner.list.map(el => el.isOpened = false); 
        },
        changeOpenState: (state, {payload}: PayloadAction<number>) => {
            state.inner.list[payload].isOpened = !state.inner.list[payload].isOpened;
        },


    },
});


export const { addMenu, changeOpenState } = menuSlice.actions;

export default menuSlice.reducer;