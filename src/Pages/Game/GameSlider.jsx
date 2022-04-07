import { useState } from 'react';
import {
	Box,
	Flex,
	IconButton,
	Image,
	Skeleton,
	useBreakpointValue,
} from '@chakra-ui/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/thumbs';

export const GameSlider = ({ gallery }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [swiper, setSwiper] = useState(null);
	const allowTouch = useBreakpointValue({ base: true, md: false });
	const spaceBetweenSlides = useBreakpointValue({ base: 11, md: 20, xl: 26 });
	let images = gallery.split(',');

	const galleryOptions = images.map((i, index) => (
		<SwiperSlide key={index}>
			<Image
				fallback={<Skeleton h={'full'} w={'full'} pos={'absolute'} />}
				src={i}
				alt=""
				h={'full'}
				w={'full'}
				pos={'absolute'}
			/>
		</SwiperSlide>
	));

	const galleryMiniaturesOptions = images.map((i, index) => (
		<SwiperSlide key={index}>
			<Box
				overflow={'hidden'}
				borderRadius={{ base: '5px', md: '20px', xl:'10px', '2xl':'20px'}}
				cursor={'pointer'}
				pos={'relative'}
				pb={'54.55%'}
			>
				<Image
					fallback={
						<Skeleton h={'full'} w={'full'} pos={'absolute'} />
					}
					src={i}
					alt=""
					width={'full'}
					height={'full'}
					pos={'absolute'}
				/>
			</Box>
		</SwiperSlide>
	));

	return (
		<>
			<Swiper
				spaceBetween={10}
				thumbs={{ swiper: thumbsSwiper }}
				className={'game-gallery'}
				modules={[Thumbs]}
                onSwiper={setSwiper}
			>
				{galleryOptions}
			</Swiper>

			<Flex
				justifyContent={'center'}
				alignItems={'center'}
				mt={{ base: 2.5, md: 4, xl: 7 }}
			>
				<IconButton
					icon={<BiChevronLeft />}
					fontSize={'3xl'}
					onClick={() => swiper.slidePrev()}
					size={'md'}
					variant={'arrow'}
					mr={5}
					display={{ base: 'none', xl: 'inline-flex' }}
				/>

				<Swiper
					onSwiper={setThumbsSwiper}
					allowTouchMove={allowTouch}
					spaceBetween={spaceBetweenSlides}
					slidesPerView={4}
					modules={[Thumbs]}
					className={'game-gallery-thumbs flex-grow'}
				>
					{galleryMiniaturesOptions}
				</Swiper>

				<IconButton
					icon={<BiChevronRight />}
					fontSize={'3xl'}
					onClick={() => swiper.slideNext()}
					size={'md'}
					variant={'arrow'}
					ml={5}
					display={{ base: 'none', xl: 'inline-flex' }}
				/>
			</Flex>
		</>
	);
};
