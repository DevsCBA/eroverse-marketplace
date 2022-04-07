import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { gameReducer } from "./gameReducer";
import { profileReducer } from "./profileReducer";
import { walletReducer } from "./walletReducer";
import {collectionReducer} from "./collectionReducer"
export const rootReducer = combineReducers({
    wallet: walletReducer,
    profile: profileReducer,
    games: gameReducer,
    category: categoryReducer,
    collection:collectionReducer
})