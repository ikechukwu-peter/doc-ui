// pages/_document.js

import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Mystery+Quest&family=Poppins:wght@400;500&display=swap" rel="stylesheet" />    
        </Head>
        <body>
          {/* 👇 Here's the script */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}