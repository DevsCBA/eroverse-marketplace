import React, {useEffect} from "react";
import { Box } from "@chakra-ui/react";
import { SingleNFTHeader } from "./SingleNFTHeader/SingleNFTHeader";

import { trending_nft_data } from "../../Assets/data/data";
import {useDispatch, useSelector} from "react-redux";
import { Card } from "../../Components/Cards/Card";
import { RegularGrid } from "../../Components/Grid/RegularGrid";
import { useNavigate, useParams } from "react-router-dom";
import {collectionInfoLoading, collectionNftLoading} from "../../actions/collection";
import {homeStartLoading} from "../../actions/game";

export const SingleNFT = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {loaded,nft, info} = useSelector((state) => state.collection);
    const { wallet} = useSelector((state) => state.wallet);

    useEffect(() => {
        dispatch(collectionInfoLoading())
    }, [dispatch,wallet]);
    useEffect(()=>{
        dispatch(collectionNftLoading(id));
    },[dispatch,wallet,info])

    //console.log("nft,loaded in single nft",nft,loaded);
    return (
    <>
      <Box mx={{ base: 4, md: 16 }}>
        <SingleNFTHeader nft={nft} />
      </Box>

      <RegularGrid lastReleases={trending_nft_data} loaded={loaded} title="From the same collection" CardComponent={<Card />} />
    </>
  );
};
