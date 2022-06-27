import { types } from "../types/types";

import { store } from "../store/store";
import { ethers } from "ethers";
import {
  AddressCollectionMap,
  collection_contract_map, marketplaceContract, contractAddresses,
  nftContract,
  nftURL,
} from "../constant/marketPlace";

async function getNFT(collectionId, tokenId, itemId) {
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
  urlObj.type = urlObj["image"].slice(-1) == "4" ? "video" : "image";
  urlObj.itemId = parseInt(itemId);
  return urlObj;
}

export const collectionInfoLoading = (id) => {
  const collectionContact = collection_contract_map[id].address,
    collectionIPFS = collection_contract_map[id].ipfs,
    collectionName = collection_contract_map[id].name;

  return async (dispatch) => {
    let wallet = await store.getState().wallet;

    if (!wallet?.contract) {
      dispatch(collectionInfoLoaded({}));
      return;
    }
    try {
      let royalty = await wallet.contract.royaltyPercentage(collectionContact);
      royalty = royalty / 10 + "%";
      let onsaleItems = await wallet.contract.fetchContractsOnSaleItems(
        collectionContact
      );
      let floarPrice = null,
        nfts = [],
        nftView = {};
      if (onsaleItems.length > 0) {
        let floorPrice = parseInt(onsaleItems[0][4]);
        for (var i = 0; i < onsaleItems.length; i++) {
          if (parseInt(onsaleItems[i][4]) < floorPrice) {
            floorPrice = parseInt(onsaleItems[i][4]);
          }
          let nft = await getNFT(
            id,
            parseInt(onsaleItems[i][2]),
            onsaleItems[i][1],
            onsaleItems[i][0],
            onsaleItems[i][3],
            onsaleItems[i][4],

          );
          let bnbPrice = await ethers.utils.formatEther(
            parseInt(onsaleItems[i][4]).toString()
          );
          nft.price = bnbPrice;
          nfts.push(nft);
          nftView[parseInt(onsaleItems[i][2])] = {
            type: nft.type,
            createdBy: "Eroverse",
            name: nft.name,
            category: nft.category,
            thumbnail_url: nft.thumbnail_url,
            tokenId: parseInt(onsaleItems[i][2]),
            nftContract: onsaleItems[i][1],
            itemId: parseInt(onsaleItems[i][0]),
            seller: onsaleItems[i][3],
            price: bnbPrice,
          };
        }
        var bnbFloor = await ethers.utils.formatEther(floorPrice.toString());
        floarPrice = bnbFloor.toString() + "BNB";
        //document.getElementById('floor').innerHTML = bnbFloor.toString() + 'BNB';
      }

      let data = {
        contractAddress: collectionContact,
        collectionName,
        total: "100",
        royalty: royalty,
        onsaleItems: onsaleItems,
        floarPrice: floarPrice,
        nfts: nfts,
        nftView,
      };
      //console.log("---data---",data)
      dispatch(collectionInfoLoaded(data));
    } catch (e) {
      //dispatch(collectionInfoLoaded({}));
      console.log("--------error-------", e);
    }
  };
};

export const collectionNftLoading = (nftId) => {
  return async (dispatch) => {
    let state = await store.getState();
    try {
      let data = state?.collection?.info?.nftView[nftId];
      dispatch(collectionNftLoaded(data));
    } catch (e) {
      console.log("error", e);
    }
  };
};

export const trendingNftLoading = () => {
  return async (dispatch) => {
    let wallet = await store.getState().wallet;

    if (!wallet?.contract) {
      dispatch(collectionInfoLoaded({}));
      return;
    }
    try {
      let onsaleItems = await wallet.contract.fetchOnSaleItems();
      let nfts = [];
      if (onsaleItems.length > 0) {
        let max = 3;
        if (onsaleItems.length < max) {
          max = onsaleItems.length;
        }
        for (let i = 0; i < max; i++) {
          let id = AddressCollectionMap[onsaleItems[i][1]];
          let nft = await getNFT(
            id,
            parseInt(onsaleItems[i][2]),
            onsaleItems[i][1],
            onsaleItems[i][0],
            onsaleItems[i][3],
            onsaleItems[i][4]
          );
          nft["collectionId"] = id;
          nfts.push(nft);
        }
      }
      dispatch(trendingNftLoaded(nfts));
    } catch (e) {
      console.log("--------error-------", e);
    }
  };
};
export const featuredNftLoading = () => {
  return async (dispatch) => {
    let wallet = await store.getState().wallet;

    if (!wallet?.contract) {
      dispatch(collectionInfoLoaded({}));
      return;
    }
    let id = Math.floor(Math.random() * 5);
    id = id === 0 ? 1 : id;
    let obj = collection_contract_map[id];
    try {
      let onsaleItems = await wallet.contract.fetchContractsOnSaleItems(
        obj.address
      );
      console.log("fraty onsaleItems", onsaleItems);
      let nfts = [];
      if (onsaleItems.length > 0) {
        let max = 3;
        if (onsaleItems.length < max) {
          max = onsaleItems.length;
        }
        for (let i = 0; i < max; i++) {
          let nft = await getNFT(
            id,
            parseInt(onsaleItems[i][2]),
            onsaleItems[i][1],
            onsaleItems[i][0],
            onsaleItems[i][3],
            onsaleItems[i][4]
          );
          nfts.push(nft);
        }
      }
      const data = [{ collectionId: id, nfts: nfts }];

      dispatch(featuredCollectionsLoaded(data));
    } catch (e) {
      //dispatch(collectionInfoLoaded({}));
      console.log("--------error-------", e);
    }
  };
};


export const collectionInfoLoaded = (data) => ({
  type: types.collectionInfo,
  payload: data,
});

const trendingNftLoaded = (data) => ({
  type: types.trendingNFTs,
  payload: data,
});

const featuredCollectionsLoaded = (data) => ({
  type: types.featuredCollections,
  payload: data,
});

const collectionNftLoaded = (data) => ({
  type: types.collectionNFT,
  payload: data,
});
