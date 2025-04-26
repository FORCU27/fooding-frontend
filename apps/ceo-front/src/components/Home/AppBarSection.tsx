interface Props {
  className?: string;
}

const AppBarSection = ({ className }: Props) => {
  return <div className={`flex p-3 justify-start items-center ${className || ''}`}>윤식당</div>;
};

export default AppBarSection;
