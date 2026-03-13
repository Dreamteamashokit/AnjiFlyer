// vite.config.js — Vite build config with PWA support
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // PWA: makes the site installable on phones & desktops like a native app
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Holcomb Wood's Neighborhood Shine",
        short_name: 'NeighborhoodShine',
        description: 'Local kids offering window, car, and garbage can cleaning.',
        theme_color: '#0abde3',
        background_color: '#f0fbff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
