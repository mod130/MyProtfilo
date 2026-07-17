import { Network, Monitor, Cloud, ClipboardCheck, Cpu, GraduationCap } from 'lucide-react';

/**
 * Translated `title` / `issuer` / `description` copy lives in the i18n
 * files under certificatesSection.items.<id>. Replace `verifyUrl` with the
 * real public verification link for each credential.
 */
export const certificates = [
  {
   /*id: 'ccna',
    category: 'cisco',
    date: '2023',
    icon: Network,
   verifyUrl: 'https://www.credly.com/users/mohammedahmed-dev',
  },
  {
  
  {
   id: 'az900',
    category: 'microsoft',
    date: '2024',
   icon: Cloud,
    verifyUrl: 'https://learn.microsoft.com/en-us/users/mohammedahmed-dev/credentials',
  },
  {*/
    id: 'itil4',
    category: 'itil',
    date: '2023',
    icon: ClipboardCheck,
    verifyUrl: 'https://www.peoplecert.org/verify-certificate',
  },
 /* {
    id: 'comptia-a',
    category: 'others',
    date: '2022',
    icon: Cpu,
    verifyUrl: 'https://www.certmetrics.com/comptia/public/verification.aspx',
  },
 {
    id: 'google-it',
    category: 'others',
    date: '2022',
    icon: GraduationCap,
    verifyUrl: 'https://www.credly.com/users/mohammedahmed-dev',
  }*/
   
  
];

export const certificateFilters = ['all', 'cisco', 'microsoft', 'itil', 'others'];
