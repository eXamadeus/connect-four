import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'

import { wrapper } from '../store/wrapper'

const App = wrapper.withRedux(({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Julian Coy - Connect Four</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
})

export default App
