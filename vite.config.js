import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import { federation } from '@module-federation/vite';
// https://vite.dev/config/
export default defineConfig({
    server: {
        origin: 'http://localhost:3000',
        port: 3000,
    },
    plugins: [react(), federation({
            name: 'vite_host',
            manifest: true,
            remotes: {
                esm_remote: {
                    type: "module",
                    name: "vite_remote",
                    entry: "https://[...]/remoteEntry.js",
                },
                var_remote: "var_remote@https://[...]/remoteEntry.js",
            },
            shared: {
                react: {
                    singleton: true,
                },
                'react/': {
                    singleton: true,
                },
            },
        }),],
    base: "./",
    css: {
        postcss: {
            plugins: [tailwind()],
        },
    },
});
