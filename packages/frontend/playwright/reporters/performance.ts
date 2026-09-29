import { appendFileSync } from 'node:fs'
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter'

// Tests record a measurement by pushing an annotation of this type onto
// test.info().annotations, with the value in milliseconds as its description.
export const loadTimeAnnotation = 'basic-load-time'

// Aggregates load-time annotations across every worker and prints the
// statistics once the run ends. Test files can't do this themselves because
// each worker has its own copy of module state.
export default class PerformanceReporter implements Reporter {
  // Keyed by test title and project, so each browser gets its own average.
  private samples = new Map<string, number[]>()

  onTestEnd(test: TestCase, result: TestResult) {
    for (const annotation of result.annotations) {
      if (annotation.type !== loadTimeAnnotation) continue
      const key = `${test.title} [${test.parent.project()?.name}]`
      const samples = this.samples.get(key) ?? []
      samples.push(Number(annotation.description))
      this.samples.set(key, samples)
    }
  }

  onEnd() {
    if (this.samples.size == 0) return

    const rows = [...this.samples].map(([title, samples]) => ({
      title,
      n: samples.length,
      average: Math.round(samples.reduce((acc, v) => acc + v, 0) / samples.length),
      min: Math.min(...samples),
      max: Math.max(...samples),
    }))

    console.info('\nPerformance summary')
    for (const r of rows) {
      console.info(
        `  ${r.title}: average ${r.average}ms (min ${r.min}ms, max ${r.max}ms, n=${r.n})`
      )
    }

    // On GitHub Actions, also add a table to the job summary page.
    if (process.env.GITHUB_STEP_SUMMARY) {
      const table = [
        '### Performance summary',
        '',
        '| Test | Average | Min | Max | Samples |',
        '| --- | --- | --- | --- | --- |',
        ...rows.map(r => `| ${r.title} | ${r.average}ms | ${r.min}ms | ${r.max}ms | ${r.n} |`),
        '',
      ].join('\n')
      appendFileSync(process.env.GITHUB_STEP_SUMMARY, table)
    }
  }

  printsToStdio() {
    return false
  }
}
