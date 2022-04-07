import { chakra, Flex, Icon, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { IoWalletOutline } from 'react-icons/io5';
import Select, { components } from 'react-select';
import abbreviateNumber from '../../Helpers/abbreviateNumber';
import { selectWallet } from '../../Styles/components/ReactSelect';
import { MdLogout } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export const WalletButton = (props) => {
	const { balance, onChange, placeholder, value, wallet } = props;
	const { t } = useTranslation(['walletButton']);
	const [isDesktop] = useMediaQuery('(min-width: 1366px)');

	const { Option } = components;
	const IconOption = (props) => (
		<Option {...props}>
			{props.data.label}
			{props.data.icon === true ? (
				<Icon boxSize="7" as={MdLogout} color={'primary'} />
			) : null}
		</Option>
	);

	return (
		<>
			<Text
				variant={'medium'}
				fontSize={{ base: 'xs', md: 'xl' }}
				pr={{ base: 2, md: 4, xl: 5 }}
				className="number"
			>
				{isDesktop
					? Number(balance).toLocaleString()
					: abbreviateNumber(Number(balance))}
				<chakra.span color={'primary'}> $ERO</chakra.span>
			</Text>

			<Flex
				alignItems={'center'}
				justifyContent={'center'}
				bg={'background.alternative'}
				h={{ base: '38px', md: '53px', xl: '48px' }}
				borderRadius={5000}
				title={wallet}
			>
				<Icon
					as={IoWalletOutline}
					boxSize={{ base: '44px', md: '63px', xl: '14' }}
					p={{ base: 2, md: 3 }}
					borderColor={'secondary'}
					borderRadius={5000}
					borderWidth={2}
					position={'relative'}
					zIndex={1}
					bg={'background.alternative'}
					color={'secondary'}
				/>
				<Select
					name="wallet-select"
					styles={selectWallet}
					onChange={onChange}
					placeholder={placeholder}
					isSearchable={false}
					value={value}
					components={{ Option: IconOption }}
					options={[
						{ value: 'profile', label: t('profile') },
						{
							value: 'disconnect',
							label: t('disconnect'),
							icon: true,
						},
					]}
				/>
			</Flex>
		</>
	);
};
