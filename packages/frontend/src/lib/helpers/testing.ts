export async function fakePromiseResolve(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay))
}
