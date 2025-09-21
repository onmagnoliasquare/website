// export const csr = false;

import type { LayoutServerLoad } from './$types'

// Retrieved from: https://poly-i18n.vercel.app/en/kitbook/docs/3-use-with-sveltekit
export const load: LayoutServerLoad = ({ cookies, request }) => {
  // From cookies and request headers, retrieve the `locale-code`. A `locale-code` is different from `locale`.
  const acceptedLanguage = request.headers.get('accept-language')?.split(',')[0].trim()
  const chosenLocale = cookies.get('locale')

  // console.log(`chosenLocale: ${chosenLocale}, acceptedLanguage: ${acceptedLanguage}`);

  // The data returned here is passed to `+layout.ts`
  // because `layout.ts` exists. If it didn't exist, then the
  // data would just be passed to anything below this layout.
  return { acceptedLanguage, chosenLocale }
}
