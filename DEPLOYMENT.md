# Deployment Guide

This portfolio is configured for static export and can be deployed to any static hosting service at zero cost.

## 📦 Build for Production

```bash
npm run build
```

This generates a static export in the `/out` directory.

## ☁️ Deployment Options

### Option 1: AWS S3 + CloudFront (Recommended)

**Step 1: Create S3 Bucket**

```bash
aws s3 mb s3://your-portfolio-bucket --region us-east-1
```

**Step 2: Configure Bucket for Static Website**

```bash
aws s3 website s3://your-portfolio-bucket \
  --index-document index.html \
  --error-document 404.html
```

**Step 3: Upload Build Files**

```bash
aws s3 sync out/ s3://your-portfolio-bucket --delete
```

**Step 4: Create CloudFront Distribution**

```bash
# Create distribution via AWS Console or CLI
# Point origin to S3 bucket
# Enable HTTPS with ACM certificate
# Add custom domain (optional)
```

**Step 5: Set Bucket Policy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-portfolio-bucket/*"
    }
  ]
}
```

**Monthly Cost:** ~$1-5 (with CloudFront free tier)

---

### Option 2: Cloudflare Pages (Easiest)

**Step 1: Connect GitHub Repository**

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click "Create a project"
3. Connect your GitHub account
4. Select your portfolio repository

**Step 2: Configure Build Settings**

- **Framework preset:** Next.js
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Root directory:** `/`

**Step 3: Deploy**

- Click "Save and Deploy"
- Cloudflare will build and deploy automatically
- Get instant HTTPS with custom domain support

**Monthly Cost:** $0 (completely free)

---

### Option 3: GitHub Pages

**Step 1: Enable GitHub Pages**

1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose `gh-pages` branch

**Step 2: Add GitHub Actions Workflow**
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

**Monthly Cost:** $0 (completely free)

---

### Option 4: Netlify

**Step 1: Connect Repository**

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select repository

**Step 2: Configure Build**

- **Build command:** `npm run build`
- **Publish directory:** `out`

**Step 3: Deploy**

- Click "Deploy site"
- Get instant HTTPS and custom domain

**Monthly Cost:** $0 (free tier)

---

## 🚀 Automated CI/CD

### GitHub Actions Example

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [main]

env:
  AWS_REGION: us-east-1
  S3_BUCKET: your-portfolio-bucket
  CLOUDFRONT_ID: YOUR_DISTRIBUTION_ID

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Deploy to S3
        run: |
          aws s3 sync out/ s3://${{ env.S3_BUCKET }} \
            --delete \
            --cache-control max-age=31536000,public

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ env.CLOUDFRONT_ID }} \
            --paths "/*"
```

---

## 🌐 Custom Domain Setup

### Cloudflare

1. Add domain to Cloudflare
2. Update nameservers
3. In Pages project settings, add custom domain
4. DNS records configured automatically

### AWS S3 + CloudFront

1. Request ACM certificate in `us-east-1`
2. Add CNAME to CloudFront distribution
3. Create Route 53 A record (alias to CloudFront)
4. Wait for DNS propagation

---

## 🔧 Environment Variables (If Needed)

For contact form integration or analytics:

```bash
# .env.local (not committed)
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

---

## 📊 Performance Optimization

The portfolio is already optimized for performance:

✅ Static generation (fast loading)  
✅ Minimal JavaScript bundle  
✅ Optimized fonts (Google Fonts with display swap)  
✅ Responsive images  
✅ Tailwind CSS purging  
✅ Framer Motion lazy loading

Expected Lighthouse scores:

- **Performance:** 95-100
- **Accessibility:** 95-100
- **Best Practices:** 95-100
- **SEO:** 95-100

---

## 🔐 Security Headers (CloudFront/Cloudflare)

Add these headers for enhanced security:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 📈 Monitoring

### CloudWatch (AWS)

- S3 bucket metrics
- CloudFront request metrics
- Lambda@Edge logs (if using)

### Cloudflare Analytics

- Built-in analytics dashboard
- Real-time visitor stats
- Performance insights

---

## 🆘 Troubleshooting

**Build fails:**

```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

**404 errors on routes:**

- Ensure `trailingSlash: true` in next.config.js
- Check that all pages export static content

**CSS not loading:**

- Verify Tailwind config paths
- Check PostCSS configuration
- Ensure build completed successfully

---

## 📞 Support

For deployment issues or questions, reach out via the contact form on the portfolio or open an issue on GitHub.
