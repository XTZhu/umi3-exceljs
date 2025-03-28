/* eslint-disable */
import { defineConfig } from 'umi';

import routes from './routes';

// const IS_NEWS_SIDE = true
// @ts-ignore
export default defineConfig({
  mfsu: {},
  sass: {},
  routes,
  chainWebpack(config, { webpack }) {},
});
