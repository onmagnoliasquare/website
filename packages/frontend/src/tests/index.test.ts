import { dateFormatter, hasUppercase } from '$lib';
import { describe, it, expect, test } from 'vitest';
import {
	createAuthorLink,
	createSiteTitle,
	domainFromUrl,
	getFlagEmoji,
	parseEmbedLink
} from '$lib/helpers';
import { site } from '$lib/variables';

describe('domainFromUrl', () => {
	it('strips http', () => {
		expect(domainFromUrl('http://www.google.com')).toBe('google.com');
	});

	it('strips https', () => {
		expect(domainFromUrl('https://www.google.com')).toBe('google.com');
	});

	it('strips short path', () => {
		expect(domainFromUrl('https://neoalabastro.com/code')).toBe('neoalabastro.com');
	});

	it('strips long path', () => {
		expect(
			domainFromUrl(
				'https://reddit.com/r/QAnonCasualties/comments/1go1e5m/sovereign_husband_do_i_leave/'
			)
		).toBe('reddit.com');
	});

	it('respects subdomains', () => {
		expect(domainFromUrl('https://google.co.uk')).toBe('google.co.uk');
	});

	it('can handle other periods', () => {
		expect(domainFromUrl('https://www.koreaherald.com/custom/ethics.php')).toBe('koreaherald.com');
	});
});

describe('parseEmbedLink', () => {
	it('extracts spotify name, given a valid link', () => {
		expect(
			parseEmbedLink('https://open.spotify.com/album/5zi7WsKlIiUXv09tbGLKsE?si=28a6cae09d214cc6')
				.name
		).toBe('spotify');
	});

	it('extracts spotify path, given a valid link', () => {
		expect(
			parseEmbedLink('https://open.spotify.com/album/5zi7WsKlIiUXv09tbGLKsE?si=28a6cae09d214cc6')
				.path
		).toBe('album/5zi7WsKlIiUXv09tbGLKsE?si=28a6cae09d214cc6');
	});

	it('is URL for .name for erroneous link', () => {
		expect(
			parseEmbedLink('https://open.tokify.com/nonsense/album/5zi7WsKlIiUXv09tbGLKsEsicc6').name
		).toBe('https://open.tokify.com/nonsense/album/5zi7WsKlIiUXv09tbGLKsEsicc6');
	});

	it('is URL for .path for erroneous link', () => {
		expect(
			parseEmbedLink('https://open.tokify.com/nonsense/album/5zi7WsKlIiUXv09tbGLKsEsicc6').path
		).toBe('https://open.tokify.com/nonsense/album/5zi7WsKlIiUXv09tbGLKsEsicc6');
	});
});

describe('hasUppercase', () => {
	it('is true for uppercase', () => {
		expect(hasUppercase('abcDefg')).toBe(true);
	});

	it('is false for lowercase', () => {
		expect(hasUppercase('abcdefg')).toBe(false);
	});
});

describe('createSiteTitle', () => {
	const currentSiteTitle = site.title;

	it(`is our site title ${currentSiteTitle} when no additional argument provided`, () => {
		expect(createSiteTitle(currentSiteTitle)).toBe(currentSiteTitle);
	});

	it('is the argument passed with OMS title appended', () => {
		expect(createSiteTitle(site.title, 'Random News Story')).toBe(
			`Random News Story – ${currentSiteTitle}`
		);
	});

	it('outputs with random numbers', () => {
		expect(createSiteTitle(site.title, '1234567890 Cup Conundrum')).toBe(
			`1234567890 Cup Conundrum – ${currentSiteTitle}`
		);
	});

	it('outputs with non-alphanumeric characters', () => {
		expect(createSiteTitle(site.title, '100% of students need to read our newspaper!')).toBe(
			`100% of students need to read our newspaper! – ${currentSiteTitle}`
		);
	});
});

describe('createAuthorLink', () => {
	it('generates a correct URL for arbitrary author and website', () => {
		const url = 'https://noogle.com';
		const slug = 'ron-faux';
		expect(createAuthorLink(url, slug)).toBe('https://noogle.com/about/staff/ron-faux');
	});

	it('generates a correct URL for our website and author', () => {
		const url = site.url;
		const slug = 'neo-alabastro';
		expect(createAuthorLink(url, slug)).toBe(
			'https://onmagnoliasquare.com/about/staff/neo-alabastro'
		);
	});
});

describe('getFlagEmoji', () => {
	it('handles lowercase input by returning the correct emoji', () => {
		expect(getFlagEmoji('us')).toBe('🇺🇸');
	});

	it('returns 🇺🇸 for country code "US"', () => {
		expect(getFlagEmoji('US')).toBe('🇺🇸');
	});

	it('returns 🇨🇦 for country code "CA"', () => {
		expect(getFlagEmoji('CA')).toBe('🇨🇦');
	});

	it('returns 🇬🇧 for country code "GB"', () => {
		expect(getFlagEmoji('GB')).toBe('🇬🇧');
	});

	it('returns 🇯🇵 for country code "JP"', () => {
		expect(getFlagEmoji('JP')).toBe('🇯🇵');
	});

	it('returns 🇨🇳 for country code "CN"', () => {
		expect(getFlagEmoji('CN')).toBe('🇨🇳');
	});

	it('returns 🇰🇪 for country code "KE"', () => {
		expect(getFlagEmoji('KE')).toBe('🇰🇪');
	});

	it('returns 🇳🇬 for country code "NG"', () => {
		expect(getFlagEmoji('NG')).toBe('🇳🇬');
	});

	it('returns 🇿🇦 for country code "ZA"', () => {
		expect(getFlagEmoji('ZA')).toBe('🇿🇦');
	});

	it('returns 🇹🇼 for country code "TW"', () => {
		expect(getFlagEmoji('TW')).toBe('🇹🇼');
	});

	it('returns 🇮🇳 for country code "IN"', () => {
		expect(getFlagEmoji('IN')).toBe('🇮🇳');
	});
});

