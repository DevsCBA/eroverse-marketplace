import {
	Box,
	Button,
	Divider,
	Flex,
	Icon,
	Image,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { BiCheck } from 'react-icons/bi';
import { BsGlobe } from 'react-icons/bs';
import { ImAndroid, ImAppleinc, ImWindows8 } from 'react-icons/im';
import { useSelector } from 'react-redux';

export const GameDetails = ({ translate: t, handlePlayGame, gameSelected }) => {
	const { balance } = useSelector((state) => state.wallet);
	const buttonSize = useBreakpointValue({ base: 'sm', md: 'lg' });

	const disabledButton = balance < gameSelected.minimum_token_requirement ? true : false;

	function ButtonPlatform() {
		switch (gameSelected.platform) {
			case 'Web':
				return <Icon boxSize="6" as={BsGlobe} />;

			case 'Android':
				return <Icon boxSize="6" as={ImAndroid} />;

			case 'Desktop':
				return <Icon boxSize="6" as={ImWindows8} />;

			case 'iOs':
				return <Icon boxSize="6" as={ImAppleinc} />;

			default:
				return <Icon boxSize="6" as={BsGlobe} />;
		}
	}

	return (
		<>
			{gameSelected == null ? null : (
				<Image
					fallback={
						<Skeleton
							w={'full'}
							pb={{ base: '25.58%', xl: '55.1%' }}
						/>
					}
					alt="Logo"
					src={gameSelected.logo_url}
					mx={'auto'}
				/>
			)}

			<Box mt={{ base: 2, xl: 4 }}>
				<Flex
					alignItems={{ base: 'center', xl: 'start' }}
					direction={'column'}
				>
					<Text
						variant={'bold'}
						color={'secondary'}
						fontSize={{ base: 'sm', md: '25px', xl: 'lg' }}
					>
						$ERO {t('required')}
					</Text>

					<Text
						variant={'medium'}
						fontSize={{ base: 'sm', md: '33px', xl: '2xl' }}
						lineHeight={1}
					>
						{gameSelected == null
							? null
							: gameSelected.minimum_token_requirement.toLocaleString()}
					</Text>
				</Flex>

				<Stack
					direction={{ base: 'row', xl: 'column' }}
					mt={{ base: 4, md: 12, xl: 4 }}
				>
					<Button
						variant={'primary'}
						width={{ base: '50%', xl: 'full' }}
						color={'text.dark'}
						fontSize={{ base: 'xs', md: 'lg' }}
						isDisabled={disabledButton}
						size={buttonSize}
						onClick={handlePlayGame}
					>
						{t('playNow')}
					</Button>

					<Button
						as={'a'}
						width={{ base: '50%', xl: 'full' }}
						variant={'outline'}
						color={'secondary'}
						borderWidth={'2px'}
						borderColor={'secondary'}
						fontFamily={'SF Pro Display Bold'}
						fontSize={{ base: 'xs', md: 'lg' }}
						target="_blank"
						size={buttonSize}
						href="https://pancakeswap.finance/swap?outputCurrency=0x22cbd249e6c68712da6767f1077b28c87745fa6d"
					>
						{t('buy')} $ERO
					</Button>
				</Stack>
			</Box>

			<Flex
				direction={'column'}
				mt={{ base: 6, xl: 10 }}
				fontSize={{ base: 'md', '2xl': 'lg' }}
				mb={{ base: 7, xl: 0 }}
			>
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<Text>{t('developer')}</Text>
					<Text variant={'bold'}>
						{gameSelected == null
							? null
							: gameSelected.developer_name}
					</Text>
				</Flex>
				<Divider my={{ base: 1, xl: 1.5 }} />

				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<Text>{t('releaseDate')}</Text>
					<Text variant={'bold'}>
						{gameSelected == null
							? null
							: gameSelected.release_date}
					</Text>
				</Flex>
				<Divider my={{ base: 1, xl: 1.5 }} />

				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<Text>{t('platform')}</Text>
					<Flex alignItems={'center'}>
						<ButtonPlatform />
					</Flex>
				</Flex>
				<Divider my={{ base: 1, xl: 1.5 }} />
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<Text>{t('p2e')}</Text>
					{gameSelected.is_play2earn !== 1 ? (
						<Text variant={'bold'}>No</Text>
					) : (
						<Icon boxSize="6" color={'secondary'} as={BiCheck} />
					)}
				</Flex>
				<Divider my={{ base: 1, xl: 1.5 }} />
			</Flex>
		</>
	);
};
