import uuid from "uuid";
import {
	ADD_TODO,
	DELETE_TODO,
	UPDATE_TODO,
	COMPLETED
} from "../actions/actionTypes";

const initialState = {
	todos: []
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TODO:
			return {
				todos: [
					{ id: uuid.v1(), text: action.payload, completed: false },
					...state.todos
				]
			};
		case DELETE_TODO: {
			const { todos } = state;
			return {
				todos: todos.filter(todo => todo.id !== action.payload)
			};
		}
		case COMPLETED: {
			const { todos } = state;
			return {
				todos: todos.map(todo =>
					todo.id === action.payload
						? { ...todo, completed: !todo.completed }
						: todo
				)
			};
		}
		case UPDATE_TODO: {
			const { todos } = state;
			const index = todos.findIndex(
				todo => todo.id === action.payload.id
			);
			todos[index].text = action.payload.text;
			return state;
		}
		default:
			return state;
	}
};

export default rootReducer;
