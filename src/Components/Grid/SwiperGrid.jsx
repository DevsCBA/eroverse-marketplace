import { Box, ButtonGroup, Flex, Heading, IconButton, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const SwiperGrid = (props) => {
  const { lastReleases, translate: t, loaded, CardComponent, title } = props;
  const [swiper, setSwiper] = useState(null);
  const slidesAmount = useBreakpointValue({ base: 2, lg: 3, "2xl": 3 });
  const spaceBetweenSlides = useBreakpointValue({
    base: 16,
    md: 58,
    xl: 16,
    "2xl": 16,
  });


  const sliderOptions = lastReleases.map((element,index) => (
    <SwiperSlide key={index}>
      {React.cloneElement(CardComponent, { id: element.id, collectionId:element.collectionId, name: element.name, category: element.category_name, thumbnail: element.thumbnail_url, p2e: element.is_play2earn })}
    </SwiperSlide>  
  ));

  const loadingSlides = [1, 2, 3, 4].map((slide, index) => <SwiperSlide key={index}>{React.cloneElement(CardComponent, { id: index, name: "", category: "", thumbnail: "" })}</SwiperSlide>);

  const allowTouch = useBreakpointValue({ base: true, xl: false });
  return (
    <>
      <Box mt={{ base: 9, md: 12, xl: 20 }} mx={{ base: "4", md: "7", xl: "16", "2xl": "91px" }}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Heading as="h2" fontSize={{ base: "xl", md: "3xl", xl: "4xl" }}>
            {title}
          </Heading>
          <ButtonGroup display={{ base: "none", lg: "inline-flex" }}>
            <IconButton icon={<BiChevronLeft />} onClick={() => swiper.slidePrev()} size={"sm"} variant={"arrow"} />
            <IconButton icon={<BiChevronRight />} onClick={() => swiper.slideNext()} size={"sm"} variant={"arrow"} />
          </ButtonGroup>
        </Flex>

        {/*TODO: buscar mejor inspiración  */}
        <Box mt={{ base: 5, md: 10 }}>
          <Swiper spaceBetween={spaceBetweenSlides} slidesPerView={slidesAmount} onSwiper={setSwiper} allowTouchMove={allowTouch}>
            {loaded ? sliderOptions : loadingSlides}
          </Swiper>
        </Box>
      </Box>
    </>
  );
};