/**
 * The reason for many test cases in dateFormatter is because of,
 * 1) we have readers from many regions, and 2) we have confidence
 * that the JavaScript API isn't returning any funky date formatting
 * from what is retrieved from Sanity CMS. Checkout this repository
 * for [locale codes](https://github.com/TiagoDanin/Locale-Codes).
 */
describe('dateFormatter', () => {
	// All dates in YYYY/MM/DD format.
	const normalDate = '2014-02-01';
	// const leapDate = '';

	const noLocaleProvided = '';
	// Locales selected based on Cloudflare metrics, as well as student demographics.
	const table = [
		// Might comment this out for CI tests, don't know or have control over the runtime's locale.
		[normalDate, noLocaleProvided, 'Sat, February 1, 2014'],

		/**
		 * AFRICA
		 */
		[normalDate, 'kln-KE', 'Kol, 1 Ng’atyaato 2014'], // Kenya
		[normalDate, 'ki-KE', 'NMM, 1 Mwere wa kerĩ 2014'], // Kenya
		[normalDate, 'rw-RW', '2014 Gashyantare 1, gnd.'], // Kenya
		[normalDate, 'kk-KZ', '2014 ж. 1 ақпан, сб'], // Kazakhstan
		[normalDate, 'rw-RW', '2014 Gashyantare 1, gnd.'], // Rwanda

		/**
		 * AMERICA
		 */
		// North
		[normalDate, 'en-US', 'Sat, February 1, 2014'], // United States

		// South
		[normalDate, 'pt-BR', 'sáb., 1 de fevereiro de 2014'], // Brazil
		[normalDate, 'es-EC', 'sáb, 1 de febrero de 2014'], // Ecuador

		/**
		 * ASIA
		 */
		[normalDate, 'zh-CN', '2014年2月1日周六'], // Mainland China
		[normalDate, 'zh-HK', '2014年2月1日週六'], // Hong Kong
		[normalDate, 'zh-SG', '2014年2月1日周六'], // Singapore
		[normalDate, 'zh-MO', '2014年2月1日週六'], // Macau
		[normalDate, 'zh-TW', '2014年2月1日 週六'], // Taiwan
		[normalDate, 'ja-JP', '2014年2月1日(土)'], // Japan
		[normalDate, 'ko-KR', '2014년 2월 1일 토'], // South Korea
		[normalDate, 'ko-KP', '2014년 2월 1일 토'], // North Korea
		[normalDate, 'mn', '2014 оны хоёрдугаар сарын 1, Бя гараг'], // Mongolia (Cyrillic)
		[normalDate, 'ne-NP', '२०१४ फेब्रुअरी १, शनि'],

		// Central
		[normalDate, 'tr', '1 Şubat 2014 Cmt'], // Turkey, Cypress

		// South
		[normalDate, 'ur', 'ہفتہ، 1 فروری، 2014'], // India, Pakistan
		[normalDate, 'id-ID', 'Sab, 1 Februari 2014'], // Indonesia
		[normalDate, 'fil-PH', 'Sab, Pebrero 1, 2014'], // Philippines
		[normalDate, 'ms-MY', 'Sab, 1 Februari 2014'], // Malaysia

		/**
		 * EUROPE
		 */
		[normalDate, 'en-GB', 'Sat 1 February 2014'], // Great Britain
		[normalDate, 'it-IT', 'sab 1 febbraio 2014'], // Italy
		[normalDate, 'kab-DZ', 'Say 1 Fuṛar 2014'], // Algeria
		[normalDate, 'fr-FR', 'sam. 1 février 2014'], // France

		// Eastern
		[normalDate, 'ru-RU', 'сб, 1 февраля 2014 г.'], // Russian Federation
		[normalDate, 'uk-UA', 'сб, 1 лютого 2014 р.'], // Ukraine
		[normalDate, 'tk-TM', '1 fewral 2014 şen'], // Turkmenistan

		/**
		 * MIDDLE EAST
		 */
		[normalDate, 'ar-AE', 'السبت، 1 فبراير 2014'], // UAE
		[normalDate, 'he', 'שבת, 1 בפברואר 2014'], // Hebrew, no country bias

		/**
		 * POLYNESIA
		 */
		[normalDate, 'haw', 'P6, 1 Pepeluali 2014'], // Kingdom of Hawaii
		[normalDate, 'mi', 'Rāh, 1 Pēpuere 2014'] // New Zealand (Maori)
	];

	test.each([...table])(
		'%s in (%s) -> %s',
		(date: string, locale: Intl.LocalesArgument, out: string) => {
			if (locale === '') {
				// If no `locale` parameter is provided, use JS runtime default locale.
				expect(dateFormatter(date)).toBe(out);
			}

			expect(dateFormatter(date, locale)).toBe(out);
		}
	);
});
