import axios from "axios";
import { types } from "../types/types";
import { store } from "../store/store";
import { ethers } from "ethers";
import {
  AddressCollectionMap,
  collection_contract_map,
  contractAddresses,
  marketplaceContract,
} from "../constant/marketPlace";
import nftAbi from "../ABIs/nftAbi.json";

import { collectionInfoLoaded } from "./collection";
const contractToUrl = {
  "0x7d1dcC9f99888f90cFBeB22E12f07249ecd65162":
    "https://ipfs.io/ipfs/QmdgpkkxCAz8oSr5LMp7FZUYn4ifqBJDH5iyYZfmjRewNR/", //0xBD35FC23132CA28f2C0e12f2e5EC85b1fCC4d6D9 //ORIGIN COLLECTION
  "0x5dade0BCa8E052A6cC4FdBE6280E0dc19073038A":
    "https://ipfs.io/ipfs/QmRJUuWgFTP4qnpqyZ4eNS45zUeXg6az8U69QUKV3ZGrmK", //0x40a7dc52386ee62d02054575bb66995251A70638 //XMAS COLLECTION
  "0x940cB7Fe02e02a09500485F90eA58332A0DD87c8":
    "https://ipfs.io/ipfs/QmbovgBidWApL6KnPoL3Kf7mt8Mux3tUoEzrr9gqc7DGh6/", //0xB0dFE92FC62B48611716dC9fA0D3A2187c1C854D //CELEB LOVE COLLECTION 1 MEGAN RAIN
  "0x9f74036E7b05565C6052805a30c41889695E7d70":
    "https://ipfs.io/ipfs/QmbovgBidWApL6KnPoL3Kf7mt8Mux3tUoEzrr9gqc7DGh6/", //0x4502EB52A587D58B339576dBE3b09F96aEb54dD1 //CELEB LOVE COLLECTION 2 KALI ROSES
  "0x1846cB4e829C5d5c6B4ef7A9acc90148eC8292FC":
    "https://ipfs.io/ipfs/QmfPE5mtYh6kHWWnQ3ZKH2fXuw5jpi8Z9t9JoFDyaZH4hA/", //0x0BF6eCadfa0114B00B0da17Eae00aE80B55f0596 //CELEB LOVE COLLECTION 3 JESSA RHODES
};

async function getNFT(tokenId, colAddress, price) {
  let url = contractToUrl[colAddress];
  if (url.slice(-1) == "/") {
    url += tokenId + ".json";
  }
  //console.log("tokenId, colAddress",tokenId, colAddress)
  let urlObj;
  try {
    const response = await fetch(url);
    urlObj = await response.json();
  } catch (e) {}

  //console.log("urlObj[\"name\"];",urlObj["name"])

  //console.log("urlObj[\"image\"]",urlObj["image"])
  //console.log("urlObj[\"image\"].slice(-1) != \"g\"", urlObj["image"].slice(-1) != "g")
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
  return async (dispatch) => {
    let url = process.env.REACT_APP_API_PROXY + "/profile/rewards/";
    axios
      .post(url, { wallet })
      .then((result) => {
        let reward = 0;
        if (result.data !== "") {
          reward = result.data;
        }

        let profile = {
          rewards: reward,
        };
        dispatch(profileLoaded(profile));
      })
      .catch((error) => console.log("error", error));

    url = process.env.REACT_APP_API_PROXY + "/profile/history/";
    axios
      .post(url, { wallet })
      .then((res) => {
        dispatch(profileHistoryLoaded(res.data));
      })
      .catch((error) => console.log("error", error));
  };
};

export const profileLoading = () => {
  return async (dispatch) => {
    let wallet = await store.getState().wallet;
    if (!wallet?.contract) {
      dispatch(collectionInfoLoaded({}));
      return;
    }
    let totalItems = 0,
      account = wallet?.wallet; //"0x62412757075f4BDe3349487266771e706645478E"
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
    let foundCount=0

    for (let i = 0; i < contractAddresses.length; i++) {
      let nftContract = new ethers.Contract(
        contractAddresses[i],
        nftAbi,
        signer
      );
      balance = parseInt(await nftContract.balanceOf(account));
      foundCount = balance;
      count = 0;
      if(balance==0){
        totalItems= null
      }
      while (balance > 0) {
        count += 1;
        //try {
        try {
          owner = await nftContract.ownerOf(count);
        } catch (e) {}
        if (account.toLowerCase() == owner.toLowerCase()) {
          totalItems += 1;
          try {
            approved = await nftContract.getApproved(count);
          } catch (e) {}
          if (approved.toLowerCase() == marketplaceContract.toLowerCase()) {
            found = false;
            j = 0;
            while (!found) {
              if (
                sellerItems[j][1].toLowerCase() ==
                  contractAddresses[i].toLowerCase() &&
                parseInt(sellerItems[j][2]) == count
              ) {
                let p = parseInt(sellerItems[j][4]).toString();
                price = ethers.utils.formatEther(p);
                console.log("sellerItems[j][4]", price);
                let res = await getNFT(count, contractAddresses[i], price);
                nfts.push(res);
                found = true;
              }
              j += 1;
            }
          } else {
            let res = await getNFT(count, contractAddresses[i], 0);
            nfts.push(res);
          }
          balance += -1;
        }

        //}
        /*catch (e){
                    console.log(e)
                }  */
      }
    }

    let obj = { total: totalItems, onSaleTotal: sellerItems.length, nfts, foundNFT: foundCount };
    dispatch(profileLoaded(obj));
  };
};
const profileLoaded = (profile) => ({
  type: types.profileLoaded,
  payload: profile,
});

const profileHistoryLoaded = (data) => ({
  type: types.profileHistoryLoaded,
  payload: data,
});
