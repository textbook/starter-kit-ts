import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";

const configuration: Configuration = {
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	entry: "./client/src/index.tsx",
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				loader: "ts-loader",
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				loader: "file-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	output: {
		publicPath: "/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./client/src/favicon.ico",
			template: "./client/src/index.html",
		}),
	],
};

export default configuration;
