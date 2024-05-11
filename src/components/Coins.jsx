import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { server } from "../main.jsx";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <Error message="Error while fetching Coins"/>;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>

          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value="inr">₹</Radio>
              <Radio value="eur">€</Radio>
              <Radio value="usd">$</Radio>
            </HStack>
          </RadioGroup>
          
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}> 
            {coins.map((coin) => (
              <CoinCard
                key={coin.id}
                id={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                img={coin.image}
                price={coin.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack>
            <Button
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() =>
                setPage((prev) => (prev > 1 ? prev - 1 : 1), setLoading(true))
              }
            >
              Prev Page
            </Button>
            <Button
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() => (setPage((prev) => prev + 1), setLoading(true))}
            >
              Next Page
            </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({ id, name, img, price, symbol, currencySymbol }) => {
  return (
    <Link to={`/coin/${id}`}>
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
        <Image src={img} w={10} h={10} objectFit={"contain"} />
        <Heading alignSelf={"center"} size={"md"} noOfLines={1}>
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
      </VStack>
    </Link>
  );
};

export default Coins;
