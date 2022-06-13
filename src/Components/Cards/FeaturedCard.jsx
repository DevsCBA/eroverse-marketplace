import { Box, Flex, Image, Skeleton,Button, Text, Badge, useBreakpointValue, AspectRatio, Spinner, Suspense,  Center} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import LogoBadge from "../LogoBadge";


export const FeaturedCard = ({ id, collectionId, showCollection, thumbnail, name, category, p2e, p, price }) => {
  const gameNameWeight = "bold";
  const DIMENSION = useBreakpointValue({ base: 250, xs: 10, sm: 250, md: 300, lg: 300, xl: 300, "2xl": 320, "3xl": 1000 });
  const TOP_MARGIN_TEXT_BOX = useBreakpointValue({ base: 185, xs: 10, sm: 185, md: 220, lg: 220, xl: 220, "2xl": 240, "3xl": 900 });
  const buttonSize = useBreakpointValue({
    base: "md",
    xl: "lg",
  });

  console.log("thumbnail", thumbnail);

  return (
    <>
      <Box
        ml={15}
        mr={15}
        mb={20}
        width={{
          base: "calc(100% - 30px)",
          md: "calc(50% - 30px)",
          lg: "calc(33.33% - 30px)",
          xl: "calc(33.33% - 30px)",
        }}
        className="profil_list_block"
      >
        <Link to={`games/${id}`} pos={"relative"}>
          {/* <Flex justifyContent={"center"}> */}

          {/* <Image
              fallback={<Skeleton h={"full"} w={"full"} />}
              src={thumbnail}
              h={DIMENSION}
              w={DIMENSION}
              alt={name}
              objectFit={"cover"}
              borderRadius={{
                base: "17px",
                md: "20px",
              }}
            />*/}
          {/* <Flex
                  as="absolute_text_flex"
                  pos={"absolute"}
                  zIndex={400}
                  _before={{
                      bgGradient: "linear(to-t, #1b1528, rgba(27, 21, 40, 0))",
                      position: "absolute",
                      borderRadius: { base: "15px", md: "30px" },
                  }}
                  direction={"column"}
                  justifyContent={"flex-end"}
                  style={{ marginTop: TOP_MARGIN_TEXT_BOX, marginLeft: "9px" }}
              >*/}
          {/* <Flex direction={"column"} width={"100%"}>
              <Text
                variant={gameNameWeight}
                color={"title"}
                fontSize={{
                  base: "sm",
                  md: "22px",
                  xl: "xl",
                  "2xl": "2xl",
                }}
                pos={"relative"}
              >
                {name}
              </Text>
            </Flex> */}
          {/*</Flex>*/}
          <div className="profile_list_video">
            <video key={thumbnail} autoPlay loop>
              <source src={thumbnail} type="video/mp4" />
            </video>
          </div>

          <Flex direction={"column"} width={"100%"}>
            <Text
              variant={gameNameWeight}
              color={"title"}
              fontSize={{
                base: "sm",
                md: "22px",
                xl: "xl",
                "2xl": "2xl",
              }}
              pos={"relative"}
              className="profile_list_title"
            >
              {name}
            </Text>

            <Text
              variant={gameNameWeight}
              color={"title"}
              fontSize={{
                base: "sm",
                md: "22px",
                xl: "xl",
                "2xl": "2xl",
              }}
              height={"30px"}
              pos={"relative"}
            >
              {price > 0 && `${price} BNB`}
            </Text>

            {/* <button className="profile_list_btn"> {price > 0 ? 'Cancel Sale' : 'Sell NFT'} </button> */}
            <Button
              variant={"primary"}
              mt={{ base: 4, xl: "10px" }}
              width={{ base: "full", sm: "auto" }}
              fontSize={"lg"}
              color={"title"}
              size={buttonSize}
              px={9}
              // className={price > 0 ? "" : "mt_dasktop_40"}
            >
              {price > 0 ? "Cancel Sale" : "Sell NFT"}
            </Button>
          </Flex>
          {/*{!p2e ? null : (
              <Box
                pos={"absolute"}
                top={0}
                right={0}
                bottom={{
                  base: "10px",
                  md: "18px",
                  xl: "15px",
                }}
                left={0}
                px={3}
                pt={3}
              >
                <Flex direction={"column"} justifyContent={"flex-end"} alignItems={"flex-end"} mx={"auto"} h={"full"}>
                  <Badge variant={"p2e"} fontSize={{ base: "xs", md: "lg" }}>
                    P2E
                  </Badge>
                </Flex>
              </Box>
            )}*/}

          {/* </Flex> */}
        </Link>
      </Box>
    </>
  );
};
