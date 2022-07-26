import { Box, Flex, Text, Button } from "@chakra-ui/react";
import LogoBadge from "../../../Components/LogoBadge";
import { useBreakpointValue } from '@chakra-ui/react';
import Web3 from 'web3/dist/web3.min.js';

import {marketplaceContract} from '../../../constant/marketPlace';
import marketplaceAbi from '../../../ABIs/marketplaceAbi.json'

window.web3 = new Web3(window.ethereum);


export const SingleNFTHeader = ({nft,account}) => {
 const {name,seller, price, thumbnail_url} = nft || {}
  const maxWidth = useBreakpointValue({
    md: "100%",
    lg: "40%",
    xl: "45%",
  });

  const onBuy = async()=>{
    let nftItemId = nft.itemId;
    const web3Marketplacecontract =  await new window.web3.eth.Contract(marketplaceAbi, marketplaceContract);
    let price_ = await Web3.utils.toWei(nft?.price);
    const gas_ = await web3Marketplacecontract.methods.createMarketplaceSale(nftItemId).estimateGas({ from: account, value: price_ });
    // eslint-disable-next-line
    const method = await web3Marketplacecontract.methods.createMarketplaceSale(nftItemId).send({ from: account, gas: gas_, value: price_}).on('receipt', async function(receipt) {
      alert("You have successfully bought this NFT!");
    });
  }

  return (
    <>
      <Flex alignItems="center" direction={{ base: "column", lg: "row" }}>
        {/*{ type === 'image' && <Image src={thumbnail_url} w={{ base: "auto", md: "45%", lg: "100%", xl: "50%" }} h={{ base: "auto", md: "45%", lg: "auto" }} />}*/}
        <div style={{maxWidth: maxWidth}}>
          <video key={thumbnail_url} autoPlay loop >
            <source src={thumbnail_url} type="video/mp4"/>
          </video>
          <Flex justifyContent={{ base: "center", md: "flex-start" }}>
          {/*<Button alignItems="center"*/}
          {/*    variant={"primary"}*/}
          {/*    display="inline-flex"*/}
          {/*    size={"sm"}*/}
          {/*    onClick={onBuy}*/}
          {/*    w="fit-content"*/}
          {/*    fontSize={{*/}
          {/*      base: "sm",*/}
          {/*      md: "md",*/}
          {/*      lg: "md",*/}
          {/*    }}*/}
          {/*    color={"white"}*/}
          {/*    px={8}*/}
          {/*    py={5}*/}
          {/*    my={3}*/}
          {/*>*/}
          {/*  Buy*/}
          {/*</Button>*/}
            </Flex>
        </div>
        <Flex w={"full"} overflow="hidden" justifyContent="space-evenly" direction="column" px={{ base: 0, md: "4%", lg: "5%", xl: "3%", "2xl": "5%" }} py={{ base: "7%", md: "4%", lg: "7%" }}>
          <Text my={"1%"} variant="bold" color="white" fontSize="xx-large">
            {name || 'Kali Roses Rare'}
          </Text>
          <Flex w="full" justifyContent={"flex-start"}>
            <Flex direction="column" w={{ base: "100%", md: "auto" }}>
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
            <Flex direction="column" w={{ base: "45%", md: "40%", lg: "58%" }}>
              <Text color="white" variant="bold" fontSize={"18x"}>
                Owned by
              </Text>
              <LogoBadge username={seller} />
            </Flex>
          </Flex>
          <Text mt={"20px"} color="white" variant="bold" fontSize={{ base: "25px", md: "25px", lg: "28px" }}>
            Price
          </Text>
          <Text mb={"20px"} lineHeight="1" color="white" variant="bold" fontSize={{ base: "28px", md: "30px", lg: "40px" }}>
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
              onClick={onBuy}
              color={"white"}
              px={8}
              py={5}
              my={3}
            >
              Buy
            </Button>
          </Flex>
        </Flex>
       </Flex>
    </>
  );
};
