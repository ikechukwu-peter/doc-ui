import { ButtonGroup, Container, IconButton, Stack, Flex, Box, Text, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function DashboardPage({ user, docs }) {
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
            let errorResponse = error.response ? error.response.error : "Check your internet connection"
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

    const viewDoc = async (docName) => {
        router.push(`/read/${docName}`)
    }

    return (
        <Flex>
            <Box>
                <Text
                    fontSize={{ base: '2rem', md: '3rem' }}
                    mx="1.4rem"
                >
                    Welcome {user.username}
                </Text>
                {docs.length > 0 ? docs.map((doc) => {
                    return (
                        <Box key={doc.id}>
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

                                >
                                    <Button
                                        size='md'
                                        colorScheme="teal.800"
                                        bg="teal.500"
                                        onClick={() => viewDoc(doc.name)}> View Document
                                    </Button>
                                    <Button
                                        as="a"
                                        download
                                        size='md'
                                        href={doc.name}
                                        colorScheme="teal.800"
                                        bg="teal.500"
                                    // onClick={() => downloadDoc(doc.docId)}
                                    >
                                        Download Document
                                    </Button>
                                    <Button
                                        size='md'
                                        colorScheme="teal.800"
                                        bg="teal.500"
                                        onClick={() => deleteDoc(doc.id)}> Delete Document
                                    </Button>
                                </Box>

                            </Flex>
                        </Box>
                    )
                }) : null}

            </Box>
        </Flex>
    )
}