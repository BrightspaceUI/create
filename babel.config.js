module.exports = {
	plugins: ['babel-plugin-transform-dynamic-import'],
	ignore: ['./src/generators/*/templates/**/*'],
	presets: [
		["@babel/preset-env", { targets: { node: '10' } }]
	],
	"plugins": [
		["polyfill-corejs3", { "method": "usage-global" }]
	]
};
