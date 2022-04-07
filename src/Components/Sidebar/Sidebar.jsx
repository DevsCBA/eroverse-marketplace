import { Box, Flex, IconButton } from "@chakra-ui/react";
import { SidebarItem } from "./SidebarItem";
import { useTranslation } from "react-i18next";
import { BiHome, BiJoystick } from "react-icons/bi";
import { FiRepeat, FiTrendingUp, FiHexagon, FiX } from "react-icons/fi";
import { LogoGrande } from "../../Ui/Logo/LogoGrande";
import { Link } from "react-router-dom";
export const Sidebar = (props) => {
  const { t } = useTranslation(["sidebar"]);
  const { onClose, ...rest } = props;
  return (
    <Box as="nav" top="0" zIndex="sticky" pb="10" overflowX="hidden" overflowY="auto" bg={"background.navigation"} {...rest}>
      <Flex pt={{ base: 0, xl: 20 }} mt={{ base: 0, xl: "121px" }} direction="column" as="nav" fontSize="xl" fontWeight={"bold"} aria-label="Main Navigation">
        <Flex my={6} ml={6} mb={20} mr={2} display={{ base: "inline-flex", xl: "none" }} justifyContent={"space-between"} alignItems={"center"}>
          <Link to="/" onClick={onClose}>
            <LogoGrande height={50} />
          </Link>
          <IconButton aria-label="Close" icon={<FiX />} fontSize={"2xl"} color={"secondary"} background={"transparent"} size="md" onClick={onClose} />
        </Flex>

        <SidebarItem icon={BiHome} onClick={onClose}>
          {t("home")}
        </SidebarItem>
        <SidebarItem icon={BiJoystick} path="collection" onClick={onClose}>
          {t("Collection")}
        </SidebarItem>
        <SidebarItem icon={BiJoystick} path="profile" onClick={onClose}>
          {t("Profile")}
        </SidebarItem>
        {/* <SidebarItem icon={BiJoystick} path="games" onClick={onClose}>
          {t("games")}
        </SidebarItem>
        <SidebarItem icon={FiRepeat} path="swap" onClick={onClose}>
          {t("swap")}
        </SidebarItem>
        <SidebarItem icon={FiTrendingUp} path="staking" onClick={onClose}>
          {t("staking")}
        </SidebarItem>
        <SidebarItem icon={FiHexagon} path="marketplace" onClick={onClose}>
          {t("nftMarketplace")}
        </SidebarItem> */}
      </Flex>
    </Box>
  );
};
