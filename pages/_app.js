import Head from 'next/head';
import Layout from '../Components/layout/Layout'
import Notification from '../Components/ui/Notification'
import {NotificationContextProvider} from '../store/notification-context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
  <NotificationContextProvider>
    <Layout>
    <Head> 
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <Component {...pageProps} />
      
    </Layout>
    </NotificationContextProvider>
    </>
  )
}

export default MyApp
