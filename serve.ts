// Static file server for audio.dalat.dev
// Run: bun run serve.ts

const server = Bun.serve({
  port: 4510,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = Bun.file(`${import.meta.dir}${path}`);
    if (await file.exists()) {
      return new Response(file);
    }
    // Fallback to index.html for SPA-like behavior
    return new Response(Bun.file(`${import.meta.dir}/index.html`));
  },
});

console.log(`Audio cheatsheet serving on http://localhost:${server.port}`);
