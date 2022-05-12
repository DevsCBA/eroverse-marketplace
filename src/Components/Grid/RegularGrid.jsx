import { Box, Flex, Heading, useBreakpointValue, Text } from "@chakra-ui/react";
import React, { cloneElement } from "react";

import "swiper/css";

export const RegularGrid = (props) => {
  const { lastReleases, translate: t, loaded, CardComponent, title, my, info={}, filterId, collectionId, showCollection,collections} = props;
  const mapArray = info?.nfts || collections || [];
  const sliderOptions = mapArray.map((element) => {
    const { id, name, category_name, thumbnail_url, is_play2earn, price } = element || {};
    if(!filterId || filterId !==id){
      return cloneElement(CardComponent, { key: element.id, collectionId:collectionId, showCollection,id: id, name: name, category: category_name, thumbnail: thumbnail_url, p2e: is_play2earn, p: 4, price:price });
    }
  });

  const loadingSlides = [1, 2, 3, 4].map((slide, index) => cloneElement(CardComponent, { key: index, id: index, name: "", category: "", thumbnail: "" }));

  const isLessThan4 = lastReleases.length < 4;
  const DIMENSION = useBreakpointValue({
    base: "repeat(2, 1fr)",
    xs: "repeat(2, 1fr)",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: isLessThan4 ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
    xl: "repeat(3, 1fr)",
    "2xl": isLessThan4 ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
    "3xl": isLessThan4 ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
  });
  return (
    <>
      <Box my={my ?? { base: "40px", md: "60px", lg: "60px", "2xl": "80px" }} mx={{ base: "4", md: "7", xl: "16", "2xl": "91px" }}>
        {title && (
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading as="h2" fontSize={{ base: "xl", md: "3xl", xl: "4xl" }}>
              {title}
            </Heading>
          </Flex>
        )}

        <Box style={{ display: "grid", gridTemplateColumns: DIMENSION }}>{sliderOptions}</Box>
      </Box>
    </>
  );
};
