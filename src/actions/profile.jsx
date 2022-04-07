import axios from "axios";
import { types } from "../types/types";

export const profileStartLoading = (wallet) => {
    return async(dispatch) => {

        let url = process.env.REACT_APP_API_PROXY + '/profile/rewards/';
        axios.post(url, { wallet })
        .then(result => {
            let reward = 0;
            if(result.data !== ''){
                reward = result.data;
            }
            
            let profile = {
                'rewards' : reward
            }
            dispatch( profileLoaded( profile ) );
        })
        .catch(error => console.log('error', error));

        url = process.env.REACT_APP_API_PROXY + '/profile/history/';
        axios.post(url, { wallet })
        .then(res => {
            dispatch( profileHistoryLoaded( res.data ) );
        })
        .catch(error => console.log('error', error));
    }
}

const profileLoaded = ( profile ) => ({
    type: types.profileLoaded,
    payload: profile
})

const profileHistoryLoaded = ( data ) => ({
    type: types.profileHistoryLoaded,
    payload: data
})