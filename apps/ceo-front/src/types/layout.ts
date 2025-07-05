export type ScreenMode = 'mobile' | 'tablet' | 'desktop';

export type MenuItem = {
  id: string;
  text: string;
  path: string;
  subItems?: MenuItem[];
};
