import React, { useEffect } from 'react';
import { fetchTodos } from '../Redux/TodoSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store';

export default function Todos() {
    const todos = useAppSelector((state: RootState) => state.todos.list);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);
	
    return (
        <div style={{ color: 'white' }}>
            {todos.length ? todos.map(el => (
                <p
                    key={el.id}
                    style={el.completed ? { background: 'red' } : { background: 'green' }}
                >{el.title}</p>
            )) : <h1 style={{ color: 'black' }}>Loading...</h1>}
        </div>
    );
}
