import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import {
  Box,
  Container,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  HStack,
  Button,
} from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent";
import server from "../index.js";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? " €" : "$";

  useEffect(() => {
    async function fetchCoin() {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartArray(chartData.prices);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id, currency, days]);

  if (error)
    return (
      <ErrorComponent
        message={"There was an error while fetching coin data."}
      />
    );
  const daysarr = ["24h", "7d", "30d", "90d", "200d", "1y", "max"];
  function daysbtnfn(key) {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "90d":
        setDays("90d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  }
  return (
    <>
      <Container maxW={"container.lg"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box m={"auto"} p={"0.5rem"}>
              <Chart currency={currencySymbol} arr={chartArray} days={days} />
              <HStack wrap={"wrap"}>
                {daysarr.map((i) => {
                  return (
                    <Button
                      m={"0.5rem"}
                      onClick={() => {
                        daysbtnfn(i);
                      }}
                      key={i}
                    >
                      {i}
                    </Button>
                  );
                })}
              </HStack>
            </Box>
            <RadioGroup onChange={setCurrency} value={currency}>
              <Stack direction="row" w="fit-content" m={"2rem"}>
                <Radio value="inr">INR</Radio>
                <Radio value="eur">EUR</Radio>
                <Radio value="usd">USD</Radio>
              </Stack>
            </RadioGroup>
            <VStack my={"2rem"} mx={["auto", "2rem"]} w={"fit-content"}>
              <Text color={"gray.500"}>
                Last Updated On {coin.last_updated.split("T")[0]}
              </Text>
              <Image h={"16"} w={"16"} src={coin.image.small} />
              <Stat textAlign={"center"}>
                <StatLabel textAlign={"center"}>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol} {coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.market_cap_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.market_cap_change_percentage_24h}%
                </StatHelpText>
                <Badge
                  bgColor={"blackAlpha.900"}
                  color={"white"}
                  fontSize={"1.3rem"}
                >
                  #{coin.market_cap_rank}
                </Badge>
              </Stat>
            </VStack>
            <CustomBar
              high={coin.market_data.high_24h[currency]}
              low={coin.market_data.low_24h[currency]}
              currencySymbol={currencySymbol}
            />
            <Box my={"1rem"} mb={"3rem"}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulation Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Capital"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack w={"full"} justifyContent={"space-between"} fontFamily={"poppins"}>
      <Text fontWeight={"900"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
};

const CustomBar = ({ high, low, currencySymbol }) => {
  const today = new Date();
  const thisHour = today.getHours();
  const todayPercentage = (thisHour / 24) * 100;
  return (
    <>
      <Progress value={todayPercentage} />
      <HStack justifyContent={"space-between"}>
        <Badge my={"1rem"} colorScheme={"red"}>
          {" "}
          {currencySymbol + low}
        </Badge>
        <Text>24H Range</Text>
        <Badge my={"1rem"} colorScheme={"green"}>
          {" "}
          {currencySymbol + high}
        </Badge>
      </HStack>
    </>
  );
};

export default CoinDetails;
