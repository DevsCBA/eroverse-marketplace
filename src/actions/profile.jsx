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
import marketplaceAbi from "../ABIs/marketplaceAbi.json";
import Web3 from 'web3'


import { collectionInfoLoaded } from "./collection";

async function getNFT(tokenId, colAddress, price) {
    console.log("called NFT", tokenId);
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
        let totalItems = 0, account =  '0x62412757075f4BDe3349487266771e706645478E';// wallet?.wallet;
        let balance;
        let count;
        let owner = "";
        let approved;
        let found;
        let j;
        let price;
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner();
        let nfts = [];

        let web3 = new Web3(window.ethereum);
        let marketplacecontract = new web3.eth.Contract(marketplaceAbi, marketplaceContract);
        let sellerItems = await marketplacecontract.methods.fetchSellersOnSaleItems(account).call();
        //load the smart contract
        //console.log("sellerItems",sellerItems.length)
        async function loadContract(abi, contractAddress) {
            return await new web3.eth.Contract(abi, contractAddress);
        }

        for (let i = 0; i < contractAddresses.length; i++) {
            let nftContract = await loadContract(nftAbi, contractAddresses[i]); //new ethers.Contract(contractAddresses[i], nftAbi, signer);
            let bal = await nftContract.methods.balanceOf(account).call();
            balance = parseInt(bal);
            count = 0;
            while (balance > 0) {
                count += 1;
               // try {
                    try {
                        owner = await nftContract.methods.ownerOf(count).call();
                    }
                    catch (e){

                    }
                    if (account.toLowerCase() == owner.toLowerCase()) {
                        totalItems += 1;
                        try {
                            approved = await nftContract.methods.getApproved(count).call();
                        }
                        catch (e){

                        }
                        if (approved.toLowerCase() == marketplaceContract.toLowerCase()) {
                            found = false;
                             j = 0;
                            while (!found) {
                                if (sellerItems[j][1].toLowerCase() == contractAddresses[i].toLowerCase() && parseInt(sellerItems[j][2]) == count) {
                                    //price = await ethers.utils.parseEther(sellerItems[j][4]);
                                    if(sellerItems[j][4]){
                                        price = Web3.utils.fromWei(sellerItems[j][4]);
                                    }
                                    console.log("let if", price)
                                    let res = await getNFT(count, contractAddresses[i], price);
                                    nfts.push(res);
                                    found = true
                                }
                                j += 1;
                            }

                        }
                        else {
                            let res =  await getNFT(count, contractAddresses[i], 0);
                            nfts.push(res);
                        }
                        balance += -1;
                    }
                //}
                /*catch (e){
                    console.log(e)
                }*/


            }
        }

        let obj = {total:totalItems, onSaleTotal: sellerItems.length, nfts}
        console.log("obj",obj);
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