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

export function GoogleIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <mask id='mask0_456_1415' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
        <path d='M23.6352 0.362549H0.362488V23.6353H23.6352V0.362549Z' fill='white' />
      </mask>
      <g mask='url(#mask0_456_1415)'>
        <path
          d='M23.1697 12.2635C23.1697 11.4384 23.0957 10.645 22.9581 9.8833H11.9988V14.3845H18.2612C17.9915 15.839 17.1717 17.0714 15.9393 17.8966V20.8162H19.7C21.9003 18.7905 23.1697 15.8073 23.1697 12.2635Z'
          fill='#4285F4'
        />
        <path
          d='M11.9989 23.6352C15.1407 23.6352 17.7747 22.5931 19.6999 20.816L15.9393 17.8963C14.8974 18.5945 13.5644 19.007 11.9989 19.007C8.96807 19.007 6.40283 16.9601 5.48775 14.2097H1.60016V17.2246C3.51492 21.0276 7.45011 23.6352 11.9989 23.6352Z'
          fill='#34A853'
        />
        <path
          d='M5.48772 14.2096C5.255 13.5115 5.12281 12.7657 5.12281 11.9987C5.12281 11.2318 5.255 10.486 5.48772 9.78782V6.77295H1.60013C0.812116 8.34386 0.362488 10.1211 0.362488 11.9987C0.362488 13.8764 0.812116 15.6536 1.60013 17.2245L5.48772 14.2096Z'
          fill='#FBBC04'
        />
        <path
          d='M11.9989 4.99068C13.7072 4.99068 15.2411 5.57773 16.4471 6.73078L19.7847 3.39324C17.7695 1.5156 15.1353 0.362549 11.9989 0.362549C7.45011 0.362549 3.51492 2.97014 1.60016 6.77314L5.48775 9.788C6.40283 7.03763 8.96807 4.99068 11.9989 4.99068Z'
          fill='#E94235'
        />
      </g>
    </svg>
  );
}

export function ArrowLeftIcon() {
  return (
    <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M47.5 30H12.5M12.5 30L30 47.5M12.5 30L30 12.5'
        stroke='#111111'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function NaverIcon() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13.328 10.6582L6.40382 0.735107H0.662109V19.2646H6.67201V9.34158L13.5962 19.2646H19.3379V0.735107H13.328V10.6582Z'
        fill='white'
      />
    </svg>
  );
}

export function KakaoIcon() {
  return (
    <svg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 0C4.925 0 0 3.852 0 8.6C0 11.7 2.086 14.41 5.218 15.927C4.988 16.776 4.385 19.006 4.265 19.482C4.115 20.074 4.483 20.067 4.725 19.908C4.914 19.783 7.739 17.882 8.958 17.062C9.63417 17.1608 10.3166 17.2103 11 17.21C17.075 17.21 22 13.358 22 8.61C22 3.862 17.075 0 11 0Z'
        fill='#291516'
      />
    </svg>
  );
}

export function AppleIcon() {
  return (
    <svg width='18' height='23' viewBox='0 0 18 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9.18638 5.5396C10.1546 5.5396 11.3682 4.86494 12.0909 3.9654C12.7455 3.15019 13.2227 2.0117 13.2227 0.873216C13.2227 0.718607 13.2091 0.563998 13.1818 0.4375C12.1046 0.479666 10.8091 1.18243 10.0318 2.12414C9.41819 2.84097 8.8591 3.9654 8.8591 5.11794C8.8591 5.2866 8.88638 5.45527 8.90001 5.51149C8.96819 5.52554 9.07729 5.5396 9.18638 5.5396ZM5.77729 22.5466C7.10001 22.5466 7.68638 21.633 9.33638 21.633C11.0136 21.633 11.3818 22.5185 12.8546 22.5185C14.3 22.5185 15.2682 21.1411 16.1818 19.7917C17.2046 18.2456 17.6273 16.7277 17.6546 16.6574C17.5591 16.6293 14.7909 15.4627 14.7909 12.1878C14.7909 9.3486 16.9727 8.06956 17.0955 7.97118C15.65 5.83476 13.4546 5.77854 12.8546 5.77854C11.2318 5.77854 9.9091 6.79052 9.07729 6.79052C8.17729 6.79052 6.99092 5.83476 5.58638 5.83476C2.91365 5.83476 0.200012 8.11173 0.200012 12.4127C0.200012 15.0832 1.2091 17.9083 2.45001 19.7355C3.51365 21.2816 4.44092 22.5466 5.77729 22.5466Z'
        fill='black'
      />
    </svg>
  );
}
