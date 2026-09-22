// @vitest-environment jsdom

import Button from '$components/general/Button.svelte'
import { cleanup, render } from '@testing-library/svelte/svelte5'
import { userEvent } from '@testing-library/user-event'
import { createRawSnippet } from 'svelte'
import { vi, test, it, expect, afterEach, describe } from 'vitest'

const buttonTitle = 'fun button'

/**
 * An `onclick` delay long enough that it cannot resolve before the assertions
 * run.
 */
const neverWithinTheTest = 10_000

afterEach(() => {
  vi.useRealTimers()
  vi.resetAllMocks()
  cleanup()
})

test('mounts', () => {
  const { component } = render(Button)
  expect(component).toBeTruthy()
})

describe('initial state', () => {
  it('should not be disabled if not clicked', () => {
    const { getByTitle } = newButton(buttonTitle, neverWithinTheTest)
    const component = getByTitle(buttonTitle)

    expect(component).toBeTruthy()
    expect(component.title).toBe(buttonTitle)
    expect(component).not.toBeDisabled()
  })
})

describe('disabled functionality', () => {
  it('should be disabled if clicked', async () => {
    const user = userEvent.setup()
    const { getByTitle } = newButton(buttonTitle, neverWithinTheTest)
    const component = getByTitle(buttonTitle)

    await user.click(component)

    expect(component).toBeDisabled()
  })

  it('should keep its label in the layout', async () => {
    const user = userEvent.setup()
    const { getByTitle, getByText } = newButton(buttonTitle, neverWithinTheTest)

    await user.click(getByTitle(buttonTitle))

    expect(getByText('Click me')).toBeInTheDocument()
  })
})

test('not disabled after clicked and promise resolution', async () => {
  // See: https://www.jeffryhouser.com/index.cfm/2025/9/30/How-to-Unit-Test-a-Flowbite-Svelte-Modal-with-Vitest-with-Mock-Timers

  const timeout = 500
  vi.useFakeTimers({ toFake: ['setTimeout'] })

  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

  const { getByTitle } = newButton(buttonTitle, timeout)
  const component = getByTitle('fun button')

  expect(component).toBeTruthy()
  expect(component.title).toBe(buttonTitle)
  expect(component).not.toBeDisabled()

  await user.click(component)
  // Internally, stuff inside advances asynchronously.
  await vi.advanceTimersByTimeAsync(timeout)

  expect(component).not.toBeDisabled()
})

function newButton(title: string, delay: number) {
  return render(Button, {
    children: createRawSnippet(() => {
      return {
        render: () => `<span>Click me</span>`,
      }
    }),
    onclick: () => fakePromiseResolve(delay),
    type: 'button',
    title,
  })
}

async function fakePromiseResolve(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay))
}
