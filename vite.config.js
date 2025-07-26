import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cartaAmor/', // Asegúrate de que la base sea correcta para tu despliegue
})
