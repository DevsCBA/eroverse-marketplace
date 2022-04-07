import { useEffect } from "react";
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


export const Collection = () => {
  const { t } = useTranslation(["home"]);
  const dispatch = useDispatch();
  const { info} = useSelector((state) => state.collection);
  const { wallet} = useSelector((state) => state.wallet);

  const { last_release, featured, loaded } = useSelector((state) => state.games);

  //console.log("---info is--",info, "wallet",wallet);
  useEffect(() => {
    dispatch(collectionInfoLoading());
  }, [dispatch,wallet]);

  return (
    <>
      <CollectionHeader featured={null} loaded={false} info={info} />
      <Box mt={{ base: "20%", md: "8%" }}>
        <RegularGrid lastReleases={last_release} loaded={false} title="NFTs" info={info} CardComponent={<Card />} />
      </Box>
    </>
  );
};
