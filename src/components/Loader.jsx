import { Box, Spinner, VStack, Container } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner size={"xl"}/>
      </Box>
    </VStack>
  )
}

export default Loader