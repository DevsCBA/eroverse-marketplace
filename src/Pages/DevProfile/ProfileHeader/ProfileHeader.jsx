import { Box, Flex, Image, Text, Skeleton, Circle, useBreakpointValue } from "@chakra-ui/react";
import profile_banner from "../../../Assets/Images/profile_banner.png";
import { LogoChico } from "../../../Ui/Logo/LogoChico";

export const ProfileHeader = () => {
  const CIRCLE_DIMENSION = useBreakpointValue({ base: 59, md: 100, lg: 100, xl: 100, "2xl": 110 });
  const LOGO_DIMENSION = useBreakpointValue({ base: 59, md: 100, lg: 70, xl: 100, "2xl": 80 });
  return (
    <>
      <Box className="img" h={{ sm: 72, md: 96, xl: "458px" }} p={{ sm: 0 }} paddingBottom={{ base: "86.32479%" }} position={"relative"}>
        <picture>
          <source media="(min-width: 480px)" srcSet={`${profile_banner} 2048w`} sizes="(max-width: 1576px) 100vw, 1576px" />
          <Image fallback={<Skeleton h={"full"} w={"full"} objectFit={"cover"} objectPosition={"top"} pos={"absolute"} />} src={profile_banner} alt="" h={"full"} w={"full"} objectFit={"cover"} objectPosition={"top"} pos={"absolute"} />
        </picture>
        <Flex
          // x
          as="absolute_text_flex"
          pos={"absolute"}
          zIndex={400}
          mt={useBreakpointValue({ base: -9, md: -9, lg: -10, xl: -12, "2xl": -14 })}
          w={"100%"}
          justifyContent="center"
          bottom={{ base: "-31px", sm: "-50px", xl: "-49px", "2xl": "-55px" }}
        >
          <Circle borderColor="primary" borderWidth="4px" w={CIRCLE_DIMENSION} h={CIRCLE_DIMENSION} bg="background.alternative" overflow="hidden">
            <Text
              color="white"
              fontSize={{
                base: 30,
                xl: 45,
                lg: 40,
                md: 30,
              }}
            >
              <LogoChico height={LOGO_DIMENSION} width={LOGO_DIMENSION} />
            </Text>
          </Circle>
        </Flex>
      </Box>
    </>
  );
};
