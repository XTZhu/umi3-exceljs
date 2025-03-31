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
    config.module
      .rule('worker')
      .test(/\.worker\.(js|ts)$/)
      .use('worker-loader')
      .loader('worker-loader');
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
});
