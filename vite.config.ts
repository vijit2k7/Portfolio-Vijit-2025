import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxImportSource: 'react'
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react/jsx-runtime": path.resolve("node_modules/react/jsx-runtime.js"),
      "react/jsx-dev-runtime": path.resolve("node_modules/react/jsx-dev-runtime.js")
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime']
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      }
    },
    rollupOptions: {
      output: {
        format: 'esm',
        manualChunks: undefined
      },
      external: []
    }
  },
  define: {
    'global.React': 'React',
    '__DEV__': JSON.stringify(mode === 'development')
  }
}));
