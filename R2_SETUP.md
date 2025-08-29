# R2 Media Setup Guide

## Configuration

1. **Update the R2 public URL** in `src/consts.ts`:
   ```typescript
   export const R2_PUBLIC_URL = "https://YOUR-ACTUAL-URL.r2.dev";
   ```

   To find your R2 public URL:
   - Go to Cloudflare Dashboard → R2 → Your bucket (briefer-media)
   - Click "Settings" tab
   - Look for "Public URL" or "R2.dev subdomain"
   - It will be something like: `https://pub-abc123def456.r2.dev`

## File Organization in R2

Recommended structure in your R2 bucket:
```
briefer-media/
├── LAW20009/
│   ├── Week7/
│   │   ├── Hearsay_Unpacked.m4a
│   │   ├── The_Hearsay_Hurdle.mp4
│   │   └── Section_59_Flowchart.png
│   ├── Week8/
│   │   └── ...
│   └── Cases/
│       └── important_cases.pdf
└── LAW10013/
    └── ...
```

## Embedding Media in Markdown

### Method 1: Direct HTML (Works in any markdown file)

```markdown
<!-- Audio -->
<audio controls style="width: 100%;">
  <source src="https://YOUR-R2-URL/LAW20009/Week7/Hearsay_Unpacked.m4a" type="audio/mp4">
  <a href="https://YOUR-R2-URL/LAW20009/Week7/Hearsay_Unpacked.m4a">Download audio</a>
</audio>

<!-- Video -->
<video controls style="width: 100%; max-width: 800px;">
  <source src="https://YOUR-R2-URL/LAW20009/Week7/The_Hearsay_Hurdle.mp4" type="video/mp4">
  <a href="https://YOUR-R2-URL/LAW20009/Week7/The_Hearsay_Hurdle.mp4">Download video</a>
</video>

<!-- Image -->
![Hearsay Flowchart](https://YOUR-R2-URL/LAW20009/Week7/Section_59_Flowchart.png)

<!-- PDF Link -->
[Download Case Study (PDF)](https://YOUR-R2-URL/LAW20009/Cases/case_study.pdf)
```

### Method 2: Using MediaEmbed Component (in .astro or .mdx files)

```astro
---
import MediaEmbed from '../../../components/MediaEmbed.astro';
---

<MediaEmbed 
  src="https://YOUR-R2-URL/LAW20009/Week7/Hearsay_Unpacked.m4a"
  type="audio"
  title="Hearsay Unpacked Podcast"
  description="A comprehensive discussion on hearsay evidence and exceptions"
/>
```

## Uploading Files to R2

### Via Cloudflare Dashboard
1. Go to R2 → briefer-media bucket
2. Click "Upload" 
3. Create folders as needed
4. Upload files

### Via Wrangler CLI
```bash
# Install wrangler if not already installed
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Upload a single file
wrangler r2 object put briefer-media/LAW20009/Week7/video.mp4 --file ./video.mp4

# Upload with public access
wrangler r2 object put briefer-media/LAW20009/Week7/video.mp4 --file ./video.mp4 --cache-control "public, max-age=31536000"
```

## CORS Configuration (if needed)

If you encounter CORS issues, configure your R2 bucket:

1. Go to R2 → briefer-media → Settings
2. Add CORS policy:
```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com", "http://localhost:3000"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

## Cost Optimization

- R2 charges for storage and operations, but not bandwidth
- Use appropriate cache headers for static content
- Consider compressing audio/video files before upload
- Use modern formats (WebM for video, WebP for images) when possible

## Testing

After setup, test your media embeds:
```bash
npm run dev
# Navigate to http://localhost:4321/uni/LAW20009%20(Evidence)/Week%207/
```

## Troubleshooting

1. **Media not loading**: Check R2 public access is enabled
2. **CORS errors**: Configure CORS policy in R2 settings
3. **Slow loading**: Consider using Cloudflare CDN in front of R2
4. **404 errors**: Verify file paths match exactly (case-sensitive)