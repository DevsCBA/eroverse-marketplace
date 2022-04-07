import {
	Box,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalContent,
	ModalOverlay,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchTermLoading } from '../../actions/game';
import './search.css';

export const SearchScreen = ({ translate: t }) => {
	const [searchTerm, setSearchTerm] = useState('');
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const modalSize = useBreakpointValue({ base: 'xs', md: 'xl', xl: '4xl' });
	const centeredModal = useBreakpointValue({ base: false, md: true });

	function handleSearchGame() {
		dispatch(setSearchTermLoading(searchTerm));
		navigate('/search');
		onClose();
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSearchGame();
		}
	};

	return (
		<>
			<IconButton
				aria-label="Search"
				icon={<FiSearch />}
				fontSize={{ base: '2xl', md: '4xl' }}
				color={'secondary'}
				background={'transparent'}
				size="md"
				onClick={onOpen}
				mr={{ base: 2, md: 7 }}
			/>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered={centeredModal}
				size={modalSize}
				closeOnEsc
			>
				<ModalOverlay bg={'rgba(11,5,9,0.8)'} />
				<ModalContent
					bg={'transparent'}
					boxShadow={'none'}
					top={{ base: '15%', md: 0 }}
				>
					<InputGroup
						w={'97%'}
						display={{ base: 'flex' }}
						mx={'auto'}
					>
						<Input
							fontSize={{ base: '18px', md: '32px' }}
							placeholder={t('searchPlaceholder')}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={handleKeyDown}
							_placeholder={{
								color: 'text.light',
							}}
							_focus={{ borderShadow: 'none' }}
							_hover={{
								borderColor: 'transparent',
							}}
							pl={0}
							pr={{base:12, md: 16}}
							borderWidth={0}
						/>
						<InputRightElement>
							<IconButton
								icon={<FiSearch />}
								bg={'transparent'}
								h={{ base: '29px', md: '50px' }}
								minW={{ base: '29px', md: '50px' }}
								fontSize={{ base: '29px', md: '50px' }}
								onClick={(e) =>
									handleSearchGame(e.target.value)
								}
								color={'secondary'}
								_hover={{
									bg: 'transparent',
								}}
							/>
						</InputRightElement>
					</InputGroup>
					<Box
						w={'full'}
						h={{ base: 1, md: 2 }}
						mt={{ base: '4px', md: 5 }}
						bgGradient={'linear(to-r, primary, details.purple)'}
					/>
				</ModalContent>
			</Modal>
		</>
	);
};
