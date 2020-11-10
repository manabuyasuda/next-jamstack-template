import Router from 'next/router'
import { GOOGLE_ANALYTICS_ID, pageview } from '@lib/gtag'
import '@styles/globals.scss'

if (GOOGLE_ANALYTICS_ID) {
  Router.events.on('routeChangeComplete', url => pageview(url))
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
