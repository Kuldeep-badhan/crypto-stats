import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react'

function CoinCard({ id, img, name, symbol, currentPrice, currencySymbol }) {
    return (
      <>
      <Link to={`/coin/${id}`}>

        <VStack
          className="VStack"
          h={'210'}
          w={"52"}
          shadow={"lg"}
          p={"2rem"}
          m={"4"}
          transition={"all 0.3s"}
          css={{
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Image src={img} boxSize='70px' />
          <Heading size={"md"}>{symbol}</Heading>
          <Text>{name}</Text>
          <Text>  {currentPrice?`${currencySymbol}${currentPrice}`:"NA"}</Text>
        </VStack>
      </Link>
      </>
    );
  }

export default CoinCard
