# DevOps Engineer Portfolio

An interactive, system-oriented portfolio that feels like a real DevOps control center—featuring pipeline-style navigation, animated infrastructure visualizations, and metric-driven storytelling.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Hosting:** AWS S3 / Cloudflare Pages

## 🏗️ Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── init/              # Hero/System Boot
│   ├── build/             # Skills as Infrastructure
│   ├── deploy/            # Experience Timeline
│   ├── run/               # Projects in Production
│   ├── observe/           # Blog/Knowledge
│   └── optimize/          # Contact
├── components/            # Reusable components
│   ├── navigation/        # Pipeline Navigator
│   ├── visualizations/    # Infrastructure Graph, Metrics
│   └── ui/                # Terminal, Cards, Badges
└── public/                # Static assets
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export)
npm run build

# The static site will be in the /out directory
```

## 📦 Deployment

The site is configured for static export and can be hosted on:

- **AWS S3** with CloudFront
- **Cloudflare Pages**
- **GitHub Pages**
- Any static hosting service

## 🎨 Design System

- **Color Palette:** Dark futuristic with neon accents (cyan, blue, green)
- **Typography:** Monospace for terminal-style elements
- **Navigation:** Pipeline-style lifecycle stages (Init → Build → Deploy → Run → Observe → Optimize)
- **Animations:** Smooth transitions, micro-interactions, scroll-driven effects

## 📊 Key Features

- ✅ System boot animation
- ✅ Live metrics counters (cost saved, deployments, uptime)
- ✅ Interactive skill dependency graph
- ✅ CI/CD log-style experience timeline
- ✅ Projects as running services
- ✅ Observability dashboard blog
- ✅ Terminal-style contact form
- ✅ Zero-downtime deployment ready
- ✅ Performance optimized (Lighthouse 90+)
- ✅ Fully responsive & accessible

---

Built with ❤️ by a DevOps Engineer who automates infrastructure and scales reliability.
