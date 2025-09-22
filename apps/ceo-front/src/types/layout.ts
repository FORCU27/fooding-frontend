export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
  text?: string;
}