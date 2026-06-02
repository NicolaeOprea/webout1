import * as esbuild from 'esbuild'
import { execFile } from 'node:child_process'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const buildDir = join(rootDir, 'build')
const tailwindCli = join(rootDir, 'node_modules', 'tailwindcss', 'lib', 'cli.js')

async function loadEnv() {
  const envFiles = [
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    '.env.local',
  ]

  for (const fileName of envFiles) {
    try {
      const envText = await readFile(join(rootDir, fileName), 'utf8')
      for (const rawLine of envText.split(/\r?\n/u)) {
        const line = rawLine.trim()
        if (!line || line.startsWith('#')) continue
        const separatorIndex = line.indexOf('=')
        if (separatorIndex === -1) continue

        const key = line.slice(0, separatorIndex).trim()
        const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '')

        if (key && process.env[key] == null) {
          process.env[key] = value
        }
      }
    } catch {
      // Env files are optional.
    }
  }
}

async function prepareBuild() {
  await rm(buildDir, { recursive: true, force: true })
  await mkdir(join(buildDir, 'assets'), { recursive: true })
  await cp(join(rootDir, 'public'), buildDir, { recursive: true, force: true })
}

async function buildCss({ watch = false } = {}) {
  const args = [
    '-i',
    'src/index.css',
    '-o',
    'build/assets/index.css',
    ...(watch ? ['--watch'] : ['--minify']),
  ]

  if (watch) {
    const { spawn } = await import('node:child_process')
    return spawn(process.execPath, [tailwindCli, ...args], {
      cwd: rootDir,
      stdio: 'inherit',
    })
  }

  await execFileAsync(process.execPath, [tailwindCli, ...args], { cwd: rootDir })
}

async function buildJs({ watch = false } = {}) {
  const options = {
    entryPoints: [join(rootDir, 'src/main.jsx')],
    outfile: join(buildDir, 'assets/index.js'),
    bundle: true,
    format: 'esm',
    jsx: 'automatic',
    platform: 'browser',
    target: ['es2020'],
    minify: !watch,
    sourcemap: watch,
    loader: {
      '.svg': 'dataurl',
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.jpeg': 'dataurl',
      '.webp': 'dataurl',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(watch ? 'development' : 'production'),
      'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL || ''),
      'process.env.REACT_APP_BUSINESS_SLUG': JSON.stringify(process.env.REACT_APP_BUSINESS_SLUG || ''),
      'process.env.REACT_APP_LOCATION_ID': JSON.stringify(process.env.REACT_APP_LOCATION_ID || ''),
    },
  }

  if (watch) {
    const context = await esbuild.context(options)
    await context.watch()
    return context
  }

  await esbuild.build(options)
  return null
}

async function writeHtml() {
  const source = await readFile(join(rootDir, 'index.html'), 'utf8')
  const html = source
    .replace(/\s*<script type="module" src="\/src\/main\.jsx"><\/script>\s*/u, '\n')
    .replace(
      '</head>',
      '    <link rel="stylesheet" href="/assets/index.css" />\n  </head>',
    )
    .replace(
      '</body>',
      '    <script type="module" src="/assets/index.js"></script>\n  </body>',
    )

  await writeFile(join(buildDir, 'index.html'), html)
}

export async function buildApp({ watch = false } = {}) {
  await loadEnv()
  await prepareBuild()
  await writeHtml()

  if (watch) {
    await buildCss()
    await buildJs()

    const cssWatcher = await buildCss({ watch: true })
    const jsContext = await buildJs({ watch: true })

    return {
      cssWatcher,
      jsContext,
    }
  }

  const cssWatcher = await buildCss({ watch })
  const jsContext = await buildJs({ watch })

  return {
    cssWatcher,
    jsContext,
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await buildApp()
  console.log('React ESM build written to build/')
}
