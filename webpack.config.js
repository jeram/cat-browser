const path = require("path");

module.exports = {
    mode: "development",
    context: path.join(__dirname, "src"),
    entry: ["./main.js"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
        },
        { test: /\.css$/, use: [ 'css-loader' ] }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
};
