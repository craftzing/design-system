const { withNx } = require('@nx/rollup/with-nx');

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: '../../dist/packages/design-system',
    tsConfig: './tsconfig.lib.json',
    compiler: 'swc',
    format: ['esm'],
    assets: [{ input: '.', output: '.', glob: '*.md' }],
    additionalEntryPoints: ['./src/bar/bar.ts', './src/foo/foo.ts'],
    generateExportsField: true
  },
  {
    // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
    // e.g.
    // output: { sourcemap: true },
  }
);
