import { nodeConfig } from 'eslint-config-brightspace';

export default [
	{
		ignores: ['dist', 'src/generators/*/templates/**/*']
	},
	...nodeConfig
];
