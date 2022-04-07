import {
	Box,
	ButtonGroup,
	Flex,
	Heading,
	IconButton,
	Image,
	Skeleton,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {
	categoriesPopularLoading,
	categorySelectedLoading,
} from '../../actions/category';
import { useDispatch, useSelector } from 'react-redux';
import { gamesByCategoryStartLoading } from '../../actions/game';

export const GenreSlider = (props) => {
	const { translate: t, loaded } = props;
	const [swiper, setSwiper] = useState(null);
	const slidesAmount = useBreakpointValue({ base: 2, lg: 3, '2xl': 4 });
	const allowTouch = useBreakpointValue({ base: true, xl: false });
	const spaceBetweenSlides = useBreakpointValue({ base: 9, md: 12, xl: 27 });
	const { popular } = useSelector((state) => state.category);
	const dispatch = useDispatch();

	function selectCategoryHandler(category) {
		dispatch(gamesByCategoryStartLoading(category));
		dispatch(categorySelectedLoading(category));
	}

	useEffect(() => {
		dispatch(categoriesPopularLoading());
	}, [dispatch]);

	return (
		<>
			<Flex justifyContent={'space-between'} alignItems={'center'}>
				<Heading
					as="h2"
					fontSize={{ base: 'xl', md: '3xl', '2xl': '4xl' }}
				>
					{t('popularGenres')}
				</Heading>
				<ButtonGroup display={{ base: 'none', lg: 'inline-flex' }}>
					<IconButton
						icon={<BiChevronLeft />}
						onClick={() => swiper.slidePrev()}
						size={'sm'}
						variant={'arrow'}
					/>
					<IconButton
						icon={<BiChevronRight />}
						onClick={() => swiper.slideNext()}
						size={'sm'}
						variant={'arrow'}
					/>
				</ButtonGroup>
			</Flex>

			<Box mt={{ base: 5, md: 7, '2xl': 12 }}>
				<Swiper
					spaceBetween={spaceBetweenSlides}
					slidesPerView={slidesAmount}
					onSwiper={setSwiper}
					allowTouchMove={allowTouch}
				>
					{loaded
						? popular.map((el, index) => (
								<SwiperSlide key={index}>
									<Box
										display={'block'}
										pos={'relative'}
										onClick={() =>
											selectCategoryHandler(
												el.category_name
											)
										}
										cursor={'pointer'}
									>
										<Box
											borderRadius={{
												base: '17px',
												md: '20px',
											}}
											overflow={'hidden'}
											pos={'relative'}
											pb={{
												base: '64.59%',
												md: '50.86%',
												xl: '53.78%',
											}}
											_after={{
												bg: 'blackAlpha.500',
												bottom: 0,
												content: '""',
												left: 0,
												opacity: 0.8,
												position: 'absolute',
												right: 0,
												top: 0,
											}}
										>
											<Image
												fallback={<Skeleton />}
												src="https://i.imgur.com/BwcyrLf.jpg"
												alt={el.category_name}
												h={'full'}
												w={'full'}
												pos={'absolute'}
												objectFit={'cover'}
											/>
										</Box>
										<Box
											position={'absolute'}
											top={'50%'}
											left={'50%'}
											transform={'translate(-50%, -50%)'}
											textAlign={'center'}
											w={'full'}
										>
											<Text
												variant={'bold'}
												color={'title'}
												fontSize={{
													base: '19px',
													md: '27px',
													xl: '2xl',
												}}
											>
												{el.category_name}
											</Text>
										</Box>
									</Box>
								</SwiperSlide>
						  ))
						: [1, 2].map((el) => (
								<SwiperSlide key={el}>
									<Skeleton
										pb={{
											base: '64.59%',
											md: '50.86%',
											xl: '53.78%',
										}}
										borderRadius={{
											base: '17px',
											md: '20px',
										}}
									/>
								</SwiperSlide>
						  ))}
				</Swiper>
			</Box>
		</>
	);
};
