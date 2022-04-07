import React from 'react';
import {
	Box,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { ProfileEmptyRewards } from './ProfileEmptyRewards';

export const ProfileRewards = ({ translate: t, history }) => {
	return (
		<>
			<Heading
				mt={{ base: 8, md: 20 }}
				mb={{ base: 6, md: 10 }}
				fontSize={{ base: '19px', md: '4xl' }}
			>
				{t('lastRewards')}
			</Heading>
			{history.length === 0 ? (
				<ProfileEmptyRewards translate={t} />
			) : (
				<Box
					borderWidth={{ base: 1, md: 2 }}
					borderColor={'secondary'}
					borderRadius={{ base: 15, md: 30 }}
					overflow={'hidden'}
				>
					<Table>
						<Thead backgroundColor="background.alternative">
							<Tr>
								<Th width={'33%'}>{t('game')}</Th>
								<Th textAlign={'center'} width={'33%'}>
									{t('date')}
								</Th>
								<Th textAlign={'center'} width={'25%'}>
									{t('rewards')}
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{history.map((h, index) => (
								<Tr key={index}>
									<Td> {h.game_name} </Td>
									<Td textAlign={'center'}> {h.date} </Td>
									<Td textAlign={'center'}>
										+{h.reward_amount}
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</>
	);
};
