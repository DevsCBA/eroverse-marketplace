import { Box, Flex, Text } from "@chakra-ui/react";

const DashboardCard = (props) => {
  const {info = {}} = props;
  return (
    <Flex bg="background.alternative" py={4} justifyContent={"space-evenly"} borderColor="primary" borderWidth="2px" borderRadius={18} boxShadow="0px 0px 15px #ec4eaf">
      {[
        { title: "Total Items", value: info.total },
        /*{ title: "Floor price", value: info.floarPrice },*/
        { title: "Items On Sale", value: info?.nfts?.length },
        /*{ title: "Royalty", value: info.royalty },*/
      ].map((item,index) => (
        <Flex direction="column" key={index}>
          <Text color="primary" fontSize={{ base: "12px", sm: "14px" }} variant="bold">
            {item.title}
          </Text>
          <Text variant="bold" fontSize={{ base: "11px", sm: "18px" }} color="white">
            {item.value}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export { DashboardCard };
