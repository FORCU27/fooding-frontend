export type PlatformType = 'GOOGLE' | 'KAKAO' | 'NAVER' | 'APPLE' | 'fooding';

const BUTTON_STYLES = {
  base: 'flex items-center justify-center rounded-[50%] w-[64px] h-[64px] ',
  naver: 'bg-[#03C75A] ',
  kakao: 'bg-[#FEE500]',
  apple: 'bg-white border border-[#F1F3F5] ',
  google: 'bg-white border border-[#F1F3F5] ',
};

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
      className={`${BUTTON_STYLES.base} ${styles} cursor-pointer`}
    >
      {icon}
    </button>
  );
}
