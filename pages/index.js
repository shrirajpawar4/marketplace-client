import Head from 'next/head'
import Image from 'next/image'
import { Button, Stack, Divider, Heading, Flex, Box, Spacer, Text, Link } from '@chakra-ui/react'
import {useRouter} from "next/router"

import { useState } from 'react'



export default function Home() {
  const [currAccount, setCurrAccount] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const router = useRouter();

  const checkWalletConnected = () => {
    const { ethereum } = window;
  
    if (!ethereum) {
      console.log("Make sure to connect metamask");
      return;
    } else {
      console.log("ethereum object", ethereum);
    }
  
    ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Account: ", account);
        setCurrAccount(account);
        getAllWaves();
      } else {
        console.log("no account found");
      }
    });
  };
  
  const connectWallet = () => {
    const { ethereum } = window;
  
    if (!ethereum) {
      alert("Make sure to connect metamask");
    }
  
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log("Connected", accounts[0]);
        setCurrAccount(accounts[0]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <Flex>
    <Box p={2}>
      <Heading>Artion</Heading>
    </Box>
    <Spacer />
      <Stack marginTop={4} spacing={4} direction='row' align='right'>

      <Button onClick={() => router.push('/explore')} colorScheme='teal' variant='ghost'>Explore</Button>
      <Button onClick={() => router.push('/create')} colorScheme='teal' variant='ghost'>Create</Button>
      <Button onClick={() => router.push('/collection')} colorScheme='teal' variant='ghost'>Collection</Button>
      
      {
        walletConnected ? 
        <Button colorScheme='cyan' variant='outline' onClick={connectWallet}>Connect Wallet</Button> :
        <Text colorScheme='cyan' variant='outline'>{currAccount}</Text>
      }
      </Stack>
    </Flex>

    <Divider mt={2} />
    
    <Flex>
    <Heading mt={2} fontSize='lg'>Artion is a market place built on Fantom. Create,Trade, Buy and Sell digital assets</Heading>
    </Flex>
    </>
  )
}
