import { whiten } from '@chakra-ui/theme-tools';
export const Button = {
	// Styles for the base style
	baseStyle: {
		fontWeight: 'normal',
		borderRadius: { base: '9999px' },
		color: 'text.light',
		_focus: {
			boxShadow: 'none',
		},
	},
	// Styles for the size variations
	sizes: {},
	// Styles for the visual style variations
	variants: {
		arrow: {
			border: '2px solid',
			borderColor: 'secondary',
			background: 'transparent',
			color: 'secondary',
			fontSize: '2xl',
			':hover': {
				background: 'whiteAlpha.300',
			},
		},
		primary: {
			background: 'primary',
			boxShadow: '0px 0px 10px var(--ero-colors-primary)',
			fontFamily: 'SF Pro Display Bold',
			_hover: {
				background: whiten('primary', 15),
				_disabled: {
					background: 'primary',
				},
			},
		},
	},
	// The default `size` or `variant` values
	defaultProps: {},
};
