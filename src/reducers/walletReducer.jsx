import { types } from "../types/types";

const initialState = {
    connected: false,
    wallet: null,
    walletHidden: null,
    balance: null,
    contract:null
}

export const walletReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.walletLogin:
            return {
                ...state,
                ...action.payload,
                connected: true,
            }
            
        case types.chargeBalance:
            return {
                ...state,
                balance: action.payload
            }

        case types.walletLogout:
            return {
                connected: false,
                wallet: null,
                walletHidden: null,
                balance: null
            }
                

        default:
            return state;
    }
}