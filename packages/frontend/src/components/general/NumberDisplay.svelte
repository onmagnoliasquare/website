<script lang="ts">
import NumberFlow, { continuous } from '@number-flow/svelte'

interface Props {
  num: number | null | undefined
}

const { num }: Props = $props()

/**
 * Number flow does not support a "loading" functionality. For example, it isn't
 * capable of expressing "waiting". This is a workaround for that. The "waiting"
 * state is when `num` is undefined or null. When that is the case, the component
 * shifts through random numbers until `num` becomes defined as a number.
 */

let randomNum = $state(0)
let matchesNum = $derived(num ?? randomNum)

const rng = (): number =>
  setInterval(() => {
    randomNum = Math.ceil(Math.random() * 1000)
  }, 100) as unknown as number

let intervalId = $state<number | null>(null)

$effect(() => {
  if (num) {
    clearInterval(intervalId)
    intervalId = null
  } else {
    intervalId = rng()
  }
})
</script>

<span class="inline-grid">
  <span
    class="col-start-1 row-start-1 font-normal text-neutral-500 tabular-nums ease-in transform-fill"
    aria-hidden={num ? false : true}>
    <NumberFlow
      value={matchesNum}
      trend={1}
      willChange={true}
      plugins={[continuous]}
      spinTiming={{
        // Used for the digit spin animations.
        // Will fall back to `transformTiming` if unset:
        // Use this for generation: https://www.kvin.me/css-springs
        duration: 872,
        easing:
          'linear(0, 0.0018, 0.0069 1.16%, 0.0262 2.32%, 0.0642, 0.1143 5.23%, 0.2244 7.84%, 0.5881 15.68%, 0.6933, 0.7839, 0.8591, 0.9191 26.13%, 0.9693, 1.0044 31.93%, 1.0234, 1.0358 36.58%, 1.0434 39.19%, 1.046 42.39%, 1.0446 44.71%, 1.0404 47.61%, 1.0118 61.84%, 1.0028 69.39%, 0.9981 80.42%, 0.9991 99.87%)',
      }} />
    {matchesNum === 1 ? 'result' : 'results'}
  </span>
</span>
