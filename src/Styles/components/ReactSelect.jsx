export const selectGenre = {
	option: (provided, state) => ({
		...provided,
		color: state.isSelected
			? 'var(--ero-colors-title)'
			: 'var(--ero-colors-text-light)',
		background: state.isSelected ? '#362a50' : 'transparent',
		':hover': {
			background: '#362a50',
		},
	}),
	control: (provided) => ({
		...provided,
		backgroundColor: 'var(--ero-colors-background-alternative)',
		borderRadius: '5000px',
		borderWidth: '0px',
		borderColor: 'transparent',
		boxShadow: 'none',
		minHeight: '20px',
		maxHeight: '20px',
		cursor: 'pointer',
		'@media only screen and (min-width: 768px)': {
			...provided['@media only screen and (min-width: 768px)'],
			minHeight: '34px',
			maxHeight: '34px',
		},
		'@media only screen and (min-width: 1280px)': {
			...provided['@media only screen and (min-width: 1280px)'],
			minHeight: '38px',
		},
	}),
	singleValue: (provided) => ({
		...provided,
		color: 'var(--ero-colors-text-light)',
		fontFamily: 'SF Pro Display Medium',
	}),
	valueContainer: (provided) => ({
		...provided,
		paddingBottom: '0px',
		paddingTop: '0px',
		fontSize: '12px',

		'@media only screen and (min-width: 768px)': {
			...provided['@media only screen and (min-width: 768px)'],
			fontSize: '18px',
		},
		'@media only screen and (min-width: 1280px)': {
			...provided['@media only screen and (min-width: 1280px)'],
			fontSize: '18px',
		},
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		color: 'var(--ero-colors-secondary)',
		padding: '0px 8px',
		':hover': {
			color: 'var(--ero-colors-secondary)',
		},
		'@media only screen and (min-width: 768px)': {
			...provided['@media only screen and (min-width: 768px)'],
			padding: '4px 8px',
		},
		'@media only screen and (min-width: 1280px)': {
			...provided['@media only screen and (min-width: 1280px)'],
			padding: '8px',
		},
	}),
	indicatorSeparator: () => ({}),
	menu: (provided) => ({
		...provided,
		background: 'var(--ero-colors-background-alternative)',
		borderColor: 'var(--ero-colors-secondary)',
		borderRadius: '20px',
		overflow: 'hidden',
		borderWidth: '2px',
		paddingRight: '0.3rem',
		top: 40,
	}),
};

export const selectWallet = {
	control: (provided) => ({
		...provided,
		backgroundColor: 'var(--ero-colors-background-alternative)',
		borderRadius: '5000px',
		borderWidth: '0px',
		borderColor: 'transparent',
		boxShadow: 'none',
		cursor: 'pointer',
	}),
	indicatorSeparator: () => ({}),
	dropdownIndicator: (provided) => ({
		...provided,
		color: 'var(--ero-colors-secondary)',
		padding: '0px 8px',
		':hover': {
			color: 'var(--ero-colors-secondary)',
		},
		'@media only screen and (min-width: 768px)': {
			...provided['@media only screen and (min-width: 768px)'],
			padding: '4px 8px',
		},
		'@media only screen and (min-width: 1280px)': {
			...provided['@media only screen and (min-width: 1280px)'],
			padding: '8px 12px 8px 0px',
		},
	}),
	placeholder: (provided) => ({
		...provided,
		color: 'var(--ero-colors-title)',
		'@media only screen and (max-width: 1280px)': {
			...provided['@media only screen and (min-width: 768px)'],
			display: 'none',
		},
	}),
	menu: (provided) => ({
		...provided,
		background: 'var(--ero-colors-background-alternative)',
		borderColor: 'var(--ero-colors-secondary)',
		borderWidth: '2px',
		borderRadius: '20px',
		minWidth: '200px',
		overflow: 'hidden',
		top: 45,
		right: 5,
		'@media only screen and (min-width: 768px)': {
			...provided['@media only screen and (min-width: 768px)'],
			minWidth: '200px',
			top: 68,
		},
		'@media only screen and (min-width: 1280px)': {
			...provided['@media only screen and (min-width: 1280px)'],
			minWidth: '250px',
			top: 72,
		},
	}),
	option: (provided) => ({
		...provided,
		color: 'var(--ero-colors-text-light)',
		background: 'transparent',
		paddingLeft: '1rem',
		borderBottom: '1px solid #362a50',
		alignItems: 'center',
		display: 'flex',
		height: '55px',
		fontSize: '16px',
		cursor: 'pointer',
		justifyContent: 'space-between',
		fontFamily: 'SF Pro Display Bold',
		':hover': {
			background: '#362a50',
		},
		':last-child': {
			borderBottom: 'none',
		},

		'@media only screen and (min-width: 768px)': {
			...provided['@media only screen and (min-width: 768px)'],
			height: '65px',
			fontSize: '18px',
		},
		'@media only screen and (min-width: 1280px)': {
			...provided['@media only screen and (min-width: 1280px)'],
			height: '73px',
			fontSize: '20px',
		},
	}),
	valueContainer: (provided) => ({
		...provided,
		display: 'none',
		'@media only screen and (min-width: 1280px)': {
			...provided['@media only screen and (min-width: 1280px)'],
			display: 'flex',
		},
	}),
};
