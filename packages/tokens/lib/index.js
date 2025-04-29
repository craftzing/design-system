import StyleDictionary from 'style-dictionary';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname } from 'node:path/posix';
// import logo from './misc/logo.js';

const { log, error } = console;

/**
 * Extract CLI arguments for sourceFolder and output.
 * @returns {{ sourceFolder: string, output: string }}
 */
const getCliArgs = () => {
  const args = process.argv.slice(2);
  const sourceFolderArg = args.find((arg) => arg.startsWith('--sourceFolder='));
  const outputArg = args.find((arg) => arg.startsWith('--output='));

  if (!sourceFolderArg || !outputArg) {
    throw new Error('Missing required arguments: --sourceFolder and --output');
  }

  const sourceFolder = sourceFolderArg.split('=')[1];
  const output = outputArg.split('=')[1];

  return { sourceFolder, output };
};

/**
 * Function to create Style Dictionary configuration dynamically.
 * @param {string} source - The source file path.
 * @param {string} outputDir - The output directory path.
 * @returns {import('style-dictionary').Config}
 */
const createConfig = (source, outputDir) => ({
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
const createSets = async(sourceFolder) => {
  const tokens = JSON.parse(await readFile(`${sourceFolder}/tokens.json`, 'utf-8'));
  const { ...sets } = tokens;

  const persistSet = async ([setName, setTokens]) => {
    console.log(`Generating ${setName} set...`);

    const fileName = `${sourceFolder}/sets/${setName}.json`;
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

  console.log(`Created sets successfully in ${sourceFolder}/sets!`);
}

/**
 * @async
 * @returns {Promise<void>}
 */
const init = async () => {
  try {
    // log(logo);
    log('Initializing Style Dictionary...');

    const { sourceFolder, output } = getCliArgs();

    log(`Source Folder: ${sourceFolder}`);
    log(`Tokens File: ${sourceFolder}/tokens.json`);
    log(`Sets Directory: ${sourceFolder}/sets`);
    log(`Output Directory: ${output}`);

    // create sets

    await createSets(sourceFolder);

    // Generate tokens

    const styleDictionaryConfig = createConfig(`${sourceFolder}/sets/**/*.json`, output);
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
};

init();