import { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { homeStartLoading } from "../../actions/game";
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

  useEffect(() => {
    dispatch(homeStartLoading());
  }, [dispatch]);

  const Header = () => {
    return (
      <Flex py={"1%"} direction={"column"} justifyContent={"center"} alignItems="center">
        <Flex direction={"row"}>
          <Flex direction={"row"}>
            <Text variant="bold" color="white" fontSize={"20px"} px={1}>
              Collections
            </Text>
            <Text color="primary" variant="bold" fontSize={"20px"} px={1}>
              4
            </Text>
          </Flex>
          <Flex direction={"row"} px={4}>
            <Text variant="bold" color="white" fontSize={"20px"} px={1}>
              Owned
            </Text>
            <Text color="primary" variant="bold" fontSize={"20px"} px={1}>
              1
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      <Box>
        <ProfileHeader featured={featured} loaded={loaded} />
      </Box>
      <ProfileDetails />
      <Box my={{ base: "40px", md: "60px", lg: "60px", "2xl": "80px" }}>
        <Header></Header>
        <RegularGrid lastReleases={mockDataForFeaturedCollection} translate={t} loaded={loaded} CardComponent={<FeaturedCard />} my={0} />
      </Box>
    </>
  );
};
