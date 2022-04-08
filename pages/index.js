import Head from 'next/head'
import NextLink from 'next/link'
import { useState, useCallback, useEffect } from 'react'
import { Flex, Button, Box, Text } from '@chakra-ui/react'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const check = useCallback(() => {
    // Perform localStorage action
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    check()
  },
    [])

  const guestRoute = (
    <NextLink href="/register" passHref>
      <Button
        as='a'
        bg="teal.500"
        color="whiteAlpha.900"
      >
        Create a club
      </Button>
    </NextLink>
  )

  const authRoute = (
    <NextLink href="/create" passHref>
      <Button
        as='a'
        bg="teal.500"
        color="whiteAlpha.900"
      >
        Create a doc
      </Button>
    </NextLink>
  )

  return (
    <div>
      <Head>
        <title> Doc</title>
        <meta name="description" content="doc ui" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          height="80%"
        >
          <Box
            mb="5rem"
          >
            <Text as='h4'
              fontSize="2.2rem"
              py="2rem"
              fontWeight={{ base: "normal", md: "bold" }}
              mx="2rem"

            >
              Welcome to Doc, a place to create, read, <br /> upload and download pdf
            </Text>
          </Box>
          <Box
            mb="5rem"
          >
            {isAuthenticated ? authRoute : guestRoute}
          </Box>
        </Flex>
      </main>

    </div>
  )
}
