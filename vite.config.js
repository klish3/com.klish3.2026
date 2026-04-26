import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
function mdConverterPlugin() {
    return {
        name: 'md-converter',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (req.url === '/api/convert-md' && req.method === 'POST') {
                    let body = '';
                    req.on('data', (chunk) => body += chunk);
                    req.on('end', () => {
                        try {
                            const { data, content } = matter(body);
                            const title = data.title || "Untitled";
                            const slug = data.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            const safeComponentName = title.replace(/[^a-zA-Z0-9]/g, '');
                            // Basic MD to JSX conversion
                            let jsxContent = content
                                .replace(/```[\s\S]*?```/g, (match) => {
                                return `<pre><code>{${JSON.stringify(match.replace(/```[a-z]*\n|```/g, ''))}}</code></pre>`;
                            })
                                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                                .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                                .replace(/\*(.*?)\*/gim, '<em>$1</em>')
                                .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
                                .replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>')
                                .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
                                .split('\n\n')
                                .map(p => p.trim())
                                .filter(p => p)
                                .map(p => (p.startsWith('<') ? p : `<p>${p}</p>`))
                                .join('\n');
                            const tsxCode = `export const meta = ${JSON.stringify({ ...data, slug }, null, 2)};

export default function ${safeComponentName}() {
  return (
    <>
      ${jsxContent}
    </>
  );
}
`;
                            const outPath = path.join(process.cwd(), 'src/pages/Scribbles/posts', `${slug}.tsx`);
                            fs.writeFileSync(outPath, tsxCode);
                            res.statusCode = 200;
                            res.end(JSON.stringify({ success: true, path: outPath, slug }));
                        }
                        catch (err) {
                            const errorMessage = err instanceof Error ? err.message : String(err);
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: errorMessage }));
                        }
                    });
                }
                else {
                    next();
                }
            });
        }
    };
}
// https://vite.dev/config/
export default defineConfig({
    server: {
        origin: 'http://localhost:3000',
        port: 3000,
    },
    plugins: [react(), mdConverterPlugin()],
    base: "",
    build: {
        target: ['es2022', 'chrome89', 'edge89', 'firefox89', 'safari15'],
        assetsDir: 'assets',
    },
    css: {
        postcss: {
            plugins: [tailwind()],
        },
    },
});
