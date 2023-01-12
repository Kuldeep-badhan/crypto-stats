import React from "react";
import { HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <HStack p={"1rem"} bgColor={"blackAlpha.900"} color={"white"}>
      <Button variant={"none"}>
        <Link to="/">Home</Link>
      </Button>
      <Button variant={"none"}>
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button variant={"none"}>
        <Link to="/coins">Coins</Link>
      </Button>
    </HStack>
  );
};

export default Header;
