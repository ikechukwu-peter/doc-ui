import { useEffect, useState, useCallback } from "react";
import withAuth from "../../utils/withAuth.js";
import axios from 'axios'
import { useRouter } from 'next/router'
import { Text, Flex, Box, Button, } from '@chakra-ui/react'
import cogoToast from 'cogo-toast'
import dynamic from 'next/dynamic';

const FileViewer = dynamic(() => import('react-file-viewer'), {
    ssr: false
});

const OpenDoc = () => {
    const router = useRouter()
    const { docId } = router.query
    console.log(docId)

    const [doc, setDoc] = useState(null)
    const [loading, setLoading] = useState(false)

    const onError = () => {
        const { hide, hideAfter } = cogoToast.error('An error occured', {
            onClick: () => {
                hide();
            },
            hideAfter: 3
        });
    }

    //file type
    const type = 'docx'

    useEffect(() => {
        async function fetchDoc() {
            const token = localStorage.getItem('token')
            try {
                setLoading(true)
                let docData = await axios({
                    method: "GET",
                    url: `https://docbran.herokuapp.com/doc/read/${docId}`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (docData) {
                    setDoc(docData.data.data.url)
                }
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
            finally {
                setLoading(false)
            }
        }
        fetchDoc()
    }, [docId])


    return (
        <>
            {loading ? <Text
                fontSize="1.2rem"
                mx="1.4rem"
            > Fetching file...</Text> : <FileViewer
                fileType={type}
                filePath={doc}
                // errorComponent={CustomErrorComponent}
                onError={onError} />}

        </>
    );
};

export default withAuth(OpenDoc);