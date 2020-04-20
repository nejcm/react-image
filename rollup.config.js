const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const sass = require('rollup-plugin-sass');
const copy = require('rollup-plugin-copy');
const svg = require('rollup-plugin-svg');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const config = require('kcd-scripts/dist/config/rollup.config.js');

const copyAssets = () =>
  copy({
    targets: [
      //{ src: 'assets/*', dest: 'dist/assets' }
    ],
  });

const babelPluginIndex = config.plugins.findIndex(
  (plugin) => plugin.name === 'babel',
);
const cjsPluginIndex = config.plugins.findIndex(
  (plugin) => plugin.name === 'commonjs',
);

config.plugins[babelPluginIndex] = babel({
  runtimeHelpers: true,
});
config.plugins[cjsPluginIndex] = commonjs({
  include: 'node_modules/**',
  exclude: ['**/*.story.js'],
  namedExports: {},
});
// Add sass support
config.plugins.unshift(
  sass({
    output: 'dist/bundle.css',
    processor: (css) =>
      postcss([autoprefixer])
        .process(css)
        .then((result) => result.css),
  }),
);
// Svg import support
config.plugins.unshift(svg());
// Copy assets
config.plugins.unshift(copyAssets());

module.exports = config;
