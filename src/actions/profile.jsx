import axios from "axios";
import { types } from "../types/types";
import {store} from "../store/store";
import {ethers} from "ethers";
import {
    AddressCollectionMap,
    collection_contract_map,
    contractAddresses,
    marketplaceContract
} from "../constant/marketPlace";
import nftAbi from "../ABIs/nftAbi.json";


import { collectionInfoLoaded } from "./collection";

async function getNFT(tokenId, colAddress, price) {
    let collectionId = AddressCollectionMap[colAddress]

    let url =
        "https://ipfs.io/ipfs/" +
        collection_contract_map[collectionId].ipfs +
        tokenId +
        ".json";
    if (collection_contract_map[collectionId].removeToken) {
        url = "https://ipfs.io/ipfs/" + collection_contract_map[collectionId].ipfs;
    }
    let urlObj;
    try {
        const response = await fetch(url);
        urlObj = await response.json();
    } catch (e) {}
    urlObj.id = tokenId;
    urlObj.category = urlObj["name"];
    urlObj.thumbnail_url = "https://ipfs.io/ipfs/" + urlObj["image"].slice(7);
    urlObj.p2e = false;
    urlObj.p = 4;
    urlObj.type = urlObj["image"].slice(-1) != "g" ? "video" : "image";
    urlObj.price = price;
    return urlObj;
}

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

export const profileLoading = () => {
    return async (dispatch) => {
        let wallet = await store.getState().wallet;
        if (!wallet?.contract) {
            dispatch(collectionInfoLoaded({}));
            return;
        }
        let totalItems = 0, account = wallet?.wallet;
        let sellerItems = await wallet.contract.fetchSellersOnSaleItems(account);
        let balance;
        let count;
        let owner;
        let approved;
        let found;
        let j;
        let price;
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner();
        let nfts = [];

        for (let i = 0; i < contractAddresses.length; i++) {
            const nftContract = new ethers.Contract(contractAddresses[i], nftAbi, signer);
            balance = parseInt( await nftContract.balanceOf(account));
            count = 0;
            while (balance > 0) {
                count += 1;
                try {
                    owner = await nftContract.ownerOf(count);
                    if (account.toLowerCase() == owner.toLowerCase()) {
                        totalItems += 1;
                        approved = await nftContract.getApproved(count);
                        if (approved.toLowerCase() == marketplaceContract.toLowerCase()) {
                            found = false;
                            j = 0;
                            while (!found) {
                                if (sellerItems[j][1].toLowerCase() == contractAddresses[i].toLowerCase() && parseInt(sellerItems[j][2]) == count) {
                                    price = await ethers.utils.parseEther(sellerItems[j][4]);
                                    let res = await getNFT(count, contractAddresses[i], price);
                                    nfts.push(res);
                                    found = true
                                }
                                j += 1;
                            }

                        }
                        else {
                            let res = await await getNFT(count, contractAddresses[i], 0);
                            nfts.push(res);
                        }
                        balance += -1;
                    }

                }
                catch (e){
                    console.log(e)
                }


            }
        }

        let obj = {total:totalItems, onSaleTotal: sellerItems.length, nfts}
        dispatch(profileLoaded(obj))
    };
};
const profileLoaded = ( profile ) => ({
    type: types.profileLoaded,
    payload: profile
})

const profileHistoryLoaded = ( data ) => ({
    type: types.profileHistoryLoaded,
    payload: data
})