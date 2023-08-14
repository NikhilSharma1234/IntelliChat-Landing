import { defineConfig, loadEnv } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default (({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  console.log(env)
  return defineConfig({
  define: {
    'process.env.VITE_USER_POOL_ID': JSON.stringify(env.VITE_USER_POOL_ID),
    'process.env.VITE_POOL_WEB_CLIENT_ID': JSON.stringify(env.VITE_POOL_WEB_CLIENT_ID),
    'process.env.VITE_CHROME_EXTENSION_ID': JSON.stringify(env.VITE_CHROME_EXTENSION_ID),
    global: {},
  },
  css: {
    postcss,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
})
