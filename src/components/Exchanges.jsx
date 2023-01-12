import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../index.js";
import {
  Container,
  VStack,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent.jsx";
import Loader from "./Loader.jsx";

const Exchanges = () => {
  const [exchange, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchExchanges();
  }, []);

  if (error)
    return (
      <ErrorComponent
        message={"There is a error while fetching exchanges data"}
      />
    );

  return (
    <>
      <Container maxW={"container.xl"} my={"3rem"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <HStack
              my={"2rem"}
              justifyContent={"space-evenly"}
              wrap={"wrap"}
              w={"80vw"}
              m={"auto"}
            >
              {exchange.map((item) => {
                return (
                  <>
                    <ExchangeCard
                      name={item.name}
                      key={item.id}
                      img={item.image}
                      rank={item.trust_score_rank}
                      url={item.url}
                    />
                  </>
                );
              })}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

function ExchangeCard({ img, name, rank, url }) {
  return (
    <>
      <a href={url} target={"blank"}>
        <VStack
          className="VStack"
          transition={"all 0.3s"}
          w={"52"}
          shadow={"lg"}
          p={"2rem"}
          m={"4"}
          css={{
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Image src={img} />
          <strong>{rank}</strong>
          <Text align={"center"}>{name}</Text>
        </VStack>
      </a>
    </>
  );
}



export default Exchanges;
