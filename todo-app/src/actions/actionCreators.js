import { ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETED } from "./actionTypes";

export const addTodo = todo => ({ type: ADD_TODO, payload: todo });
export const deleteTodo = id => ({ type: DELETE_TODO, payload: id });
export const updateTodo = (id, text) => ({
	type: UPDATE_TODO,
	payload: {
		id,
		text
	}
});
export const completed = id => ({
	type: COMPLETED,
	payload: id
});
