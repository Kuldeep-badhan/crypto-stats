import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../index.js";
import {
  Container,
  HStack,
  Button,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent.jsx";
import CoinCard from "./CoinCard.jsx";
import Loader from "./Loader.jsx";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? " €" : "$";

  const btns = new Array(275).fill(1);

  function changePage(page) {
    setPage(page);
    setLoading(true);
  }
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}&per_page=48`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchCoins();
  }, [page, currency]);

  if (error)
    return (
      <ErrorComponent message={"There is a error while fetching coins data"} />
    );

  return (
    <>
      <Container maxW={"container.xl"} m={"auto"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <RadioGroup
              value={currency}
              onChange={setCurrency}
              display={"flex"}
              justifyContent={"center"}
            >
              <HStack direction="row" p={"8"} spacing={"8"}>
                <Radio value="inr">INR</Radio>
                <Radio value="eur">EUR</Radio>
                <Radio value="usd">USD</Radio>
              </HStack>
            </RadioGroup>
            <HStack
              my={"2rem"}
              wrap={"wrap"}
              w={"80vw"}
              m={"auto"}
              justifyContent={"space-evenly"}
            >
              {coins.map((item) => {
                return (
                  <>
                    <CoinCard
                      name={item.name}
                      id={item.id}
                      key={item.id}
                      img={item.image}
                      symbol={item.symbol}
                      currentPrice={item.current_price}
                      currencySymbol={currencySymbol}
                    />
                  </>
                );
              })}
            </HStack>
            <HStack overflowX={"scroll"} py={"2rem"} w={"80vw"} m={"auto"}>
              {btns.map((item, index) => {
                return (
                  <Button
                    bgColor={"blue.900"}
                    color={"white"}
                    p={"8"}
                    onClick={() => {
                      changePage(index + 1);
                    }}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};


export default Coins;
