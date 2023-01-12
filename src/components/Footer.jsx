import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
   <Box w='full' bg='blackAlpha.900' minH={['35vh','10rem']}>
   <Stack direction={['column','row']} w='80vw' justifyContent={['space-between']} alignItems={'center'} m={'auto'} h='150'> 

        <VStack pt={['2rem','0']} color={'whiteAlpha.700'} alignContent={['center','start']}>
        <Text fontWeight={'bold'}>
            About Us
        </Text>
        <Text textAlign={'center'} pb={'2rem'}>
            This is a Indian crypto currency stats website.
        </Text>
        </VStack>
        <VStack pb={'2rem'} alignContent={'end'}>
            <Avatar/>
            <Text color={'whiteAlpha.700'}>Our Founder </Text>
        </VStack>
   </Stack>
   </Box>
  )
}

export default Footer
