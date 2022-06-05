import { types } from "../types/types";

const initialState = {
    rewards: null,
    history: [],
    profile:{nfts:[], onSaleTotal:0, total:0}
}

export const profileReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.profileLoaded:
            return {
                ...state,
                profile: {...action.payload}
            }

        case types.profileHistoryLoaded:
            return {
                ...state,
                history: [ ...action.payload ]
            }

        default:
            return state;
    }
}