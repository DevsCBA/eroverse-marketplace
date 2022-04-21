import { types } from '../types/types';

import {store} from "../store/store";
import {ethers} from 'ethers';

const nftContract = '0x35D8777D349c20fC3147C548cd9A25a684644852';
const nftURL = 'https://ipfs.io/ipfs/QmdgpkkxCAz8oSr5LMp7FZUYn4ifqBJDH5iyYZfmjRewNR/';

async function getNFT(tokenId) {
	let url = nftURL + tokenId + '.json'
	const response = await fetch(url);
	let urlObj = await response.json();
	urlObj.id = tokenId;
	urlObj.category =  urlObj['name'];
	urlObj.thumbnail_url = 'https://ipfs.io/ipfs/' + urlObj['image'].slice(7);
	urlObj.p2e = false;
	urlObj.p = 4;
	urlObj.type = urlObj['image'].slice(-1) == '4' ? 'video': 'image';
	return urlObj;
}


export const collectionInfoLoading = () => {
	return async (dispatch) => {
		let wallet = await store
			.getState().wallet;

		if(!wallet?.contract){
			dispatch(collectionInfoLoaded({}));
			return;
		}
		try{
		let royalty = await wallet.contract.royaltyPercentage(nftContract)
		royalty =  royalty/ 10 + '%';
		let onsaleItems = await wallet.contract.fetchContractsOnSaleItems(nftContract);
         let floarPrice = null, nfts = [],  nftView = {}
		 if (onsaleItems.length > 0) {
                    var floorPrice = parseInt(onsaleItems[0][4]);
                    for (var i = 0; i < onsaleItems.length; i++) {
                        if (parseInt(onsaleItems[i][4]) < floorPrice) {
                            floorPrice = parseInt(onsaleItems[i][4]);
                        }
                        let nft = await getNFT(parseInt(onsaleItems[i][2]),onsaleItems[i][1],onsaleItems[i][0],onsaleItems[i][3],onsaleItems[i][4]);
						let bnbPrice = await ethers.utils.formatEther(parseInt(onsaleItems[i][4]).toString());
                        nft.price = bnbPrice;
						nfts.push(nft);
						nftView[parseInt(onsaleItems[i][2])] = {type:nft.type,createdBy:'Eroverse',name:nft.name, category: nft.category,thumbnail_url:nft.thumbnail_url, tokenId:parseInt(onsaleItems[i][2]), nftContract:onsaleItems[i][1], itemId:parseInt(onsaleItems[i][0]), seller:onsaleItems[i][3], price:bnbPrice}
                    }
                    var bnbFloor = await ethers.utils.formatEther(floorPrice.toString());
                    floarPrice = bnbFloor.toString() + 'BNB';
                    //document.getElementById('floor').innerHTML = bnbFloor.toString() + 'BNB';
		}

		let data = {'contractAddress':nftContract,'total': '100', royalty:royalty, onsaleItems:onsaleItems, floarPrice:floarPrice,nfts:nfts,nftView};
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


const collectionInfoLoaded = (data) => ({
	type: types.collectionInfo,
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

