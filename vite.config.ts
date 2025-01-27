import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    proxy: {
      //使用vite配置对编辑图片时进行跨域
      '/api': 'http://localhost:8123',
      'yuntuku':{
        target: 'https://zhinengyuntuku.oss-cn-shenzhen.aliyuncs.com',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
