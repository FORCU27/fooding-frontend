export type PlatformType = 'GOOGLE' | 'KAKAO' | 'NAVER' | 'APPLE' | 'fooding';

interface SocialButtonProps {
  platform: PlatformType;
  icon: React.ReactNode;
  onClick: (platform: PlatformType) => void;
  styles: string;
}

export function SocialButton({ platform, icon, onClick, styles }: SocialButtonProps) {
  return (
    <button
      onClick={() => onClick(platform)}
      className={`cursor-pointer flex items-center justify-center ${styles}`}
    >
      {icon}
    </button>
  );
}
