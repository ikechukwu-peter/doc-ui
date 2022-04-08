import Head from 'next/head'
import withAuth from "../utils/withAuth.js";
import UploadPage from '../components/UploadPage'

function Upload() {
    return (
        <div>
            <Head>
                <title>Doc-Upload</title>
                <meta name="description" content="Doc upload" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div>
                    <UploadPage />
                </div>
            </main>

        </div>
    )
}

export default withAuth(Upload)
