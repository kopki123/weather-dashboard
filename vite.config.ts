import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  console.table({ mode, command });

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      host: true,
    }
  };
});