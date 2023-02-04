import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { globalStyles } from '../styles/global'
import { ToastProvider } from '@/lib/react-toastify'
import { BackgroundProvider } from './background-provider'

import 'react-toastify/dist/ReactToastify.css'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastProvider />
      <BackgroundProvider />
    </SessionProvider>
  )
}
