import { useAddress, useContract, useContractData, useContractCall } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { currency } from '../constants';
import toast from 'react-hot-toast';

function WinningBox() {
    const address = useAddress();
    const { contract } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONNECT_ADDRESS);
    const { data: winnings } = useContractData(contract, "getWinningsForAddress", address);
    const { mutateAsync: withdrawWinnings } = useContractCall(contract, "WithdrawWinnings");

    const onWithdrawWinnings = async () => {
        const notification = toast.loading('Withdrawing Winnings...');

        try {
            const data = await withdrawWinnings([{}]);
            toast.success('Winnings withdraw successfully!', { id: notification });
            console.info('Contract call success', data);
        }
        catch (error) {
            toast.error('Whoops something went wrong!', { id: notification });
            console.error('Contract call failure', error);
        }
    };

    if (!winnings || winnings <= 0)
        return (<></>);

    return (
        <div className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'>
            <button
                className='p-3 bg-gradient-to-b from-orange-500 
                to-emerald-600 animate-pulse text-center rounded-xl w-full'
                onClick={onWithdrawWinnings}
            >
                <p className='font-bold'>You have winner ticket!</p>
                <p>Total Winnings: {ethers.utils.formatEther(winnings.toString())} {currency}</p>
                <br />
                <p className='font-semibold'>Click here to withdraw</p>
            </button>
        </div>
    );
}

export default WinningBox