import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import image from "../../../Assets/Images/trending_nft1.png";
import LogoBadge from "../../../Components/LogoBadge";
import { useBreakpointValue } from '@chakra-ui/react';

export const SingleNFTHeader = ({nft}) => {
  const {createdBy, name,seller, price, thumbnail_url, type} = nft || {}
  const maxWidth = useBreakpointValue({
    xl: "45%",
  });
  return (
    <>
      <Flex alignItems="center" direction={{ base: "column", md: "row" }}>
        { type === 'image' && <Image src={thumbnail_url} w={{ base: "auto", md: "45%", lg: "100%", xl: "50%" }} h={{ base: "auto", md: "45%", lg: "auto" }} />}
        {type === 'video' && <video  autoPlay
                                     objectFit={"cover"} style={{maxWidth: maxWidth}}>
          <source src={thumbnail_url} type="video/mp4"/>
        </video>}
        <Flex w={"full"} overflow="hidden" justifyContent="space-evenly" direction="column" px={{ base: 0, md: "4%", lg: "5%", xl: "3%", "2xl": "5%" }} py={{ base: "7%", md: "4%", lg: "7%" }}>
          <Text my={"1%"} variant="bold" color="white" fontSize="xx-large">
            {name || 'Kali Roses Rare'}
          </Text>
          <Flex w="full" justifyContent={"space-evenly"}>
            <Flex direction="column" w="full">
              <Text color="white" variant="bold" fontSize={"18x"}>
                Created by
              </Text>
              <LogoBadge />
              <Text mt={4} color="white" variant="bold" fontSize={"18px"}>
                Collection
              </Text>
              <Text color="primary" variant="bold" fontSize={{ base: "12px", md: "15px", lg: "20px" }}>
                { name || 'Celeb Love 2: Kali Roses'}
              </Text>
            </Flex>
            <Box bg="primary" w="2px" mx={{ base: "5%", md: "8%", lg: "5%" }}></Box>
            <Flex direction="column" w="full">
              <Text color="white" variant="bold" fontSize={"18x"}>
                Owned by
              </Text>
              <LogoBadge username={seller} />
            </Flex>
          </Flex>
          <Text mt={"2%"} color="white" variant="bold" fontSize={{ base: "25px", md: "25px", lg: "30px" }}>
            Price
          </Text>
          <Text color="white" variant="bold" fontSize={{ base: "35px", md: "40px", lg: "60px" }}>
            { price || '1.2 BNB'}
          </Text>
          <Flex justifyContent={{ base: "center", md: "flex-start" }}>
            <Button
              variant={"primary"}
              display="inline-flex"
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
              Make Offer
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};