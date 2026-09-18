// @vitest-environment jsdom

import NumberDisplay from '$components/general/NumberDisplay.svelte'
import { cleanup, render } from '@testing-library/svelte/svelte5'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

/**
 * The real `NumberFlow` registers a custom element with an open shadow root and
 * drives it through the Web Animations API, neither of which jsdom serves. The
 * stub keeps the one thing worth reading back — the value it is handed — and
 * parks it where the component would have put the odometer.
 */
vi.mock('@number-flow/svelte', async () => {
  const { untrack } = await import('svelte')

  const NumberFlow = (anchor: ChildNode, props: { value: number }): void => {
    const display = document.createElement('span')
    display.dataset.testid = 'number-flow'
    display.textContent = String(untrack(() => props.value))
    anchor.before(display)
  }

  return { continuous: {}, default: NumberFlow }
})

beforeEach(() => {
  // The component opens a 100ms interval while it initializes, so the clock has
  // to be fake before anything renders.
  vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] })
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  cleanup()
})

test('calls a single match "result" rather than "results"', () => {
  const { getByText } = render(NumberDisplay, { num: 1 })

  expect(getByText('result')).toBeInTheDocument()
})

test('calls every other count results', () => {
  const { getByText } = render(NumberDisplay, { num: 2 })

  expect(getByText('results')).toBeInTheDocument()
})

test('spins placeholder numbers into the display while the count unknown', async () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.0005)
  const { getByText } = render(NumberDisplay, { num: undefined })
  expect(getByText('results')).toBeInTheDocument()

  await vi.advanceTimersByTimeAsync(100)

  expect(getByText('result')).toBeInTheDocument()
})

test('hides the spinning count from assistive technology until it settles', async () => {
  const { getByText, rerender } = render(NumberDisplay, { num: undefined })
  expect(getByText('results')).toHaveAttribute('aria-hidden', 'true')

  await rerender({ num: 7 })

  expect(getByText('results')).toHaveAttribute('aria-hidden', 'false')
})

test('settles on the count it is handed once counting stops', async () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.0005)
  const { getByTestId, getByText } = render(NumberDisplay, { num: 42 })

  expect(getByTestId('number-flow')).toHaveTextContent('42')

  // A real count outranks the placeholder from here on: were a later tick still
  // reaching the display, the pinned placeholder of 1 would flip the noun.
  await vi.advanceTimersByTimeAsync(1000)

  expect(getByText('results')).toBeInTheDocument()
})
