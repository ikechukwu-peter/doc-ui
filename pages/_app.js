import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import jwtDecode from 'jwt-decode'



function MyApp({ Component, pageProps }) {
if (typeof window !== "undefined") {
let token = localStorage.getItem('token')
  if (token) {
     let decoded = jwtDecode(token)

   //Check for expired token  
 const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    localStorage.clear()
    window.location.href = '/'
   }
  }
} 
  return (
    <ChakraProvider resetCSS>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
