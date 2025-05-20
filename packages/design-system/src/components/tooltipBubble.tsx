import React from 'react';

type TailPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipBubbleProps {
  children: React.ReactNode;
  tailColor?: string;
  tailPosition?: TailPosition;
  className?: string;
  bubbleClassName?: string;
}

export const TooltipBubble = ({
  children,
  tailPosition = 'top',
  className = '',
  bubbleClassName = '',
  tailColor = 'black',
}: TooltipBubbleProps) => {
  return (
    <div className={`relative inline-flex ${className}`}>
      <div className={`relative ${bubbleClassName}`}>
        {children}
        <span style={getTailStyle(tailPosition, tailColor)} className='absolute w-0 h-0' />
      </div>
    </div>
  );
};

const getTailStyle = (position: TailPosition, color: string): React.CSSProperties => {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  };

  switch (position) {
    case 'top':
      return {
        ...base,
        bottom: -6,
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '6px 6px 0 6px',
        borderColor: `${color} transparent transparent transparent`,
      };
    case 'bottom':
      return {
        ...base,
        top: -6,
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '0 6px 6px 6px',
        borderColor: `transparent transparent ${color} transparent`,
      };
    case 'left':
      return {
        ...base,
        right: -6,
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '6px 0 6px 6px',
        borderColor: `transparent transparent transparent ${color}`,
      };
    case 'right':
      return {
        ...base,
        left: -6,
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '6px 6px 6px 0',
        borderColor: `transparent ${color} transparent transparent`,
      };
    default:
      return {};
  }
};
