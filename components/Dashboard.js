import { Spinner, ButtonGroup, Container, IconButton, Stack, Flex, Box, Text, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import * as React from 'react'

export default function DashboardPage({ user, docs }) {
    const [loading, setLoading] = React.useState(false)
    const [allDocs, setAllDocs] = React.useState([])
    console.log(docs)

    React.useEffect(() => {
        setAllDocs(docs)
        console.log('useEffect')
        console.log(allDocs)
    }, [docs])

    const router = useRouter()



    const deleteDoc = async (docId) => {
        const token = localStorage.getItem('token')
        try {
            setLoading(true)
            await axios({
                method: "DELETE",
                url: `https://docbran.herokuapp.com/doc/delete/${docId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            //Remove from DOM
            setAllDocs(allDocs.filter((doc) => doc._id != docId))

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
        finally {
            setLoading(false)
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
                {allDocs.length > 0 ? allDocs.map((doc) => {
                    return (
                        <Box key={doc._id}>
                            <Flex
                                flexDir={{ base: 'column', md: 'row' }}
                                justifyContent={{ base: 'space-between' }}
                                alignItems={{ base: 'center' }}
                                w="100%"
                                ml="2rem"
                            >
                                <Box
                                    py="1rem"
                                >
                                    <Text as='h2'
                                        color='teal.600'
                                        fontSize="1.5rem"
                                    >
                                        {doc.name}
                                    </Text>
                                </Box>
                                <Box
                                    py="2rem"
                                    d="flex"
                                    alignItems="center"
                                    justifyContent={{ base: 'center', md: 'space-around' }}
                                    flexDir={{ base: 'column', md: 'row' }}
                                    mx={{ base: "2rem", md: "4rem" }}
                                    w="100%"
                                >

                                    <NextLink href={`read/${doc._id}`} passHref>
                                        <Button
                                            size='md'
                                            colorScheme="teal.800"
                                            bg="teal.500"
                                            as='a'
                                            my="1rem"
                                            mx="1rem"
                                            px={{ base: "2rem", md: "4rem" }}
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
                                        mx="1rem"
                                        px={{ base: "2rem", md: "4rem" }}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        size='md'
                                        colorScheme="teal.800"
                                        bg="teal.500"
                                        my="1rem"
                                        mx={{ base: '1rem', md: '1rem' }}
                                        px={{ base: "2rem", md: "4rem" }}
                                        onClick={() => deleteDoc(doc._id)}>

                                        {loading ? <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='whiteAlpha.500'
                                            size='md'
                                        /> : "Delete"
                                        }

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

