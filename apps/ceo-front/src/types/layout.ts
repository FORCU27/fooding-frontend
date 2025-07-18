export type MenuItem = {
  id: string;
  text: string;
  path: string;
  icon?: React.ReactNode;
  iconType?: 'store' | 'news' | 'regular' | 'reward' | 'statistics' | 'devices';
  subItems?: MenuItem[];
};
