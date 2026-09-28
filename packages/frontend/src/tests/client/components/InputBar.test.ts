import { cleanup, render } from '@testing-library/svelte/svelte5'
import { vi, test, it, expect, afterEach, describe } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import InputBar from '$components/general/input/InputBar.svelte'
import { fakePromiseResolve } from '$lib/helpers/testing'

const timeout = 500

afterEach(() => {
  vi.useRealTimers()
  vi.resetAllMocks()
  cleanup()
})

test('mounts', () => {
  const { component } = newInputBar()
  expect(component).toBeTruthy()
})

describe('initial state', () => {
  it('should not be disabled', () => {
    const { getByTitle } = newInputBar()
    const component = getByTitle('Input A')
    expect(component).not.toBeDisabled()
  })

  it('has a placeholder value', () => {
    const { queryByPlaceholderText } = newInputBar()
    const component = queryByPlaceholderText('')

    // A blank placeholder text should not exist.
    expect(component).not.toBeTruthy()
  })

  it('should be able to type', async () => {
    const user = userEvent.setup()
    const { getByPlaceholderText } = newInputBar()
    const component = getByPlaceholderText('Search...')

    await user.type(component, 'Bruh please work')
    expect(component).toHaveValue('Bruh please work')
  })
})

describe('behavior and functionality', () => {
  it('should sanitize input', async () => {
    let val = ''
    const user = userEvent.setup()
    const { getByPlaceholderText } = newInputBar(v => {
      val = v
      return Promise.resolve()
    })
    const component = getByPlaceholderText('Search...')

    await user.type(component, ' sanitize me  ')
    await user.type(component, '{Enter}')

    expect(val).toBe('sanitize me')
  })

  it('should show a value passed in after it mounts', async () => {
    const { getByPlaceholderText, rerender } = newInputBar(undefined, 'first query')
    const component = getByPlaceholderText('Search...')
    expect(component).toHaveValue('first query')

    // e.g. the page's search bar when another search bar navigates to a new query.
    await rerender({ value: 'second query' })

    expect(component).toHaveValue('second query')
  })

  it('should be disabled when awaiting', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout'] })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { getByPlaceholderText } = newInputBar(_ => fakePromiseResolve(timeout))
    const component = getByPlaceholderText('Search...')

    expect(component).toBeTruthy()
    expect(component).not.toBeDisabled()

    await user.type(component, 'nonsense')
    await user.type(component, '{Enter}')

    expect(component).toBeDisabled()

    await vi.advanceTimersByTimeAsync(timeout)
  })

  it('should be be enabled when awaiting is done', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout'] })

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { getByPlaceholderText } = newInputBar(_ => fakePromiseResolve(timeout))
    const component = getByPlaceholderText('Search...')

    expect(component).toBeTruthy()
    expect(component).not.toBeDisabled()

    await user.type(component, 'nonsense')
    await user.type(component, '{Enter}')

    expect(component).toBeDisabled()

    await vi.advanceTimersByTimeAsync(timeout)

    expect(component).not.toBeDisabled()
  })
})

function newInputBar(action?: (v: string) => Promise<void>, value?: string) {
  return render(InputBar, {
    id: 'input',
    value,
    name: 'Input A',
    title: 'Input A',
    placeholder: 'Search...',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action: action ?? (_ => Promise.resolve()),
    sanitize: value => (value as string).trim(),
  })
}
