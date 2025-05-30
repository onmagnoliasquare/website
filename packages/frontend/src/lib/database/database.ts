import type { SanityClient } from '@sanity/client';

type databaseClient = SanityClient; // & otherDatabaseClient (if needed in the future!)

export interface QueryParameters {
	[key: string]: unknown;
}

export class Database {
	private client: databaseClient;

	constructor(client: databaseClient) {
		this.client = client;
	}

	async fetch<T>(query: string, params?: QueryParameters): Promise<T> {
		let res;
		try {
			res = this.client.fetch<T>(query, { ...params });
		} catch (err: unknown) {
			if (err instanceof Error) {
				res = Promise.reject(new Error(`Query failed, review query: ${query} - ${err.message}`));
			}

			res = Promise.reject(new Error(`Query failed, review query: ${query} - Unknown error`));
		}

		return res;
	}
}
