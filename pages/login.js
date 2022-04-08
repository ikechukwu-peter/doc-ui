import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'

export default function LoginPage() {
    return (
        <div>
            <Head>
                <title>Doc-Login</title>
                <meta name="description" content="Doc Login" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div>
                    <Login />
                </div>
            </main>

        </div>
    )
}
