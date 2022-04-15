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
    const { wallet,network} = useSelector((state) => state.wallet);

    useEffect(() => {
        dispatch(collectionInfoLoading())
    }, [dispatch,wallet,network]);
    useEffect(()=>{
        dispatch(collectionNftLoading(id));
    },[dispatch,wallet,info,network, id])

    return (
    <>
      <Box mx={{ base: 4, md: 16 }}>
        <SingleNFTHeader nft={nft} />
      </Box>

      <RegularGrid info={info} filterId={parseInt(id)} lastReleases={trending_nft_data} loaded={loaded} title="From the same collection" CardComponent={<Card />} />
    </>
  );
};
