import HtmlWebpackTagsPlugin from "html-webpack-tags-plugin";
import path from "path";
import { merge } from "webpack-merge";

import common from "./common.config";
import { devDependencies } from "../../package.json";

export default merge(common, {
	devtool: "source-map",
	mode: "production",
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all",
				},
			},
		},
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "../../dist/static"),
	},
	plugins: [
		new HtmlWebpackTagsPlugin({
			usePublicPath: false,
			scripts: ([
				{ packageName: "react", variableName: "React" },
				{ packageName: "react-dom", variableName: "ReactDOM" },
			] as const).map(({ packageName, variableName }) => ({
				attributes: { crossorigin: "" },
				external: { packageName, variableName },
				path: `https://unpkg.com/${packageName}@${devDependencies[packageName]}/umd/${packageName}.production.min.js`,
			})),
		}),
	],
});
