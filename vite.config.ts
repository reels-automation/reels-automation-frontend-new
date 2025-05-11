import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
    'import.meta.env': JSON.stringify(process.env)
  },
  server: {
allowedHosts:['aprendiendoconpersonajes.duckdns.org'] ,
          host: '0.0.0.0',  // Esto hace que el servidor esté disponible en todas las interfaces de red
    port: 5173,        // El puerto por defecto, puede cambiarlo si es necesario
    open: true,        // Abre el navegador automáticamente al iniciar
    strictPort: true,  // Si el puerto está en uso, no continuará en otro puerto
  },
})
