import { types } from '../types/types';

const initialState = {
    info: {},
    nft: [],
    trendingNfts:[],
    featuredCollections:[{nfts:[], collectionId:null}],
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

        case types.trendingNFTs:
            return {
                ...state,
                trendingNfts: action.payload,
                loaded: true,
            };
        case types.featuredCollections:
            return {
                ...state,
                featuredCollections: action.payload,
                loaded: true,
            };

        default:
            return state;
    }
};
