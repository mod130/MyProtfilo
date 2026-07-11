import { Server, Network, Activity, Bot, Sparkles, LayoutDashboard } from 'lucide-react';

/**
 * Translated `title` / `description` copy for each project lives in
 * src/i18n/{en,ar}.json under projectsSection.items.<id> — this file only
 * holds the structural, non-translatable data (links, tags, visuals).
 *
 * Replace the `links.github` / `links.demo` placeholder URLs with your own
 * repositories and live deployments.
 */
export const projects = [
  {
    id: 'windows-server-lab',
    category: 'infrastructure',
    icon: Server,
    tech: ['Windows Server 2022', 'Active Directory', 'DNS', 'DHCP', 'GPO'],
    links: {
      github: 'https://github.com/mohammedahmed-dev/windows-server-lab',
    },
    art: { variant: 'circuit', from: '#6C63FF', to: '#22D3EE' },
    featured: true,
  },
  {
    id: 'active-directory-lab',
    category: 'infrastructure',
    icon: Network,
    tech: ['Active Directory', 'Group Policy', 'DNS', 'Security Hardening'],
    links: {
      github: 'https://github.com/mohammedahmed-dev/active-directory-lab',
    },
    art: { variant: 'nodes', from: '#8B5CF6', to: '#6C63FF' },
    featured: true,
  },
  {
    id: 'network-monitoring',
    category: 'infrastructure',
    icon: Activity,
    tech: ['SNMP', 'Networking', 'Alerting', 'Linux'],
    links: {
      github: 'https://github.com/mohammedahmed-dev/network-monitoring-dashboard',
    },
    art: { variant: 'waves', from: '#22D3EE', to: '#6C63FF' },
    featured: false,
  },
  {
    id: 'tiktok-downloader-bot',
    category: 'automation',
    icon: Bot,
    tech: ['Python', 'Automation', 'REST APIs'],
    links: {
      github: 'https://github.com/mohammedahmed-dev/tiktok-downloader-bot',
      demo: 'https://t.me/tiktok_dl_demo_bot',
    },
    art: { variant: 'dots', from: '#8B5CF6', to: '#22D3EE' },
    featured: false,
  },
  {
    id: 'ai-hologram-project',
    category: 'other',
    icon: Sparkles,
    tech: ['Raspberry Pi', 'Python', 'AI Voice Interaction', 'Hardware'],
    links: {
      github: 'https://github.com/mohammedahmed-dev/ai-hologram-teacher',
    },
    art: { variant: 'blobs', from: '#6C63FF', to: '#8B5CF6' },
    featured: true,
    isGraduation: true,
  },
  {
    id: 'laravel-dashboard',
    category: 'web',
    icon: LayoutDashboard,
    tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/mohammedahmed-dev/laravel-portfolio-dashboard',
      demo: 'https://laravel-dashboard-demo.mohammedahmed.dev',
    },
    art: { variant: 'grid', from: '#22D3EE', to: '#8B5CF6' },
    featured: true,
  },
];

export const projectFilters = ['all', 'infrastructure', 'automation', 'web', 'other'];
