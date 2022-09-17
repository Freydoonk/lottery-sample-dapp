import { ArrowPathIcon, ArrowUturnDownIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/solid';
import { useContract, useContractCall, useContractData } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { currency } from '../constants';

function AdminControls() {
    const { contract } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONNECT_ADDRESS);
    const { data: totalCommission } = useContractData(contract, "operatorTotalCommission");
    const { mutateAsync: drawWinnerTicket } = useContractCall(contract, "DrawWinnerTicket");
    const { mutateAsync: refundAll } = useContractCall(contract, "RefundAll");
    const { mutateAsync: withdrawCommission } = useContractCall(contract, "WithdrawCommission");
    const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw");

    const onDrawWinner = async () => {
        const notification = toast.loading('Picking a lucky winner ...');

        try {
            const data = await withdrawCommission([{}]);
            toast.success('A winner has been selected!', { id: notification });
            console.info('Contract call success', data);
        }
        catch (error) {
            toast.error('Whoops something went wrong!', { id: notification });
            console.error('Contract call failure', error);
        }
    };

    const onWithdrawCommission = async () => {
        const notification = toast.loading('Withdrawing commission ...');

        try {
            const data = await withdrawCommission([{}]);
            toast.success('Your commission has been withdrawn successfully!', { id: notification });
            console.info('Contract call success', data);
        }
        catch (error) {
            toast.error('Whoops something went wrong!', { id: notification });
            console.error('Contract call failure', error);
        }
    };

    const onRefundAll = async () => {
        const notification = toast.loading('Refunding all ...');

        try {
            const data = await refundAll([{}]);
            toast.success('All refunded successfully!', { id: notification });
            console.info('Contract call success', data);
        }
        catch (error) {
            toast.error('Whoops something went wrong!', { id: notification });
            console.error('Contract call failure', error);
        }
    };

    const onRestartDraw = async () => {
        const notification = toast.loading('Restarting draw ...');

        try {
            const data = await restartDraw([{}]);
            toast.success('Draw restarted successfully!', { id: notification });
            console.info('Contract call success', data);
        }
        catch (error) {
            toast.error('Whoops something went wrong!', { id: notification });
            console.error('Contract call failure', error);
        }
    };

    return (
        <div className='text-white text-center px-3 py-1 rounded-md border border-emerald-300/20'>
            <h2 className='font-bold'>Admin Controls</h2>
            <p className='mb-3'>Total Commission to be withdrawn: {totalCommission && ethers.utils.formatEther(totalCommission?.toString())} {currency}</p>

            <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-1'>
                <button onClick={onDrawWinner} className='admin-button'>
                    <StarIcon className='h-5 mx-auto mb-1' />
                    Draw Winner
                </button>
                <button onClick={onWithdrawCommission} className='admin-button'>
                    <CurrencyDollarIcon className='h-5 mx-auto mb-1' />
                    Withdraw Commission
                </button>
                <button onClick={onRestartDraw} className='admin-button'>
                    <ArrowPathIcon className='h-5 mx-auto mb-1' />
                    Restart Draw
                </button>
                <button onClick={onRefundAll} className='admin-button'>
                    <ArrowUturnDownIcon className='h-5 mx-auto mb-1' />
                    Refund All
                </button>
            </div>
        </div>
    )
}

export default AdminControls