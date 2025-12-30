# Quick Start Guide

Get your DevOps portfolio running in 5 minutes!

## ⚡ Fast Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Customize Your Content

Update these key files with your information:

#### Personal Info

- **Contact Details:** [components/sections/ContactOptimization.tsx](components/sections/ContactOptimization.tsx) (lines 235-280)
- **Bio & Headline:** [components/sections/Hero.tsx](components/sections/Hero.tsx) (lines 52-64)
- **Metadata:** [app/layout.tsx](app/layout.tsx) (lines 17-30)

#### Professional Content

- **Skills:** [components/sections/SkillsInfrastructure.tsx](components/sections/SkillsInfrastructure.tsx) (lines 19-100)
- **Experience:** [components/sections/ExperienceTimeline.tsx](components/sections/ExperienceTimeline.tsx) (lines 18-100)
- **Projects:** [components/sections/ProjectsInProduction.tsx](components/sections/ProjectsInProduction.tsx) (lines 14-80)
- **Articles:** [components/sections/ObservabilityDashboard.tsx](components/sections/ObservabilityDashboard.tsx) (lines 14-80)

### 4. Build for Production

```bash
npm run build
```

Static files will be generated in the `/out` directory.

### 5. Deploy

Choose your hosting:

**Cloudflare Pages (Easiest):**

1. Push to GitHub
2. Connect at [pages.cloudflare.com](https://pages.cloudflare.com)
3. Build command: `npm run build`
4. Output directory: `out`

**AWS S3:**

```bash
aws s3 sync out/ s3://your-bucket --delete
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guides.

---

## 🎨 Quick Customization

### Change Colors

Edit [tailwind.config.js](tailwind.config.js):

```js
colors: {
  'neon-cyan': '#YOUR_COLOR',
  'neon-blue': '#YOUR_COLOR',
  // ... more colors
}
```

### Change Fonts

Edit [app/globals.css](app/globals.css) line 1:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;700&display=swap');
```

### Update Metrics (Hero Page)

Edit [components/sections/Hero.tsx](components/sections/Hero.tsx):

```tsx
<MetricCounter value={60} suffix="%" label="Your Metric" />
```

---

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page (Init/Hero)
│   ├── build/             # Skills page
│   ├── deploy/            # Experience page
│   ├── run/               # Projects page
│   ├── observe/           # Blog page
│   └── optimize/          # Contact page
│
├── components/
│   ├── navigation/        # Pipeline navigator
│   ├── sections/          # Main page sections
│   │   ├── Hero.tsx
│   │   ├── SkillsInfrastructure.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── ProjectsInProduction.tsx
│   │   ├── ObservabilityDashboard.tsx
│   │   └── ContactOptimization.tsx
│   └── ui/                # Reusable UI components
│       ├── MetricCounter.tsx
│       └── TerminalLogger.tsx
│
├── public/                # Static assets
│   └── (add images, resume.pdf, etc.)
│
├── tailwind.config.js     # Tailwind CSS config
├── next.config.js         # Next.js config (static export)
└── tsconfig.json          # TypeScript config
```

---

## 🚀 Features Overview

### Navigation

- **Pipeline-style navbar** with lifecycle stages
- **Auto-highlight** active section
- **Mobile responsive** dropdown

### Pages

#### 1. Init (Home)

- System boot animation
- Live metrics counters
- Call-to-action buttons
- System status indicators

#### 2. Build (Skills)

- Interactive skill cards
- Tech stack categories
- Skill level indicators
- Dependency highlighting

#### 3. Deploy (Experience)

- Git commit-style timeline
- Achievement metrics
- Tech stack badges
- Terminal log view

#### 4. Run (Projects)

- Project cards as running services
- Architecture descriptions
- Live metrics
- GitHub/demo links

#### 5. Observe (Blog)

- Dashboard-style articles
- Category filters
- Read time estimates
- Performance metrics

#### 6. Optimize (Contact)

- Terminal-style form
- Deployment animation
- Social links
- Services offered

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

---

## 💡 Tips

### Performance

- All pages are statically generated
- Images should be optimized (use WebP)
- Keep bundle size minimal

### SEO

- Update metadata in each page file
- Add `robots.txt` in `public/`
- Submit sitemap after deployment

### Accessibility

- All interactive elements are keyboard accessible
- Color contrast meets WCAG standards
- Screen reader friendly

---

## 🐛 Common Issues

**Port already in use:**

```bash
# Use different port
npm run dev -- -p 3001
```

**Build errors:**

```bash
# Clear cache
rm -rf .next out node_modules
npm install
npm run build
```

**TypeScript errors:**

```bash
# Strict checking can be disabled in tsconfig.json
"strict": false
```

---

## 📚 Learn More

- **Customization:** See [CUSTOMIZATION.md](CUSTOMIZATION.md)
- **Deployment:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Project Info:** See [README.md](README.md)

---

## ✅ Checklist

Before deploying, make sure you've:

- [ ] Updated all personal information
- [ ] Added your skills and technologies
- [ ] Listed your work experience
- [ ] Included your projects
- [ ] Updated contact links (email, LinkedIn, GitHub)
- [ ] Added your resume PDF to `public/`
- [ ] Customized colors/fonts (optional)
- [ ] Tested on mobile devices
- [ ] Built successfully (`npm run build`)
- [ ] Chosen a hosting platform

---

**You're ready to deploy!** 🎉

Choose your hosting platform from [DEPLOYMENT.md](DEPLOYMENT.md) and go live with your DevOps portfolio.
