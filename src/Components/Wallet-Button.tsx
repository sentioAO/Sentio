import { useEffect } from 'react';
import { ConnectButton } from 'arweave-wallet-kit';
import { useNavigate } from 'react-router-dom';
const Wallet = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const walletStrategy = localStorage.getItem('wallet_kit_strategy_id');
        if (!walletStrategy) {
            navigate('/');
        }
    }, [navigate]);

    return (

        <ConnectButton
            accent="rgb(63, 63, 63, 0.1 )"
            profileModal={false}
            showBalance={true}
        />

    );
};

export default Wallet;