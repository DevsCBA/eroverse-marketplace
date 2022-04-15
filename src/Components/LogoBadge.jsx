import { LogoChico } from "../Ui/Logo/LogoChico";
import { Flex, Text } from "@chakra-ui/react";

const LogoBadge = (props) => {
  const { style, username } = props;
  return (
    <Flex overflow="hidden" style={style} flexDirection="row" alignItems="center" py={1} px={2} mt={1} bg={"background.alternative"} borderRadius={16}>
      <LogoChico height={20} />
      <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" w={{ base: "100%" }} px={1} variant="bold" fontSize="18px" color="white">
        {username ?? "Eroverse"}
      </Text>
    </Flex>
  );
};

export default LogoBadge;
