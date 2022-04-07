export const Table = {
	parts: ['tr', 'th', 'td'],
	// Styles for the base style
	baseStyle: {
		tr: {
			fontSize: { base: '13px', md: 'xl' },
			h: { base: '46px', md: '85px' },
			'th, td': {
				borderBottomWidth: { base: '1px', md: '2px' },
				borderColor: 'secondary',
			},
			th: {
				fontSize: { base: '13px', md: 'xl' },
				color: 'title',
				fontWeight: 'bold',
				fontFamily: `body`,
				textTransform: 'none',
			},
			':last-child': {
				td: {
					borderBottomWidth: '0px',
				},
			},
		},
		// th: {
		// 	borderBottom: '0px',
		// 	borderColor: 'secondary',
		// },
	},
	// Styles for the size variations
	sizes: {},
	// Styles for the visual style variations
	variants: {},
	// The default `size` or `variant` values
	defaultProps: {},
};
