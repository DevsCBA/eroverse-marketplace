import { types } from '../types/types';
import axios from 'axios';

export const categoriesPopularLoading = () => {
	return async (dispatch) => {
		let url = process.env.REACT_APP_API_PROXY + '/categories/popular';
		axios
			.get(url)
			.then((res) => {
				dispatch(categoriesPopularLoaded(res.data));
			})
			.catch((error) => console.log('error', error));
	};
};

export const categorySelectedLoading = (category) => {
	return async (dispatch) => {
		dispatch(categorySelectedLoaded(category));
	};
};

export const categoriesLoading = () => {
	return async (dispatch) => {
		let url = process.env.REACT_APP_API_PROXY + '/categories/';
		axios
			.get(url)
			.then((res) => {
				dispatch(categoriesLoaded(res.data));
			})
			.catch((error) => console.log('error', error));
	};
};

const categoriesPopularLoaded = (data) => ({
	type: types.categoriesPopularLoaded,
	payload: data,
});

const categoriesLoaded = (data) => ({
	type: types.categoriesLoaded,
	payload: data,
});

const categorySelectedLoaded = (data) => ({
	type: types.categorySelectedLoaded,
	payload: data,
});

