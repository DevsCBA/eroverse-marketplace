import { types } from '../types/types';

const initialState = {
	gameSelected: null,
	last_release: [],
	featured: [],
	games: [],
	searchTerm: null,
	loaded: false,
};

export const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.homeLoadedFeatured:
			return {
				...state,
				featured: [...action.payload],
				loaded: true,
			};

		case types.homeLoadedReleases:
			return {
				...state,
				last_release: [...action.payload],
				loaded: true,
			};

		case types.gameLoaded:
			return {
				...state,
				gameSelected: action.payload[0],
				loaded: true,
			};

		case types.cleanGameLoaded:
			return {
				...state,
				gameSelected: null,
				loaded: true,
			};

		case types.setSearchTerm:
			return {
				...state,
				searchTerm: action.payload,
				loaded: true,
			};

		case types.cleanGamesLoaded:
			return {
				...state,
				games: [],
				loading: false,
			};

		case types.gamesLoaded:
			return {
				...state,
				games: [...action.payload],
				loading: false,
			};

		default:
			return state;
	}
};
