module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    [
      'module-resolver',
      {
        alias: {
          src: './src'
        }
      }
    ]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel']
    }
  }
}
