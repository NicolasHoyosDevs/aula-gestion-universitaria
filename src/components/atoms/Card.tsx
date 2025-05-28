
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const Card = ({ className, hoverable = false, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border shadow-sm p-6',
        hoverable && 'card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
