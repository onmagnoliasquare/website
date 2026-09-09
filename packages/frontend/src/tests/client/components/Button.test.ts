// @vitest-environment jsdom

import Button from '$components/general/Button.svelte'
import { cleanup, render } from '@testing-library/svelte/svelte5'
import { userEvent } from '@testing-library/user-event'
import { createRawSnippet } from 'svelte'
import { vi, test, expect, afterEach } from 'vitest'

const buttonTitle = 'fun button'

afterEach(() => {
  vi.useRealTimers()
  vi.resetAllMocks()
  cleanup()
})

test('mounts', async () => {
  const { component } = render(Button)
  expect(component).toBeTruthy()
})

test('disabled when clicked', async () => {
  const user = userEvent.setup()

  // Using an egregious number here to simulate a really long network fetch.
  // Also, this should be longer than vitest timeouts.
  const { getByTitle } = newButton(buttonTitle, 10_000)
  const component = getByTitle(buttonTitle)

  expect(component).toBeTruthy()
  expect(component.title).toBe(buttonTitle)
  expect(component).not.toBeDisabled()

  await user.click(component)

  expect(component).toBeDisabled()
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
