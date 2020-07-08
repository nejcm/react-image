module.exports = {
  '*.js': [
    'eslint',
    'jest --findRelatedTests --collectCoverage=0 --config=packages/react-image/jest.config.js',
  ],
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': [
    'prettier --write',
  ],
};
