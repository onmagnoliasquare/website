import { dev } from '$app/environment'
import { type ClientConfig, createClient } from '@sanity/client'
import { Database } from './database'

const config: ClientConfig = {
  projectId: '1ah7xxlt',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-09-20',
}

// Change the dataset if it is a development environment.
if (dev || import.meta.env.MODE === 'development') {
  config.dataset = 'development'
  config.useCdn = false
} else if (import.meta.env.MODE === 'staging') {
  config.dataset = 'staging'
  config.useCdn = false
}

const withSanityClient = createClient(config)

export const db = new Database(withSanityClient)
