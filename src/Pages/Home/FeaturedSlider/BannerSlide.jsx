import { Box, Flex, Image, Text, Button, useBreakpointValue, Skeleton, Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import thumnail_image from "../../../Assets/Images/home_banner.png";

export const BannerSlide = ({ name, category, id, image, thumbnail, p2e }) => {
  const { t } = useTranslation(["home"]);
  const buttonSize = useBreakpointValue({
    base: "md",
    xl: "lg",
  });
  return (
    <Link to={`games/${id}`}>
      <Box
        className="img"
        h={{ sm: 72, md: 96, xl: "458px" }}
        p={{ sm: 0 }}
        paddingBottom={{ base: "86.32479%" }}
        position={"relative"}
        _after={{
          bgGradient: "linear(to-tr, #1b1528, rgba(27, 21, 40, 0))",
          bottom: 0,
          content: '""',
          left: 0,
          opacity: 0.8,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <picture>
          <source media="(min-width: 480px)" srcSet={`${thumnail_image} 2048w`} sizes="(max-width: 1576px) 100vw, 1576px" />
          <Image fallback={<Skeleton h={"full"} w={"full"} objectFit={"cover"} objectPosition={"top"} pos={"absolute"} />} src={thumnail_image} alt="" h={"full"} w={"full"} objectFit={"cover"} objectPosition={"top"} pos={"absolute"} />
        </picture>
      </Box>

      <Box pos={"absolute"} top={0} right={0} bottom={{ base: "5", xl: "24" }} left={0} px={3} pt={3}>
        <Flex direction={"column"} justifyContent={"flex-end"} alignItems={"flex-start"} mx={"auto"} h={"full"} pl={{ base: "6", xl: "16" }} pr={{ base: 6, xl: 0 }}>
          {p2e !== 1 ? null : (
            <Badge variant={"p2e"} fontSize={{ base: "xs", md: "lg" }} bg={"transparent"}>
              P2E
            </Badge>
          )}

          <Text variant={"bold"} fontSize={{ base: "2xl", md: "26px", xl: "4xl" }} color={"title"}>
            {name}
          </Text>

          <Flex>
            <Text pr={1} variant={"medium"} color={"white"} fontSize={{ base: "lg", xl: "2xl" }}>
              {"By"}
            </Text>
            <Text variant={"medium"} color={"secondary"} fontSize={{ base: "lg", xl: "2xl" }}>
              {category}
            </Text>
          </Flex>

          <Button variant={"primary"} mt={{ base: 4, xl: "8" }} width={{ base: "full", sm: "auto" }} fontSize={"lg"} color={"title"} size={buttonSize} px={9}>
            {t("View NFT")}
          </Button>
        </Flex>
      </Box>
    </Link>
  );
};
