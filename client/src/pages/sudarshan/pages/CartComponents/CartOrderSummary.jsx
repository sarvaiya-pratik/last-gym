import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react"
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import RazorPay from "../../../Payment";
import { formatPrice } from "./PriceTag";
const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color="white">
        {label}
      </Text>
      {value ? <Text color={"white"} fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = () => {
  const [qty,setQty] = React.useState(1)
  React.useEffect(()=>{
    const updateqty = userData.cart[0].qty
    let newqty
   {
    updateqty ? newqty = updateqty: newqty = 1
   }
   setQty(newqty)
  },[qty])

  const {userData, token, isAuth } = useSelector((store) => store.auth);
  const total = userData.cart.reduce((a, b) => a + +b.price, 0);


 
const PaymentKaro = ()=>{

}

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md" color={"white"}>Order Summary</Heading>

      <Stack spacing="6">
        {/* <OrderSummaryItem label="Subtotal" value={formatPrice(total*2)} /> */}
        <OrderSummaryItem label="Subtotal" value={formatPrice(qty ? total * qty : total)} />
        <OrderSummaryItem label="Shipping + Tax">
          <Link href="#" color={"#f45f02"} _hover={{color:"white"}} textDecor="underline">
            Calculate shipping
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          <Link href="#" color={"#f45f02"} _hover={{color:"white"}} textDecor="underline">
            Add coupon code
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" color={"white"} fontWeight="semibold">
            Total
          </Text>
          <Text color={"white"} fontSize="xl" fontWeight="extrabold">
            {/* $ {qty ? total * qty : total}.00 */}
            {formatPrice(qty ? total * qty : total)}
          </Text>
        </Flex>
      </Stack>
    

  <RazorPay  />
        
    </Stack>
  );
};
