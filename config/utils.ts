import path from 'path'

const resolve = (dir: string) => {
  return path.join(__dirname, '..', dir)
}
const APP_PATH = resolve('src')
const DIST_PATH = resolve('dist')

export { resolve, APP_PATH, DIST_PATH }
