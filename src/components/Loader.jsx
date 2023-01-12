import { Spinner, VStack } from '@chakra-ui/react';
import React from 'react'

function Loader() {
    return (
      <>
        <VStack justifyContent={"center"} alignItems={"center"} h={"90vh"}>
          <Spinner size={"xl"} label={"Loading..."} />
          <div
            style={{
              fontSize: "1.5rem",
            }}
          >
            Loading...
          </div>
        </VStack>
      </>
    );
  }

export default Loader;
