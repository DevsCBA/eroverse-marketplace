import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { gamesSearchStartLoading } from '../../actions/game';
import { GameGrid } from './GameGrid';

export const GameSearchScreen = () => {
	const dispatch = useDispatch();
	const { games, searchTerm, loaded } = useSelector((state) => state.games);
	const { t } = useTranslation(['gameSearch']);

	useEffect(() => {
		dispatch(gamesSearchStartLoading(searchTerm));
	}, [dispatch, searchTerm]);

	return (
		<>
			<Box>
				<Flex
					justifyContent={{ base: 'flex-start', md: 'space-between' }}
					direction={{ base: 'column', md: 'row' }}
				>
					<Heading as="h2" fontSize={{ base: 'xl', md: '4xl' }}>
						{t('searchGames')} : {searchTerm}
					</Heading>
				</Flex>

				<Box mt={{ base: 6, md: 14 }}>
					<GameGrid games={games} loaded={loaded} />
				</Box>
			</Box>
		</>
	);
};
