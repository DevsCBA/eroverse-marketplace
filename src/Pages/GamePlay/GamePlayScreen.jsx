import { Text, Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Iframe from 'react-iframe';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { gameStartLoading } from '../../actions/game';

export const GamePlayScreen = () => {
	const { gameSelected } = useSelector((state) => state.games);
	const { balance } = useSelector((state) => state.wallet);
	const dispatch = useDispatch();
	const { id } = useParams();
	useEffect(() => {
		dispatch(gameStartLoading(id));
	}, [id, dispatch]);

	function IframeGame() {
		if (balance < gameSelected.minimum_token_requirement) {
			return (
				<Text
					variant={'bold'}
					color={'secondary'}
					fontSize={{ base: 'sm', md: '25px', xl: 'lg' }}
				>
					TOKENS INSUFICIENTES
				</Text>
			);
		} else {
			return (
				<Box
					pos={'relative'}
					h={0}
					overflow={'hidden'}
					pb={'54.37%'}
                    bg={'black'}
				>
					<Iframe
						url={gameSelected.frame_url}
						display="initial"
						allow="fullscreen"
						position="absolute"
                        top={0}
                        left={0}
                        width={'100%'}
                        height={'100%'}
					/>
				</Box>
			);
		}
	}

	return (
		<>
			<Text
				variant={'bold'}
				color={'title'}
				fontSize={{ base: 'xl', md: '4xl', xl: '5xl' }}
			>
				{gameSelected == null ? null : gameSelected.name}
			</Text>

			{gameSelected == null ? null : <IframeGame />}
		</>
	);
};
