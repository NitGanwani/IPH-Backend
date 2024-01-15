import { Group } from './group';

export type Terminal = {
  id: string;
  name: string;
  battery: number;
  wifi: 'Low' | 'Medium' | 'High';
  isConnected: 'Yes' | 'No';
  group: Group;
};
