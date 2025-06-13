import { useFlow } from '@stackflow/react/future';

type PopProps = Omit<React.ComponentPropsWithRef<'button'>, 'onClick'>;

export const Pop = ({ children, ...props }: PopProps) => {
  const { pop } = useFlow();

  return (
    <button onClick={pop} {...props}>
      {children}
    </button>
  );
};
