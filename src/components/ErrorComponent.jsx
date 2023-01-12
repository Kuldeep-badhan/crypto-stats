import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
  <Alert 
  status='error'
  w={'container.lg'}
  m={'auto'}
  my={'10'}
  borderRadius={'5'}
  >
    <AlertIcon/>
    {message}
  </Alert>
  )
}

export default ErrorComponent
