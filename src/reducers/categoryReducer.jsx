import { types } from '../types/types';

const initialState = {
	categories: [],
	popular: [],
	selected: 'All',
	loaded: false,
};

export const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.categoriesPopularLoaded:
			return {
				...state,
				popular: action.payload,
				loaded: true,
			};

		case types.categoriesLoaded:
			return {
				...state,
				categories: action.payload,
				loaded: true,
			};

		case types.categorySelectedLoaded:
			return {
				...state,
				selected: action.payload,
				loaded: true,
			};

		default:
			return state;
	}
};
