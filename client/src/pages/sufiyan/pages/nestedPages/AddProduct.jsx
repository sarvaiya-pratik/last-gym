import React, { useState } from "react";
import {
  Spacer,
  Text,
  RadioGroup,
  HStack,
  VStack,
  Image,
  Textarea,
  Box,
  Radio,
  Flex,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { ACTION_ADD_PRODUCT } from "../../../../redux/admin/admin.actions";
import axios from "axios";
//import { ACTION_ADD_PRODUCT } from "../../redux/admin/admin.actions";

const AddProduct = () => {
  const [resize, setResize] = React.useState("horizontal");

  let [data, setData] = useState({pname:"",desc:"",imgurl:"",price:""})


  const dispatch = useDispatch();

  const toast = useToast()
  const handleChange = (e) => {
    // setData({...data,[e.target.name:e.target.value]})/
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  
  // const AddToDatabase = () => {
  //   dispatch(ACTION_ADD_PRODUCT(area))
  //     .then((res) => {
  //       toast({
  //         title: "Product Added Successfull",
  //         status: "success",
  //         duration: 4000,
  //         isClosable: true,
  //       })
  //     })

  //   //setarea("");
  // };
  const AddToDatabase = () => {
      axios.post("http://localhost:8080/products",data)
      .then((r)=>{
       if (r.status == 200){
        setData({pname:"",desc:"",imgurl:"",price:""})
        
        toast({
          title:r.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
       }
       else{
          toast({
            title:r.data,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        }
      })
     
  };

  return (
    <Flex gap="10rem" justifyContent="center" alignItems="center">
      <Flex
        p={50}
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        gap="1.2rem"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          gap="1.2rem"
        >
          <Text fontSize="1.5rem" fontWeight="bold" color="#f45f02">
            Choose Category
          </Text>
        </Flex>
        <VStack alignItems="flex-start" spacing="1rem">
          <VStack>
            <Textarea
              placeholder="Product Name"
              height={"110px"}
              width="650px"
              color="white"
              name="pname"
              value={data.pname}
              onChange={handleChange}
              resize={resize}
            />
          </VStack>

          <VStack>
            <Textarea
              placeholder="Product Description"
              height={"110px"}
              width="650px"
              value={data.desc}
              color="white"
              name="desc"
              onChange={handleChange}
              resize={resize}
            />
          </VStack>
          <VStack>
            <Input
              type="text"
              placeholder="Enter Img URL"
              // height={"200px"}
              width="650px"
              value={data.imgurl}
              color="white"
              name="imgurl"
              onChange={handleChange}
              resize={resize}
            />
          </VStack>
          <VStack>
            <Input
              type="text"
              placeholder="Enter Price"
              // height={"200px"}
              width="650px"
        value={data.price}
              color="white"
              name="price"
              onChange={handleChange}
              resize={resize}
            />
          </VStack>
          <RadioGroup color="white" colorScheme='orange' >
            {/* <HStack spacing="24px" align="left">
              <Radio value="products">Products</Radio>

              <Radio value="plans">Plans</Radio>

            </HStack> */}

            <Spacer />

            <Button
              height="50px"
              width="200px"
              fontSize="1.3rem"
              color="white"
              bg="#f45f02"
              marginTop="1rem"
              onClick={() => AddToDatabase()}
            >
              ADD PRODUCTS
            </Button>
          </RadioGroup>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default AddProduct;
