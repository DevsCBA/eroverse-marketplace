import { Badge, Box, chakra, Flex, Image, Skeleton, Text, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export const GameGridItem = (props) => {
  const { game } = props;
  const ChakraLink = chakra(Link);
  const gameNameWeight = useBreakpointValue({ base: "medium", xl: "bold" });
  return (
    <>
      <ChakraLink to={`/games/${game.id}`} key={game.id} display={"block"} pos={"relative"} m={0}>
        <Box overflow={"hidden"} borderRadius={{ base: "15px", md: "30px" }} pos={"relative"} pb={{ base: "66.5%", md: "67.345%", xl: "68.093%" }} display={"block"}>
          <Image fallback={<Skeleton h={"full"} width={"full"} pos={"absolute"} />} h={"full"} pos={"absolute"} w={"full"} objectFit={"cover"} src={game.thumbnail_url} alt={game.name} />
        </Box>

        <Flex
          _before={{
            bgGradient: "linear(to-t, #1b1528, rgba(27, 21, 40, 0))",
            bottom: 0,
            content: '""',
            left: 0,
            opacity: 0.8,
            position: "absolute",
            right: 0,
            top: 0,
            borderRadius: { base: "15px", md: "30px" },
          }}
          direction={"column"}
          justifyContent={"flex-end"}
          pos={"absolute"}
          bottom={0}
          left={0}
          top={0}
          right={0}
          p={4}
          pl={{ base: 3, md: "22px", xl: 7, "2xl": 8 }}
          pb={{ base: 4, md: 8, xl: 6, "2xl": 8 }}
        >
          <Flex direction={"column"}>
            <Text
              variant={gameNameWeight}
              color={"title"}
              fontSize={{
                base: "sm",
                md: "27px",
                xl: "xl",
                "2xl": "2xl",
              }}
              pos={"relative"}
              lineHeight={1}
            >
              {game.name}
            </Text>
            <Flex justifyContent={"space-between"}>
              <Text
                variant={"bold"}
                color={"secondary"}
                fontSize={{
                  base: "xs",
                  md: "22px",
                  xl: "lg",
                }}
                pos={"relative"}
              >
                {game.category_name}
              </Text>
              {game.is_play2earn !== 1 ? null : (
                <Badge variant={"p2e"} pos={"relative"} fontSize={{ base: "xs", md: "lg" }}>
                  P2E
                </Badge>
              )}
            </Flex>
          </Flex>
        </Flex>
      </ChakraLink>
    </>
  );
};
