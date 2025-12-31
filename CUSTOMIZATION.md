# Portfolio Customization Guide

This portfolio is fully customizable through a centralized data file. You can update all content without modifying any component code.

## Quick Start

All portfolio content is managed in a single file:

```
data/resume.ts
```

Simply edit this file to update your portfolio information. Changes will automatically reflect across all pages.

## Data Structure

### 1. Personal Information

```typescript
personal: {
  name: "Your Name",
  email: "your.email@example.com",
  location: "Your City, Country",
  timezone: "Your/Timezone",  // e.g., "Asia/Kathmandu"
  bio: "Your bio text here",
  roles: ["Role 1", "Role 2", "Role 3"],  // Animated on home page
  socialLinks: [
    {
      id: 'email',
      label: 'Email',
      url: 'mailto:your.email@example.com',
      icon: 'mail',  // Options: 'mail', 'linkedin', 'github', 'medium', 'resume', 'custom'
      displayText: 'your.email@example.com',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/yourprofile',
      icon: 'linkedin',
      displayText: '/in/yourprofile',
    },
    // Add more social links as needed
  ],
  stats: [
    {
      id: 'companies',
      label: 'Companies',
      value: 3,
      icon: Server,  // Import from lucide-react
      color: 'text-neon-cyan',
    },
    {
      id: 'certifications',
      label: 'Certifications',
      value: 5,
      icon: Award,
      color: 'text-neon-green',
    },
    // Add, remove, or reorder stats as needed
  ]
}
```

**Social Links Configuration:**

- `id`: Unique identifier for the link
- `label`: Display label (e.g., "Email", "LinkedIn")
- `url`: Full URL (use `mailto:` for email, `https://` for websites)
- `icon`: Icon type - 'mail', 'linkedin', 'github', 'medium', 'resume', or 'custom'
- `displayText`: (Optional) Custom text to display instead of the URL

You can add, remove, or reorder social links. The Quick Connect section will automatically update.

**Portfolio Stats Configuration:**

- `id`: Unique identifier for the stat
- `label`: Display label (e.g., "Companies", "Projects")
- `value`: Number or string value to display
- `icon`: Lucide React icon component (import at top of file)
- `color`: (Optional) Tailwind text color class (e.g., 'text-neon-cyan')

You can add, remove, or reorder stats. They will appear in the Portfolio Overview section on the home page.

### 2. Work Experience

Add or modify your work history in the `experiences` array:

```typescript
{
  id: 'exp-1',  // Unique identifier
  role: 'Your Job Title',
  company: 'Company Name',
  period: 'Jan 2023 - Present',
  location: 'City, Country',
  type: 'feature',  // Options: 'feature', 'optimization', 'migration', 'security'
  commitHash: 'a3f7d2e',  // Any git-style hash
  technologies: ['Tech1', 'Tech2', 'Tech3'],
  achievements: [
    {
      text: 'What you achieved',
      metric: '50% faster',  // Optional metric
      icon: TrendingUp,  // Import from lucide-react
    }
  ]
}
```

**Type Colors:**

- `feature`: Cyan (new features)
- `optimization`: Green (performance improvements)
- `migration`: Purple (infrastructure changes)
- `security`: Red (security enhancements)

### 3. Projects

Add your projects in the `projects` array:

```typescript
{
  id: 'proj-1',
  name: 'Project Name',
  description: 'Brief description of your project',
  status: 'running',  // Options: 'running', 'deployed', 'staging'
  uptime: 99,  // Uptime percentage
  architecture: 'Tech Stack Summary',
  techStack: ['Tech1', 'Tech2', 'Tech3'],
  metrics: [
    { label: 'Metric Name', value: '100%', icon: CheckCircle }
  ],
  github: 'https://github.com/username/repo',  // Optional
  demo: 'https://demo-url.com'  // Optional
}
```

### 4. Skills

Update your skills in the `skills` array:

