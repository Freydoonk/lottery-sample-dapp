import { useAddress, useContract, useContractData } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import Marquee from 'react-fast-marquee'
import AdminControls from '../components/AdminControls'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Login from '../components/Login'
import NextDrawBox from '../components/NextDrawBox'
import TicketCostInfo from '../components/TicketCostInfo'
import WinningBox from '../components/WinningBox'
import { currency } from '../constants'

const Home: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONNECT_ADDRESS);
  const { data: lastWinner } = useContractData(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractData(contract, "lastWinnerAmount");
  const { data: lotteryOperator } = useContractData(contract, "lotteryOperator");

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

        {lastWinner && lastWinnerAmount && (
          <Marquee className='bg-[#0A1F1C] p-3 mb-3' gradient={false} speed={100}>
            <div className='flex space-x-1 mx-5'>
              <h4 className='text-white font-bold'>Last Winner: {lastWinner?.toString()}</h4>
              <h4 className='text-white font-bold'>Previous Winnings: {lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount?.toString())} {currency}</h4>
            </div>
          </Marquee>
        )}

        {lotteryOperator === address && (
          <div className='flex justify-center'>
            <AdminControls />
          </div>
        )}

        <WinningBox />

        <div className='space-y-3 md:space-y-0 md:space-x-3 md:flex md:flex-row m-2 items-start justify-center'>
          <NextDrawBox />
          <TicketCostInfo />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;