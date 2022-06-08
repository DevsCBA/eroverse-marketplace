import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
	Button,
	useBreakpointValue,
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';


import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
	startBalanceCharge,
	startLogin,
	startLogout,
} from '../../actions/wallet';
import { useNavigate } from 'react-router-dom';

import { WalletButton } from '../WalletButton/WalletButton';
import  abi  from '../../ABIs/marketplaceAbi.json';
import {marketplaceContract} from '../../constant/marketPlace'



const Metamask = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);
	const dispatch = useDispatch();
	const { wallet, walletHidden, balance } = useSelector(
		(state) => state.wallet
	);
	const toast = useToast();
	let navigate = useNavigate();
	const { t } = useTranslation(['metamask']);
	const buttonSize = useBreakpointValue({
		base: 'sm',
		md: 'lg',
	});
	const [select, setSelect] = useState();

	const selectHandler = (e) => {
		console.log(e)
		setSelect(e.value);
	};

	useEffect(() => {
		dispatch(startBalanceCharge(userBalance));
	}, [userBalance,dispatch,wallet]);

	const connectWalletHandler = () => {

		if (window.ethereum) {
			// Set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));
			// Connect to metamask
			window.ethereum
				.request({ method: 'eth_requestAccounts' })
				.then(async(result) => {
					setConnButtonText(t('walletConnect'));
					const {ethereum} = window;
					if (ethereum) {
						const provider = new ethers.providers.Web3Provider(ethereum);
						const signer = provider.getSigner();
						const contract = new ethers.Contract(marketplaceContract, abi, signer);
						const { chainId } = await provider.getNetwork();
						dispatch(startLogin(result[0], contract, chainId));

						ethereum.on('accountsChanged', function (accounts) {
							//console.log(`Selected account changed to ${accounts[0]}`, 'chainId',chainId);
							if(!accounts[0]){
								dispatch(startLogout())
							}
							else {
								dispatch(startLogin(accounts[0],contract, chainId))
							}
						});
						ethereum.on('networkChanged', async function  (netId) {
							const networkId = process.env.REACT_APP_ENV === 'dev' ? 4: 1;
							if(networkId.toString() !=netId.toString()){
								dispatch(startLogin(result[0],null, netId))
							}
							else {
								const provider = new ethers.providers.Web3Provider(ethereum);
								const signer = provider.getSigner();
								const contract = new ethers.Contract(marketplaceContract, abi, signer);
								dispatch(startLogin(result[0],contract, netId))
							}
						}, false);
					}

				})
				.catch((error) => {
					setErrorMessage(error.message);
					toast({
						title: t('walletErrorConnect'),
						position: 'top',
						description: errorMessage,
						status: 'error',
						duration: 9000,
						isClosable: true,
					});
				});
		} else if (!window.ethereum) {
			setErrorMessage(t('walletErrorConnect'));

			toast({
				title: t('walletErrorConnect'),
				position: 'top',
				description: errorMessage,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		}
	};

	const getWalletTokens = async () => {

		let url = process.env.REACT_APP_API_PROXY + '/bscscan/tokens';
        axios.post(url, { wallet })
        .then(result => {
			setUserBalance(
				parseFloat(
					ethers.utils.formatEther(result.data)
				).toFixed(0)
			)
        })
        .catch(error => console.log('Get tokens error: ', error));
	};

	useEffect(() => {
		let walletConnected = localStorage.getItem('connected');

		async function connectMyWallet() {
			await connectWalletHandler();
			//await getWalletTokens();
		}

		if (walletConnected === 'true') {
			connectMyWallet();
		}


		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet]);

	useEffect(() => {
		switch (select) {
			case 'profile':
				setSelect(walletHidden);
				navigate('/profile');
				break;

			case 'disconnect':
				setSelect();
				setConnButtonText(t('walletDisconnect'));
				dispatch(startLogout());
				break;

			default:
				break;
		}
	}, [select, dispatch, navigate, t, walletHidden]);

	return (
		<>
			{!wallet ? (
				<Button
					bgGradient={'linear(to-r, primary, details.purple)'}
					textTransform={'uppercase'}
					fontSize={{ base: '10px', md: 'sm' }}
					color={'title'}
					size={buttonSize}
					letterSpacing={'1.5px'}
					onClick={connectWalletHandler}
					variant={'primary'}
					_hover={{
						bgGradient: 'linear(to-l, primary, details.purple)',
					}}
				>
					{connButtonText}
				</Button>
			) : (
				<>
					<WalletButton
						balance={balance}
						onChange={selectHandler}
						placeholder={walletHidden}
                        wallet={wallet}
						value={select}
					/>
				</>
			)}
		</>
	);
};

export default Metamask;
