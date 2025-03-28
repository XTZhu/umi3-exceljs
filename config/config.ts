/* eslint-disable */
import { defineConfig } from 'umi';

import routes from './routes';

// const IS_NEWS_SIDE = true
// @ts-ignore
export default defineConfig({
  mfsu: {},
  sass: {},
  routes,
  chainWebpack(config) {
    // config.merge({
    //   module: {
    //     rules: [
    //       {
    //         test: /\.worker\.js$/,
    //         include: [/src\/worker/], // 仅匹配 src/worker 目录下的文件
    //         use: [
    //           {
    //             loader: 'worker-loader',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // });
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
});
