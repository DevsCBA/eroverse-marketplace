import { Box, Button, Image, Skeleton, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const FeaturedSlide = (props) => {
  const { featured, swiper } = props;
  const [isDesktop] = useMediaQuery("(min-width: 1366px)");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let newActiveIndex = activeImageIndex === featured.length - 1 ? 0 : activeImageIndex + 1;
      setActiveImageIndex(newActiveIndex);
      if (swiper) {
        swiper.slideTo(newActiveIndex);
      }
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [activeImageIndex, swiper, featured]);

  const toggleActive = (index) => {
    swiper.slideTo(Number(index));
    setActiveImageIndex(index);
  };

  return (
    <>
      {featured.map((f, index) => (
        <Box
          key={index}
          className={activeImageIndex === index ? "active-thumb" : null}
          borderColor={"transparent"}
          borderRadius={{ base: "10px", md: "30px" }}
          borderWidth={{ base: "2px", md: "3px" }}
          overflow={"hidden"}
          position={"relative"}
          maxW={"229px"}
          w={"full"}
          onClick={() => {
            toggleActive(index);
          }}
          sx={{ "--opacity": "0.5" }}
          _hover={{
            bgColor: "rgba(33,13,66, 0)",
            borderColor: "secondary",
            filter: "drop-shadow(0px 4px 7px var(--ero-colors-secondaryAlpha-700))",
            "--opacity": 0,
          }}
          _after={{
            bottom: 0,
            content: '""',
            left: 0,
            opacity: 0.8,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <Button
            p={0}
            paddingBottom={{
              base: "67.14286%",
              md: "74.93%",
              xl: "64.58%",
            }}
            w={"full"}
            pointerEvents={"auto"}
            display={"block"}
            borderRadius={"0.5rem"}
            _after={{
              bgColor: "rgba(33,13,66, var(--opacity))",
              bottom: 0,
              content: '""',
              left: 0,
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <Image fallback={<Skeleton h={"full"} w={"full"} borderRadius={"0.5rem"} objectFit={"cover"} objectPosition={"top"} position={"absolute"} />} src={f.thumbnail_url} alt={f.name} h={"full"} objectFit={"cover"} objectPosition={"top"} position={"absolute"} w={"full"} />
          </Button>

          {isDesktop && (
            <Box pos={"absolute"} transform={"translate(-50%, 10%)"} bottom={"10%"} left={"50%"} w={"full"}>
              <Text variant={"bold"} textAlign={"center"} fontSize={"lg"} color={"title"} lineHeight={1.2}>
                {f.name}
              </Text>
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};
