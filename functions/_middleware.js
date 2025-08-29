// Middleware to filter and serve only allowed file types
// Allowed: .md, .html, images (jpg, jpeg, png, gif, svg, webp, ico, avif)
// All other file types will return 404

const ALLOWED_EXTENSIONS = new Set([
  '.html',
  '.htm',
  '.md',
  '.mdx',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.svg',
  '.webp',
  '.ico',
  '.avif',
  '.bmp',
  '.tiff',
  '.tif',
  // Web fonts (usually served with sites)
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.eot',
  // CSS and JS (for the site to function)
  '.css',
  '.js',
  '.mjs',
  '.map',
  // Other web assets
  '.xml', // for sitemap.xml and rss.xml
  '.json', // for manifest.json
  '.webmanifest'
]);

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  
  // Allow root and directory paths (they'll serve index.html)
  if (pathname === '/' || pathname.endsWith('/')) {
    return context.next();
  }
  
  // Check file extension
  const lastDot = pathname.lastIndexOf('.');
  if (lastDot !== -1) {
    const extension = pathname.substring(lastDot).toLowerCase();
    
    // Block non-allowed file types
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      // Check if it's a known document type that should be in R2
      const DOCUMENT_EXTENSIONS = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.rtf', '.odt'];
      if (DOCUMENT_EXTENSIONS.some(ext => extension === ext)) {
        return new Response(
          `This file type (${extension}) will be available through the R2 bucket. Please check back later.`,
          { status: 404, headers: { 'Content-Type': 'text/plain' } }
        );
      }
      
      // Generic 404 for other blocked types
      return new Response('File not found', { status: 404 });
    }
  }
  
  // Allow the request to continue
  return context.next();
}