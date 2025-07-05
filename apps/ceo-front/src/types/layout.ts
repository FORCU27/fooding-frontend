export type ScreenMode = 'mobile' | 'tablet' | 'desktop';

export type MenuItem = {
  id: string;
  text: string;
  path: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
};
