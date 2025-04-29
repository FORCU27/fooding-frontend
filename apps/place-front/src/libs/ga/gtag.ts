import { env } from '@/configs/env';

export const GA_TRACKING_ID = env.GA_MEASUREMENT_ID || '';

export const pageview = (url: string) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    console.warn('Google Analytics is not initialized.');
    return;
  }

  window.gtag('config', GA_TRACKING_ID, { page_path: url });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    console.warn('Google Analytics is not initialized.');
    return;
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
