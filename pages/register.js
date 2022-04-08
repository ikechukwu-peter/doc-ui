import Head from 'next/head'
import Image from 'next/image'
import Register from '../components/Register'

export default function Registeration() {
    return (
        <div>
            <Head>
                <title>Doc-Registeration</title>
                <meta name="description" content="Doc registration" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div>
                    <Register />
                </div>
            </main>

        </div>
    )
}
