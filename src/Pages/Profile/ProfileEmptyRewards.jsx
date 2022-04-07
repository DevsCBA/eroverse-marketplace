import {
	Button,
	Flex,
	Heading,
	Image,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import image from '../../Assets/Images/empty-my-profile.png';
export const ProfileEmptyRewards = ({ translate: t }) => {
	const buttonSize = useBreakpointValue({ base: 'sm', md: 'lg' });
	let navigate = useNavigate();
	return (
		<Flex
			direction={'column'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Image
				src={image}
				w={{ base: '57.256%', md: '55.357%', xl: '30.862%' }}
			/>
			<Heading mt={{ base: 8 }} fontSize={{ base: 'xl', md: '4xl' }}>
				{t('title')}
			</Heading>
			<Text
				variant={'medium'}
				color="title"
				fontSize={{ base: 'sm', md: '2xl' }}
			>
				{t('subTitle')}
			</Text>
			<Button
				mt={{ base: 5, md: 8 }}
				variant={'primary'}
				color="title"
				px={{ base: 3, md: 5, xl: 10 }}
				fontSize={{ base: '11px', md: 'lg' }}
				size={buttonSize}
				onClick={() => {
					navigate('/games');
				}}
			>
				{t('cta')}
			</Button>
		</Flex>
	);
};
