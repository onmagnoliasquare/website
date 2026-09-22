// @vitest-environment jsdom

import { render } from '@testing-library/svelte/svelte5'
import { expect, test } from 'vitest'
import Header from '$components/Header.svelte'

test('mounts', () => {
  const { container } = render(Header)
  expect(container).toBeTruthy()
})
