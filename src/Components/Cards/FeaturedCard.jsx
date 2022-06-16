import { Box, Flex, Image, Skeleton,Button, Text, Input, Badge, useBreakpointValue, AspectRatio, Spinner, Suspense,  Center} from "@chakra-ui/react";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import LogoBadge from "../LogoBadge";
import {marketplaceContract} from '../../constant/marketPlace';
import marketplaceAbi from '../../ABIs/marketplaceAbi.json'
import { useDispatch, useSelector } from "react-redux";
import {ethers} from "ethers";
import Web3 from 'web3/dist/web3.min.js';

window.web3 = new Web3(window.ethereum);




export const FeaturedCard = ({ id, collectionId, showCollection, thumbnail, name, category, p2e, p, price, item }) => {
  const wallet = useSelector((state) => state.wallet);
  const gameNameWeight = "bold";
  const DIMENSION = useBreakpointValue({ base: 250, xs: 10, sm: 250, md: 300, lg: 300, xl: 300, "2xl": 320, "3xl": 1000 });
  const TOP_MARGIN_TEXT_BOX = useBreakpointValue({ base: 185, xs: 10, sm: 185, md: 220, lg: 220, xl: 220, "2xl": 240, "3xl": 900 });
  const buttonSize = useBreakpointValue({
    base: "md",
    xl: "lg",
  });


  const [nftPrice, setNftPrice] = useState(null);

  const onChange = (e)=>{
      setNftPrice(e.target.value);
  }
  const onButtonClick = async(type)=>{
      let account = wallet?.wallet;
      let tokenId = item.tokenId;
      const nftContractAddress = item.nftContractAddress;
      const web3Marketplacecontract =  await new window.web3.eth.Contract(marketplaceAbi, marketplaceContract);
      if(type === 'Sell'){
          let tokenId = id;
          if(!nftPrice ||  !parseFloat(nftPrice)){
              alert('No Price Specified');
              return;
          }
          const price_ = await Web3.utils.toWei(nftPrice)
          const approvedList = await item.nftContract.methods.getApproved(tokenId).call();

          if (!approvedList.includes(marketplaceContract)) {
              const gas_ = await item.nftContract.methods.approve(marketplaceContract, tokenId).estimateGas({ from: account }).catch((e) => {
                  alert(e.message);
              });
              if (gas_) {
                  const method = await item.nftContract.methods.approve(marketplaceContract, tokenId).send({ from: account, gas: gas_  }).on('receipt', async function(receipt) {
                      var gas2_ = await web3Marketplacecontract.methods.createMarketplaceItem(nftContractAddress, tokenId, price_).estimateGas({ from: account }).catch((e) => {
                          alert(e.message);
                      });
                      var method2 = await web3Marketplacecontract.methods.createMarketplaceItem(nftContractAddress, tokenId, price_).send({ from: account, gas: gas2_ }).on('receipt', async function(receipt) {
                          alert("Token is now on Sale! (Add a page refresh here as well Siddharth)")
                      });

                  });
              }
          }
          else {
              var gas_ = await web3Marketplacecontract.methods.createMarketplaceItem(nftContractAddress, tokenId, price_).estimateGas({from: account}).catch((e) => {
                  alert(e.message);
              });
              var method = await web3Marketplacecontract.methods.createMarketplaceItem(nftContractAddress, tokenId, price_).send({
                  from: account,
                  gas: gas_
              }).on('receipt', async function (receipt) {
                  alert("Token is now on Sale! (Add a page refresh here as well Siddharth)")
              });
          }
      }
      else{
          let gas_ = await web3Marketplacecontract.methods.cancelMarketplaceSale(item.itemId).estimateGas({ from: account }).catch((e) => {
            alert(e.message);
          });
          let method = await web3Marketplacecontract.methods.cancelMarketplaceSale(item.itemId).send({ from: account, gas: gas_ }).on('receipt', async function(receipt) {
            alert("Token Sale is cancel! (Add a page refresh here as well Siddharth)")
          });
      }
      //alert(type)
  }


  return (
    <>
      {/* <Box
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
      > */}
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

              {price > 0 && <Text
                  variant={gameNameWeight}
                  color={"title"}
                  fontSize={{
                    base: "sm",
                    md: "25px",
                    xl: "xl",
                    "2xl": "2xl",
                  }}
                  height={"39px"}
                  pos={"relative"}
                >
                  ${price} BNB
                </Text>
              }
              {!price &&  <Input
                  type={"number"}
                  value={nftPrice}
                  fontSize={{ base: '8px', md: '16px' }}
                  placeholder={'Price'}
                  onChange={(e) => onChange(e)}
                  _placeholder={{
                      color: 'text.light',
                  }}
                  pl={0}
                  pr={{base:12, md: 16}}
                  borderWidth={1}
              />}

            {/* <button className="profile_list_btn"> {price > 0 ? 'Cancel Sale' : 'Sell NFT'} </button> */}
            <Button
              variant={"primary"}
              mt={{ base: 4, xl: "10px" }}
              width={{ base: "full", sm: "auto" }}
              fontSize={"lg"}
              color={"title"}
              size={buttonSize}
              px={9}
              onClick={(e)=> onButtonClick(price > 0 ? "Cancel" : "Sell")}
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

      {/* </Box> */}
    </>
  );
};
