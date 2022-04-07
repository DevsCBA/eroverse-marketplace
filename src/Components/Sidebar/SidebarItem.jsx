import { Collapse, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export const SidebarItem = (props) => {
	const { icon, children, path = '', ...rest } = props;
	return (
		<NavLink to={path}>
			<Flex
				alignItems="center"
				pr="4"
				pl="12"
				py="4"
				mb={3}
				cursor="pointer"
				color={'text.light'}
				_hover={{
					bg: '#1c1429',
					color: 'primary',
				}}
				role="group"
				fontWeight="semibold"
				transition=".15s ease"
				{...rest}
			>
				{icon && (
					<Icon mr={6} boxSize="7" as={icon} color={'primary'} />
				)}
				<span>{children}</span>
			</Flex>
		</NavLink>
	);
};

/**
 *  @icon icono de react-icons
 *  @title titulo que va a aparecer en dropdown
 *  @children  Componentes DropdownItem
 */
export const SidebarDropdown = (props) => {
	const integrations = useDisclosure();
	const { icon, title, children, ...rest } = props;
	return (
		<>
			<Flex
				alignItems="center"
				px="4"
				pl="4"
				py="3"
				cursor="pointer"
				color={'gray.400'}
				_hover={{
					bg: 'gray.900',
					color: 'gray.200',
				}}
				role="group"
				fontWeight="semibold"
				transition=".15s ease"
				onClick={integrations.onToggle}
				{...rest}
			>
				{icon && (
					<Icon
						mx="2"
						boxSize="5"
						_groupHover={{
							color: 'gray.300',
						}}
						as={icon}
					/>
				)}

				{title}

				<Icon
					as={MdKeyboardArrowRight}
					ml="auto"
					transform={integrations.isOpen && 'rotate(90deg)'}
				/>
			</Flex>

			<Collapse in={integrations.isOpen}>{children}</Collapse>
		</>
	);
};

export const DropdownItem = (props) => {
	const { children, path = '', ...rest } = props;
	return (
		<SidebarItem pl="12" py="2" path={path} {...rest}>
			{children}
		</SidebarItem>
	);
};
