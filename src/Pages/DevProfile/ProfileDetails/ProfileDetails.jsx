import { Box, Flex, Image, Text } from "@chakra-ui/react";
import bc_address_icon from "../../../Assets/Images/bc_address_icon.png";
import twitter from "../../../Assets/Images/twitter.png";
import telegram from "../../../Assets/Images/telegram.png";
import discord from "../../../Assets/Images/discord.png";
import patreon from "../../../Assets/Images/patreon.png";
import { DashboardCard } from "../../../Components/Cards/DashboardCard";

export const ProfileDetails = ({account, profile}) => {
  const bc_address_logo_size = "20px";
  const info = {total:profile.total, nfts:new Array(profile.onSaleTotal)}

  return (
    <>
      <Box pt={{ base: 8, sm: 10, md: "70px" }}>
        <Flex direction={"column"} justifyContent={"center"} alignItems="center" mx={"auto"} h={"full"} w={"100%"}>
          <Text variant={"bold"} fontSize={{ base: "2xl", md: "26px", xl: "4xl" }} color={"white"} py={{ base: 2, sm: 0 }}>
            Eroverse
          </Text>

          <Flex>
            <Image src={bc_address_icon} w={bc_address_logo_size} h={bc_address_logo_size} mx={1} />
            <Text fontSize={{ base: "15px", md: "15px", xl: "md" }} color={"title"}>
              {account}
            </Text>
          </Flex>

          <Text fontSize={{ base: "15px", md: "20px", xl: "md" }} color={"title"} w={{ base: "90%", sm: "20%", md: "90%" }} textAlign="center" mt={2}>
            The first adult gaming ecosystem on BSC. Play adult games, read adult comics and get paid in $BNB token.
          </Text>
          <Flex>
            {[
              { id: 1, name: "twiiter", logo_url: twitter },
              { id: 2, name: "telegram", logo_url: telegram },
              { id: 3, name: "discord", logo_url: discord },
              { id: 4, name: "patreon", logo_url: patreon },
            ].map((item, id) => (
              <Image key={id} src={item.logo_url} p={"10px"} />
            ))}
          </Flex>
        </Flex>
        <Box pt={{ base: "12px", md: "36px" }} px={{ base: "5%", md: "25%" }}>
          <DashboardCard info={info}/>
        </Box>
      </Box>
    </>
  );
};
