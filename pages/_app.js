import Head from 'next/head';
import Layout from '../Components/layout/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Layout>
    <Head> // ! Head meta tags needed on all pages
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <Component {...pageProps} />
    </Layout>
    </>
  )
}

export default MyApp
