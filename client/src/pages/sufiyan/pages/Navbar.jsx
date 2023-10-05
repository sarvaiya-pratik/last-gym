// admin navbar

import {
  Box,
  Button,
  Circle,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  MdDynamicFeed,
  MdEco,
  MdEditNotifications,
  MdFeed,
  MdOutlineDarkMode,
} from "react-icons/md";
import { BsLightbulb } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
//AiOutlineMenu
import { BiSearch } from "react-icons/bi";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";


import { ImAndroid } from "react-icons/im";
import SearchBar from "../components/SearchBar";
import SearchBar2 from "../components/SearchBar2";
import { VscHeart } from "react-icons/vsc";
import { IoBagOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

// import mylogo from "../assets/mylogo.png"

import logo from "../assets/logo.png";
import { ActionLogout, getUserData } from "../../../redux/auth/auth.actions";
import { ACTION_GET_PRODUCTS } from "../../../redux/products/product.actions";
import { ACTION_GET_ADMIN } from "../../../redux/admin/admin.actions";

 const Links = [
 
   {
     name: 'Plans',
     path: '/plans',
   },
   {
     name: 'Products',
     path: '/products',
   },
   {
     name: 'Coach',
     path: '/coach',
   },
   {
     name: "About Us",
     path: "/about",
   },
  
 ];

const Navbar = () => {
  // const AdminIsAuth = true

  const dispatch = useDispatch();

  const {  loading, error } = useSelector((store) => store.product);
 const { userData, isAuth, AdminIsAuth } = useSelector((store) => store.auth);
  const { data: cartData } = useSelector((store) => store.cart);

  let userName =  userData && userData?.details?.username 

  console.log(userData)

  useEffect(() => {
   dispatch(ACTION_GET_PRODUCTS());
   
//console.log(token)
   setTimeout(() => {
     if (isAuth) {

      let token = JSON.parse(localStorage.getItem("token"))

       dispatch(getUserData(token.email))
     }
   }, 3000);
  }, [isAuth]);


  useEffect(() => {
    setTimeout(() => {
      if (AdminIsAuth) {
        dispatch(ACTION_GET_ADMIN());
      }
    }, 3000);
   }, [AdminIsAuth]);



  //console.log(cartData.length);

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [OpenSearch, SetOpenSearch] = useState("none");

  const toast = useToast()
  
  const naviGate = useNavigate()

  const LogOutUser = () => {
    dispatch(ActionLogout());
    toast({
      title: "Logout Successfull",
     
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    naviGate("/")
   
  };

  // borderBottom="1px solid #eeee"

  
  return (
    <Box zIndex={999}
     borderBottom={"4px solid #f45f02"}
    bgGradient={"linear-gradient(180deg, rgba(0,0,0,1) 20%, rgba(64,64,64,1) 93%)"}
    style={{ position: "sticky", top: 0, zIndex: "999" }}>
      <HStack
      
        style={{ position: "sticky", top: 0 }}
        p="0px 8%"
        justify="center"
        w="100%"
        h="64px"
      >
        <HStack
          w="full"
          maxW="1400px"
          p={{ base: "none", md: "0.6rem" }}
          spacing={8}
        >
          <HStack>
            <Link to="/">
              <Image
                // w={{ base: "80px", md: "140px" }}
                // minW="150px"
                dropShadow="2xl"
              
                style={{ position: "relative", left: "0px", zIndex: "1",width:"120px"}}
                top={{ base: "10px", md: "28px" }}
                // src={mylogo}
                src={logo}
                />
            </Link>
          </HStack>

          <HStack
            w={{ base: "full", md: "fit-content" }}
            justifyContent="space-around"
          >
            <Box visibility={{ base: "hidden", md: "visible" }}>
              <SearchBar />
            </Box>
          </HStack>
          <Spacer display={{ base: "none", md: "block" }} />

          {!isAuth ? (
            <Box display={{ base: "none", md: "none", lg: "block" }}>
              <HStack>
                <NavLink to="/login">
                  <Button
                   
                   _hover={{backgroundColor:"white", color:"orange.500"}}
                    color="white"
                    variant="outline"
                    fontWeight="semibold"
                  >
                    Sign in
                  </Button>
                </NavLink>

                <NavLink to="/register">
                  <Button
                  _hover={{backgroundColor:"white", color:"orange.500"}}
                     bg="#f45f02"
                     color="white"
                     variant="solid"
                     fontWeight="semibold"
                  >
                    Register
                  </Button>
                </NavLink>

                <IconButton
                _hover={{ color:"orange.500"}}
                  fontSize="25px"
                  borderRadius={50}
                  variant="link"
                  //onClick={toggleColorMode}
                  icon={<VscHeart />}
                />

                <NavLink to="/cart">
                  <IconButton
                  _hover={{ color:"orange.500"}}
                    fontSize="25px"
                    borderRadius={50}
                    variant="link"
                    //onClick={toggleColorMode}
                    icon={<IoBagOutline />}
                  />
                </NavLink>

                
              </HStack>
            </Box>
          ) : (
            <Box display={{ base: "none", md: "none", lg: "block" }}>
              <HStack spacing={25}>
                <HStack>
                  <Text color="whiteAlpha.900" fontSize="xl">
                    <ImAndroid />
                  </Text>
                  <Text fontWeight="semibold" color="whiteAlpha.900">
                    {userName}
                  </Text>
                </HStack>

                <Button
                  onClick={LogOutUser}
              
                  bg="#f45f02"
                  color="white"
                  variant="solid"
                  fontWeight="semibold"
                >
                  LogOut
                </Button>
                <NavLink to="/cart"> 
              <Flex>
                <IconButton
                  fontSize="25px"
                  borderRadius={50}
                  variant="link"
                  //onClick={toggleColorMode}
                  icon={<VscHeart />}
                  /><Text >
                  {userData.wishlist?.length !== 0 ? (
                    <Circle minWidth={30} bg="white">
                      {userData.wishlist?.length}
                    </Circle>
                  ) : (
                    ""
                  )}
                </Text>

                  </Flex></NavLink>

                <NavLink to="/cart">
                  <Flex>
                    <IconButton
                      fontSize="25px"
                      borderRadius={50}
                      variant="link"
                      //onClick={toggleColorMode}
                      icon={<IoBagOutline />}
                    />
                    <Text >
                      {userData.cart?.length !== 0 ? (
                        <Circle minWidth={30} bg="white">
                          {userData.cart?.length}
                        </Circle>
                      ) : (
                        ""
                      )}
                    </Text>
                  </Flex>
                </NavLink>

               
              </HStack>
            </Box>
          )}

          <HStack
            display={{ base: "-webkit-inline-flex", md: "none", lg: "none" }}
          >
            <NavLink to="/cart">
              <IconButton
                fontSize="25px"
                borderRadius={50}
                variant="link"
                //onClick={toggleColorMode}
                icon={<IoBagOutline />}
              />
            </NavLink>

            <IconButton
              variant="link"
              fontSize="x-large"
              onClick={() =>
                SetOpenSearch(OpenSearch == "none" ? "block" : "none")
              }
              icon={<BiSearch />}
            ></IconButton>

            <IconButton
              onClick={() => onOpen()}
              icon={<AiOutlineMenu />}
            ></IconButton>
          </HStack>
        </HStack>

        <Drawer
         onClose={onClose} isOpen={isOpen} size="full">
          <DrawerOverlay />

          <DrawerContent
          color="white"
          bgGradient={"linear-gradient(0deg, rgba(0,0,0,1) 14%, rgba(64,64,64,1) 100%)"}
        placement="right" >
            <DrawerCloseButton />
            <DrawerHeader>
              <HStack alignItems="center" h="20px">
                <Image
                 
                  w="150px"
                  position="absolute"
                  bottom="20px"
                  // client img navbar
                  // src="data:image/png;base64,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"
                />

              
              </HStack>
            </DrawerHeader>
            <DrawerBody>
              {isAuth && (
                <VStack>
                  <HStack>
                    <Text fontSize="xl">
                      <ImAndroid />
                    </Text>
                    <Text fontWeight="semibold">{userName}</Text>
                  </HStack>
                </VStack>
              )}
              <br />
              <Divider />
              <br />

              <VStack>
                {Links.map((el) => (
                  <VStack w={"80%"}>
                    <NavLink
                      key={el.path}
                      to={el.path}
                      w={"100%"}
                      onClick={() => onClose()}
                     
                      end
                    >
                      <Text
                        w={"100%"}
                        fontSize="20px"
                        className={({ isActive }) =>
                        isActive ? "SmallactiveS" : "SmalldefaultS"
                      }
                        fontWeight={"semibold"}
                        p="10px 5px"
                      >
                        {el.name}
                      </Text>
                    </NavLink>
                    <Divider />
                  </VStack>
                ))}
                <VStack w={"80%"}>
                  <NavLink
                    key={"el.padsdth"}
                    to={"/cart"}
                    w={"100%"}
                    onClick={() => onClose()}
                    className={({ isActive }) =>
                      isActive ? "SmallactiveS" : "SmalldefaultS"
                    }
                    end
                  >
                    <Text
                      w={"100%"}
                      fontSize="20px"
                      fontWeight={"semibold"}
                      p="10px 5px"
                    >
                      Cart
                    </Text>
                  </NavLink>
                  <Divider />
                </VStack>
              </VStack>

              {!isAuth ? (
                <HStack marginTop="20px" justifyContent="space-around">
                  <NavLink to="/login">
                    <Button
                      onClick={() => onClose()}
                      colorScheme="orange"
                      variant="outline"
                    >
                      Log In
                    </Button>
                  </NavLink>
                  <NavLink onClick={() => onClose()} to="/register">
                    <Button colorScheme="orange" variant="solid">
                      Register
                    </Button>
                  </NavLink>
                </HStack>
              ) : (
                <HStack marginTop="20px" justifyContent="space-around">
                  <NavLink to="/login">
                    <Button
                      onClick={() => {
                        onClose();
                        LogOutUser();
                      }}
                      position={"absolute"}
                      bottom="35px"
                      right="25px"
                      bg="#f45f02"
                      variant="solid"
                    >
                      LOG OUT
                    </Button>
                  </NavLink>
                </HStack>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>

      <HStack
        justifyContent={{ sm: "flex-end", xl: "center" }}
    
        // style={{position:"sticky", top:0 }}
        p="0px 8%"
        justify="center"
        w="100%"
        h={{ base: "20px", md: "54px" }}
      >
        <Box display={{ base: "none", md: "block", lg: "block" }}>
          <HStack w={"fit-content"} gap={{ base: 10, md: "5px", lg: 50 }}>
            {Links.map((el) => (
              <NavLink
                key={el.path}
                to={el.path}
                className={({ isActive }) =>
                  isActive ? "activeS" : "defaultS"
                }
                end
              >
                <Text fontSize="20px" fontFamily={"exo"}  p="10px 10px">
                  {el.name}
                </Text>
              </NavLink>
            ))}

            {AdminIsAuth && isAuth && (
              <NavLink
                key={"el.path"}
                to={"/admin"}
                className={({ isActive }) =>
                  isActive ? "activeS" : "defaultS"
                }
                end
              >
                <Text fontSize="20px" fontFamily={"exo"} color="whiteAlpha.900" p="10px 10px">
                  {"Admin"}
                </Text>
              </NavLink>
            )}

        {isAuth && AdminIsAuth==false && (
              <NavLink
                key={"el.path"}
                to={"/user-profile"}
                className={({ isActive }) =>
                  isActive ? "activeS" : "defaultS"
                }
                end
              >
                <Text fontSize="20px" fontFamily={"exo"} color="whiteAlpha.900" p="10px 10px">
                  {"Profile"}
                </Text>
              </NavLink>
            )}
          </HStack>
        </Box>
      </HStack>

      <Box display={{ base: `${OpenSearch}`, md: "none" }}>
        <SearchBar2 OpenSearch={OpenSearch} SetOpenSearch={SetOpenSearch} />
      </Box>
    </Box>
  );
};
// OpenSearch
// SetOpenSearch
export default Navbar;
