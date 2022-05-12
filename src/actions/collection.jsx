import { types } from '../types/types';

import {store} from "../store/store";
import {ethers} from 'ethers';

const nftContract = '0x35D8777D349c20fC3147C548cd9A25a684644852';
const nftURL = 'https://ipfs.io/ipfs/QmdgpkkxCAz8oSr5LMp7FZUYn4ifqBJDH5iyYZfmjRewNR/';

const collection_contract_map= {
	1:{
	   address:'0x7d1dcC9f99888f90cFBeB22E12f07249ecd65162',
	   ipfs:'QmdgpkkxCAz8oSr5LMp7FZUYn4ifqBJDH5iyYZfmjRewNR/'
    },
	2:{
		address:'0x5dade0BCa8E052A6cC4FdBE6280E0dc19073038A',
		ipfs:'QmRJUuWgFTP4qnpqyZ4eNS45zUeXg6az8U69QUKV3ZGrmK/'
	},
	3:{
		address:'0x940cB7Fe02e02a09500485F90eA58332A0DD87c8',
		ipfs:'QmbovgBidWApL6KnPoL3Kf7mt8Mux3tUoEzrr9gqc7DGh6/'
	},
	4:{
		address:'0x9f74036E7b05565C6052805a30c41889695E7d70',
		ipfs:'QmbovgBidWApL6KnPoL3Kf7mt8Mux3tUoEzrr9gqc7DGh6/'
	},
    5:{
	   address:'0x1846cB4e829C5d5c6B4ef7A9acc90148eC8292FC',
	   ipfs:'QmfPE5mtYh6kHWWnQ3ZKH2fXuw5jpi8Z9t9JoFDyaZH4hA/'
	}
}

const addressIdMap = {
	"0x7d1dcC9f99888f90cFBeB22E12f07249ecd65162":1,
	"0x5dade0BCa8E052A6cC4FdBE6280E0dc19073038A":2,
	"0x940cB7Fe02e02a09500485F90eA58332A0DD87c8":3,
	"0x9f74036E7b05565C6052805a30c41889695E7d70":4,
	"0x1846cB4e829C5d5c6B4ef7A9acc90148eC8292FC":5
}
async function getNFT(collectionId,tokenId) {
	let url = "https://ipfs.io/ipfs/" + collection_contract_map[collectionId].ipfs + tokenId + '.json'
	let urlObj
	try {
		 const response = await fetch(url);
		 urlObj = await response.json();
	}catch (e){

		url = "https://ipfs.io/ipfs/" + collection_contract_map[collectionId].ipfs
		const res = await fetch(url);
		urlObj = await res.json();
	}

	urlObj.id = tokenId;
	urlObj.category =  urlObj['name'];
	urlObj.thumbnail_url = 'https://ipfs.io/ipfs/' + urlObj['image'].slice(7);
	urlObj.p2e = false;
	urlObj.p = 4;
	urlObj.type = urlObj['image'].slice(-1) == '4' ? 'video': 'image';
	return urlObj;
}


