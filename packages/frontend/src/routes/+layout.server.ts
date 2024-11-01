import type { LayoutServerLoad } from './$types';

// Retrieved from: https://poly-i18n.vercel.app/en/kitbook/docs/3-use-with-sveltekit
export const load: LayoutServerLoad = ({ cookies, request }) => {
	const acceptedLanguage = request.headers.get('accept-language')?.split(',')[0].trim();
	const chosenLocale = cookies.get('locale');
	return { acceptedLanguage, chosenLocale };
};
