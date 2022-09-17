import { useAddress, useContract, useContractCall, useContractData } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { currency } from '../constants';

function TicketCostInfo() {
    const [quantity, setQuantity] = useState<number>(1);
    const [userTickets, setUserTickets] = useState<number>(0);

    const address = useAddress();
    const { contract } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONNECT_ADDRESS);
    const { data: ticketPrice } = useContractData(contract, "ticketPrice");
    const { data: ticketCommission } = useContractData(contract, "ticketCommission");
    const { data: remainingTickets } = useContractData(contract, "RemainingTickets");
    const { data: expiration } = useContractData(contract, "expiration");
    const { data: tickets } = useContractData(contract, "getTickets");
    const { mutateAsync: buyTickets } = useContractCall(contract, "BuyTickets");

    const ticketPriceTitle = ticketPrice ? (
        Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity + ' ' + currency
    ) : '';

    useEffect(() => {
        if (!tickets) return;

        const totalTickets: string[] = tickets;
        const noOfUserTickets = totalTickets.reduce((total, ticketAddress) => (ticketAddress === address ? total + 1 : total), 0);

        setUserTickets(noOfUserTickets);
    }, [tickets, address]);


    const handleClick = async () => {
        if (!ticketPrice) return;

        const notification = toast.loading('Buying your tickets...');

        try {
            const data = await buyTickets([
                {
                    value: ethers.utils.parseEther(
                        (Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString()
                    )
                }
            ]);

            toast.success('Tickets purchased successfully!', { id: notification });
            console.info('Contract call success', data);
        } catch (error) {
            toast.error('Whoops something went wrong!', { id: notification });
            console.error('Contract call failure', error);
        }
    }

    return (
        <div className='stats-container space-y-1'>
            <div className='stats-container'>
                <div className='flex justify-between items-center text-white p-2'>
                    <h2>Price per ticket</h2>
                    <p>
                        {ticketPrice && (
                            ethers.utils.formatEther(ticketPrice.toString()) + ' ' + currency
                        )}
                    </p>
                </div>
                <div className='flex items-center text-white space-x-1 bg-[#091B18] border-[#004337] border p-4'>
                    <h2 className='text-xs'>Tickets</h2>
                    <input
                        className='flex w-full bg-transparent text-right outline-none'
                        type='number'
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))} />
                </div>
                <div className='space-y-1 mt-3'>
                    <div className='cost-info font-extrabold text-sm'>
                        <p>Total cost of tickets</p>
                        <p>{ticketPriceTitle}</p>
                    </div>

                    <div className='cost-info'>
                        <p>Service fees</p>
                        <p>
                            {ticketCommission && (
                                ethers.utils.formatEther(ticketCommission.toString()) + ' ' + currency
                            )}
                        </p>
                    </div>

                    <div className='cost-info'>
                        <p>+ Network fees</p>
                        <p>TBC</p>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <button
                        disabled={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0}
                        onClick={handleClick}
                        className='mt-3 w-80 text-xs bg-gradient-to-br from-orange-500 to-emerald-600 
                                   px-5 py-3 rounded-md font-semibold text-white shadow-xl disabled:from-gray-600
                                   disabled:to-gray-500 disabled:text-gray-100 disabled:cursor-not-allowed'>
                        Buy {quantity} tickets for {ticketPriceTitle}
                    </button>
                </div>
            </div>

            {
                userTickets > 0 && (
                    <div className='stats'>
                        <p className='mb-1'>You have {userTickets} tickets in this draw.</p>

                        <div className='flex max-w-xs flex-wrap gap-x-2 gap-y-2'>
                            {
                                Array(userTickets)
                                    .fill('')
                                    .map((_, index) => (
                                        <p
                                            key={index}
                                            className='text-emerald-300 h-9 w-8
                                        bg-emerald-500/30 rounded-lg flex flex-shrink-0
                                        items-center justify-center text-xs italic'>
                                            {index + 1}
                                        </p>
                                    ))
                            }
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default TicketCostInfo