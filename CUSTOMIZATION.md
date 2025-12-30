# Customization Guide

This guide helps you customize the portfolio with your own information and branding.

## 📝 Personal Information

### 1. Update Contact Details

**File:** [components/sections/ContactOptimization.tsx](components/sections/ContactOptimization.tsx)

```tsx
// Line 235-280: Update these links
<a href="mailto:YOUR_EMAIL@example.com">
<a href="https://linkedin.com/in/YOUR_PROFILE">
<a href="https://github.com/YOUR_USERNAME">
```

### 2. Update Metadata

**File:** [app/layout.tsx](app/layout.tsx)

```tsx
// Line 17-30: Update SEO metadata
export const metadata: Metadata = {
  title: 'Your Name | DevOps Engineer Portfolio',
  description: 'Your custom description',
  authors: [{ name: 'Your Name' }],
  // ... update other fields
};
```

### 3. Update Hero Section

**File:** [components/sections/Hero.tsx](components/sections/Hero.tsx)

```tsx
// Line 52-58: Update headline
<h1>
  <span className="glow-text">Your</span>
  <span className="text-gray-100">Custom</span>
  <span className="glow-text">Tagline</span>
</h1>

// Line 60-64: Update description
<p>Your custom bio and expertise</p>
```

## 🎨 Design Customization

### 1. Colors

**File:** [tailwind.config.js](tailwind.config.js)

```js
// Line 11-24: Update color palette
colors: {
  'devops-bg': '#0a0e27',        // Background
  'devops-surface': '#111827',    // Cards
  'devops-border': '#1f2937',     // Borders

  'neon-cyan': '#00f5ff',         // Primary accent
  'neon-blue': '#0ea5e9',         // Secondary accent
  'neon-green': '#10b981',        // Success
  'neon-purple': '#a855f7',       // Tertiary
}
```

### 2. Fonts

**File:** [app/globals.css](app/globals.css)

```css
/* Line 1: Update Google Fonts URL */
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;700&display=swap');

/* Line 4-5: Update font variables */
--font-sans: 'YourFont', system-ui, sans-serif;
--font-mono: 'YourMonoFont', 'Consolas', monospace;
```

### 3. Animations

**File:** [tailwind.config.js](tailwind.config.js)

```js
// Line 33-38: Adjust animation speeds
animation: {
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
  'scan': 'scan 8s linear infinite',
}
```

## 📊 Content Updates

### 1. Skills & Technologies

**File:** [components/sections/SkillsInfrastructure.tsx](components/sections/SkillsInfrastructure.tsx)

```tsx
// Line 19-100: Update skills array
const skills: Skill[] = [
  {
    id: 'your-skill',
    name: 'Your Technology',
    category: 'cloud', // or container, cicd, iac, observability, security
    icon: YourIcon, // from lucide-react
    tools: ['Tool1', 'Tool2', 'Tool3'],
    impact: 'Your impact statement',
    level: 95, // 0-100
    dependencies: ['skill-id-1', 'skill-id-2'],
  },
  // Add more skills
];
```

### 2. Work Experience

**File:** [components/sections/ExperienceTimeline.tsx](components/sections/ExperienceTimeline.tsx)

```tsx
// Line 18-100: Update experiences array
const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Your Job Title',
    company: 'Company Name',
    period: '2023 - Present',
    location: 'Remote',
    type: 'optimization', // feature, optimization, migration, security
    commitHash: 'a3f7d2e', // random hash
    technologies: ['Tech1', 'Tech2', 'Tech3'],
    achievements: [
      {
        text: 'Your achievement description',
        metric: '50% improvement',
        icon: YourIcon,
      },
    ],
  },
];
```

### 3. Projects

**File:** [components/sections/ProjectsInProduction.tsx](components/sections/ProjectsInProduction.tsx)

```tsx
// Line 14-80: Update projects array
const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Your Project Name',
    description: 'Project description',
    status: 'running', // running, deployed, staging
    uptime: 99.9,
    architecture: 'Architecture description',
    techStack: ['Tech1', 'Tech2'],
    metrics: [{ label: 'Metric', value: '99%', icon: IconName }],
    github: 'https://github.com/you/repo',
    demo: 'https://demo.com',
  },
];
```

