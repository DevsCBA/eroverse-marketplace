import { Box, Flex, Image, Text, Skeleton, useBreakpointValue } from "@chakra-ui/react";
import collection_banner from "../../../Assets/Images/collection_banner.png";
import LogoBadge from "../../../Components/LogoBadge";
import bc_address_icon from "../../../Assets/Images/bc_address_icon.png";
import { DashboardCard } from "../../../Components/Cards/DashboardCard";
export const CollectionHeader = ({info, collectionName}) => {
  const bc_address_logo_size = "20px";
  return (
    <>
      <Box className="img" h={{ sm: 72, md: 96, xl: "458px" }} p={{ sm: 0 }} paddingBottom={{ base: "86.32479%" }} position={"relative"}>
        <picture>
          <source media="(min-width: 480px)" srcSet={`${collection_banner} 2048w`} sizes="(max-width: 1576px) 100vw, 1576px" />
          <Image fallback={<Skeleton h={"full"} w={"full"} objectFit={"cover"} objectPosition={"top"} pos={"absolute"} />} src={collection_banner} alt="" h={"full"} w={"full"} objectFit={"cover"} objectPosition={"top"} pos={"absolute"} />
        </picture>
        <Box pos={"absolute"} top={0} right={0} bottom={0} left={0}>
          {/* left part */}
          <Flex direction={"column"} justifyContent={"center"} h={"full"}>
            <Box pl={{ base: "6", xl: "16" }}>
              <LogoBadge />
              <Text variant={"bold"} fontSize={{ base: "2xl", md: "26px", xl: "4xl" }} color={"title"} py={{ base: 2, sm: 0 }}>
                {collectionName ||  'Celeb Love 1: Megan Rain'}
              </Text>

              <Flex>
                <Image src={bc_address_icon} w={bc_address_logo_size} h={bc_address_logo_size} mx={1} />
                <Text fontSize={{ base: "15px", md: "15px", xl: "md" }} color={"title"}>
                  {info.contractAddress}
                </Text>
              </Flex>

              <Text fontSize={{ base: "15px", md: "15px", xl: "md" }} color={"title"} w={{ base: "90%", sm: "20%", md: "40%" }} mt={4}>
                The first adult gaming ecosystem on BSC. Play adult games, read adult comics and get paid in $BNB token.
              </Text>
            </Box>
            <Box pl={{ base: "6", xl: "16" }} px={"25px"} pos={"absolute"} bottom={{ base: "-50px", sm: "-50px" }} w={{ base: "100%", md: "60%", xl: "60%", "2xl": "49%" }}>
              <DashboardCard info={info}/>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};
