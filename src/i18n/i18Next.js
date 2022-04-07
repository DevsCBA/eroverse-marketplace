import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const userLang = navigator.language || navigator.userLang;
const defaultLocale = userLang.substring(0, 2);

i18n.use(initReactI18next)
	.use(Backend)
	.init({
		lng: defaultLocale,
		fallbackLng: 'en',
		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
