import { useState } from 'react'
import  axios  from 'axios'
import React, { useEffect } from 'react'
import {server} from '../main.jsx'
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react'
import Loader from './Loader'
import Error from './Error'


const Exchanges = () => {
    const [exchanges,setExchanges]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    useEffect(() => {
        const fetchExchanges=async()=>{
            try {
                const {data}=await axios.get(`${server}/exchanges`);
                setExchanges(data); 
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);  
            }
        }
        fetchExchanges();
    }, [])
    
    if (error) return(<Error message="Error while fetching Exchanges"/>);
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((exchange) => (
              <ExchangeCard
                key={exchange.id}
                name={exchange.name}
                url={exchange.url}
                img={exchange.image}
                rank={exchange.trust_score_rank}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

const ExchangeCard=({name,img,rank,url})=>{
    return (
      <a href={url} target="blank">
        <VStack
          w={52}
          shadow={"lg"}
          p={8}
          borderRadius={"lg"}
          transition={"all 0.3s"}
          m={4}
          css={{
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Image
            src={img}
            w={10}
            h={10}
            objectFit={"contain"}
          />
          <Heading alignSelf={"center"} size={"md"} noOfLines={1}>
            {rank}
          </Heading>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </a>
    );
}   

export default Exchanges