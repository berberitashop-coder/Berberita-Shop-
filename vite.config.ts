import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const web3FormsKey = env.VITE_WEB3FORMS_ACCESS_KEY || env.API_KEY;
  if (!web3FormsKey) throw new Error('Missing VITE_WEB3FORMS_ACCESS_KEY (or legacy API_KEY). Add the Web3Forms key before building.');
  return {
    plugins: [react()],
    envPrefix: ['VITE_', 'API_KEY'],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    optimizeDeps: { exclude: ['lucide-react'] },
  };
});
