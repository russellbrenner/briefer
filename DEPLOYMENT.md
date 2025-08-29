# Deployment Setup

This project is configured for automatic deployment to Cloudflare Workers via GitHub Actions.

## File Type Filtering

The deployment is configured to only serve the following file types:
- **Content**: `.md`, `.mdx`, `.html`, `.htm`
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`, `.ico`, `.avif`, `.bmp`, `.tiff`, `.tif`
- **Web Assets**: `.css`, `.js`, `.mjs`, `.map`, `.xml`, `.json`, `.webmanifest`
- **Fonts**: `.woff`, `.woff2`, `.ttf`, `.otf`, `.eot`

All other file types (PDFs, documents, etc.) will be filtered out during build and should be served from R2 bucket (configured separately).

## Cloudflare Setup

### 1. Create KV Namespace
The Cloudflare adapter requires a KV namespace for sessions:

```bash
wrangler kv:namespace create "SESSION"
```

Then update the `wrangler.toml` file with the returned KV namespace ID.

### 2. GitHub Secrets Required

Before deployment will work, you need to add the following secrets to your GitHub repository:

1. **CLOUDFLARE_API_TOKEN**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Create a new API token with "Edit Cloudflare Workers" permissions
   - Add this token to GitHub Secrets

2. **CLOUDFLARE_ACCOUNT_ID**
   - Find your Account ID in the Cloudflare Dashboard sidebar
   - Add this ID to GitHub Secrets

### Adding Secrets to GitHub

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with the exact names above

## Deployment Process

### Automatic Deployment
- Every push to the `main` branch triggers automatic deployment
- The workflow builds the Astro site and deploys to Cloudflare Workers

### Manual Deployment
You can also trigger deployment manually:
1. Go to Actions tab in your GitHub repository
2. Select "Deploy to Cloudflare Workers" workflow
3. Click "Run workflow"

### Local Deployment
For testing deployment locally:
```bash
npm run deploy:local
```

## R2 Bucket Configuration (Future)

The project is prepared for R2 bucket integration to host PDFs and other document files:

1. Create an R2 bucket named `briefer-media` in your Cloudflare account
2. Update the `wrangler.toml` file with your R2 bucket details
3. The middleware will automatically handle routing to R2 for non-web files

## Build Scripts

- `npm run build` - Builds the site and removes non-allowed files
- `npm run build:raw` - Builds the site without filtering (for debugging)
- `npm run deploy` - Builds and deploys to Cloudflare Workers
- `npm run deploy:local` - Builds and deploys using local wrangler

## Troubleshooting

### Deployment Fails
- Check that GitHub Secrets are properly configured
- Verify Cloudflare API token has correct permissions
- Check GitHub Actions logs for specific errors

### Files Not Being Served
- Verify file extension is in the allowed list
- Check the middleware configuration in `functions/_middleware.js`
- PDFs and documents will show a message about R2 availability

### Build Issues
- Run `npm run build:raw` to see if the issue is with filtering
- Check `scripts/post-build.mjs` for file filtering logic