const webpack = require('webpack');

module.exports = {
  // ...existing configuration...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
    }),
  ],
};
