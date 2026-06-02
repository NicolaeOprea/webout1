import { buildApp } from './build.mjs'
import { serve } from './serve.mjs'

const isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  await buildApp()
  serve()
} else {
  await import('./dev.mjs')
}
