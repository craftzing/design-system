// This executor will not work until ESM is supported by nx plugins.
// https://github.com/nrwl/nx/issues/15682

import { ExecutorContext, PromiseExecutor } from '@nx/devkit';
import StyleDictionary from 'style-dictionary';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname } from 'node:path/posix';
import { BuildTokensExecutorSchema } from './schema';

const { log, error } = console;

export interface BuildTokensExecutorOptions {
  source: string;
  outputSets: string;
  outputTokens: string;
}

/**
 * Function to create Style Dictionary configuration dynamically.
 * @param {string} source - The source file path.
 * @param {string} outputDir - The output directory path.
 * @returns {import('style-dictionary').Config}
 */
const createConfig = (source: string, outputDir: string) => ({
  source: [source],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: [],
      basePxFontSize: 16,
      buildPath: `${outputDir}/css/`,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            showFileHeader: false,
          },
        },
      ],
    },
    // js: {
    //   transformGroup: 'js',
    //   transforms: ['name/camel', 'size/px'],
    //   buildPath: `${outputDir}/js/`,
    //   files: [
    //     {
    //       destination: 'tokens.js',
    //       format: 'javascript/es6',
    //     },
    //   ],
    // },
    // ts: {
    //   transformGroup: 'js',
    //   transforms: ['name/camel', 'size/px'],
    //   buildPath: `${outputDir}/ts/`,
    //   files: [
    //     {
    //       format: 'typescript/es6-declarations',
    //       destination: 'tokens.d.ts',
    //       options: {
    //         outputStringLiterals: false,
    //       },
    //     },
    //   ],
    // },
  },
});

/**
 * Function to split tokens studio sets to separate files.
 * @param {string} source - The source folder path.
 * @returns {Promise<void>}
 */
const createSets = async (source: string, outputSets: string) => {
  const tokens = JSON.parse(await readFile(`${source}/tokens.json`, 'utf-8'));
  const { ...sets } = tokens;

  const persistSet = async ([setName, setTokens]: [string, unknown]) => {
    console.log(`Generating ${setName} set...`);

    const fileName = `${outputSets}/${setName}.json`;
    const dirName = dirname(fileName);
    try {
      await mkdir(dirName, { recursive: true });
    } catch (e) {
      // do nothing, dir already exists
    }
    await writeFile(fileName, JSON.stringify(setTokens, null, 2), 'utf-8');
  };

  // persist sets as multi file in tokens folder
  await Promise.all(Object.entries(sets).map(persistSet));

  console.log(`Created sets successfully in ${outputSets}!`);
};

const runExecutor: PromiseExecutor<BuildTokensExecutorSchema> = async (
  options: BuildTokensExecutorOptions,
  context: ExecutorContext
) => {
  const { source, outputSets, outputTokens } = options;

  log('context', context);

  try {
    log('Initializing Style Dictionary...');

    log(`Source Folder: ${source}`);
    log(`Sets Directory: ${outputSets}`);
    log(`Output Directory: ${outputTokens}`);

    // create sets

    await createSets(source, outputSets);

    // Generate tokens

    const styleDictionaryConfig = createConfig(
      `${outputSets}/**/*.json`,
      outputTokens
    );
    const sd = new StyleDictionary(styleDictionaryConfig);

    await sd.hasInitialized;

    log('Cleaning all platforms...');
    await sd.cleanAllPlatforms();

    log('Building all platforms...');
    await sd.buildAllPlatforms();

    log('All platforms built successfully!');
  } catch (err) {
    error('An error occurred while running Style Dictionary:');
    error(err);
    process.exit(1);
  }

  return {
    success: true,
  };
};

export default runExecutor;
