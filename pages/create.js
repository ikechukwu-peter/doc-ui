import { useCallback, useEffect, useState } from "react";
import {
    Flex,
    Box,
    Heading,
    Button,
    Input,
    FormControl,
    FormLabel,
    Spinner,
    Textarea
} from '@chakra-ui/react'
import withAuth from "../utils/withAuth.js";
import axios from 'axios'
import { useRouter } from 'next/router'



const CreateDoc = () => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [document, setDocument] = useState('')
    const router = useRouter()

    const createNewDoc = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {
            setLoading(true)
            let newDoc = await axios({
                method: "POST",
                url: `https://docbran.herokuapp.com/doc/create`,
                data: {
                    name,
                    document
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(newClub)
            const { hide, hideAfter } = cogoToast.success(`Document created successfully`, {
                onClick: () => {
                    hide();
                },
                hideAfter: 3
            });
            if (newClub) {
                window.location.href = newDoc.data.data
                // router.push(`/document/${newDoc.data.newClub.id}`)
            }
        } catch (error) {
            console.log(error)
            let errorResponse = error.response.data ? error.response.data.error : "Check your internet connection"
            const { hide, hideAfter } = cogoToast.error(`${errorResponse}`, {
                onClick: () => {
                    hide();
                },
                hideAfter: 3
            });
            setLoading(false)
        }
        finally {
            setLoading(false)
            setName('')
            setDocument('')
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
                color="teal.300"
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
                        fontSize={["1.5rem", "1.8rem", "2.4rem", "3rem"]}
                        mb="1rem"
                        color="teal.200"
                    >
                        Create Document
                    </Heading>
                    <form
                        onSubmit={(e) => createNewDoc(e)}
                    >

                        <FormControl
                            isRequired
                            w={["100%", "100%", "100%", "80%"]}
                        >


                            <FormLabel
                                fontSize={["1rem", "1.1rem", "1.4rem", "1.6rem"]}
                                htmlFor='name'
                                mt="2rem"
                            >Document Name</FormLabel>
                            <Input
                                fontSize={["1.1rem", "1.1rem", "1.3rem", "1.3rem"]}
                                id='name' type='text' placeholder='Enter document name'
                                _focus={
                                    {
                                        borderColor: "teal.200",
                                        borderWidth: ".15rem"
                                    }
                                }
                                _placeholder={{
                                    // color: "whiteAlpha.800"                              
                                }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Textarea
                                fontSize={["1.1rem", "1.1rem", "1.2rem", "1.3rem"]}
                                mt="1rem"
                                focusBorderColor="purple.700"
                                placeholder='Enter your text'
                                size='md'
                                resize={"vertical"}
                                isRequired
                                value={document}
                                onChange={(e) => setDocument(e.target.value)}
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
                                        borderColor: "teal.500"
                                    }
                                }
                                _active={
                                    {
                                        borderColor: "teal.500"
                                    }
                                }
                            >
                                {loading ? <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='whiteAlpha.500'
                                    size='md'
                                /> : "Create"}
                            </Button>

                        </FormControl>

                    </form>

                </Box>
            </Flex>

        </Box>

    );
};

export default withAuth(CreateDoc);
