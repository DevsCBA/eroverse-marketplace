import {
	chakra,
	Flex,
	Heading,
	HStack,
	IconButton,
	useBreakpointValue,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import Metamask from '../Connectors/Metamask';
import { useTranslation } from 'react-i18next';
import { LogoChico } from '../../Ui/Logo/LogoChico';
import { Link } from 'react-router-dom';
import { SearchScreen } from '../search/SearchScreen';
import {useSelector} from "react-redux";
import {useEffect,useState} from "react";

export const Navbar = (props) => {
	const { t } = useTranslation(['navbar']);
	const { sidebar, ...rest } = props;
	const { network, wallet} = useSelector((state) => state.wallet);
	const [ message, setMessage] = useState(null);

	useEffect(()=>{
		let netId = process.env.REACT_APP_ENV === 'dev' ? 4: 1;
		if(network && network.toString() !== netId.toString()){
			setMessage(`Please connect ${netId === 4 ? 'Rinkeby': 'Mainnet'} Network`)
		}
		else {
			setMessage(null)
		}
	},[network,wallet])

	const logoSize = useBreakpointValue({ base: 36, md: 60, xl: 60 });
	const ChakraLink = chakra(Link);
	return (
		<>
			<Flex
				as="header"
				top="0"
				zIndex={'sticky'}
				alignItems={'center'}
				justifyContent={'space-between'}
				bg={'background.navigation'}
				{...rest}
			>

				<HStack spacing={10}>
					<Flex alignItems="center" h={'full'}>
						<IconButton
							display={{ base: 'inline-flex', xl: 'none' }}
							aria-label="Menu"
							borderRadius={'10px'}
							onClick={sidebar.onOpen}
							icon={<FiMenu />}
							fontSize={{ base: '2xl', md: '5xl' }}
							color={'secondary'}
							background={'background.alternative'}
							h={{ base: 10, md: 16 }}
							minW={{ base: 10, md: 73 }}
							mr={2}
						/>
						<ChakraLink
							to=""
							display={'flex'}
							alignItems={'center'}
						>
							<LogoChico height={logoSize} />
							<Heading
								as="h2"
								ml={2}
								fontSize={'28px'}
								display={{ base: 'none', xl: 'inline-flex' }}
							>
								Eroverse
								<chakra.span color={'primary'}>
									Play
								</chakra.span>
							</Heading>
						</ChakraLink>
					</Flex>
				</HStack>
				{message}
				<Flex alignItems="center">
					<SearchScreen translate={t} />
					<Metamask />
				</Flex>
			</Flex>
		</>
	);
};
