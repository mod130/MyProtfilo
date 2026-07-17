import {
  Server,
  Users,
  Globe,
  Wifi,
  Layers,
  Box,
  Grid2x2,
  Network,
  Terminal,
  Bot,
  ShieldCheck,
  Save,
} from 'lucide-react';

/**
 * Practical / lab work tallies shown in the "IT Lab" section. `label` is a
 * proper noun (technology name) so it is intentionally not translated —
 * only the surrounding "projects" unit label is localized.
 */
export const labItems = [
  { id: 'windows-server', label: 'Windows Server', count: 1, icon: Server },
  { id: 'active-directory', label: 'Active Directory', count: 1, icon: Users },
  //{ id: 'dns', label: 'DNS', count: 6, icon: Globe },
  //{ id: 'dhcp', label: 'DHCP', count: 6, icon: Wifi },
  //{ id: 'hyper-v', label: 'Hyper-V', count: 5, icon: Layers },
  { id: 'vmware', label: 'VMware', count: 2, icon: Box },
 // { id: 'microsoft-365', label: 'Microsoft 365', count: 7, icon: Grid2x2 },
  { id: 'networking', label: 'Networking', count: 1, icon: Network },
  { id: 'linux', label: 'Linux', count: 1, icon: Terminal },
  //{ id: 'python-automation', label: 'Python Automation', count: 6, icon: Bot },
  { id: 'cybersecurity', label: 'Cybersecurity', count: 1, icon: ShieldCheck },
 // { id: 'backup-recovery', label: 'Backup & Recovery', count: 4, icon: Save },
];
