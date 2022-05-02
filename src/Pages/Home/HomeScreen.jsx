import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { homeStartLoading } from "../../actions/game";
import { FeaturedSlider } from "./FeaturedSlider/FeaturedSlider";
import { FeaturedCreators } from "./FeaturedCreators/FeaturedCreators";
import { trending_nft_data, mockDataForFeaturedCollection, mockDataFeaturedCreators } from "../../Assets/data/data";
import { SwiperGrid } from "../../Components/Grid/SwiperGrid";
import { Card } from "../../Components/Cards/Card";
import { RegularGrid } from "../../Components/Grid/RegularGrid";
import { FeaturedCard } from "../../Components/Cards/FeaturedCard";
import "./homeScreen.css";

export const HomeScreen = () => {
  const { t } = useTranslation(["home"]);
  const dispatch = useDispatch();
  const { last_release, featured, loaded } = useSelector((state) => state.games);
  //console.log("fetured------", featured);
  useEffect(() => {
    dispatch(homeStartLoading());
  }, [dispatch]);

  return (
    <>
      <Box>
        <FeaturedSlider featured={featured} loaded={loaded} />
      </Box>

      <SwiperGrid lastReleases={trending_nft_data} translate={t} loaded={loaded} CardComponent={<Card />} title="Trending NFTs" />

      <RegularGrid lastReleases={mockDataForFeaturedCollection} translate={t} loaded={loaded} title="Featured Collection" CardComponent={<FeaturedCard />} />

      <Box mt={{ base: 9, md: 12, xl: 20 }} mx={{ base: "4", md: "7", xl: "16", "2xl": "91px" }}>
        <FeaturedCreators lastReleases={mockDataFeaturedCreators} translate={t} loaded={loaded} />
      </Box>
    </>
  );
};
