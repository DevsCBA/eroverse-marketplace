import { types } from '../types/types';
import axios from 'axios';

export const gameStartLoading = (id) => {
	return async (dispatch) => {
		let url = process.env.REACT_APP_API_PROXY + '/games/' + id;
		axios
			.get(url)
			.then((res) => {
				dispatch(gameLoaded(res.data));
			})
			.catch((error) => console.log('error', error));
	};
};

export const cleanGameLoading = () => {
	return async (dispatch) => {
		dispatch(cleanGameLoaded());
	};
};

export const cleanGamesLoading = () => {
	return async (dispatch) => {
		dispatch(cleanGamesLoaded());
	};
};

export const setSearchTermLoading = (search) => {
	return async (dispatch) => {
		dispatch(setSearchTerm(search));
	};
};

export const homeStartLoading = () => {
	return async (dispatch) => {
		let url = process.env.REACT_APP_API_PROXY + '/games/featured';
		// let gameHome = [];
		axios
			.get(url)
			.then((res) => {
				dispatch(homeLoadedFeatured(res.data));
			})
			.catch((error) => console.log('error', error));

        url = process.env.REACT_APP_API_PROXY + '/games/latest';
        axios
			.get(url)
			.then((res) => {
				dispatch(homeLoadedReleases(res.data));
			})
			.catch((error) => console.log('error', error));
	};
};

export const gamesSearchStartLoading = (search) => {
	return async (dispatch) => {
		let url = process.env.REACT_APP_API_PROXY + '/games';
		axios
			.get(url)
			.then((res) => {
				let games = res.data;
				let gamesSearch = games.filter(game => game.name.toLowerCase().includes(search.toLowerCase() ));
				dispatch(gamesLoaded(gamesSearch));
			})
			.catch((error) => console.log('error', error));
	};
};

export const gamesByCategoryStartLoading = (category) => {
	return async (dispatch) => {
		let url = process.env.REACT_APP_API_PROXY + '/games';
		axios
			.get(url)
			.then((res) => {
				let games = res.data;
				let gamesSearch = games.filter(game => game.category_name.includes(category));
				dispatch(gamesLoaded(gamesSearch));
			})
			.catch((error) => console.log('error', error));
	};
};


export const gamesStartLoading = () => {
	return async (dispatch) => {
		let url = process.env.REACT_APP_API_PROXY + '/games';
		axios
			.get(url)
			.then((res) => {
				dispatch(gamesLoaded(res.data));
			})
			.catch((error) => console.log('error', error));
	};
};

const cleanGameLoaded = () => ({
	type: types.cleanGameLoaded,
	payload: null,
});

const cleanGamesLoaded = () => ({
	type: types.cleanGamesLoaded,
	payload: null,
});

const gameLoaded = (data) => ({
	type: types.gameLoaded,
	payload: data,
});

const homeLoadedFeatured = (data) => ({
	type: types.homeLoadedFeatured,
	payload: data,
});

const homeLoadedReleases = (data) => ({
	type: types.homeLoadedReleases,
	payload: data,
});

const gamesLoaded = (data) => ({
	type: types.gamesLoaded,
	payload: data,
});

const setSearchTerm = (search) => ({
	type: types.setSearchTerm,
	payload: search,
});