export const collectionInfoLoading = (id) => {
	let collectionContact = collection_contract_map[id].address;
	let collectionIPFS = collection_contract_map[id].ipfs
	return async (dispatch) => {
		let wallet = await store
			.getState().wallet;

		if(!wallet?.contract){
			dispatch(collectionInfoLoaded({}));
			return;
		}
		try{
		let royalty = await wallet.contract.royaltyPercentage(collectionContact)
		royalty =  royalty/ 10 + '%';
		let onsaleItems = await wallet.contract.fetchContractsOnSaleItems(collectionContact);
         let floarPrice = null, nfts = [],  nftView = {}
		 if (onsaleItems.length > 0) {
                    var floorPrice = parseInt(onsaleItems[0][4]);
                    for (var i = 0; i < onsaleItems.length; i++) {
                        if (parseInt(onsaleItems[i][4]) < floorPrice) {
                            floorPrice = parseInt(onsaleItems[i][4]);
                        }
                        let nft = await getNFT(id,parseInt(onsaleItems[i][2]),onsaleItems[i][1],onsaleItems[i][0],onsaleItems[i][3],onsaleItems[i][4]);
						let bnbPrice = await ethers.utils.formatEther(parseInt(onsaleItems[i][4]).toString());
                        nft.price = bnbPrice;
						nfts.push(nft);
						nftView[parseInt(onsaleItems[i][2])] = {type:nft.type,createdBy:'Eroverse',name:nft.name, category: nft.category,thumbnail_url:nft.thumbnail_url, tokenId:parseInt(onsaleItems[i][2]), nftContract:onsaleItems[i][1], itemId:parseInt(onsaleItems[i][0]), seller:onsaleItems[i][3], price:bnbPrice}
                    }
                    var bnbFloor = await ethers.utils.formatEther(floorPrice.toString());
                    floarPrice = bnbFloor.toString() + 'BNB';
                    //document.getElementById('floor').innerHTML = bnbFloor.toString() + 'BNB';
		}

			let data = {'contractAddress':collectionContact,'total': '100', royalty:royalty, onsaleItems:onsaleItems, floarPrice:floarPrice,nfts:nfts,nftView};
			//console.log("---data---",data)
		 	dispatch(collectionInfoLoaded(data));
		}
		catch (e){
			//dispatch(collectionInfoLoaded({}));
			console.log("--------error-------",e)
		}
	};
};

export const collectionNftLoading = (nftId) => {
	return async (dispatch) => {
		let state = await store
			.getState()
	    try{
			let data = state?.collection?.info?.nftView[nftId]
			dispatch(collectionNftLoaded(data));
        }
        catch (e){
        	console.log("error",e)
		}
	};
};

export const trendingNftLoading = () => {
	return async (dispatch) => {
			let wallet = await store
				.getState().wallet;

			if(!wallet?.contract){
				dispatch(collectionInfoLoaded({}));
				return;
			}
			try{
				let onsaleItems = await wallet.contract.fetchOnSaleItems();
				let nfts = [];
				if (onsaleItems.length > 0) {
					let max = 3;
					if (onsaleItems.length < max) {
						max = onsaleItems.length;
					}
					for (var i = 0; i < max; i++) {
						let id = addressIdMap[onsaleItems[i][1]]
						let nft = await getNFT(id,parseInt(onsaleItems[i][2]),onsaleItems[i][1],onsaleItems[i][0],onsaleItems[i][3],onsaleItems[i][4]);
                        nfts.push(nft)
					}
				}
				dispatch(trendingNftLoaded(nfts));
			}
			catch (e){
				console.log("--------error-------",e)
			}
		}

};
export const featuredNftLoading = () => {
	return async (dispatch) => {
		let wallet = await store
			.getState().wallet;

		if(!wallet?.contract){
			dispatch(collectionInfoLoaded({}));
			return;
		}
		let id = Math.floor(Math.random() * 5)
		id = id === 0 ? 1: id;
		let obj = collection_contract_map[id];
		try{
			let onsaleItems = await wallet.contract.fetchContractsOnSaleItems(obj.address);
			console.log("fraty onsaleItems",onsaleItems)
			let nfts = [];
			if (onsaleItems.length > 0) {
				let max = 3;
				if (onsaleItems.length < max) {
					max = onsaleItems.length;
				}
				for (let i = 0; i < max; i++) {
					let nft = await getNFT(id,parseInt(onsaleItems[i][2]),onsaleItems[i][1],onsaleItems[i][0],onsaleItems[i][3],onsaleItems[i][4]);
					nfts.push(nft);
				}
			}
			const data = [{collectionId:id,nfts:nfts}];

			dispatch(featuredCollectionsLoaded(data));
		}
		catch (e){
			//dispatch(collectionInfoLoaded({}));
			console.log("--------error-------",e)
		}
	}

};



const collectionInfoLoaded = (data) => ({
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

/*
const categorySelectedLoaded = (data) => ({
	type: types.categorySelectedLoaded,
	payload: data,
});
*/

