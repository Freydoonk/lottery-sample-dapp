import { useContract, useContractData } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { currency } from '../constants';
import CountdownTimer from './CountdownTimer';

function NextDrawBox() {
    const { contract } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONNECT_ADDRESS);
    const { data: currentWinningReward } = useContractData(contract, "CurrentWinningReward");
    const { data: remainingTickets } = useContractData(contract, "RemainingTickets");

    return (
        <div className='stats-container'>
            <h1 className='text-4xl text-white font-semibold text-center'>The Next Draw</h1>
            <div className='flex justify-between p-2 space-x-1'>
                <div className='stats'>
                    <h2 className='text-xs'>Total Pool</h2>
                    <p className='text-lg'>
                        {currentWinningReward && (
                            ethers.utils.formatEther(currentWinningReward.toString()) + ' ' + currency
                        )}
                    </p>
                </div>
                <div className='stats'>
                    <h2 className='text-xs'>Tickets Remaining</h2>
                    <p className='text-lg'>{remainingTickets?.toNumber()}</p>
                </div>
            </div>

            <div className='mt-3 mb-1'>
                <CountdownTimer />
            </div>
        </div>
    )
}

export default NextDrawBox