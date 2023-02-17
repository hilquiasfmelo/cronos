import '@/lib/dayjs'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'

import { ToastProvider } from '@/lib/react-toastify'
import { queryClient } from '@/lib/react-query'
import { BackgroundProvider } from './background-provider'

import { globalStyles } from '../styles/global'
import 'react-toastify/dist/ReactToastify.css'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ToastProvider />
        <BackgroundProvider />
      </SessionProvider>
    </QueryClientProvider>
  )
}
