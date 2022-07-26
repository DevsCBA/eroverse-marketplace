import React, {useEffect} from "react";
import { Box } from "@chakra-ui/react";
import { SingleNFTHeader } from "./SingleNFTHeader/SingleNFTHeader";

import { trending_nft_data } from "../../Assets/data/data";
import {useDispatch, useSelector} from "react-redux";
import { Card } from "../../Components/Cards/Card";
import { RegularGrid } from "../../Components/Grid/RegularGrid";
import { useParams } from "react-router-dom";
import {collectionInfoLoading} from "../../actions/collection";
import {AddressCollectionMap} from "../../constant/marketPlace"

export const SingleNFT = () => {
    const dispatch = useDispatch();
    const { collectionId,nftId } = useParams();
    const {loaded, info} = useSelector((state) => state.collection);
    const { wallet} = useSelector((state) => state.wallet);
    useEffect(()=>{
            dispatch(collectionInfoLoading(parseInt(collectionId)))
    },[wallet, collectionId, nftId,dispatch])

    const isValidNft = (item) =>{
        if(item && item[nftId] && AddressCollectionMap[item[nftId].nftContract] === parseInt(collectionId)){
            return true;
        }
        return false
    }
  return (
    <>
      <Box mx={{ base: 4, md: 16 }}>
          {loaded && isValidNft(info?.nftView) && <SingleNFTHeader nft={info?.nftView[nftId]} account={wallet}/>}
      </Box>
        {collectionId && isValidNft(info?.nftView) && <RegularGrid collectionId={collectionId} info={info} filterId={parseInt(nftId)} lastReleases={trending_nft_data} loaded={loaded} title="From the same collection" CardComponent={<Card />} />}
    </>
  );
};
