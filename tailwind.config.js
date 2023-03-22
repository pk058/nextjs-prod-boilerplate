module.exports = {
	mode: 'jit',
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				error: '#F04438',
				error500: '#F04438',
				error400: '#F97066',
				error400: '#F97066',
				success: '#12B76A',
				warning: '#F79009',
				warning500: '#F79009',
				gray50: '#F9FAFB',
				gray100: '#F2F4F7',
				gray200: '#EAECF0',
				gray400: '#98A2B3',
				gray500: '#667085',
				gray700: '#344054',
				gray900: '#101828',
				white: '#FFFFFF'
			}
		}
	},
	plugins: []
}
