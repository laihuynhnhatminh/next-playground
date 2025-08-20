import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import { config, configs } from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default config([
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
  ),
  ...configs.recommended,
]);
