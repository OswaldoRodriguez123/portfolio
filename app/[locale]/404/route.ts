// Internal target used by the proxy to serve the 404 page for unknown
// case-study slugs. Under Cache Components a request-time notFound() inside
// a page streams after the (already 200) shell, and a static page calling
// notFound() yields an empty shell without JS. A Route Handler can return
// a self-contained 404 response instead. See "Status codes" in the loading
// file-convention docs. This is intentionally static and dependency-free.

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>404 — Page not found</title>
    <style>
      :root { color-scheme: light dark; }
      body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
             font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
             background: #fafaf9; color: #1c1917; }
      @media (prefers-color-scheme: dark) { body { background: #1c1917; color: #fafaf9; } }
      main { max-width: 34rem; padding: 2rem; }
      p.code { font-size: 3.5rem; font-weight: 600; letter-spacing: -0.05em; margin: 0; color: #78716c; }
      h1 { font-size: 1.5rem; letter-spacing: -0.02em; margin: 0.5rem 0 1rem; }
      p { color: #57534e; line-height: 1.6; }
      @media (prefers-color-scheme: dark) { p { color: #d6d3d1; } }
      a { display: inline-block; margin-top: 1rem; padding: 0.625rem 1.25rem; border-radius: 0.5rem;
          background: #1c1917; color: #fafaf9; text-decoration: none; font-weight: 500; }
      @media (prefers-color-scheme: dark) { a { background: #fafaf9; color: #1c1917; } }
      a:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
    </style>
  </head>
  <body>
    <main>
      <p class="code">404</p>
      <h1>Page not found · Página no encontrada</h1>
      <p>The page you are looking for does not exist. La página que buscas no existe.</p>
      <a href="/en">Back to home · Volver al inicio</a>
    </main>
  </body>
</html>`;

export function GET() {
  return new Response(html, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
