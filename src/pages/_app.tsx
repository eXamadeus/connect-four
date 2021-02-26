import Head from 'next/head'
import * as React from 'react'

import { wrapper } from '../store/wrapper'

const App = wrapper.withRedux(({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Next.js Template</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
})

export default App
