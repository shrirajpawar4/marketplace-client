import Head from 'next/head'
import Image from 'next/image'
import { Button, Stack, Divider, Heading, Flex, Box, Spacer, Text, Link } from '@chakra-ui/react'
import {useRouter} from "next/router"

import { useState, useEffect } from 'react'

import mintNfts from '../src/utils/mintNfts.json';



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

  const getNftFromContract = async () => {
    const CONTRACT_ADDRESS = "0x9A4Ea4Ec7f13d255bC9B855dcBb97595F1E49253";
  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, mintNfts.abi, signer);
  
        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.safeMint();
  
        console.log("Mining...please wait.")
        await nftTxn.wait();
        
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
  
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotConnectedContainer = () => (
    <Button colorScheme='teal' variant='outline' onClick={connectWallet}>
      Connect to Wallet
    </Button>
  );

  const renderMintUI = () => (
    <button onClick={contractMintNft}>
      Mint NFT
    </button>
  )

  useEffect(() => {
    checkWalletConnected();
  }, [])

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
      

      {/* <Button colorScheme='cyan' variant='outline' onClick={connectWallet}>Connect Wallet</Button> */}
      {currAccount === "" 
    ? renderNotConnectedContainer()
    : (
      <Button onClick={getNftFromContract}>
        Mint NFT
      </Button>
    )
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
