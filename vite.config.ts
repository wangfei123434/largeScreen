import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"; //单文件
import vueJsx from '@vitejs/plugin-vue-jsx'; //jsx
import styleImport from 'vite-plugin-style-import'; //按需引入css
import eslintPlugin from "vite-plugin-eslint";  //eslint
import viteCompression from 'vite-plugin-compression'; // gzip
import legacy from "@vitejs/plugin-legacy"; // module 兼容性
import viteWebp from 'vite-plugin-vue-webp'; //自动引入webp
import path from "path";
import { svgBuilder } from './src/plugins/svgBuilder.js';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({}),
    viteWebp({
      dirs: ['public/images'],
      extensions: ['jpg', 'jpeg', 'png', 'svg'],
      customResolvers: [],
      customSearchRegex: '([A-Z][a-zA-Z0-9]+)',
    }),
    svgBuilder('./src/assets/icons/svg/'),
    legacy({
      targets: ['defaults'],
      polyfills: ['es/'],
      modernPolyfills: ['es/'],
    }),
    viteCompression({
      filter: /\.(js|mjs|json|css|html|png|jpg|otf|ttf)$/i,
      threshold: 10240,
    }),
    // viteCompression({
    //   filter: /\.(js|mjs|json|css|html|otf|ttf)$/i,
    //   threshold: 10240,
    //   algorithm: 'brotliCompress',
    //   ext: '.br'
    // }),
    // styleImport({
    //   libs: [{
    //     libraryName: 'element-plus',
    //     esModule: true,
    //     ensureStyleFile: true,
    //     resolveStyle: (name) => {
    //       name = name.slice(3)
    //       return `element-plus/packages/theme-chalk/src/${name}.scss`;
    //     },
    //     resolveComponent: (name) => {
    //       return `element-plus/lib/${name}`;
    //     },
    //   }]
    // }),
    // eslintPlugin({
    //   cache: true,
    //   fix: true,
    //   include: ["./src/*.ts", "./src/**/*.ts", "./src/*.vue", "./src/**/*.vue"],
    // }),
  ],
  base: '/',
  build: {
    outDir: 'talent-data-web',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          app: ['vue', 'vue-router', 'qs', 'axios', 'vuex'],
          echarts: ['echarts', 'vue-echarts', 'echarts-gl'],
          // antv: ['@antv/x6','@antv/g6'],
          // antv: ['@antv/x6'],
          element: ['element-plus'],
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/style/global';\n`, //你的scss文件路径
      },
    },
  },
  resolve: {
    alias: [{ find: "/@", replacement: path.resolve(__dirname, "src") }],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    port: 9999,
    proxy: {
      //远程环境
      // "/renshedata": {
      //   // target: "http://172.16.20.130:8090",
      //   changeOrigin: true,
      // },
      "/renshedata": {
        target: "http://10.9.136.76:8091",
        changeOrigin: true,
      },
    },
  },
});
