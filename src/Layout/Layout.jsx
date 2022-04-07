import { Box, Center, Drawer, DrawerContent, DrawerOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import { Suspense } from "react";
export const Layout = () => {
  const sidebar = useDisclosure();

  return (
    <>
      <Suspense fallback={<Box pos={{ base: "absolute", md: "fixed" }} w={{ base: "0", md: "316px" }} h={{ base: "0", md: "full" }} left={{ base: "-10em", md: "-20em", xl: "0" }} bg={"background.navigation"} />}>
        <Sidebar pos={{ base: "absolute", md: "fixed" }} w={{ base: "0", md: "316px" }} h={{ base: "0", md: "full" }} left={{ base: "-10em", md: "-20em", xl: "0" }} />
      </Suspense>
      <Suspense fallback={<Box pos={{ base: "relative", md: "fixed" }} top="0" zIndex={"sticky"} h={{ base: "64px", md: "114px", xl: "121px" }} w={"full"} bg={"background.navigation"} />}>
        <Navbar sidebar={sidebar} pos={{ base: "relative", md: "fixed" }} h={{ base: "64px", md: "114px", xl: "121px" }} w={"full"} pl={{ base: 2.5, md: 7 }} pr={{ base: 2.5, md: 5, xl: 16 }} />
      </Suspense>
      <Box
        as="section"
        minH={{
          base: "calc(100vh - 64px)",
          md: "calc(100vh - 114px)",
          xl: "calc(100vh - 121px)",
        }}
        bgGradient={{
          base: "linear(to-r, #1b1528, #491236)",
          xl: "linear(to-r, #1b1528, #491236, #1b1528)",
        }}
        ml={{ base: 0, xl: "316px" }}
        mt={{ base: "0", md: "114px", xl: "121px" }}
      >
        <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent bg="background.navigation">
            <Sidebar w="full" borderRight="none" onClose={sidebar.onClose} />
          </DrawerContent>
        </Drawer>
        <Suspense
          fallback={
            <Center
              minH={{
                base: "calc(100vh - 64px)",
                md: "calc(100vh - 114px)",
                xl: "calc(100vh - 121px)",
              }}
            >
              <Spinner size="xl" color="primary" />
            </Center>
          }
        >
          <Box transition=".3s ease" mx={"auto"} maxW={"1600px"}>
            <Box
              as="main"
              pt={{ base: 5, md: 7, xl: 10 }}
              // mx={{ base: '4', md: '7', xl: '16', '2xl': '91px' }}
              minH={{
                base: "calc(100vh - 64px)",
                md: "calc(100vh - 114px)",
                xl: "calc(100vh - 121px)",
              }}
              pb={4}
            >
              <Outlet />
            </Box>
          </Box>
        </Suspense>
      </Box>
    </>
  );
};
