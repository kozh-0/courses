import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
interface TodoSliceInterface {
    list: Todo[];
    loading: boolean;
    error: 'idle' | 'pending' | 'fulfilled' | 'rejected' | null;
}

export const fetchTodos = createAsyncThunk<Todo[]>(
    'GET/fetchTodos',
    async () => {
        const response: Todo[] = await fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json());

        return response;
    }
);

const initialState = {
    list: [],
    loading: false,
    error: null
} as TodoSliceInterface;

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
// каждый асинхронный экшн представляет представляет собой 3 доп экшона
// 'pending' | 'fulfilled' | 'rejected' их можно обрабатывать в extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            });
    }
});

// Action creators are generated for each case reducer function
// export const { increment, decrement } = counterSlice.actions;

export default todosSlice.reducer;