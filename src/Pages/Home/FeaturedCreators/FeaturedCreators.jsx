import { Box, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import "swiper/css";
import { CreatorCard } from "../../../Components/Cards/CreatorCard";

export const FeaturedCreators = ({ lastReleases, translate: t, loaded }) => {
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

  const sliderOptions = lastReleases.map((element, slide) => <CreatorCard key={slide} id={element.id} name={element.name} category={element.category_name} thumbnail={element.thumbnail_url} p2e={element.is_play2earn} />);

  const loadingSlides = [1, 2, 3, 4].map((slide, index) => <CreatorCard key={slide} id={index} name={""} category={""} thumbnail={""} />);

  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading as="h2" fontSize={{ base: "xl", md: "3xl", xl: "4xl" }}>
          {t("Featured Creators")}
        </Heading>
      </Flex>

      <Box style={{ display: "grid", gridTemplateColumns: DIMENSION }}>{loaded ? sliderOptions : loadingSlides}</Box>
    </>
  );
};
