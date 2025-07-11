import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { markdownPlugin } from './vite-plugin-markdown'
import viteImagemin from 'vite-plugin-imagemin'
import sitemap from 'vite-plugin-sitemap'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    markdownPlugin(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    sitemap({ hostname: 'https://gauasharam.org' }),
    VitePWA({ registerType: 'autoUpdate' })
  ],
})
