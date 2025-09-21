import type { SanityClient } from '@sanity/client'

type databaseClient = SanityClient // & otherDatabaseClient (if needed in the future!)

export type QueryParameters = Record<string, unknown>

export class Database {
  private client: databaseClient

  constructor(client: databaseClient) {
    this.client = client
  }

  async fetch<T>(query: string, params?: QueryParameters): Promise<T> {
    let res: T
    try {
      res = await this.client.fetch<T>(query, { ...params })
    } catch (err: unknown) {
      if (err instanceof Error) {
        res = await Promise.reject(new Error('query failure', { cause: err.message }))
      }
      res = await Promise.reject(new Error(`Query failed, review query: ${query} - Unknown error`))
    }
    return res
  }
}
