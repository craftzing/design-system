import { readFile } from 'fs/promises';
import path from 'path';
import { expect, describe, it } from 'vitest';

const BUILD_PATH = './dist';
const formats = ['css'];

describe('Token Build Snapshot Tests', () => {
  it.each(
    formats.map((format) => ({
      format,
      fileExtension: format,
    }))
  )(
    'should match the snapshot for $tokenType $format tokens',
    async ({ format, fileExtension }) => {
      const tokenFilePath = path.join(
        BUILD_PATH,
        format,
        `tokens.${fileExtension}`
      );
      const tokenFileContent = await readFile(tokenFilePath, 'utf-8');
      expect(tokenFileContent).toMatchSnapshot();
    }
  );
});
