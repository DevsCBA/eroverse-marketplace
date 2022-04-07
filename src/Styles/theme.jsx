import { extendTheme, theme as base } from '@chakra-ui/react';
import { Text } from './components/Text';
import { Heading } from './components/Heading';
import { Button } from './components/Button';
import { Table } from './components/Table';
import { Skeleton, SkeletonText } from './components/Skeleton';
import { Badge } from './components/Badge';

export default extendTheme({
	colors: {
		primary: '#f5247d',
		primaryAlpha: {
			50: 'rgba(245, 36, 125, 0.04)',
			100: 'rgba(245, 36, 125, 0.06)',
			200: 'rgba(245, 36, 125, 0.08)',
			300: 'rgba(245, 36, 125, 0.16)',
			400: 'rgba(245, 36, 125, 0.24)',
			500: 'rgba(245, 36, 125, 0.36)',
			600: 'rgba(245, 36, 125, 0.48)',
			700: 'rgba(245, 36, 125, 0.64)',
			800: 'rgba(245, 36, 125, 0.80)',
			900: 'rgba(245, 36, 125, 0.92)',
		},
		secondary: '#ec4eaf',
		secondaryAlpha: {
			50: 'rgba(236, 78, 175, 0.04)',
			100: 'rgba(236, 78, 175, 0.06)',
			200: 'rgba(236, 78, 175, 0.08)',
			300: 'rgba(236, 78, 175, 0.16)',
			400: 'rgba(236, 78, 175, 0.24)',
			500: 'rgba(236, 78, 175, 0.36)',
			600: 'rgba(236, 78, 175, 0.48)',
			700: 'rgba(236, 78, 175, 0.64)',
			800: 'rgba(236, 78, 175, 0.80)',
			900: 'rgba(236, 78, 175, 0.92)',
		},
		details: {
			red: '#fa0439',
			purple: '#c851f2',
		},
		background: {
			bbc: '#000000',
			navigation: '#0b0412',
			alternative: '#1b1528',
		},
		title: '#ffffff',
		text: {
			light: '#c8c8c8',
			dark: '#0b0412',
		},
	},
	styles: {
		global: {
			body: {
				fontWeight: 'normal',
				color: 'text.light',
				bg: 'background.navigation',
			},
			html: {
				overflowY: 'scroll',
			},
			'.active div': {
				bg: 'background.alternative',
				color: 'primary',
			},
			'.active div span, .active div svg': {
				filter: 'drop-shadow(0px 0px 5px var(--ero-colors-primary))',
			},
		},
	},
	components: {
		Text,
		Heading,
		Button,
		Table,
		Skeleton,
		SkeletonText,
        Badge
	},
	fonts: {
		heading: `LTC Globe Gothic, ${base.fonts?.heading}`,
		body: `SF Pro Display, ${base.fonts?.body}`,
		text: `SF Pro Display, ${base.fonts?.text}`,
	},
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false,
		cssVarPrefix: 'ero',
	},
});
