import {defineProject} from 'vitest/config'

export default defineProject({
  test: {
    include: ['lib/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
  },
})
