import { Box, Flex, Image, Skeleton, Text, Badge, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import LogoBadge from "../LogoBadge";

export const FeaturedCard = ({ id, collectionId, showCollection, thumbnail, name, category, p2e, p, price }) => {
  const gameNameWeight = "bold";
  const DIMENSION = useBreakpointValue({ base: 250, xs: 10, sm: 250, md: 300, lg: 300, xl: 300, "2xl": 320, "3xl": 1000 });
  const TOP_MARGIN_TEXT_BOX = useBreakpointValue({ base: 185, xs: 10, sm: 185, md: 220, lg: 220, xl: 220, "2xl": 240, "3xl": 900 });
  return (
    <>
      <Link to={`games/${id}`} pos={"relative"}>
        <Flex justifyContent={"center"}>
          <Box style={{ display: "flex" }} flexWrap="wrap" p={4}>
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
                  >
                      {name}
                  </Text>
              </Flex>
              {/*</Flex>*/}
              <video  key={thumbnail} autoPlay  loop>
                  <source src={thumbnail} type="video/mp4"/>
              </video>

              <Flex direction={"column"} width={"100%"}>
                  {price > 0 && <Text
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
                      {`${price} BNB` }
                  </Text>}
                  <button> {price > 0 ? 'Cancel Sale' : 'Sell NFT'} </button>
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


          </Box>
        </Flex>
      </Link>
    </>
  );
};
