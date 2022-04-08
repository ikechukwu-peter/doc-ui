import { ButtonGroup, Container, IconButton, Stack, Flex, Box, Text, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import * as React from 'react'

export default function DashboardPage({ user, docs }) {
    console.log(docs)
    const router = useRouter()

    const deleteDoc = async (docId) => {
        const token = localStorage.getItem('token')
        try {

            await axios({
                method: "DELETE",
                url: `https://docbran.herokuapp.com/doc/delete/${docId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const { hide, hideAfter } = cogoToast.success(`deleted successfully`, {
                onClick: () => {
                    hide();
                },
                hideAfter: 3
            });

        } catch (error) {
            console.log(error)
            let errorResponse = error.response.data ? error.response.data.error : "Check your internet connection"
            const { hide, hideAfter } = cogoToast.error(`${errorResponse}`, {
                onClick: () => {
                    hide();
                },
                hideAfter: 3
            });
        }
    }
    // const downloadDoc = async (docId) => {
    //     const token = localStorage.getItem('token')
    //     try {

    //         let doc = await axios({
    //             method: "GET",
    //             url: `https://docbran.herokuapp.com/doc/download${docId}`,
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //         const { hide, hideAfter } = cogoToast.success(`download successful`, {
    //             onClick: () => {
    //                 hide();
    //             },
    //             hideAfter: 3
    //         });

    //     } catch (error) {
    //         console.log(error)
    //         let errorResponse = error.response ? error.response.error : "Check your internet connection"
    //         const { hide, hideAfter } = cogoToast.error(`${errorResponse}`, {
    //             onClick: () => {
    //                 hide();
    //             },
    //             hideAfter: 3
    //         });
    //     }
    // }

    // const viewDoc = async (docName) => {
    //     router.push(`read/${docName}`)
    // }

    return (
        <Flex>
            <Box>
                <Text
                    fontSize={{ base: '2rem', md: '3rem' }}
                    mx="1.4rem"
                >
                    Welcome {user.charAt(0).toUpperCase() + user.slice(1)}
                </Text>
                {docs.length > 0 ? docs.map((doc) => {
                    return (
                        <Box key={doc._id}>
                            <Flex
                                flexDir={{ base: 'column', md: 'row' }}
                                justifyContent={{ base: 'space-between' }}
                                alignItems={{ base: 'center' }}
                                w="20%"
                                ml="2rem"
                            >
                                <Box
                                    py="2rem"
                                >
                                    <Text as='h2'
                                        color='teal.600'
                                        fontSize="1.5rem"
                                    > {doc.name}</Text>
                                </Box>
                                <Box
                                    py="2rem"
                                    d="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDir={{ base: 'column', md: 'row' }}

                                >

                                    <NextLink href={`read/${doc._id}`} passHref>
                                        <Button
                                            size='md'
                                            colorScheme="teal.800"
                                            bg="teal.500"
                                            as='a'
                                            my="1rem"
                                            mx={{ base: 'none', md: '1rem' }}
                                        >
                                            View
                                        </Button>
                                    </NextLink>

                                    {/* <Button
                                        size='md'
                                        colorScheme="teal.800"
                                        bg="teal.500"
                                        onClick={() => viewDoc(doc.name)}> View Document
                                    </Button> */}
                                    <Button
                                        as="a"
                                        download
                                        size='md'
                                        href={doc.url}
                                        colorScheme="teal.800"
                                        bg="teal.500"
                                        my="1rem"
                                        mx={{ base: 'none', md: '1rem' }}
                                    // onClick={() => downloadDoc(doc.docId)}
                                    >
                                        Download Document
                                    </Button>
                                    <Button
                                        size='md'
                                        colorScheme="teal.800"
                                        bg="teal.500"
                                        my="1rem"
                                        mx={{ base: 'none', md: '1rem' }}
                                        onClick={() => deleteDoc(doc._id)}> Delete Document
                                    </Button>
                                </Box>

                            </Flex>
                        </Box>
                    )
                }) : <Box>
                    <Text
                        fontSize="1.2rem"
                        mx="1.4rem"
                    >You have no document yet</Text>
                    <NextLink href='/create' passHref>
                        <Button
                            size='md'
                            colorScheme="teal.800"
                            bg="teal.500"
                            as='a'
                            my="1rem"
                            mx={{ base: '1rem', md: '1.4rem' }}
                        >
                            Click to create one
                        </Button>
                    </NextLink>
                </Box>}

            </Box>
        </Flex>
    )
}

