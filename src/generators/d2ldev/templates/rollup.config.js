import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import terser from '@rollup/plugin-terser';

import { prodConfig } from './shared.config.js';

export default {
    input: './src/index.html',
    output: {
        dir: 'dist',
        entryFileNames: '[hash].js',
        chunkFileNames: '[hash].js',
        assetFileNames: '[hash][extname]',
    },
    plugins: [
        replace({
            // The buildConfig replace is set up to only work in the buildConfig.js file in order to limit the use of undefined (i.e. magic-y) variables
            include: ['./src/**/buildConfig.js'],
            preventAssignment: true,
            values: {
                __buildConfig__: JSON.stringify(prodConfig),
            },
        }),
        resolve(),
        html({
            minify: true,
            input: './src/index.html',
        }),

        /*
            dynamicImportVars is required in order to properly handle
            dynamic imports for @brightspace-ui/core's localization.
        */
        dynamicImportVars(),

        terser(),
    ],
};
