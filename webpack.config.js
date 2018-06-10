//Konfiguracja Webpack

var path = require("path");
module.exports = {
    entry:"./js/app.jsx",
    output: {
      filename: "out.js",
      path: path.resolve(__dirname, 'js')
    },
    mode: "development",
    watch: true,
    watchOptions: { poll: true },
    devtool: '#eval-source-map',
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "stage-2", "react"]
                }
            }
        },
                {
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
          }]
    }
};
