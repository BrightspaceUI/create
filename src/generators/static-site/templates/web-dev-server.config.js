import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';

import { devConfig } from './shared.config.js';

const replace = fromRollup(rollupReplace);

export default {
    open: true,
    appIndex: './src/index.html',
    nodeResolve: {
        exportConditions: ['default'],
    },
    plugins: [
        replace({
            // The buildConfig replace is set up to only work in the buildConfig.js file
            // in order to limit the use of undefined (i.e. magic-y) variables.
            include: ['./src/**/buildConfig.js'],
            preventAssignment: true,
            values: {
                __buildConfig__: JSON.stringify(devConfig),
            },
        }),
    ],
};
