// import micromatch from 'micromatch'

export default {
  '**/*.(jsx|tsx|ts|js|mjs|cjs|svelte)': {
    title: 'Format/Lint TS/React/Svelte',
    task: async (/** @type {string[]} */ files) => [
      `prettier --write ${files.join(' ')}`,
      `eslint --fix ${files.join(' ')}`,
    ],
  },
  '**/*.(html|css|json|yaml|yml)': {
    title: 'Format HTML/CSS/JSON/YML',
    task: async (/** @type {string[]} */ files) => [
      `prettier --write ${files.join(' ')} !package.json`,
    ],
  },
  // '**/*.nix': ['nixfmt --version && nixfmt'],
}

// export default allStagedFiles => {
//   const eslintFiles = micromatch(allStagedFiles, [
//     '**/*.js',
//     '**/*.ts',
//     '**/*.jsx',
//     '**/*.tsx',
//     '**/*.svelte',
//   ])
//   const prettierFiles = micromatch(allStagedFiles, [
//     '**/*.html',
//     '**/*.css',
//     '**/*.yaml',
//     '**/*.yml',
//     '**/*.md',
//   ])
//   return [
//     `prettier --write ${[...prettierFiles, ...eslintFiles].join(' ')}`,
//     `eslint --fix ${eslintFiles.join(' ')}`,
//   ]
// }
