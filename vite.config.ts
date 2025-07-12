import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { markdownPlugin } from './vite-plugin-markdown'
import viteImagemin from 'vite-plugin-imagemin'
import sitemap from 'vite-plugin-sitemap'
// import { VitePWA } from 'vite-plugin-pwa' // Temporarily disabled

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
    sitemap({ 
      hostname: 'https://gauasharam.org',
      generateRobotsTxt: false
    })
    // VitePWA temporarily disabled due to dependency issues
    // VitePWA({ 
    //   registerType: 'autoUpdate',
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
    //   },
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    //   manifest: {
    //     name: 'Gau Samwardhan Ashram and Jankalyan Sanstha',
    //     short_name: 'Gau Mandir',
    //     description: 'Ecological restoration, indigenous cow conservation, natural healing, and rural empowerment',
    //     theme_color: '#065f46',
    //     background_color: '#ffffff',
    //     display: 'standalone',
    //     icons: [
    //       {
    //         src: 'logo.webp',
    //         sizes: '811x245',
    //         type: 'image/webp'
    //       },
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-512x512.png', 
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ]
    //   }
    // })
  ],
})
