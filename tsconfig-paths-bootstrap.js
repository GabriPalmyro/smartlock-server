// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { register } = require('tsconfig-paths');

const baseUrl = './'; // Either absolute or relative path. If relative it's resolved to current working directory.
const cleanup = register({
  baseUrl,
  paths: compilerOptions.paths,
});

// When path registration is no longer needed
cleanup();
