// import { useEffect, useState, useCallback } from "react";
import withAuth from "../../utils/withAuth.js";
// import axios from 'axios'
import { useRouter } from 'next/router'
import { Text, Flex, Box, Button, } from '@chakra-ui/react'
import cogoToast from 'cogo-toast'
import FileViewer from 'react-file-viewer';

const OpenDoc = () => {
    const router = useRouter()
    const { docName } = router.query

    // const [doc, setDoc] = useState([])
    // const [loading, setLoading] = useState(false)

    const onError = () => {
        const { hide, hideAfter } = cogoToast.error('An error occured', {
            onClick: () => {
                hide();
            },
            hideAfter: 3
        });
    }

    //file type
    const type = 'doc' || 'docx'

    // useEffect(() => {
    //     async function fetchDoc() {
    //         const token = localStorage.getItem('token')
    //         try {
    //             setLoading(true)
    //             let doc = await axios({
    //                 method: "GET",
    //                 url: `https://docbran.herokuapp.com/doc/read/${docId}`,
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             })
    //             if (doc) {
    //                 setDoc(doc.data)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //             let errorResponse = error.response ? error.response.error : "Check your internet connection"
    //             const { hide, hideAfter } = cogoToast.error(`${errorResponse}`, {
    //                 onClick: () => {
    //                     hide();
    //                 },
    //                 hideAfter: 3
    //             });
    //             setLoading(false)
    //         }
    //         finally {
    //             setLoading(false)
    //         }
    //     }
    //     fetchDoc()
    // }, [docId])


    return (
        <>
            {
                typeof window !== "undefined" ?
                    <FileViewer
                        fileType={type}
                        filePath={docName}
                        // errorComponent={CustomErrorComponent}
                        onError={onError} /> :
                    <Text>File failed to open not in window</Text>}

        </>
    );
};

export default withAuth(OpenDoc);