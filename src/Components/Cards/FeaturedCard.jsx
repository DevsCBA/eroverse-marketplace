import { Box, Flex, Image, Skeleton,Button, Text, Input, Badge, useBreakpointValue, AspectRatio, Spinner, Suspense,  Center} from "@chakra-ui/react";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import LogoBadge from "../LogoBadge";
import {marketplaceContract} from '../../constant/marketPlace'
import { useDispatch, useSelector } from "react-redux";
import {ethers} from "ethers";



export const FeaturedCard = ({ id, collectionId, showCollection, thumbnail, name, category, p2e, p, price, item }) => {
  const wallet = useSelector((state) => state.wallet);
  const gameNameWeight = "bold";
  const DIMENSION = useBreakpointValue({ base: 250, xs: 10, sm: 250, md: 300, lg: 300, xl: 300, "2xl": 320, "3xl": 1000 });
  const TOP_MARGIN_TEXT_BOX = useBreakpointValue({ base: 185, xs: 10, sm: 185, md: 220, lg: 220, xl: 220, "2xl": 240, "3xl": 900 });
  const buttonSize = useBreakpointValue({
    base: "md",
    xl: "lg",
  });

  const [nftPrice, setNftPrice] = useState(0)

  const onChange = (e)=>{
      setNftPrice(e.target.value);
  }
  const onButtonClick = async(type)=>{
      let account = wallet?.wallet;
      if(type === 'Sell'){
          !nftPrice && alert('No Price Specified');
          return;
          let price_ = ethers.utils.formatEther(nftPrice)
          const approvedList = await item.nftContract.getApproved(id);
          if (!approvedList.includes(marketplaceContract)) {
              const gas_ = await item.nftContract.approve(marketplaceContract, id).estimateGas({ from: account }).catch((e) => {
                  alert(e.message);
              });
              if (gas_) {
                  const method = await item.nftContract.approve(item.marketplaceContract, id).send({ from: account, gas: gas_  }).on('receipt', async function(receipt) {
                      let gas2_ = await wallet.contract.createMarketplaceItem(item.nftContractAddress, id, price_).estimateGas({ from: account }).catch((e) => {
                          alert(e.message);
                      });
                      let method2 = await wallet.contract.createMarketplaceItem(item.nftContractAddress, id, price_).send({ from: account, gas: gas2_ }).on('receipt', async function(receipt) {
                          alert("Token is now on Sale! (Add a page refresh here as well Siddharth)")
                      });

                  });
              }
          }
          else {
              let gas_ = await wallet.contract.createMarketplaceItem(item.nftContractAddress, id, price_).estimateGas({ from: account }).catch((e) => {
                  alert(e.message);
              });
              let method = await wallet.contract.createMarketplaceItem(item.nftContractAddress, id, price_).send({ from: account, gas: gas_ }).on('receipt', async function(receipt) {
                  alert("Token is now on Sale! (Add a page refresh here as well Siddharth)")
              });

          }
      }
      else{
         /* var gas_ = await wallet?.contract?.estimateGas.cancelMarketplaceSale(id)/!*.estimateGas({ from: account }).catch((e) => {
              alert(e.message);
          });*!/*/
          //alert("gas_",gas_);
          var method = await wallet?.contract?.cancelMarketplaceSale(id);
          console.log("method",method);
          alert("Token Sale is cancel! (Add a page refresh here as well Siddharth)")
      }
      alert(type)
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
              {!price &&  <Input
                  type={"number"}
                  value={nftPrice}
                  fontSize={{ base: '10px', md: '18px' }}
                  placeholder={'Enter Price'}
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
