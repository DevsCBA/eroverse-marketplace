import {
  Box,
  Flex,
  Heading,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { cloneElement } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";

// eslint-disable-next-line
export const RegularGrid = (props) => {
  const {
    CardComponent,
    title,
    my,
    info = {},
    filterId,
    collectionId,
    showCollection,
    collections,
    showLoading,
  } = props;
  const [SpinnerState, setSpinnerState] = useState(false);
  const reduxState = useSelector((state) => state);
  const walletState = reduxState.wallet.connected;
  const totalnftbyRedux = reduxState.profile.profile.total;
  const [showNotFound, setShowNotFound] = useState("");
  
  // eslint-disable-next-line
  const mapArray = info?.nfts || collections || [];

  // eslint-disable-next-line
  const sliderOptions = mapArray.map((element, index) => {
    const { id, name, category_name, thumbnail_url, is_play2earn, price } =
      element || {};
    if (!filterId || filterId !== id) {
      return (
        <Box
          key={index}
          ml={15}
          mr={15}
          mb={"35px"}
          width={{
            base: "calc(50% - 30px)",
            md: "calc(50% - 30px)",
            lg: "calc(33.33% - 30px)",
            xl: "calc(33.33% - 30px)",
          }}
        >
          {cloneElement(CardComponent, {
            key: element.id + index,
            collectionId: collectionId,
            showCollection,
            id: id,
            name: name,
            category: category_name,
            thumbnail: thumbnail_url,
            p2e: is_play2earn,
            p: 4,
            price: price,
            item:element
          })}{" "}
        </Box>
      );
    }
  });





  useEffect(() => {
    if (walletState && totalnftbyRedux === 0) {
      setSpinnerState(true);
    }
    if (walletState && totalnftbyRedux === null) {
      setSpinnerState(false);
      setShowNotFound("Not Found any NFT");
    }
    if (!walletState) {
      setShowNotFound("");
    }
  }, [walletState, totalnftbyRedux]);

  useEffect(() => {
    if (mapArray[0] !== undefined) {
      setSpinnerState(false);
    }
  }, [mapArray]);


  return (
    <>
      <Box
        my={my ?? { base: "40px", md: "60px", lg: "60px", "2xl": "80px" }}
        mx={{ base: "4", md: "7", xl: "16", "2xl": "91px" }}
      >
        {title && (
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading
              as="h2"
              fontSize={{ base: "xl", md: "3xl", xl: "4xl" }}
              mb={{ base: "22px", md: "40px", xl: "40px" }}
              ml={{ base: "15px" }}
            >
              {title}
            </Heading>
          </Flex>
        )}
        {/* <Suspense fallback={<Box pos={{ base: "absolute", md: "fixed" }} w={{ base: "0", md: "316px" }} h={{ base: "0", md: "full" }} left={{ base: "-10em", md: "-20em", xl: "0" }} bg={"background.navigation"} />}>

      </Suspense>
       <Suspense
          fallback={
            <Center
              minH={{
                base: "calc(100vh - 64px)",
                md: "calc(100vh - 114px)",
                xl: "calc(100vh - 121px)",
              }}
            >
            </Center>
          }
        ></Suspense> */}
        {/* {SpinnerState && <Spinner size="xl" color="primary" />} */}
        <Center>
          {showLoading && showNotFound}
          {SpinnerState && (
            <Spinner
              size="xl"
              color="primary"
              style={{ textAlign: "center" }}
            />
          )}
        </Center>

        <Box style={{ display: "flex", flexWrap: "wrap" }}>{sliderOptions}</Box>
      </Box>
    </>
  );
};
