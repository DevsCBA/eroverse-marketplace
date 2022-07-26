import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { homeStartLoading } from "../../actions/game";
import { profileLoading } from "../../actions/profile";
import { ProfileHeader } from "./ProfileHeader/ProfileHeader";
import { mockDataForFeaturedCollection } from "../../Assets/data/data";
import { ProfileDetails } from "./ProfileDetails/ProfileDetails";
import { RegularGrid } from "../../Components/Grid/RegularGrid";
import { FeaturedCard } from "../../Components/Cards/FeaturedCard";
import "../Home/homeScreen.css";

export const Profile = () => {
  const { t } = useTranslation(["home"]);
  const dispatch = useDispatch();
  const { featured, loaded } = useSelector((state) => state.games);
  const { wallet, network} = useSelector((state) => state.wallet);
  const {profile} = useSelector((state) => state.profile);


  useEffect(() => {
    dispatch(homeStartLoading());
    dispatch(profileLoading())
  }, [dispatch, wallet,network]);


  return (
    <>
      <Box>
        <ProfileHeader featured={featured} loaded={loaded} />
      </Box>
      <ProfileDetails  account={wallet} profile={profile}/>
      <Box my={{ base: "40px", md: "60px", lg: "60px", "2xl": "80px" }}>
       {/* <Header></Header>*/}
        <RegularGrid lastReleases={mockDataForFeaturedCollection} translate={t} info={profile} loaded={loaded} CardComponent={<FeaturedCard />} my={0} showLoading={true}/>
      </Box>
    </>
  );
};
