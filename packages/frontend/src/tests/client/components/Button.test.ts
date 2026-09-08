// @vitest-environment jsdom

import Button from '$components/general/Button.svelte'
import { cleanup, render } from '@testing-library/svelte/svelte5'
import { userEvent } from '@testing-library/user-event'
import { createRawSnippet } from 'svelte'
import { vi, test, expect, afterEach } from 'vitest'

afterEach(() => {
    vi.resetAllMocks()
    cleanup()
})

test('mounts', async () => {
    const { component } = render(Button)
    expect(component).toBeTruthy()
})

test('disabled when clicked', async () => {
    const user = userEvent.setup()

    const buttonText = 'click me'
    // Using an egregious number here to simulate a really long network fetch.
    // Also, this should be longer than vitest timeouts.
    const { getByText } = newButton(buttonText, 10_000)
    const component = getByText(buttonText)

    expect(component).toBeTruthy()
    expect(component.textContent).toBe(buttonText)
    expect(component).not.toBeDisabled()

    await user.click(component)

    expect(component).toBeDisabled()
})

test('not disabled after clicked and promise resolution', async () => {
    // See: https://www.jeffryhouser.com/index.cfm/2025/9/30/How-to-Unit-Test-a-Flowbite-Svelte-Modal-with-Vitest-with-Mock-Timers

    const timeout = 500
    vi.useFakeTimers()

    const user = userEvent.setup()

    const buttonText = 'click me'
    const { getByText } = newButton(buttonText, timeout)

    const component = getByText(buttonText)

    expect(component).toBeTruthy()
    expect(component.textContent).toBe(buttonText)
    expect(component).not.toBeDisabled()

    await user.click(component)
    vi.advanceTimersByTime(timeout)

    expect(component).not.toBeDisabled()
})

function newButton(text: string, delay: number) {
    return render(Button, {
        children: createRawSnippet(() => {
            return {
                render: () => `${text}`
            }
        }),
        onclick: () => fakePromiseResolve(delay),
        type: 'button',
        title: 'fun button'
    })
}

async function fakePromiseResolve(delay: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, delay))
}
