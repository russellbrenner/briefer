import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
    } catch (e) {
      // For 404s, try to return 404.html
      if (e.status === 404) {
        try {
          const notFoundResponse = await getAssetFromKV(
            {
              request: new Request(new URL('/404.html', request.url)),
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: assetManifest,
            }
          );
          return new Response(notFoundResponse.body, {
            ...notFoundResponse,
            status: 404,
          });
        } catch {
          return new Response('Not Found', { status: 404 });
        }
      }
      
      // For other errors, return 500
      return new Response('Internal Server Error: ' + e.message, { status: 500 });
    }
  },
};