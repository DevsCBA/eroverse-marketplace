import { useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { homeStartLoading } from "../../actions/game";
import { trending_nft_data } from "../../Assets/data/data";
import { CollectionHeader } from "./CollectionHeader/CollectionHeader";
import { Card } from "../../Components/Cards/Card";
import { RegularGrid } from "../../Components/Grid/RegularGrid";
import { Box } from "@chakra-ui/react";
import "../Home/homeScreen.css";

import { collectionInfoLoading } from "../../actions/collection";
import {useParams} from "react-router-dom";


export const Collection = () => {
  const [collectionName, setCollectionName] = useState(null);
  const { t } = useTranslation(["home"]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info} = useSelector((state) => state.collection);
  const { wallet, network} = useSelector((state) => state.wallet);

  const { last_release, featured } = useSelector((state) => state.games);
  useEffect(() => {
    dispatch(collectionInfoLoading(parseInt(id || 1)));
  }, [dispatch,wallet,network, id]);
  useEffect(() => {
    dispatch(homeStartLoading());
  }, [dispatch]);
  useEffect(()=>{
    let name = featured[parseInt(id) -1]?.name
    setCollectionName(name)
  },[featured,id])

  return (
    <>
      <CollectionHeader featured={null} loaded={false} info={info} collectionName={collectionName}  />
      <Box mt={{ base: "20%", md: "8%" }}>
        <RegularGrid collectionId={id || 1} lastReleases={last_release} loaded={false}  title="NFTs" info={info} CardComponent={<Card />} />
      </Box>
    </>
  );
};
