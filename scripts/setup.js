const fs = require('fs-extra')
const path = require('path')

const rootDir = process.cwd()

console.log('Setting symlinks for theme.css', rootDir)

const symlinks = ['./node_modules/onsenui/css-components-src/src/theme.css']

symlinks.forEach((file) => {
  fs.symlink(path.join(rootDir, file), path.join(rootDir, 'src', 'theme.css'))
})
