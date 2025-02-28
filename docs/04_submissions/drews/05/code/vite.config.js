import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    // Increase the chunk size warning limit to 1000 KB (or any value you prefer)
    chunkSizeWarningLimit: 1000, // Optional: You can adjust this value

    rollupOptions: {
      output: {
        // Manual code splitting to create separate chunks for vendor dependencies
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Creates a separate 'vendor' chunk for node_modules
          }
        },
      },
    },
  },
})
