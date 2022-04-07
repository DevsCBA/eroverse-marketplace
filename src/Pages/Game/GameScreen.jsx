import React, { useEffect } from "react";
import { Box, Divider, Flex, IconButton, Skeleton, SkeletonText, Text, Wrap } from "@chakra-ui/react";
import { GameSlider } from "./GameSlider";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanGameLoading, gameStartLoading } from "../../actions/game";
import { FaTwitter, FaTelegramPlane, FaPatreon, FaDiscord, FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { GameDetails } from "./GameDetails";
import "./GameScreen.css";

export const GameScreen = () => {
  const { t } = useTranslation(["game"]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { gameSelected } = useSelector((state) => state.games);

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(cleanGameLoading());
    dispatch(gameStartLoading(id));
  }, [id, dispatch]);

  const handlePlayGame = (e) => {
    if (gameSelected.platform === "Web") {
      navigate("/games/" + id + "/play");
    } else {
      window.location.href = gameSelected.frame_url;
    }
  };

  function DeveloperIconSocials(data) {
    switch (data.name) {
      case "webpage":
        return <BsGlobe />;

      case "instagram":
        return <FaInstagram />;

      case "facebook":
        return <FaFacebookSquare />;

      case "discord":
        return <FaDiscord />;

      case "patreon":
        return <FaPatreon />;

      case "telegram":
        return <FaTelegramPlane />;

      case "twitter":
        return <FaTwitter />;

      default:
        return <BsGlobe />;
    }
  }

  const loadingSlider = (
    <>
      <Skeleton pb={"58%"} borderRadius={"10px"} />
      <Skeleton pb={"11%"} borderRadius={{ base: "5px", md: "20px" }} mt={{ base: 2.5, md: 4, xl: 7 }} />
    </>
  );

  const LoadingDetails = (
    <>
      <Skeleton pb={{ base: "25.58%", xl: "55.1%" }} />
      <Flex alignItems={{ base: "center", xl: "start" }} direction={"column"} mt={{ base: 2, xl: 4 }}>
        <Skeleton fontSize={{ base: "sm", md: "25px", xl: "lg" }} w={"50%"}>
          ero required
        </Skeleton>
        <Skeleton fontSize={{ base: "sm", md: "33px", xl: "2xl" }} w={"70%"}>
          50000000
        </Skeleton>
      </Flex>

      <Skeleton mt={{ base: 4, md: 12, xl: 4 }} h={{ base: "32px", md: "48px", xl: "96px" }} />
      <Box mt={{ base: 6, xl: 10 }} mb={{ base: 7, xl: 0 }}>
        <Skeleton fontSize={{ base: "md", md: "lg" }}>dev</Skeleton>
        <Divider my={{ base: 1, xl: 1.5 }} />
        <Skeleton fontSize={{ base: "md", md: "lg" }}>release</Skeleton>
        <Divider my={{ base: 1, xl: 1.5 }} />
        <Skeleton fontSize={{ base: "md", md: "lg" }}>platform</Skeleton>
        <Divider my={{ base: 1, xl: 1.5 }} />
        <Skeleton fontSize={{ base: "md", md: "lg" }}>p2e</Skeleton>
        <Divider my={{ base: 1, xl: 1.5 }} />
      </Box>
    </>
  );

  return (
    <>
      {gameSelected == null ? (
        <Skeleton w={"50%"} fontSize={{ base: "xl", md: "4xl", xl: "5xl" }}>
          Game Name
        </Skeleton>
      ) : (
        <Text variant={"bold"} color={"title"} fontSize={{ base: "xl", md: "4xl", xl: "5xl" }}>
          {gameSelected.name}
        </Text>
      )}

      <Flex direction={{ base: "column-reverse", xl: "row" }} mt={{ base: 3, xl: 12 }}>
        <Box width={{ base: "full", xl: "68%", "2xl": "71.5%" }}>
          {gameSelected?.gallery_url == null ? loadingSlider : <GameSlider gallery={gameSelected.gallery_url} />}

          {gameSelected == null ? (
            <SkeletonText noOfLines={3} spacing={4} pb={5} mt={{ base: 5, md: 7, xl: 10 }} />
          ) : (
            <Text mt={{ base: 5, md: 7, xl: 10 }} mb={{ base: 8, md: 12 }} fontSize={{ base: "xs", md: "lg" }}>
              {gameSelected.description}
            </Text>
          )}
          {gameSelected?.follow.length > 0 ? (
            <>
              <Text variant={"bold"} color={"title"} fontSize={{ base: "14px", md: "2xl" }} mb={{ base: 4, md: 8 }}>
                {t("followDeveloper")}
              </Text>
              <Flex justifyContent={"center"} alignItems={"center"} backgroundColor={"background.alternative"} borderWidth={{ base: "1px", md: "2px" }} borderColor={"secondary"} borderRadius={{ base: "15px", md: "30px" }} boxShadow={"0px 0px 10px var(--ero-colors-secondary)"} py={{ base: 5, md: 7, xl: 10 }}>
                <Wrap spacing={{ base: "14px", md: "20px" }} justify="center" w={{ base: "70%", md: "100%" }}>
                  {gameSelected.follow.map((follow) => (
                    <>
                      <IconButton
                        as="a"
                        href={follow.link}
                        target="_blank"
                        fontSize={{
                          base: "2xl",
                          md: "3xl",
                        }}
                        aria-label={follow.name}
                        icon={<DeveloperIconSocials name={follow.name} />}
                        bg="transparent"
                        color={"secondary"}
                        _hover={{
                          bg: "transparent",
                        }}
                        _active={{
                          bg: "transparent",
                        }}
                      />
                    </>
                  ))}
                </Wrap>
              </Flex>
            </>
          ) : null}
        </Box>

        <Box width={{ base: "full", xl: "27%", "2xl": "23%" }} ml={{ base: 0, xl: 16, "2xl": 20 }}>
          {gameSelected == null ? LoadingDetails : <GameDetails translate={t} handlePlayGame={handlePlayGame} gameSelected={gameSelected} />}
        </Box>
      </Flex>
    </>
  );
};
