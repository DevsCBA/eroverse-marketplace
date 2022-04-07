import { types } from '../types/types';

const initialState = {
    info: {},
    nft: [],
    loaded: false,
};

export const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.collectionInfo:
            return {
                ...state,
                info: action.payload,
                loaded: true,
            };

        case types.collectionNFT:
            return {
                ...state,
                nft: action.payload,
                loaded: true,
            };

        default:
            return state;
    }
};
