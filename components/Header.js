import React, { useEffect, useState, useCallback } from "react";
import {
    Box,
    Stack,
    Heading,
    Flex,
    Text,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { HamburgerIcon } from "@chakra-ui/icons";


const Header = (props) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());
    
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

    const logOut = () => {
        localStorage.clear('token')
        window.location.href= '/'
    }

    const dashAuth = (
        <>
            <NextLink href="/create" passHref>
                <Button
                    variant="outline"
                    _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    mx={{ base: 3, md: 7 }}
                    mb={{ base: 3, md: 0 }}
                    as="a"

                >
                    Create Club
                </Button>
            </NextLink>
        </>
    )


    const dashGuest = (
        <>
            <NextLink href="/about" passHref>
                <Button
                    variant="outline"
                    _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    mx={{ base: 3, md: 7 }}
                    mb={{ base: 3, md: 0 }}
                    as="a"

                >
                    About Us
                </Button>
            </NextLink>
        </>
    )
    const authLinks = (
        <>
            <NextLink href="/dashboard" passHref>
                <Button
                    variant="outline"
                    _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    mx={{ base: 3, md: 7 }}
                    mb={{ base: 3, md: 0 }}
                    as="a"

                >
                    Dashboard
                </Button>
            </NextLink>
            <NextLink href="/users" passHref>
                <Button
                    mx={{ base: 3, md: 7 }}
                     mb={{ base: 3, md: 0 }}
                    variant="outline"
                    _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    as="a"
                >
                    All User
                </Button>
            </NextLink>
           
            <NextLink href="/clubs" passHref>
                <Button
                    mx={{ base: 3, md: 7 }}
                     mb={{ base: 3, md: 0 }}
                    variant="outline"
                    _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    as="a"
                >
                    Your Club
                </Button>
            </NextLink>
            <Button
                mx={{ base: 3, md: 7 }}
                variant="outline"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                as="a"
                onClick={logOut}
            >
                Log Out
            </Button>
        </>

    )

    const guestLinks = (
        <>
            <NextLink href="/login" passHref>
                <Button
                    variant="outline"
                    _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    mx={{ base: 3, md: 7 }}
                    mb={{ base: 3, md: 0 }}
                    as="a"

                >
                    Login
                </Button>
            </NextLink>
            <NextLink href="/register" passHref>
                <Button
                    variant="outline"
                    _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    as="a"
                >
                    Create account
                </Button>
            </NextLink>
        </>
    )

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={6}
            bg="teal.500"
            color="white"
            {...props}
        >
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                    FaRoyale
                </Heading>
            </Flex>

            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                <HamburgerIcon />
            </Box>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
            >
                {isAuthenticated ? dashAuth : dashGuest}
            </Stack>
            <Box
                display={{ base: isOpen ? "flex" : "none", md: "block" }}
                flexDir={{ base: "column" }}
                justifyContent={{ base: "space-between" }}
                mt={{ base: 4, md: 0 }}
            >
                {isAuthenticated ? authLinks : guestLinks}
            </Box>

            {/* <Box
                display={{ base: isOpen ? "flex" : "none", md: "block" }}
                flexDir={{ base: "column" }}
                justifyContent={{ base: "space-between" }}
                mt={{ base: 4, md: 0 }}
            // mx={{ base: 3, md: 5 }}
            >
                <NextLink href="/login" passHref>
                    <Button
                        variant="outline"
                        _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                        mx={{ base: 3, md: 7 }}
                        mb={{ base: 3, md: 0 }}
                        as="a"

                    >
                        Login
                    </Button>
                </NextLink>
                <NextLink href="/register" passHref>
                    <Button
                        variant="outline"
                        _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                        as="a"
                    >
                        Create account
                    </Button>
                </NextLink>
            </Box> */}
        </Flex>
    );
};

export default Header;
