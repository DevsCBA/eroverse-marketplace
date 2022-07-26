import { Badge, Box, Button, Flex, SkeletonText, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Card = ({ id, collectionId, showCollection, thumbnail, name, category, p2e, p, price }) => {
  const { t } = useTranslation(["home"]);
  let linkUrl = showCollection ? `collection/${collectionId}`: `/single-nft/${collectionId}/${id}`
    if(!collectionId){
        linkUrl = `/single-nft/${id}`
    }
  return (
    <>
      <Link to={linkUrl} display={"block"} pos={"relative"}>
        <Flex direction={"column"} alignItems={"center"}>
          <Flex flexWrap="wrap">
            <div className="profile_list_video">
              <video key={thumbnail} autoPlay loop>
                <source src={thumbnail} type="video/mp4" />
              </video>
            </div>
            {p2e !== 1 ? null : (
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
                <Flex
                  direction={"column"}
                  justifyContent={"flex-end"}
                  alignItems={"flex-end"}
                  mx={"auto"}
                  h={"full"}
                >
                  <Badge variant={"p2e"} fontSize={{ base: "xs", md: "lg" }}>
                    P2E
                  </Badge>
                </Flex>
              </Box>
            )}
          </Flex>
          <Flex
            /*as="detailbo"*/
            w={"full"}
            mt={{ base: "2", sm: "5" }}
            justifyContent={"space-between"}
            direction={{
              base: "column",
              md: "row",
            }}
          >
            {name !== "" ? (
              <Flex direction={"column"} width={"100%"}>
                <Text
                  variant={"bold"}
                  color={"title"}
                  fontSize={{
                    base: "md",
                    md: "2xl",
                  }}
                  lineHeight={1}
                  className="profile_list_title"
                >
                  {name}
                </Text>
                <Text
                  variant={"bold"}
                  fontSize={{
                    base: "xs",
                    md: "lg",
                    xl: "xl",
                  }}
                  color={"secondary"}
                >
                  {category}
                </Text>
                <Flex
                  flexDirection="row"
                  w={{ base: "100%" }}
                  px={{ base: "0px", md: "0px" }}
                  py={{ base: "5px", md: 0 }}
                  mt={{ base: "5px", md: "6px" }}
                >
                  <Text
                    fontSize={{
                      base: "xs",
                      md: "lg",
                      xl: "xl",
                    }}
                    lineHeight={1.2}
                    mr={1}
                  >
                    {"Price"}
                  </Text>
                  <Text
                    fontSize={{
                      base: "xs",
                      md: "lg",
                      xl: "xl",
                    }}
                    lineHeight={1.2}
                    color={"white"}
                    variant={"liter"}
                  >
                    {price || 1.2} BNB
                  </Text>
                </Flex>
                <Button
                  variant={"primary"}
                  display={{
                    base: "inline-flex",
                  }}
                  size={"sm"}
                  w="fit-content"
                  fontSize={{
                    base: "sm",
                    md: "md",
                    lg: "md",
                  }}
                  color={"white"}
                  px={8}
                  py={5}
                  my={3}
                >
                  {t("View NFT")}
                </Button>
              </Flex>
            ) : (
              <SkeletonText noOfLines={2} spacing="4" w={"full"} pr={5} />
            )}
          </Flex>
        </Flex>
      </Link>
      {/* </Box> */}
    </>
  );
};
