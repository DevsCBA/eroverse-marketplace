import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { homeStartLoading } from "../../actions/game";
import { FeaturedSlider } from "./FeaturedSlider/FeaturedSlider";
import { SwiperGrid } from "../../Components/Grid/SwiperGrid";
import { Card } from "../../Components/Cards/Card";
import { RegularGrid } from "../../Components/Grid/RegularGrid";
import "./homeScreen.css";
import {trendingNftLoading, featuredNftLoading} from "../../actions/collection";
import {collection_contract_map} from '../../constant/marketPlace';

export const HomeScreen = () => {
 
  const { t } = useTranslation(["home"]);
  const dispatch = useDispatch();
    const { wallet, network} = useSelector((state) => state.wallet);
    const { last_release, featured , loaded} = useSelector((state) => state.games);
    const {trendingNfts, featuredCollections , loaded:collectionLoaded } = useSelector((state) => state.collection);
    // eslint-disable-next-line
    useEffect(() => {
        dispatch(featuredNftLoading());
        dispatch(trendingNftLoading());
    }, [wallet,network,dispatch]);

  useEffect(() => {
    dispatch(homeStartLoading());
  }, [dispatch]);

  return (
    <>

      <Box>
        <FeaturedSlider featured={featured} loaded={loaded} collectionMap={collection_contract_map} />
      </Box>

      <SwiperGrid lastReleases={trendingNfts} translate={t} loaded={collectionLoaded} CardComponent={<Card />} title="Trending NFTs" />

      <RegularGrid  showCollection={true} collectionId={featuredCollections[0]?.collectionId} lastReleases = {last_release} info={featuredCollections[0]}  translate={t} loaded={collectionLoaded} title="Featured Collection" CardComponent={<Card/>}  />

      {/*<Box mt={{ base: 9, md: 12, xl: 20 }} mx={{ base: "4", md: "7", xl: "16", "2xl": "91px" }}>
        <FeaturedCreators lastReleases={mockDataFeaturedCreators} translate={t} loaded={loaded} />
      </Box>*/}
    </>
  );
};
