import React from "react";
import {Box, Image, Text} from '@chakra-ui/react'
import btc from '../assets/btc.png'
import {motion} from 'framer-motion';

const Home = () => {
  return <Box bg={'blackAlpha.900'} h={['70vh','95vh']} w={'full'}>
  <motion.div 
  style={{
    height:'50vh'
  }}
  animate={{
    translateY:'20px'
  }}
  transition={{
    duration:2,
    repeat:Infinity,
    repeatType:'reverse'
  }}
  >
  <Image  boxSize={['400px','500px']} src={btc} m={'auto'} filter={'grayscale(100%)'}/>
  </motion.div>
  <Text fontSize={'5xl'} textAlign={'center'} mt={'2rem'} color={'whiteAlpha.700'}  >Xcrypto</Text>
  </Box>;
};

export default Home;
