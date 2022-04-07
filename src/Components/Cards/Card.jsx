import { Badge, Box, Button, Flex, Image, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Card = ({ id, thumbnail, name, category, p2e, p, price }) => {
  const { t } = useTranslation(["home"]);

  return (
    <>
      <Link to={`single-nft/${id}`} display={"block"} pos={"relative"}>
        <Flex direction={"column"} alignItems={"center"} p={p}>
          <Flex flexWrap="wrap">
            {/*<Image
              fallback={<Skeleton h={"full"} w={"full"} />}
              src={thumbnail}
              // h={400}
              // w={370}
              alt={name}
              objectFit={"cover"}
              borderRadius={{
                base: "17px",
                md: "20px",
              }}
            />
*/}
              <video  autoPlay  objectFit={"cover"}
                     borderRadius={{
                         base: "17px",
                         md: "20px",
                     }}>
                  <source src={thumbnail} type="video/mp4"/>
              </video>
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
                <Flex direction={"column"} justifyContent={"flex-end"} alignItems={"flex-end"} mx={"auto"} h={"full"}>
                  <Badge variant={"p2e"} fontSize={{ base: "xs", md: "lg" }}>
                    P2E
                  </Badge>
                </Flex>
              </Box>
            )}
          </Flex>
          <Flex
            as="detailbo"
            w={"full"}
            mt={{ base: "2", sm: "5" }}
            justifyContent={"space-between"}
            direction={{
              base: "column",
              md: "row",
            }}
          >
            {name !== "" ? (
              <Flex direction={"column"}>
                <Text
                  variant={"bold"}
                  color={"title"}
                  fontSize={{
                    base: "md",
                    md: "2xl",
                  }}
                  lineHeight={1}
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
                  <Flex flexDirection="row" w={{ base: "100%" }} px={{ base: "0px", md: "0px" }} py={{ base: "5px", md: 0 }} mt={{ base: "5px", md: "6px" }}>
                      <Text
                          fontSize={{
                              base: "xs",
                              md: "lg",
                              xl: "xl",
                          }}
                          lineHeight={1.2}
                          mr={1}
                      >
                          {'Price'}
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
    </>
  );
};
