import { types } from "../types/types";

const initialState = {
    rewards: null,
    history: [],
}

export const profileReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.profileLoaded:
            return {
                ...state,
                ...action.payload
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