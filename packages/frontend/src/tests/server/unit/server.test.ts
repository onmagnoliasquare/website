import { createAuthorLink, createSiteTitle, domainFromUrl, parseEmbedLink } from '$lib/helpers'
import { site } from '$lib/constants'
import { describe, expect, it } from 'vitest'

describe('domainFromUrl', () => {
  it('strips http', () => {
    expect(domainFromUrl('http://www.google.com')).toBe('google.com')
  })

  it('strips https', () => {
    expect(domainFromUrl('https://www.google.com')).toBe('google.com')
  })

  it('strips short path', () => {
    expect(domainFromUrl('https://neoalabastro.com/code')).toBe('neoalabastro.com')
  })

  it('strips long path', () => {
    expect(
      domainFromUrl(
        'https://reddit.com/r/QAnonCasualties/comments/1go1e5m/sovereign_husband_do_i_leave/'
      )
    ).toBe('reddit.com')
  })

  it('respects subdomains', () => {
    expect(domainFromUrl('https://google.co.uk')).toBe('google.co.uk')
  })

  it('can handle other periods', () => {
    expect(domainFromUrl('https://www.koreaherald.com/custom/ethics.php')).toBe('koreaherald.com')
  })
})

describe('parseEmbedLink', () => {
  it('extracts spotify name, given a valid link', () => {
    expect(
      parseEmbedLink('https://open.spotify.com/album/5zi7WsKlIiUXv09tbGLKsE?si=28a6cae09d214cc6')
        .name
    ).toBe('spotify')
  })

  it('extracts spotify path, given a valid link', () => {
    expect(
      parseEmbedLink('https://open.spotify.com/album/5zi7WsKlIiUXv09tbGLKsE?si=28a6cae09d214cc6')
        .path
    ).toBe('album/5zi7WsKlIiUXv09tbGLKsE?si=28a6cae09d214cc6')
  })

  it('is URL for .name for erroneous link', () => {
    expect(
      parseEmbedLink('https://open.tokify.com/nonsense/album/5zi7WsKlIiUXv09tbGLKsEsicc6').name
    ).toBe('https://open.tokify.com/nonsense/album/5zi7WsKlIiUXv09tbGLKsEsicc6')
  })

  it('is URL for .path for erroneous link', () => {
    expect(
      parseEmbedLink('https://open.tokify.com/nonsense/album/5zi7WsKlIiUXv09tbGLKsEsicc6').path
    ).toBe('https://open.tokify.com/nonsense/album/5zi7WsKlIiUXv09tbGLKsEsicc6')
  })
})

describe('createSiteTitle', () => {
  const currentSiteTitle = site.title

  it(`is our site title ${currentSiteTitle} when no additional argument provided`, () => {
    expect(createSiteTitle(currentSiteTitle)).toBe(currentSiteTitle)
  })

  it('is the argument passed with OMS title appended', () => {
    expect(createSiteTitle(site.title, 'Random News Story')).toBe(
      `Random News Story – ${currentSiteTitle}`
    )
  })

  it('outputs with random numbers', () => {
    expect(createSiteTitle(site.title, '1234567890 Cup Conundrum')).toBe(
      `1234567890 Cup Conundrum – ${currentSiteTitle}`
    )
  })

  it('outputs with non-alphanumeric characters', () => {
    expect(createSiteTitle(site.title, '100% of students need to read our newspaper!')).toBe(
      `100% of students need to read our newspaper! – ${currentSiteTitle}`
    )
  })
})

describe('createAuthorLink', () => {
  it('generates a correct URL for arbitrary author and website', () => {
    const url = 'https://noogle.com'
    const slug = 'ron-faux'
    expect(createAuthorLink(url, slug)).toBe('https://noogle.com/about/staff/ron-faux')
  })

  it('generates a correct URL for our website and author', () => {
    const url = site.url
    const slug = 'neo-alabastro'
    expect(createAuthorLink(url, slug)).toBe(
      'https://onmagnoliasquare.com/about/staff/neo-alabastro'
    )
  })
})
