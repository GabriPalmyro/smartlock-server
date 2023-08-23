import { compilerOptions } from './tsconfig.json';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { register } from 'tsconfig-paths';

const baseUrl = './'; // Either absolute or relative path. If relative it's resolved to current working directory.
const cleanup = register({
  baseUrl,
  paths: compilerOptions.paths,
});

// When path registration is no longer needed
cleanup();
