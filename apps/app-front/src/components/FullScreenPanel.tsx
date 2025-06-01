'use client';

interface FullScreenPanelProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const FullScreenPanel = ({ isOpen, children }: FullScreenPanelProps) => {
  if (!isOpen) return null;

  return <div className='fixed inset-0 z-50 bg-white overflow-y-auto'>{children}</div>;
};

export default FullScreenPanel;
