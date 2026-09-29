<!--
@component
Executes an `action` based on some textual input.
-->

<script lang="ts">
import TextInputField from './TextInputField.svelte'
import type { ClassValue } from 'svelte/elements'
import { maxSearchQueryLength } from '$lib/constants.ts'

interface Props {
  id: string
  name: string
  title: string
  class?: ClassValue
  placeholder: string
  value?: string
  disabled?: boolean
  action: (value: string) => Promise<void>
  sanitize: (value: string) => string
  maxlength?: number
  /**
   * Where the form submits as a plain GET before the page hydrates, and the query
   * parameter the value goes under. Without it, an early submit goes nowhere useful.
   */
  fallback?: { path: string; param: string }
}

let {
  id,
  name,
  title,
  class: className = '',
  placeholder,
  value = $bindable(''),
  disabled,
  maxlength = maxSearchQueryLength,
  action,
  sanitize,
  fallback,
}: Props = $props()

let submitted = $state(false)

let sanitized = $derived(sanitize(value))

const act = async (e: SubmitEvent | KeyboardEvent): Promise<void> => {
  e.preventDefault()
  if (!sanitized) {
    return
  }
  submitted = true
  try {
    await action(sanitized)
  } finally {
    submitted = false
  }
}
</script>

<form
  class="flex w-full min-w-0 flex-1 items-center gap-1"
  action={fallback?.path}
  method="GET"
  onsubmit={act}>
  <label for={id} class="sr-only">{name}</label>
  <TextInputField
    id={id}
    bind:value={value}
    class={className}
    name={fallback?.param ?? name}
    disabled={disabled ?? submitted}
    maxlength={maxlength}
    placeholder={placeholder}
    onkeydown={async (e: KeyboardEvent) => {
      if (e.key === 'Enter' && sanitized !== '') await act(e)
    }} />
  <input type="submit" title={title} value={name} class="sr-only" />
</form>
