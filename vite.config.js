// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// replace 'your-username' and 'your-repo-name' with your actual GitHub username and repository name
export default defineConfig({
  plugins: [react()],
  base: '/password-generator',  // Required for GitHub Pages
});
