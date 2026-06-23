module.exports = {
	plugins: [
		['polyfill-corejs3', { method: 'usage-global' }]
	],
	ignore: ['./src/generators/*/templates/**/*'],
	presets: [
		['@babel/preset-env', { targets: { node: '10' } }]
	]
};
