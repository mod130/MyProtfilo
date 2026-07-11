import { Server, Network, GraduationCap } from 'lucide-react';

/**
 * Paired by array index with `experienceSection.items` in the i18n files,
 * which hold the translated role / company / period / bullet points.
 */
export const experienceMeta = [
  { icon: Server, current: true },
  { icon: Network, current: false },
  { icon: GraduationCap, current: false },
];
