import { buildApp } from './build.mjs'
import { serve } from './serve.mjs'
import { execFile } from 'node:child_process'

await buildApp({ watch: true })
serve()
console.log('Watching React and Tailwind sources. Reload the browser after changes.')

if (process.env.BROWSER !== 'none') {
  const url = `http://localhost:${process.env.PORT || 3000}/`
  const command =
    process.platform === 'win32'
      ? ['cmd', ['/c', 'start', '', url]]
      : process.platform === 'darwin'
        ? ['open', [url]]
        : ['xdg-open', [url]]

  execFile(command[0], command[1], (error) => {
    if (error) {
      console.log(`Open ${url} in your browser.`)
    }
  })
}
