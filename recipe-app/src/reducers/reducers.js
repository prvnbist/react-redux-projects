import uuid from "uuid";

import {
	ADD_RECIPE,
	EDIT_RECIPE,
	DELETE_RECIPE,
	READ_RECIPE
} from "../actions/actionTypes";

const initialState = {
	recipes: {},
	currentlyReading: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_RECIPE: {
			const key = Object.keys(state.recipes).length + 1;
			return {
				...state,
				recipes: {
					...state.recipes,
					[key]: {
						id: uuid.v1(),
						createdAt: Date.now(),
						name: action.payload.name,
						ingredients: action.payload.ingredients.split("*"),
						directions: action.payload.directions.split("*")
					}
				}
			};
		}
		case READ_RECIPE: {
			const { recipes } = state;
			if (action.payload !== 0) {
				const findId = Object.keys(recipes).filter(
					recipe => recipes[recipe].id === action.payload
				);
				const recipe = recipes[findId[0]];
				return {
					...state,
					currentlyReading: {
						...recipe
					}
				};
			}
			return {
				...state,
				currentlyReading: {}
			};
		}
		case DELETE_RECIPE: {
			const parentKey = Object.keys(state.recipes).filter(
				key => state.recipes[key].id === action.payload
			)[0];
			const { [parentKey]: value, ...others } = state.recipes;
			if (state.currentlyReading.id === action.payload) {
				state.currentlyReading = {};
			}
			return {
				...state,
				recipes: {
					...others
				}
			};
		}
		case EDIT_RECIPE: {
			const { id, name, ingredients, directions } = action.payload;
			const updateRecipe = Object.keys(state.recipes).map(key => {
				if (state.recipes[key].id === id) {
					state.recipes[key].name = name;
					state.recipes[key].ingredients = ingredients;
					state.recipes[key].directions = directions;
				}
				return state.recipes[key];
			});
			state.currentlyReading.name = name;
			state.currentlyReading.ingredients = ingredients;
			state.currentlyReading.directions = directions;
			return {
				...state,
				recipes: updateRecipe
			};
		}
		default:
			return state;
	}
};

export default reducer;
