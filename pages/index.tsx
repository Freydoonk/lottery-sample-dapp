import { useAddress, useContract } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Login from '../components/Login'
import NextDrawBox from '../components/NextDrawBox'
import TicketCostInfo from '../components/TicketCostInfo'

const Home: NextPage = () => {
  const address = useAddress();
  const { isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONNECT_ADDRESS);

  if (isLoading)
    return (<Loading />);

  if (!address)
    return (<Login />);

  return (
    <div className='bg-[#091B18] min-h-screen flex flex-col'>
      <Head>
        <title>Lottery Dapp!</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <div className="flex-1">
        <Header />

        <div className='space-y-3 md:space-y-0 md:space-x-3 md:flex md:flex-row m-2 items-start justify-center'>
          <NextDrawBox />
          <TicketCostInfo />
        </div>
      </div>
    </div>
  );
}

export default Home
