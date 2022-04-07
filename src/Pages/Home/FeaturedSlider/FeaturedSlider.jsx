import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { FeaturedSlide } from "./FeaturedSlide";
import { BannerSlide } from "./BannerSlide";

import "swiper/css";
import "swiper/css/effect-fade";

export const FeaturedSlider = ({ featured, loaded }) => {
  const [swiper, setSwiper] = useState(null);

  const sliderOptions = featured.map((f) => (
    <SwiperSlide key={f.id}>
      <BannerSlide id={f.id} name={f.name} category={f.category_name} image={f.featured_url} thumbnail={f.thumbnail_url} p2e={f.is_play2earn} />
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper slidesPerView={1} effect={"fade"} allowTouchMove={false} modules={[EffectFade]} onSwiper={setSwiper}>
        {loaded ? (
          sliderOptions
        ) : (
          <SwiperSlide>
            <BannerSlide id={0} name={""} category={""} image={""} thumbnail={""} p2e={""} />
          </SwiperSlide>
        )}
      </Swiper>

      <Box pos={"relative"} zIndex={1} px={{ sm: 3 }} mt={{ base: 3, xl: "-3.5rem" }} pointerEvents={"none"}>
        <Flex justifyContent={"center"} maxW={"952px"} mx={"auto"} className="space-x">
          {loaded ? (
            <FeaturedSlide featured={featured} swiper={swiper} />
          ) : (
            <Skeleton
              p={0}
              paddingBottom={{
                base: "16.35%",
                md: "18.46%",
                xl: "15.147%",
              }}
              borderRadius={"20px"}
              w={"full"}
            />
          )}
        </Flex>
      </Box>
    </>
  );
};