### 4. Blog Articles

**File:** [components/sections/ObservabilityDashboard.tsx](components/sections/ObservabilityDashboard.tsx)

```tsx
// Line 14-80: Update articles array
const articles: Article[] = [
  {
    id: 'art-1',
    title: 'Your Article Title',
    description: 'Article description',
    category: 'architecture', // architecture, performance, incident, security
    date: '2024-12-30',
    readTime: '8 min',
    metrics: [{ label: 'Metric', value: 'Value' }],
  },
];
```

## 🔧 Feature Customization

### 1. Add New Section

**Step 1:** Create component in `components/sections/`

```tsx
// components/sections/YourSection.tsx
'use client';

import { motion } from 'framer-motion';

export function YourSection() {
  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">{/* Your content */}</div>
    </section>
  );
}
```

**Step 2:** Create page in `app/your-route/`

```tsx
// app/your-route/page.tsx
import { YourSection } from '@/components/sections/YourSection';

export default function YourPage() {
  return (
    <div className="relative pt-16">
      <YourSection />
    </div>
  );
}
```

**Step 3:** Add to navigation

```tsx
// components/navigation/PipelineNavigator.tsx
// Line 8-14: Add to stages array
const stages = [
  // ... existing stages
  {
    id: 'your-stage',
    label: 'Your Stage',
    icon: YourIcon,
    path: '/your-route',
  },
];
```

### 2. Remove Navigation

To use a simpler layout without the pipeline navigator:

**File:** [app/layout.tsx](app/layout.tsx)

```tsx
// Line 46-47: Comment out or remove
// <PipelineNavigator />
```

### 3. Contact Form Integration

For a working contact form, integrate with a service:

**Option 1: Formspree**

```tsx
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

**Option 2: Netlify Forms**

```tsx
<form name="contact" method="POST" data-netlify="true">
```

**Option 3: Custom API Route** (requires serverless function)

## 🖼️ Assets

### 1. Add Logo

**File:** [components/navigation/PipelineNavigator.tsx](components/navigation/PipelineNavigator.tsx)

```tsx
// Line 51-54: Replace terminal icon with logo
<div className="flex items-center gap-2">
  <Image src="/logo.svg" alt="Logo" width={32} height={32} />
  <span className="font-mono font-bold text-lg glow-text">Your Name</span>
</div>
```

### 2. Add Favicon

Place in `app/`:

- `favicon.ico`
- `icon.svg` or `icon.png`
- `apple-icon.png`

### 3. Add Resume PDF

Place `resume.pdf` in `public/` directory.

Update link in [components/sections/ContactOptimization.tsx](components/sections/ContactOptimization.tsx):

```tsx
// Line 280
<a href="/resume.pdf" target="_blank">
```

## 📱 Responsive Design

All components are already responsive. To adjust breakpoints:

**File:** [tailwind.config.js](tailwind.config.js)

```js
// Add custom breakpoints
screens: {
  'xs': '475px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

## 🎯 Analytics

### Google Analytics

1. Get tracking ID from Google Analytics
2. Update metadata or add script in layout

```tsx
// app/layout.tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `}
</Script>
```

### Cloudflare Web Analytics

Add in layout:

```tsx
<Script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "YOUR_TOKEN"}'
/>
```

## 🎨 Advanced Customization

### Dark/Light Mode Toggle

```tsx
// Add theme provider and toggle button
import { ThemeProvider } from 'next-themes';

// Wrap app in layout.tsx
<ThemeProvider attribute="class">{children}</ThemeProvider>;
```

### Custom Cursor

```css
/* app/globals.css */
* {
  cursor: url('/cursor.svg'), auto;
}
```

### Sound Effects

```tsx
// Add to interactions
const playSound = () => {
  new Audio('/sounds/click.mp3').play();
};
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 🆘 Need Help?

If you need assistance with customization:

1. Check the [README.md](README.md) for project structure
2. Review component comments for inline documentation
3. Open an issue on GitHub
4. Reach out via contact form

Happy customizing! 🚀
