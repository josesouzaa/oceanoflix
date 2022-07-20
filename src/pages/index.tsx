import type { NextPage } from 'next'

import Head from 'next/head'

import { Header } from '../components/Header'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>OceanoFlix</title>
      </Head>

      <Header />

      <main className="custom-container mt-8">Hello World</main>
    </>
  )
}

export default Home
