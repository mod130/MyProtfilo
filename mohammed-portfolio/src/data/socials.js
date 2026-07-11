import { Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

/**
 * Update these with your real contact details and profile links.
 */
export const profile = {
  name: 'Mohammed Ahmed',
  email: 'Mohalhartoumi@gmail.com',
  phone: '+966 56 637 6130',
  location: 'Saudi Arabia',
  resumeUrl: '/resume/Mohammed-Ahmed-CV.pdf',
};

export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/mohammed-alhartomi-14137b27a' },
  { id: 'github', label: 'GitHub', icon: Github, href: 'https://github.com/mod130' },
  { id: 'email', label: 'Email', icon: Mail, href: `mailto:${profile.email}` },
];

export const contactDetails = [
  { id: 'email', icon: Mail, label: 'email', value: profile.email, href: `mailto:${profile.email}` },
  { id: 'phone', icon: Phone, label: 'phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
  { id: 'location', icon: MapPin, label: 'location', value: profile.location, href: null },
];
