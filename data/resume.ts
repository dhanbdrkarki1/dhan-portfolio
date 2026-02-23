import {
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Zap,
  Shield,
  Cloud,
  Container,
  GitBranch,
  Terminal,
  Layers,
  Eye,
  Server,
  Award,
} from 'lucide-react'

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface SocialLink {
  id: string
  label: string
  url: string
  icon: 'mail' | 'linkedin' | 'github' | 'medium' | 'resume' | 'custom'
  displayText?: string
}

export interface PersonalInfo {
  name: string
  roles: string[]
  location: string
  timezone: string
  bio: string
  email: string
  socialLinks: SocialLink[]
  stats: Array<{
    id: string
    label: string
    value: string | number
    icon: any
    color?: string
  }>
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  location: string
  type: 'feature' | 'optimization' | 'migration' | 'security'
  achievements: Array<{
    text: string
    metric?: string
    icon: any
  }>
  technologies: string[]
  commitHash: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'running' | 'deployed' | 'staging'
  uptime: number
  techStack: string[]
  architecture: string
  metrics: {
    label: string
    value: string
    icon: any
  }[]
  github?: string
  demo?: string
}

export interface Skill {
  id: string
  name: string
  category: 'cloud' | 'container' | 'cicd' | 'iac' | 'observability' | 'security'
  icon: any
  tools: string[]
  impact: string
  level: number
  dependencies: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: number
  credentialUrl: string
  category: 'cloud' | 'monitoring' | 'devops'
}

export interface Service {
  id: string
  title: string
  description: string
}

export interface TerminalCommand {
  command: string
  response: string
}

// ============================================
// RESUME DATA
// ============================================

