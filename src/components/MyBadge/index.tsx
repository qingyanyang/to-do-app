import { Badge } from '@radix-ui/themes';

interface MyBadgeProps {
  label: string;
  variant: 'soft' | 'surface' | 'solid' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  size?: '1' | '2' | '3';
}
const MyBadge: React.FC<MyBadgeProps> = ({
  label,
  variant,
  children,
  size,
  onClick,
}) => {
  return (
    <Badge
      onClick={onClick}
      size={size}
      variant={variant}
      color={`${
        label === 'dating'
          ? 'crimson'
          : label === 'study'
            ? 'indigo'
            : label === 'work'
              ? 'cyan'
              : label === 'health'
                ? 'orange'
                : 'yellow'
      }`}
    >
      {children}
    </Badge>
  );
};

export default MyBadge;
