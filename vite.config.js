const { defineConfig } = require('vite');

const libraryName = 'doc-it-definition-popup';

module.exports = defineConfig({
    build: {
        lib:{
            name: libraryName,
            entry: 'main.js',
        },
        rollupOptions: {
            output: {
                entryFileNames: libraryName + `.[format].js`,
                assetFileNames: libraryName + `.[ext]`,
            }
        }
    }
})
