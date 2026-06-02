import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const buildDir = join(rootDir, 'build')

const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1')

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
}

function resolvePath(url = '/') {
  const pathname = decodeURIComponent(url.split('?')[0] || '/')
  const normalized = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  return join(buildDir, normalized === '/' ? 'index.html' : normalized)
}

export function serve() {
  const server = createServer(async (request, response) => {
    let filePath = resolvePath(request.url)

    try {
      const fileStat = await stat(filePath)
      if (fileStat.isDirectory()) filePath = join(filePath, 'index.html')
      const body = await readFile(filePath)
      response.writeHead(200, {
        'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
      })
      response.end(body)
    } catch {
      if (request.url?.startsWith('/assets/') || request.url?.startsWith('/fonts/')) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        response.end('Not found')
        return
      }

      const body = await readFile(join(buildDir, 'index.html'))
      response.writeHead(200, { 'Content-Type': contentTypes['.html'] })
      response.end(body)
    }
  })

  server.listen(port, host, () => {
    console.log(`React ESM app available at http://localhost:${port}/`)
  })

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Open http://localhost:${port}/ or stop the existing server and run npm start again.`)
      return
    }

    throw error
  })

  return server
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  serve()
}
