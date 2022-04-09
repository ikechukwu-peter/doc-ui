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


export default function UploadPage() {
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    //allowed mimetypes for documents
    const allowed = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target.files[0])

        console.log(file)
        if (allowed.includes(file.type)) {
            const formData = new FormData()

            // Update the formData object
            formData.append(
                "doc",
                file,
                file.name
            );

            console.log(formData)

            try {
                setLoading(true)
                const token = localStorage.getItem('token')

                let res = await axios.post('https://docbran.herokuapp.com/doc/upload', formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "Contetnt-Type": "multipart/form-data"

                        },
                    })

                const { hide, hideAfter } = cogoToast.success(`upload successful`, {
                    onClick: () => {
                        hide();
                    },
                    hideAfter: 3
                });
                if (res.data) {
                    window.location.href = '/dashboard'
                    // router.push('/dashboard')
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
            }
        }
        else {
            const { hide, hideAfter } = cogoToast.warn('only word document is allowed (.doc and .docx).😒', {
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

                    <form
                        encType="multipart/form-data"
                        onSubmit={(e) => handleSubmit(e)}
                    >

                        <FormControl
                            isRequired
                            w={["100%", "100%", "100%", "80%"]}
                        >

                            <FormLabel
                                fontSize={["1rem", "1.1rem", "1.4rem", "1.6rem"]}
                                htmlFor='doc'
                                mt="2rem"
                            >Upload a file</FormLabel>
                            <Input
                                fontSize={["1.1rem", "1.1rem", "1.2rem", "1.3rem"]}
                                id='doc' name="doc" type='file' accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                _focus={
                                    {
                                        borderColor: "teal.200",
                                        borderWidth: ".15rem"
                                    }
                                }
                                _placeholder={{
                                    // color: "whiteAlpha.800"                              
                                }}
                                onChange={(e) => setFile(e.target.files[0])}
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
                                /> : "Upload"}
                            </Button>

                        </FormControl>

                    </form>

                </Box>

            </Flex>

        </Box>

    )

}