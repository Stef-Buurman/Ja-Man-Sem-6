import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [plugin(),svgr()],
    server: {
        port: 53798,
    }
})