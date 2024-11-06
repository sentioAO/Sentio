// import { useEffect } from 'react';
import { ConnectButton } from 'arweave-wallet-kit';
// import { useNavigate } from 'react-router-dom';

const Wallet = () => {



    return (
        <div className='border border-[#757373] gradient-button rounded-xl p-1'>
            <ConnectButton
                accent="rgb(63, 63, 63 ,0)"
                profileModal={false}
                showBalance={false}
            />
        </div>
    );
};

export default Wallet;
