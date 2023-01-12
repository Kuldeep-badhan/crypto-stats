import React from "react";
import ReactDOM from "react-dom/client";
// import {colors} from './theme.js'
import App from "./App";
import { ChakraProvider ,extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        background: "white",
        color: "black"
      },
    }),
  },
});



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
);

const server = 'https://api.coingecko.com/api/v3';
export default server;