export const resumeData = {
  // Personal Information
  personal: {
    name: 'Dhan Bahadur Karki',
    roles: [
      'DevOps Engineer',
      'Certified Kubernetes Administrator (CKA)',
      'Cloud Infrastructure Specialist',
      'CI/CD Automation Expert',
      'Infrastructure as Code Developer',
    ],
    location: 'Kathmandu, Nepal',
    timezone: 'Asia/Kathmandu',
    bio: 'Passionate about cloud infrastructure, containerization, and CI/CD automation. Focused on building scalable, efficient, and cost-optimized systems.',
    email: 'dhanbdr.work@gmail.com',
    socialLinks: [
      {
        id: 'email',
        label: 'Email',
        url: 'mailto:dhanbdr.work@gmail.com',
        icon: 'mail',
        displayText: 'dhanbdr.work@gmail.com',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/dhanbdrkarki/',
        icon: 'linkedin',
        displayText: '/in/dhanbdrkarki',
      },
      {
        id: 'github',
        label: 'GitHub',
        url: 'https://github.com/dhanbdrkarki1',
        icon: 'github',
        displayText: '@dhanbdrkarki1',
      },
      {
        id: 'medium',
        label: 'Medium Blog',
        url: 'https://dhanbdrkarki.medium.com/',
        icon: 'medium',
        displayText: '@dhanbdrkarki',
      },
      {
        id: 'resume',
        label: 'Resume',
        url: 'https://drive.google.com/uc?export=download&id=1dLs9LOnu-jSkmaLA6OVTY3zslUAAoYzB',
        icon: 'resume',
        displayText: 'Download PDF',
      },
    ],
    stats: [
      {
        id: 'companies',
        label: 'Companies',
        value: 3,
        icon: Server,
        color: 'text-neon-cyan',
      },
      {
        id: 'certifications',
        label: 'Certifications',
        value: 6,
        icon: Award,
        color: 'text-neon-green',
      },
      {
        id: 'repos',
        label: 'GitHub Repos',
        value: 4,
        icon: Terminal,
        color: 'text-neon-purple',
      },
      {
        id: 'cloud',
        label: 'Primary Cloud',
        value: 'AWS',
        icon: Cloud,
        color: 'text-neon-blue',
      }
    ],
  } as PersonalInfo,

  // Work Experience
  experiences: [
    {
      id: 'exp-1',
      role: 'DevOps Engineer',
      company: 'Progressive Labs',
      period: 'May 2025 - Present',
      location: 'Kathmandu, Nepal',
      type: 'optimization',
      commitHash: 'a3f7d2e',
      technologies: ['AWS', 'EKS', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Helm', 'Karpenter', 'Prometheus', 'Grafana', 'Cloudflare'],
      achievements: [
        {
          text: 'Optimized AWS costs by 50-60% in development and 30% in production through re-architecture, rightsizing, and open-source alternatives',
          metric: '50-60% cost ↓',
          icon: TrendingDown,
        },
        {
          text: 'Led cross-cloud migration from AWS to Azure, maintaining 95% SLA compliance and reducing costs by 25%',
          metric: '95% SLA',
          icon: CheckCircle2,
        },
        {
          text: 'Reduced GitHub Actions build time by 90% for Next.js, React.js, Node.js, and Spring Boot applications',
          metric: '90% faster',
          icon: Zap,
        },
        {
          text: 'Automated deployments and rollbacks via CI/CD pipelines, reducing manual work by 90%',
          metric: '90% automation',
          icon: TrendingUp,
        },
        {
          text: 'Deployed and managed AWS EKS using Helm, Kustomize, Karpenter with Prometheus/Grafana monitoring; executed cluster upgrades via blue/green strategy, node upgrades, and managed addons with minimal downtime',
          metric: 'Zero downtime',
          icon: CheckCircle2,
        },
        {
          text: 'Architected highly available AWS infrastructure (VPC, ALB, EC2, S3, Lambda) supporting 24/7 production workloads',
          metric: 'HA infrastructure',
          icon: Shield,
        },
      ],
    },
    {
      id: 'exp-2',
      role: 'DevOps Engineer',
      company: 'CropBytes Solutions',
      period: 'Jul 2023 - Apr 2025',
      location: 'Kathmandu, Nepal',
      type: 'feature',
      commitHash: 'b8e4c91',
      technologies: ['AWS', 'ECS', 'Docker', 'Terraform', 'Jenkins', 'Ansible', 'Prometheus', 'Grafana', 'CloudWatch'],
      achievements: [
        {
          text: 'Architected and managed AWS environments ensuring 99.9% uptime and high availability across AZs',
          metric: '99.9% uptime',
          icon: TrendingUp,
        },
        {
          text: 'Built CI/CD pipelines using Jenkins, CodePipeline, CodeBuild, reducing deployment lead time by 70%',
          metric: '70% faster',
          icon: Zap,
        },
        {
          text: 'Optimized Docker images via multi-stage builds, cutting sizes by 60% and startup times by 50%',
          metric: '60% smaller',
          icon: TrendingDown,
        },
        {
          text: 'Automated infrastructure with Terraform, reducing manual setup time by 95%',
          metric: '95% automation',
          icon: CheckCircle2,
        },
        {
          text: 'Implemented monitoring with Prometheus, Grafana, CloudWatch, improving MTTR by 40%',
          metric: '40% MTTR ↓',
          icon: TrendingUp,
        },
        {
          text: 'Developed Ansible playbooks reducing deployment time by 75% and eliminating 95% of config errors',
          metric: '75% faster',
          icon: Zap,
        },
        {
          text: 'Enforced security best practices and cost optimization, achieving 25% reduction in AWS spend',
          metric: '25% cost ↓',
          icon: TrendingDown,
        },
      ],
    },
    {
      id: 'exp-3',
      role: 'Jr. DevOps Engineer',
      company: 'Digo Solutions',
      period: 'May 2024 - Sep 2024',
      location: 'Kathmandu, Nepal',
      type: 'feature',
      commitHash: 'c1d9f3a',
      technologies: ['AWS', 'Terraform', 'Terragrunt', 'ECS', 'Docker', 'CodePipeline', 'New Relic', 'DataSync'],
      achievements: [
        {
          text: 'Designed AWS infrastructure using Terraform and Terragrunt with modular, reusable configurations',
          metric: 'IaC best practices',
          icon: CheckCircle2,
        },
        {
          text: 'Implemented CI/CD pipelines using CodePipeline, CodeBuild, and CodeDeploy with ECR integration',
          metric: 'Automated workflows',
          icon: Zap,
        },
        {
          text: 'Containerized Node.js and Python apps using multi-stage builds, reducing image sizes and startup times',
          metric: 'Docker optimization',
          icon: TrendingDown,
        },
        {
          text: 'Executed 10TB S3 bucket transfer between AWS accounts using DataSync with minimal downtime',
          metric: '10TB migrated',
          icon: CheckCircle2,
        },
        {
          text: 'Implemented New Relic monitoring (APM, Logs, Infrastructure) with customized dashboards',
          metric: 'Full observability',
          icon: TrendingUp,
        },
      ],
    }
  ] as Experience[],

  // Projects
  projects: [
    {
      id: 'proj-1',
      name: 'ECS CI/CD Pipeline with CloudFormation',
      description: 'Complete CI/CD pipeline using AWS CodePipeline, CodeBuild, ECR, and ECS with CloudFormation templates. Automated Docker container deployment from GitHub with infrastructure as code.',
      status: 'running',
      uptime: 99,
      architecture: 'CodePipeline + CodeBuild + ECR + ECS + CloudFormation',
      techStack: ['AWS CodePipeline', 'CodeBuild', 'ECS', 'ECR', 'CloudFormation', 'Docker'],
      metrics: [
        { label: 'Automation', value: '100%', icon: CheckCircle2 },
        { label: 'Deploy Time', value: '8 min', icon: Server },
        { label: 'IaC Managed', value: 'Yes', icon: Server },
      ],
      github: 'https://github.com/dhanbdrkarki1/ecs-ci-cd-cloudformation',
    },
    {
      id: 'proj-2',
      name: 'ECS Terraform and Pipeline',
      description: 'Modular AWS infrastructure with Terraform for ECS (EC2 launch type). Implemented Blue/Green deployment using CodeDeploy with ACM, ALB, ASG, RDS, EC2, VPC, and CloudWatch.',
      status: 'running',
      uptime: 99.5,
      architecture: 'Terraform + ECS + CodeDeploy + RDS + ALB',
      techStack: ['Terraform', 'ECS', 'CodeDeploy', 'RDS', 'ALB', 'CloudWatch', 'VPC'],
      metrics: [
        { label: 'Deployment', value: 'Blue/Green', icon: Server },
        { label: 'Modules', value: '10+', icon: Server },
        { label: 'Scalability', value: 'High', icon: CheckCircle2 },
      ],
      github: 'https://github.com/dhanbdrkarki1/ecs-codepipeline-terraform',
    },
    {
      id: 'proj-3',
      name: 'Deploy LAMP Stack Website',
      description: 'Automated deployment of Gym application using Ansible and Terraform, reducing manual configuration by 90%. Full infrastructure provisioning and application deployment automation.',
      status: 'deployed',
      uptime: 98,
      architecture: 'Terraform + Ansible + LAMP Stack',
      techStack: ['Terraform', 'Ansible', 'Apache', 'MySQL', 'PHP', 'Linux'],
      metrics: [
        { label: 'Automation', value: '90%', icon: CheckCircle2 },
        { label: 'Setup Time', value: '10 min', icon: Server },
        { label: 'Config Mgmt', value: 'Ansible', icon: Server },
      ],
      github: 'https://github.com/dhanbdrkarki1/lamp-stack-ansible-terraform',
    },
    {
      id: 'proj-4',
      name: 'BidMe - Online Auction',
      description: 'Online auction and bidding platform with real-time bidding, secure transactions, mobile accessibility. Features dynamic search, messaging, and feedback systems for enhanced user experience.',
      status: 'deployed',
      uptime: 97,
      architecture: 'Web Application + Database + Real-time Features',
      techStack: ['Node.js', 'MongoDB', 'WebSocket', 'Express', 'React'],
      metrics: [
        { label: 'Real-time', value: 'Yes', icon: CheckCircle2 },
        { label: 'Features', value: '15+', icon: Server },
        { label: 'Mobile Ready', value: 'Yes', icon: Server },
      ],
      github: 'https://github.com/dhanbdrkarki1/online-auction',
    },
  ] as Project[],

  // Skills
  skills: [
    {
      id: 'aws',
      name: 'AWS Cloud',
      category: 'cloud',
      icon: Cloud,
      tools: ['EC2', 'ECS', 'EKS', 'S3', 'Lambda', 'RDS', 'VPC', 'CloudWatch', 'IAM', 'ALB', 'SNS', 'SQS'],
      impact: 'Building scalable cloud infrastructure',
      level: 85,
      dependencies: ['terraform', 'docker'],
    },
    {
      id: 'azure',
      name: 'Azure Cloud',
      category: 'cloud',
      icon: Cloud,
      tools: ['Azure VMs', 'Storage', 'Networking', 'Resource Groups', 'Cost Management'],
      impact: 'Cross-cloud migration and management',
      level: 70,
      dependencies: ['terraform'],
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      category: 'container',
      icon: Container,
      tools: ['EKS', 'ECS', 'Helm', 'Kustomize', 'Karpenter', 'HPA', 'Ingress Controllers'],
      impact: 'Container orchestration at scale',
      level: 80,
      dependencies: ['docker', 'cicd'],
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'container',
      icon: Container,
      tools: ['Docker', 'Docker Compose', 'Multi-stage builds', 'Alpine', 'ECR'],
      impact: 'Containerizing and optimizing applications',
      level: 85,
      dependencies: ['cicd'],
    },
    {
      id: 'terraform',
      name: 'Terraform & IaC',
      category: 'iac',
      icon: Layers,
      tools: ['Terraform', 'Terragrunt', 'CloudFormation', 'Packer', 'HCL', 'State Management'],
      impact: 'Infrastructure as Code automation',
      level: 85,
      dependencies: ['aws', 'azure'],
    },
    {
      id: 'cicd',
      name: 'CI/CD Pipelines',
      category: 'cicd',
      icon: GitBranch,
      tools: ['Jenkins', 'GitHub Actions', 'CodePipeline', 'CodeBuild', 'CodeDeploy', 'GitLab CI'],
      impact: 'Automated deployment workflows',
      level: 85,
      dependencies: ['docker', 'terraform'],
    },
    {
      id: 'ansible',
      name: 'Configuration Management',
      category: 'iac',
      icon: Terminal,
      tools: ['Ansible', 'Playbooks', 'Roles', 'Automation', 'Server Provisioning'],
      impact: 'Automated server configuration',
      level: 80,
      dependencies: [],
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Logging',
      category: 'observability',
      icon: Eye,
      tools: ['Prometheus', 'Grafana', 'New Relic', 'CloudWatch', 'APM', 'Dashboards', 'Alerts'],
      impact: 'Full-stack observability',
      level: 80,
      dependencies: ['aws', 'kubernetes'],
    },
    {
      id: 'security',
      name: 'Security & Testing',
      category: 'security',
      icon: Shield,
      tools: ['tfsec', 'Checkov', 'SonarQube', 'Trivy', 'OWASP', 'Security Hub', 'IAM'],
      impact: 'Security scanning and compliance',
      level: 75,
      dependencies: ['terraform', 'cicd'],
    },
    {
      id: 'scripting',
      name: 'Scripting & Programming',
      category: 'iac',
      icon: Terminal,
      tools: ['Python', 'Bash', 'Django', 'React', 'JavaScript', 'MySQL', 'PostgreSQL'],
      impact: 'Automation and application development',
      level: 80,
      dependencies: [],
    },
    {
      id: 'git',
      name: 'Version Control',
      category: 'cicd',
      icon: GitBranch,
      tools: ['Git', 'GitHub', 'GitLab', 'Branch Protection', 'Semantic Versioning'],
      impact: 'Code collaboration and management',
      level: 85,
      dependencies: ['cicd'],
    },
  ] as Skill[],

  // Certifications
  certifications: [
    {
      id: 'cert-1',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'The Linux Foundation (CNCF)',
      year: 2026,
      credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/73c1ee2d-7c40-4f8d-a625-cb9271feec15-dhan-karki-8d2e1110-1a85-45f9-a479-e4bf78ef2cfa-certificate.pdf',
      category: 'devops',
    },
    {
      id: 'cert-2',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      year: 2024,
      credentialUrl: 'https://www.credly.com/badges/88dad0e1-fe64-4892-b8d8-44cc2b6911/public_url',
      category: 'cloud',
    },
    {
      id: 'cert-3',
      name: 'Full Stack Observability Practitioner',
      issuer: 'New Relic University',
      year: 2024,
      credentialUrl: 'https://credentials.newrelic.com/4daaeab2-303b-4590-8e55-30a72990067e',
      category: 'monitoring',
    },
    {
      id: 'cert-4',
      name: 'AWS Academy Graduate - Cloud Foundations',
      issuer: 'Amazon Web Services',
      year: 2023,
      credentialUrl: 'https://www.credly.com/badges/390cb832-ceda-4da7-9f27-e77b2b9b7dda/public_url',
      category: 'cloud',
    },
    {
      id: 'cert-5',
      name: 'Introduction to Containers w/ Docker, Kubernetes & OpenShift',
      issuer: 'IBM Skills Network',
      year: 2023,
      credentialUrl: 'https://coursera.org/share/956f74e9912bfb5e0ee2296dcbe094e1',
      category: 'devops',
    },
    {
      id: 'cert-6',
      name: 'Continuous Integration and Continuous Delivery (CI/CD)',
      issuer: 'IBM Skills Network',
      year: 2023,
      credentialUrl: 'https://coursera.org/share/7bb154635bfb65884fe4dc9946b7f69a',
      category: 'devops',
    },
  ] as Certification[],

  // Services Offered
  services: [
    {
      id: 'service-1',
      title: 'Cloud Infrastructure Setup',
      description: 'AWS/Azure architecture design and implementation',
    },
    {
      id: 'service-2',
      title: 'CI/CD Pipeline Development',
      description: 'Automated deployment workflows and testing',
    },
    {
      id: 'service-3',
      title: 'Container Orchestration',
      description: 'Kubernetes/ECS setup and management',
    },
    {
      id: 'service-4',
      title: 'Infrastructure as Code',
      description: 'Terraform/CloudFormation automation',
    },
    {
      id: 'service-5',
      title: 'Monitoring & Alerting',
      description: 'Prometheus, Grafana, CloudWatch setup',
    },
    {
      id: 'service-6',
      title: 'Cost Optimization',
      description: 'Cloud cost analysis and reduction strategies',
    },
    {
      id: 'service-7',
      title: 'Security Best Practices',
      description: 'IAM, compliance, and vulnerability scanning',
    },
  ] as Service[],

  // Terminal Commands
  terminalCommands: [
    {
      command: 'whoami',
      response: 'Dhan Bahadur Karki - DevOps Engineer from Kathmandu, Nepal',
    },
    {
      command: 'skills',
      response: 'AWS, Azure, Kubernetes, Docker, Terraform, CI/CD, Ansible, Python',
    },
    {
      command: 'experience',
      response: '2.5 years | Progressive Labs, CropBytes, Digo Solutions',
    },
    {
      command: 'contact',
      response: 'Email: dhanbdr.work@gmail.com | GitHub: @dhanbdrkarki1',
    },
  ] as TerminalCommand[],
}
