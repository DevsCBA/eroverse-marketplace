import { Badge, Box, Button, Circle, Flex, Image, Skeleton, SkeletonText, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const CreatorCard = ({ id, thumbnail, name, category, p2e }) => {
  const { t } = useTranslation(["home"]);
  const DIMENSION = useBreakpointValue({ base: 250, xs: 10, sm: 250, md: 300, lg: 300, xl: 300, "2xl": 320 });
  const CIRCLE_DIMENSION = useBreakpointValue({ base: 59, md: 70, xl: 90, "2xl": 100 });
  return (
    <>
      <Link to={`games/${id}`} display={"block"} pos={"relative"}>
        <Flex justifyContent="center" p={2}>
          <Box borderWidth={{ base: "2px", md: "3px" }} borderColor={"primary"} overflow="hidden" borderRadius={{ base: "30px", md: "30px", lg: "30px" }}>
            <Flex flexWrap="wrap">
              <Image src={thumbnail} alt={name} fallback={<Skeleton h={"full"} w={DIMENSION} />} />

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
              // x
              as="absolute_text_flex"
              pos={"absolute"}
              zIndex={400}
              mt={useBreakpointValue({ base: -9, md: -9, lg: -10, xl: -12, "2xl": -14 })}
              ml={4}
            >
              <Circle w={CIRCLE_DIMENSION} h={CIRCLE_DIMENSION} bg="primary" overflow="hidden">
                <Text
                  color="white"
                  fontSize={{
                    base: 30,
                    xl: 45,
                    lg: 40,
                    md: 30,
                  }}
                >
                  NLT
                </Text>
              </Circle>
            </Flex>
            <Flex
              justifyContent={{
                md: "space-between",
              }}
              direction={{
                base: "column",
                md: "row",
              }}
              mt={useBreakpointValue({ base: 3, xs: 8, sm: 8, md: 5, lg: 4, xl: 8, "2xl": 8 })}
              p={4}
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
                  >
                    NLT
                  </Text>
                  <Text
                    variant={"bold"}
                    fontSize={{
                      base: "xs",
                      md: "sm",
                      xl: "sm",
                    }}
                    color={"white"}
                    m={4}
                    ml={0}
                    mr={0}
                  >
                    Creator of Lust Epidemics, Treasure of Nadia and currently working on The Genesis Order.
                  </Text>
                  <Button
                    variant={"primary"}
                    display={{
                      base: "none",
                      md: "inline-flex",
                    }}
                    w="fit-content"
                    color={"white"}
                  >
                    {t("View NFT")}
                  </Button>
                </Flex>
              ) : (
                <SkeletonText noOfLines={2} spacing="4" w={"full"} pr={5} />
              )}
            </Flex>
          </Box>
        </Flex>
      </Link>
      {/* </Box>  */}
    </>
  );
};
