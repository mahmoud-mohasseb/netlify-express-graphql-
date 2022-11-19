const path = require('path')

module.exports = {
  entry: path.resolve('./src/App.js'),
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
    },
    mode: "production",
    module: {
        rules: [
          {
            test: /\.(jsx|js)$/,
            // include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules|bower_components)/,
            use: [{
              loader: 'babel-loader',
              options: {
                presets: [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3, "targets": "defaults" }], "@babel/preset-react"]
              }
            }]
          }
        ]
      }
}