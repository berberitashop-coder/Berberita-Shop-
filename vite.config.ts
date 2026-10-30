import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (!env.VITE_WEB3FORMS_ACCESS_KEY) throw new Error('Missing VITE_WEB3FORMS_ACCESS_KEY. Add it to the project environment before building.');
  return {
    plugins: [react()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    optimizeDeps: { exclude: ['lucide-react'] },
  };
});
