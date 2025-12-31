# DevOps Portfolio - Fully Customizable

A modern, futuristic DevOps portfolio built with Next.js 14, TypeScript, and Framer Motion. Features a centralized data configuration system for easy customization.

## ✨ Features

### 🎨 Design

- Futuristic dark theme with neon accents
- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Terminal-inspired UI elements

### ⌨️ Navigation

- **Vim-style keyboard shortcuts**: `j/k/h/l`, `gg/G` for navigation
- **Arrow keys**: Navigate between sections
- **Number keys**: `1-5` for direct section access
- **`?` key**: Show keyboard shortcuts modal

### 🎯 Sections

1. **Init** (`/`): Home page with animated roles, live time, interactive terminal
2. **Build** (`/build`): Technical skills and certifications
3. **Deploy** (`/deploy`): Work experience as CI/CD timeline
4. **Run** (`/run`): Portfolio projects
5. **Optimize** (`/optimize`): Contact form and services

### 🔧 Customization

- **Single data file**: All content in `data/resume.ts`
- **TypeScript interfaces**: Type-safe data structure
- **No component editing**: Update content without touching code
- **Documentation**: Full guide in `CUSTOMIZATION.md`

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd portfolio
npm install
```

### 2. Customize Your Content

Edit `data/resume.ts` with your information:

```typescript
export const resumeData = {
  personal: {
    name: 'Your Name',
    email: 'your.email@example.com',
    // ... more fields
  },
  experiences: [
    /* your work history */
  ],
  projects: [
    /* your projects */
  ],
  skills: [
    /* your skills */
  ],
  // ... more sections
};
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page (Init)
│   ├── build/               # Skills section
│   ├── deploy/              # Experience section
│   ├── run/                 # Projects section
│   └── optimize/            # Contact section
├── components/
│   ├── navigation/          # Navigation components
│   │   ├── PipelineNavigator.tsx
│   │   └── ScrollController.tsx
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── SkillsInfrastructure.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── ProjectsInProduction.tsx
│   │   └── ContactOptimization.tsx
│   └── ui/                  # Reusable UI components
│       ├── KeyboardHints.tsx
│       └── TerminalLogger.tsx
├── data/
│   └── resume.ts            # 📝 CUSTOMIZE THIS FILE
├── public/                  # Static assets
├── CUSTOMIZATION.md         # Customization guide
└── README.md               # This file
```

## 🎨 Customization Guide

### Personal Information

```typescript
personal: {
  name: "Dhan Bahadur Karki",
  email: "dhanbdr.work@gmail.com",
  location: "Kathmandu, Nepal",
  timezone: "Asia/Kathmandu",
  roles: ["DevOps Engineer", "Cloud Architect", "SRE"],
  // ... social links, stats
}
```

### Work Experience

```typescript
experiences: [
  {
    id: 'exp-1',
    role: 'DevOps Engineer',
    company: 'Progressive Labs',
    period: 'May 2025 - Present',
    type: 'optimization', // feature, optimization, migration, security
    achievements: [
      {
        text: 'Reduced costs by 50%',
        metric: '50% cost ↓',
        icon: TrendingDown,
      },
    ],
  },
];
```

### Projects

```typescript
projects: [
  {
    id: 'proj-1',
    name: 'ECS CI/CD Pipeline',
    description: 'Complete CI/CD pipeline using AWS',
    status: 'running', // running, deployed, staging
    techStack: ['AWS', 'Terraform', 'Docker'],
    github: 'https://github.com/username/repo',
  },
];
```

### Skills

```typescript
skills: [
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'cloud', // cloud, container, cicd, iac, observability, security
    icon: Cloud,
    tools: ['EC2', 'S3', 'Lambda'],
    level: 85, // 0-100
  },
];
```

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for complete documentation.

## ⌨️ Keyboard Shortcuts

| Key       | Action                   |
| --------- | ------------------------ |
| `j` / `↓` | Next section             |
| `k` / `↑` | Previous section         |
| `h` / `←` | First section (home)     |
| `l` / `→` | Last section (contact)   |
| `gg`      | Jump to first section    |
| `G`       | Jump to last section     |
| `1-5`     | Jump to specific section |
| `?`       | Show keyboard shortcuts  |

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.35 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel / Static Export

## 📦 Build & Deploy

### Static Export (Recommended)

```bash
npm run build
npm run export
```

The `out/` directory contains static files ready for deployment.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

Drag and drop the `out/` folder to Netlify.

## 🎯 Development

### Run Development Server

```bash
npm run dev
```

### Check TypeScript

```bash
npm run type-check
```

### Build for Production

```bash
npm run build
```

### Lint Code

```bash
npm run lint
```

## 📝 Customization Checklist

- [ ] Update `data/resume.ts` with your information
- [ ] Replace `public/resume.pdf` with your resume
- [ ] Update `app/layout.tsx` metadata (title, description)
- [ ] Add your own favicon/logo if desired
- [ ] Test all keyboard navigation
- [ ] Check responsiveness on mobile
- [ ] Verify all links work
- [ ] Test contact form (if using)
- [ ] Review and update `CUSTOMIZATION.md` if needed

## 🐛 Troubleshooting

### TypeScript Errors

- Ensure all required fields in `data/resume.ts` are filled
- Check that all imported icons are used
- Run `npm run build` to see detailed errors

### Icons Not Showing

- Import icons at the top of `data/resume.ts`
- Check icon name matches Lucide React library

### Keyboard Navigation Not Working

- Check console for errors
- Ensure ScrollController is mounted
- Try refreshing the page

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support:

- Email: dhanbdr.work@gmail.com
- LinkedIn: [linkedin.com/in/dhanbdrkarki](https://linkedin.com/in/dhanbdrkarki)
- GitHub: [@dhanbdrkarki1](https://github.com/dhanbdrkarki1)

---

Built with ❤️ by Dhan Bahadur Karki
