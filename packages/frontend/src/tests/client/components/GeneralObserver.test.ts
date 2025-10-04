// @vitest-environment jsdom

import { render } from '@testing-library/svelte/svelte5'
import { describe, expect, it } from 'vitest'
import GeneralObserver from '$components/embeds/GeneralObserver.svelte'

describe('General Observer', () => {
  it('mounts', () => {
    const { container } = render(GeneralObserver)
    expect(container).toBeTruthy()
  })
})
