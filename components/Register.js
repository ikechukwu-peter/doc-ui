import { useState, useLayoutEffect } from 'react'
import {
    Flex,
    Box,
    Heading,
    Button,
    Input,
    FormControl,
    FormLabel,
    Spinner,

} from '@chakra-ui/react'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import { useRouter } from 'next/router'


export default function Contact() {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useLayoutEffect(() => {
        const isAuthenticated = localStorage.getItem('token')
        if (isAuthenticated) {
            router.push('/dashboard')
        }
    }, [router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (
            username &&
            password) {

            try {
                setLoading(true)
                let res = await axios({
                    method: "POST",
                    url: 'https://docbran.herokuapp.com/user/create',
                    data: {
                        username,
                        password

                    }
                })
                console.log(res.data)

                const { hide, hideAfter } = cogoToast.success(`Registration successful`, {
                    onClick: () => {
                        hide();
                    },
                    hideAfter: 3
                });
                if (res.data) {
                    router.push('/login')
                }
            } catch (error) {
                console.log(error)
                let errorResponse = error.response.data ? error.response.data.error : "Check your internet connection"

                const { hide, hideAfter } = cogoToast.error(`${errorResponse}`, {
                    onClick: () => {
                        hide();
                    },
                    hideAfter: 5
                });

            }
            finally {
                setLoading(false)
                setPassword("")
                setUsername("")
            }

        }
        else {
            const { hide, hideAfter } = cogoToast.warn('Fill all the fields.😒', {
                onClick: () => {
                    hide();
                },
                hideAfter: 5
            });
        }



    }

    return (
        <Box
            id="#contact"
        >
            <Flex fontFamily="Source Sans Pro"
                justifyContent="space-around"
                alignItems="center"
                width={["100%", "100%", "100%", "90%"]}
                flexDirection={["column-reverse", "column-reverse", "column-reverse", "row"]}
                py="2rem"
                px="2rem"
                m="auto"
            >
                <Box d="flex"
                    justifyContent="center"
                    flexDir="column"
                    w={["100%", "100%", "90%", "50%"]}
                    textAlign="center"
                    ml="4rem"
                    m="auto"

                >
                    <Heading
                        fontWeight={600}
                        fontSize="3rem"
                        mb="1rem"
                        color="teal.200"
                    >
                        Sign up to create docs
                    </Heading>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                    >

                        <FormControl
                            isRequired
                            w={["100%", "100%", "100%", "80%"]}
                        >
                            <FormLabel
                                fontSize={["1rem", "1.1rem", "1.4rem", "1.6rem"]}
                                htmlFor='username'
                                mt="2rem"
                            >Username</FormLabel>
                            <Input
                                fontSize={["1.1rem", "1.1rem", "1.2rem", "1.3rem"]}
                                id='username' type='text' placeholder='Enter Username'
                                _focus={
                                    {
                                        borderColor: "teal.200",
                                        borderWidth: ".15rem"
                                    }
                                }
                                _placeholder={{
                                    // color: "whiteAlpha.800"                              
                                }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <FormLabel
                                fontSize={["1rem", "1.1rem", "1.4rem", "1.6rem"]}
                                htmlFor='password'
                                mt="2rem"
                            >Password</FormLabel>
                            <Input
                                fontSize={["1.1rem", "1.1rem", "1.2rem", "1.3rem"]}
                                id='password' type='password' placeholder='**************'
                                _focus={
                                    {
                                        borderColor: "teal.200",
                                        borderWidth: ".15rem"
                                    }
                                }
                                _placeholder={{
                                    // color: "whiteAlpha.800"                              
                                }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button
                                size="lg"
                                w="100%"
                                mt="2rem"
                                color="whiteAlpha.900"
                                bg={"teal.700"}
                                _hover={{
                                    bg: 'teal.800',
                                }}
                                type="submit"
                                _focus={
                                    {
                                        borderColor: "teal.200"
                                    }
                                }
                                _active={
                                    {
                                        borderColor: "teal.200"
                                    }
                                }
                            >
                                {loading ? <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='whiteAlpha.500'
                                    size='md'
                                /> : "Submit"}
                            </Button>

                        </FormControl>

                    </form>

                </Box>

            </Flex>

        </Box>

    )

}