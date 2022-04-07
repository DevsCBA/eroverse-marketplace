import React from 'react';
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';

export const ProfileResumeScreen = ({ rewards, translate: t }) => {
	return (
		<>
			<Text
				variant={'bold'}
				color={'title'}
				mb={{ base: 4, md: 8, xl: 12 }}
				fontSize={{ base: '19px', md: '4xl', xl: '5xl' }}
			>
				{t('myProfile')}
			</Text>
			<SimpleGrid
				columns={2}
				spacingX={{ base: '13px', md: '20px', xl: '95px' }}
			>
				<Flex
					direction={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					h={{ base: '67px', md: '170px' }}
					backgroundColor={'background.alternative'}
					borderWidth={{ base: '1px', md: '2px' }}
					borderColor={'secondary'}
					borderRadius={{ base: '15px', md: '30px' }}
					boxShadow={'0px 0px 10px var(--ero-colors-secondary)'}
				>
					<Text
						variant={'bold'}
						fontSize={{ base: 'sm', md: '4xl' }}
						color={'title'}
					>
						{rewards} $BNB
					</Text>
					<Text
						fontSize={{ base: '10px', md: '2xl' }}
						color={'secondary'}
						lineHeight={1}
					>
						{t('totalRewards')}
					</Text>
				</Flex>

				<Flex
					direction={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					h={{ base: '67px', md: '170px' }}
					backgroundColor={'background.alternative'}
					borderWidth={{ base: '1px', md: '2px' }}
					borderColor={'secondary'}
					borderRadius={{ base: '15px', md: '30px' }}
					boxShadow={'0px 0px 10px var(--ero-colors-secondary)'}
				>
					<Text
						variant={'bold'}
						fontSize={{ base: 'sm', md: '4xl' }}
						color={'title'}
					>
						-
					</Text>
					<Text
						fontSize={{ base: '10px', md: '2xl' }}
						color={'secondary'}
						lineHeight={1}
					>
						{t('ranking')}
					</Text>
				</Flex>
			</SimpleGrid>
		</>
	);
};
