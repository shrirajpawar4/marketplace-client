import { Heading,Flex,  Stack, Button, Box } from "@chakra-ui/react";


export default function Create() {
    return (
        <>
        <Box>
            <Heading>Mint your NFT</Heading>
        </Box>
        <Box marginLeft='96' padding='64'>
            <Button colorScheme='cyan' variant='outline' >Mint</Button>
        </Box>
        </>
    )
}