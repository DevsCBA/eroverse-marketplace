import { Grid } from '@chakra-ui/react';
import { GameGridItem } from './GameGridItem';

export const GameGrid = (props) => {
	const { games, loaded } = props;
	const gridOptions = games.map((game) => (
		<GameGridItem game={game} key={game.id} />
	));
	const loadingGrid = [1, 2, 3, 4, 5, 6].map((game, index) => (
		<GameGridItem game={game} key={index} />
	));

	return (
		<>
			<Grid
				templateColumns={{
					base: 'repeat(2, 1fr)',
					xl: 'repeat(3, 1fr)',
				}}
				gap={{ base: 2, md: 5, xl: 6 }}
			>
				{loaded ? gridOptions : loadingGrid}
			</Grid>
		</>
	);
};
