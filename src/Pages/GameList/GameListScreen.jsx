import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
	categoriesLoading,
	categorySelectedLoading,
} from '../../actions/category';
import {
	cleanGamesLoading,
	gamesByCategoryStartLoading,
	gamesStartLoading,
} from '../../actions/game';
import { GameGrid } from './GameGrid';
import { GenreSlider } from './GenreSlider';
import Select from 'react-select';
import './gameList.css';
import { selectGenre } from '../../Styles/components/ReactSelect';

export const GameListScreen = () => {
	const { t } = useTranslation(['gameList']);
	const { categories, selected, loaded } = useSelector(
		(state) => state.category
	);
	const { games } = useSelector((state) => state.games);
	const dispatch = useDispatch();

	function selectCategoryHandler(e) {
		let category = e.value;

		dispatch(cleanGamesLoading());
		dispatch(categorySelectedLoading(category));
		if (category === 'All') {
			// Cargo todos los juegos
			dispatch(gamesStartLoading());
		} else {
			// Cargo los juegos segun categoria
			dispatch(gamesByCategoryStartLoading(category));
		}
	}

	useEffect(() => {
		dispatch(categoriesLoading());
		dispatch(gamesStartLoading());
	}, [dispatch]);

	const selectOptions = [{ value: 'All', label: 'All' }].concat(
		categories.map((el) => ({
			value: el.name,
			label: el.name,
		}))
	);
	return (
		<>
			<div className="popular-genres">
				<GenreSlider translate={t} loaded={loaded} />
			</div>

			<Box mt={{ base: 10, md: 14, xl: 24 }}>
				<Flex
					justifyContent={{ base: 'flex-start', md: 'space-between' }}
					direction={{ base: 'column', md: 'row' }}
					alignItems={{ base: 'normal', md: 'center' }}
				>
					<Heading
						as="h2"
						fontSize={{ base: 'xl', md: '3xl', xl: '4xl' }}
					>
						{t('exploreGames')}
					</Heading>

					<Flex
						mt={{ base: 3, md: 0 }}
						alignItems={'center'}
						bg={'background.alternative'}
						borderRadius={5000}
						borderWidth={2}
						borderColor={'secondary'}
						p={1}
						pl={4}
						w={{ base: 'full', md: 'auto' }}
					>
						<Text
							variant={'medium'}
							fontSize={{ base: 'xs', md: 'lg' }}
						>
							Genre:
						</Text>
						<Box w={{ base: 'full', md: 210, xl: 300 }}>
							<Select
								styles={selectGenre}
								isSearchable={false}
								options={selectOptions}
								defaultValue={selectOptions[0]}
								onChange={selectCategoryHandler}
								value={{ value: selected, label: selected }}
							/>
						</Box>
					</Flex>
				</Flex>

				<Box mt={{ base: 6, md: 9, xl: 14 }}>
					<GameGrid games={games} loaded={loaded} />
				</Box>
			</Box>
		</>
	);
};