```typescript
{
  id: 'aws',
  name: 'AWS Cloud',
  category: 'cloud',  // Options: 'cloud', 'container', 'cicd', 'iac', 'observability', 'security'
  icon: Cloud,  // Import from lucide-react
  tools: ['EC2', 'S3', 'Lambda'],
  impact: 'What you use it for',
  level: 85,  // Proficiency: 0-100
  dependencies: ['terraform', 'docker']  // Related skill IDs
}
```

**Skill Categories:**

- `cloud`: Cloud platforms (AWS, Azure, GCP)
- `container`: Container technologies (Docker, Kubernetes)
- `cicd`: CI/CD tools (Jenkins, GitHub Actions)
- `iac`: Infrastructure as Code (Terraform, Ansible)
- `observability`: Monitoring tools (Prometheus, Grafana)
- `security`: Security tools (tfsec, Trivy)

### 5. Certifications

Add certifications in the `certifications` array:

```typescript
{
  id: 'cert-1',
  name: 'Certification Name',
  issuer: 'Issuing Organization',
  year: 2024,
  credentialUrl: 'https://credential-url.com',
  category: 'cloud'  // Options: 'cloud', 'monitoring', 'devops'
}
```

### 6. Services

Define what services you offer in the `services` array:

```typescript
{
  id: 'service-1',
  title: 'Service description',
  category: 'cloud'  // For future categorization
}
```

### 7. Terminal Commands

Customize the interactive terminal on the home page:

```typescript
{
  command: 'skills',
  description: 'View core technical competencies',
  output: [
    'Cloud: AWS, Azure',
    'Containers: Docker, Kubernetes',
    // Add more lines
  ]
}
```

**Default Commands:**

- `help`: Shows available commands
- `skills`: Lists your technical skills
- `projects`: Shows recent projects
- `contact`: Displays contact information

## Available Icons

Import icons from `lucide-react`:

```typescript
import {
  Cloud,
  Container,
  GitBranch,
  Shield,
  Eye,
  Terminal,
  Server,
  Layers,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Zap,
  Award,
  Gauge,
  DollarSign,
} from 'lucide-react';
```

Browse all available icons at: https://lucide.dev/icons

## Color Theme

The portfolio uses these color variables (defined in `globals.css`):

- `neon-cyan`: #00F0FF (Primary accent)
- `neon-green`: #39FF14 (Success states)
- `neon-purple`: #BC13FE (Special highlights)
- `neon-blue`: #0F52BA (Cloud services)
- `status-error`: #FF4444 (Security/errors)
- `status-warning`: #FFA500 (Warnings)
- `status-success`: #39FF14 (Success)

## Tips

1. **Keep IDs Unique**: Every item needs a unique `id` field
2. **Icon Imports**: Make sure to import all icons you use at the top of `data/resume.ts`
3. **URLs**: Use absolute URLs for external links (starting with `https://`)
4. **Metrics**: Keep metric strings short and punchy (e.g., "50% faster", "99% uptime")
5. **Tech Stack**: Use well-known technology names for better recognition
6. **Git Hashes**: Can be any 7-character alphanumeric string (doesn't need to be real)

## Example Workflow

To update your portfolio:

1. Open `data/resume.ts`
2. Find the section you want to update (personal, experiences, projects, etc.)
3. Modify the values
4. Save the file
5. The changes will automatically appear in your portfolio

No need to touch any component files!

## Troubleshooting

**Icons not showing?**

- Make sure you've imported the icon at the top of `data/resume.ts`
- Check the icon name is correct (case-sensitive)

**TypeScript errors?**

- Ensure all required fields are present
- Check that arrays have proper types
- Run `npm run build` to check for errors

**Layout broken?**

- Check for missing closing brackets `}` or commas `,`
- Validate JSON structure with an editor

## Advanced Customization

For deeper customization (colors, layouts, animations), you'll need to modify:

- `app/globals.css`: Global styles and color variables
- `components/sections/*.tsx`: Individual page layouts
- `components/navigation/*.tsx`: Navigation behavior
- `components/ui/*.tsx`: UI component styles

## Questions?

If you need help customizing your portfolio, feel free to reach out or check the component files for implementation details.
