import { Network, Server, Code2, ShieldCheck } from 'lucide-react';

/**
 * Proficiency levels are illustrative self-assessments (0-100), used to
 * drive the animated progress bars in the Skills section.
 */
export const skillCategories = [
  {
    id: 'networking',
    icon: Network,
    accent: 'from-accent to-primary-400',
    skills: [
      { name: 'TCP/IP', level: 95 },
      { name: 'Cisco', level: 88 },
      { name: 'Routing', level: 90 },
      { name: 'Switching', level: 88 },
    ],
  },
  {
    id: 'systems',
    icon: Server,
    accent: 'from-primary-400 to-secondary',
    skills: [
      { name: 'Windows', level: 92 },
      { name: 'Windows Server', level: 90 },
      { name: 'Active Directory', level: 90 },
      { name: 'Microsoft 365', level: 85 },
      { name: 'VMware / Hyper-V', level: 85 },
    ],
  },
  {
    id: 'programming',
    icon: Code2,
    accent: 'from-secondary to-accent',
    skills: [
      { name: 'React', level: 82 },
      { name: 'JavaScript', level: 84 },
      { name: 'HTML & CSS', level: 88 },
      { name: 'Tailwind CSS', level: 86 },
      { name: 'PHP', level: 78 },
      { name: 'Laravel', level: 80 },
      { name: 'Python', level: 80 },
      { name: 'MySQL', level: 85 },
    ],
  },
  {
    id: 'cybersecurity',
    icon: ShieldCheck,
    accent: 'from-online to-accent',
    skills: [
      { name: 'Linux', level: 75 },
      { name: 'Network Security', level: 80 },
      { name: 'Security Fundamentals', level: 78 },
      { name: 'Troubleshooting', level: 92 },
    ],
  },
];
