import type { AppProps } from 'next/app'

import { globalStyles } from '../styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { ToastProvider } from '@/utils/react-toastify'
// import { BackgroundProvider } from './background-provider'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastProvider />
      {/* <BackgroundProvider /> */}
    </>
  )
}
