import { ComponentPropsWithoutRef } from 'react';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
}
